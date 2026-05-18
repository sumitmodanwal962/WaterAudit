// DVS Calculation Engine
// Formula: DVS = Σ(Wi * Gi) / Σ(Wi) * 100
//
// Category Weights:
//   Supply Data:                           40%
//   Customer Metering Data:                30%
//   Authorized Consumption & Losses:       15%
//   System Attributes:                     15%

export interface DVSCategoryWeight {
  category: string;
  label: string;
  weight: number;          // Wi (0–1)
  categoryKeys: string[];  // which DVS category keys belong here
}

export const DVS_WEIGHTS: DVSCategoryWeight[] = [
  {
    category: "supply",
    label: "Supply Data",
    weight: 0.40,
    categoryKeys: ["VOS", "VOS_WI_WE_EA", "WI_WE_EA", "WI", "WE"]
  },
  {
    category: "metering",
    label: "Customer Metering Data",
    weight: 0.30,
    categoryKeys: ["CMI", "CRUC", "VPC"]
  },
  {
    category: "consumption",
    label: "Authorized Consumption & Losses",
    weight: 0.15,
    categoryKeys: ["BMAC", "BUAC", "UMAC", "UUAC", "SDHE", "UC", "UWW"]
  },
  {
    category: "system",
    label: "System Attributes",
    weight: 0.15,
    categoryKeys: ["Lm", "Nc", "Lp", "AOP"]
  }
];

import { ValidationQuestion } from "./types";

/**
 * Grades each category based on the configured weights and option scores.
 *
 * @param selectedIndices Array of selected option indices. Use null for skipped questions.
 * @param questions Array of ValidationQuestion objects for the category.
 * @returns Grade 0–1 for the category
 */
export function gradeCategory(
  selectedIndices: (number | null)[],
  questions: ValidationQuestion[]
): number {
  if (!questions || questions.length === 0 || selectedIndices.length === 0) return 0.1;

  let grade = 0;
  const hasWeights = questions.some(q => q.weight !== undefined);

  if (!hasWeights) {
    let score = 0;
    let max = 0;
    for (let i = 0; i < selectedIndices.length; i++) {
      if (selectedIndices[i] === null) continue;
      const maxIdx = (questions[i].options?.length || 2) - 1;
      score += selectedIndices[i]!;
      max += maxIdx;
    }
    grade = max > 0 ? score / max : 0;
  } else {
    // New logic: weighted option scores
    let totalWeightedScore = 0;
    let totalWeight = 0;

    for (let i = 0; i < selectedIndices.length; i++) {
      const q = questions[i];
      const answerIdx = selectedIndices[i];

      if (answerIdx === null || answerIdx === undefined) continue;

      const w = q.weight !== undefined ? q.weight : 1;
      
      let optionScore = 0;
      if (q.scores && q.scores.length > answerIdx) {
        optionScore = q.scores[answerIdx];
      } else {
        const maxIdx = (q.options?.length || 2) - 1;
        optionScore = maxIdx > 0 ? (answerIdx / maxIdx) * 10 : 0;
      }

      totalWeightedScore += w * optionScore;
      totalWeight += w;
    }

    if (totalWeight === 0) {
      // Edge case: All answered questions had 0 weight (e.g. gate question)
      const firstAnswered = selectedIndices.findIndex(idx => idx !== null && idx !== undefined);
      if (firstAnswered !== -1) {
        const q = questions[firstAnswered];
        const ans = selectedIndices[firstAnswered]!;
        if (q.scores && q.scores.length > ans) {
          grade = q.scores[ans] / 10;
        }
      }
    } else {
      grade = (totalWeightedScore / totalWeight) / 10;
    }
  }

  return Math.max(0.1, grade);
}

/**
 * Helper to determine the dynamic weight of a category based on its input volume/cost.
 * AWWA standard assigns higher weight to parameters with larger volumes, but strictly limits this to comparable units.
 */
function getDynamicWeight(key: string, dataValues: Record<string, string | number>): number {
  // 1. Error Adjustments (Sum of their associated parent volumes in MLD)
  if (key === "VOS_WI_WE_EA") {
    const sum = (Number(dataValues["VOS"]) || 0) + (Number(dataValues["WI"]) || 0) + (Number(dataValues["WE"]) || 0);
    return sum > 0 ? sum : 1;
  }
  if (key === "WI_WE_EA") {
    const sum = (Number(dataValues["WI"]) || 0) + (Number(dataValues["WE"]) || 0);
    return sum > 0 ? sum : 1;
  }
  if (key === "CMI") { // Customer metering inaccuracy applies to metered volume
     const sum = (Number(dataValues["BMAC"]) || 0) + (Number(dataValues["UMAC"]) || 0);
     return sum > 0 ? sum : 1;
  }
  if (key === "SDHE") { // Systematic data handling error applies to billed volumes
     const sum = (Number(dataValues["BMAC"]) || 0) + (Number(dataValues["BUAC"]) || 0);
     return sum > 0 ? sum : 1;
  }

  // 2. Volumetric Categories (Can be safely weighted by their own volume value as they share MLD unit)
  const volumetricKeys = ["VOS", "WI", "WE", "BMAC", "BUAC", "UMAC", "UUAC", "UWW", "UC"];
  if (volumetricKeys.includes(key)) {
    const val = Number(dataValues[key]);
    if (!isNaN(val) && val > 0) return val;
  }

  // 3. Disparate Units (Cost / System Attributes / Count / Length / Pressure)
  // Categories like CRUC, VPC, Lm, Nc, Lp, and AOP must NOT be weighted by their raw values
  // to avoid arbitrary mathematical skewing based on unit scales (e.g., 10000 connections vs 50 psi).
  // We assign them a flat relative weight (1) to calculate a straight average within their sub-group.
  return 1;
}

