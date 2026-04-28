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
    categoryKeys: ["VOS_WI_WE", "VOS_WI_WE_EA", "WI_WE_EA"]
  },
  {
    category: "metering",
    label: "Customer Metering Data",
    weight: 0.30,
    categoryKeys: ["CMI", "CRUC"]
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

/**
 * Grades each category based on the number of questions answered
 * and how "good" the answers are (higher option index = better).
 *
 * @param answers  Record<categoryKey, number[]>  — array of selected option indices per category
 *                 Each value is the 0-based index of the chosen option.
 *                 Higher index = better practice/confidence.
 * @param maxOptions Record<categoryKey, number[]> — max option count per question per category
 * @returns Grade 0–1 for each category
 */
export function gradeCategory(
  selectedIndices: number[],
  maxOptionCounts: number[]
): number {
  if (selectedIndices.length === 0) return 0;

  let totalScore = 0;
  let totalMax = 0;

  for (let i = 0; i < selectedIndices.length; i++) {
    const maxIdx = (maxOptionCounts[i] || 1) - 1; // max possible index
    totalScore += selectedIndices[i];
    totalMax += maxIdx;
  }

  return totalMax > 0 ? totalScore / totalMax : 0;
}

/**
 * Compute the overall DVS score (0–100).
 *
 * @param categoryGrades  Record<string, number>  grade (0–1) per DVS categoryKey
 * @returns overall DVS score, plus per-group breakdown
 */
export function calculateDVS(categoryGrades: Record<string, number>): {
  overall: number;
  breakdown: { label: string; weight: number; grade: number; weighted: number }[];
} {
  const breakdown = DVS_WEIGHTS.map(w => {
    // Average grade across all sub-categories in this weight group
    const grades = w.categoryKeys
      .map(k => categoryGrades[k])
      .filter(g => g !== undefined);

    const avgGrade = grades.length > 0
      ? grades.reduce((a, b) => a + b, 0) / grades.length
      : 0;

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