/**
 * Compute the overall DVS score (0–100).
 *
 * @param categoryGrades  Record<string, number>  grade (0–1) per DVS categoryKey
 * @param dataValues      Record<string, any>     raw data inputs for dynamic weighting
 * @returns overall DVS score, plus per-group breakdown
 */
export function calculateDVS(
  categoryGrades: Record<string, number>,
  dataValues: Record<string, string | number> = {}
): {
  overall: number;
  breakdown: { label: string; weight: number; grade: number; weighted: number }[];
} {
  const breakdown = DVS_WEIGHTS.map(w => {
    let totalSubWeight = 0;
    let totalWeightedGrade = 0;

    w.categoryKeys.forEach(k => {
      const rawGrade = categoryGrades[k];
      if (rawGrade !== undefined) {
        // Normalize the 0-10 score from the UI back to a 0.0-1.0 scale for the math engine
        const normalizedGrade = rawGrade / 10;
        const dynamicWeight = getDynamicWeight(k, dataValues);
        totalSubWeight += dynamicWeight;
        totalWeightedGrade += (normalizedGrade * dynamicWeight);
      }
    });

    const avgGrade = totalSubWeight > 0 ? (totalWeightedGrade / totalSubWeight) : 0;

    return {
      label: w.label,
      weight: w.weight,
      grade: avgGrade,
      weighted: w.weight * avgGrade
    };
  });

  const totalWeight = breakdown.reduce((sum, b) => sum + b.weight, 0);
  const totalWeighted = breakdown.reduce((sum, b) => sum + b.weighted, 0);
  const overall = totalWeight > 0 ? (totalWeighted / totalWeight) * 100 : 0;

  return { overall, breakdown };
}

// ── KPI Calculations ─────────────────────────────────────────────

export interface KPIResults {
  dvs: number;
  nrwPercentage: number;
  revenueWaterRatio: number;
  economicalLeakageLevel: number;
  infrastructureLeakageIndex: number;
  coverageOfConnections: number;
  perCapitaWaterSupply: number;
}

/**
 * Calculate all KPIs from the raw data inputs.
 */
export function calculateKPIs(data: Record<string, number>): Omit<KPIResults, 'dvs'> {
  const vos = data["VOS"] || 0;
  const wi = data["WI"] || 0;
  const we = data["WE"] || 0;
  const systemInput = vos + wi - we;

  const bmac = data["BMAC"] || 0;
  const buac = data["BUAC"] || 0;
  const umac = data["UMAC"] || 0;
  const uuac = data["UUAC"] || 0;
  const authorizedConsumption = bmac + buac + umac + uuac;

  const billedAuthorized = bmac + buac;
  const revenueWater = billedAuthorized;
  const nrw = systemInput - revenueWater;

  const totalWaterLosses = data["TotalWaterLosses"] || (systemInput - authorizedConsumption);
  const realLosses = totalWaterLosses - (data["ApparentLosses"] || 0);

  const householdsWithConn = data["HouseholdsWithConnection"] || 0;
  const totalHouseholds = data["TotalHouseholds"] || 1;

  const waterSupplied = data["WaterSupplied"] || 0;
  const population = data["Population"] || 1;
  const daysInMonth = data["DaysInMonth"] || 30;

  const lm = data["Lm"] || 1;
  const nc = data["Nc"] || 1;
  const aop = data["AOP"] || 1;

  // NRW %
  const nrwPercentage = systemInput > 0 ? (nrw / systemInput) * 100 : 0;

  // Revenue Water Ratio
  const revenueWaterRatio = systemInput > 0 ? (revenueWater / systemInput) * 100 : 0;

  // Economical Level of Leakage (simplified: marginal cost vs control cost ratio)
  const marginalCost = data["MarginalCostWater"] || 0;
  const leakageCost = data["AnnualLeakageControlCost"] || 0;
  const economicalLeakageLevel = marginalCost > 0 ? (leakageCost / marginalCost) : 0;

  // Infrastructure Leakage Index = Current Annual Real Losses / Unavoidable Annual Real Losses
  // UARL (litres/day) = (18 × Lm + 0.8 × Nc + 25 × Lp) × AOP
  const lp = data["Lp"] || 0;
  const uarl = (18 * lm + 0.8 * nc + 25 * lp) * aop;
  const currentRealLosses = realLosses * 1000000; // MLD to litres
  const infrastructureLeakageIndex = uarl > 0 ? currentRealLosses / uarl : 0;

  // Coverage of Water Supply Connections
  const coverageOfConnections = totalHouseholds > 0
    ? (householdsWithConn / totalHouseholds) * 100
    : 0;

  // Per Capita Water Supply (litres per capita per day)
  const perCapitaWaterSupply = population > 0
    ? (waterSupplied / (population * daysInMonth))
    : 0;

  return {
    nrwPercentage: Math.round(nrwPercentage * 100) / 100,
    revenueWaterRatio: Math.round(revenueWaterRatio * 100) / 100,
    economicalLeakageLevel: Math.round(economicalLeakageLevel * 100) / 100,
    infrastructureLeakageIndex: Math.round(infrastructureLeakageIndex * 100) / 100,
    coverageOfConnections: Math.round(coverageOfConnections * 100) / 100,
    perCapitaWaterSupply: Math.round(perCapitaWaterSupply * 100) / 100,
  };
}
