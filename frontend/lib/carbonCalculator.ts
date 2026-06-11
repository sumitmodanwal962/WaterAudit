// ── Carbon Footprint Calculation Engine ──────────────────────────
//
// Calculates the carbon footprint of a water utility based on the
// Energy–Water–Carbon Nexus framework (GHG Protocol).
//
// Scope 1: Direct emissions (diesel/fuel combustion)
// Scope 2: Indirect energy emissions (grid electricity)
// Scope 3: Embedded emissions (treatment chemicals)
//
// All emission factors are based on published sources:
//   - Grid: CEA India 2024-25 (0.710 kgCO₂/kWh)
//   - Diesel: IPCC default (2.68 kgCO₂/litre)
//   - Chlorine: Municipal reporting (1.08 kgCO₂e/kg)
//   - Alum: Industry literature (0.70 kgCO₂e/kg)

// ── Default Emission Factors ─────────────────────────────────────

/** India CEA 2024-25 grid emission factor */
export const DEFAULT_GRID_EMISSION_FACTOR = 0.710; // kgCO₂/kWh

/** IPCC diesel combustion emission factor */
export const DIESEL_EMISSION_FACTOR = 2.68; // kgCO₂/litre

/** Chlorine manufacturing emission factor */
export const CHLORINE_EMISSION_FACTOR = 1.08; // kgCO₂e/kg

/** Alum/coagulant manufacturing emission factor */
export const ALUM_EMISSION_FACTOR = 0.70; // kgCO₂e/kg

// ── Result Interface ─────────────────────────────────────────────

export interface CarbonFootprintResults {
  // Scope breakdown (kgCO₂/year)
  scope1: number;          // Direct emissions (diesel)
  scope2: number;          // Indirect energy (electricity)
  scope3: number;          // Embedded (chemicals)
  totalKg: number;         // Total in kg CO₂/year
  totalTonnes: number;     // Total in tonnes CO₂/year

  // Normalized metrics
  carbonPerMLD: number;          // kgCO₂ per MLD processed
  carbonPerCapita: number;       // kgCO₂ per person served per year
  carbonOfWaterLosses: number;   // kgCO₂ wasted due to NRW
  energyIntensity: number;       // kWh per MLD (energy efficiency)

  // Flags for what data was available
  hasElectricity: boolean;
  hasDiesel: boolean;
  hasRenewable: boolean;
  hasChemicals: boolean;
  hasAnyData: boolean;
}

// ── Calculator Function ──────────────────────────────────────────

/**
 * Calculate the carbon footprint of a water utility from audit data.
 *
 * Uses whatever data is available — if only electricity is provided,
 * Scope 1 and Scope 3 will be zero. All optional fields gracefully
 * default to zero.
 */
export function calculateCarbonFootprint(
  data: Record<string, number>
): CarbonFootprintResults {
  // ── Extract values (default to 0 if not provided) ────────────
  const electricityKwh = data["AnnualElectricityKwh"] || 0;
  const dieselLitres = data["AnnualDieselLitres"] || 0;
  const renewableKwh = data["RenewableEnergyKwh"] || 0;
  const chlorineKg = data["ChlorineUsageKg"] || 0;
  const alumKg = data["AlumUsageKg"] || 0;

  // Water balance volumes (already in the audit)
  const vos = data["VOS"] || 0;
  const wi = data["WI"] || 0;
  const systemInputVolume = vos + wi; // MLD
  const totalWaterLosses = data["TotalWaterLosses"] || 0; // MLD
  const population = data["Population"] || 0;

  // ── Flags ────────────────────────────────────────────────────
  const hasElectricity = electricityKwh > 0;
  const hasDiesel = dieselLitres > 0;
  const hasRenewable = renewableKwh > 0;
  const hasChemicals = chlorineKg > 0 || alumKg > 0;
  const hasAnyData = hasElectricity || hasDiesel || hasChemicals;


  // Grid emission factor (user override or default)
  const gridFactor = data["GridEmissionFactor"] || DEFAULT_GRID_EMISSION_FACTOR;

  // ── Scope 2: Grid electricity (minus renewables) ─────────────
  const netElectricity = Math.max(0, electricityKwh - renewableKwh);
  const scope2 = netElectricity * gridFactor;

  // ── Scope 1: Diesel combustion ───────────────────────────────
  const scope1 = dieselLitres * DIESEL_EMISSION_FACTOR;

  // ── Scope 3: Treatment chemicals ─────────────────────────────
  const scope3 =
    (chlorineKg * CHLORINE_EMISSION_FACTOR) +
    (alumKg * ALUM_EMISSION_FACTOR);

  // ── Totals ───────────────────────────────────────────────────
  const totalKg = scope1 + scope2 + scope3;
  const totalTonnes = totalKg / 1000;

  // ── Normalized metrics ───────────────────────────────────────
  // Annual volume processed = SIV (MLD) × 365 days
  const annualVolumeMLD = systemInputVolume * 365;

  const carbonPerMLD = annualVolumeMLD > 0
    ? totalKg / annualVolumeMLD
    : 0;

  const carbonPerCapita = population > 0
    ? totalKg / population
    : 0;

  // Carbon of water losses = proportion of total carbon attributable to lost water
  const lossRatio = (systemInputVolume > 0 && totalWaterLosses > 0)
    ? totalWaterLosses / systemInputVolume
    : 0;
  const carbonOfWaterLosses = totalKg * lossRatio;

  // Energy intensity = kWh per MLD of water processed
  const energyIntensity = annualVolumeMLD > 0
    ? electricityKwh / annualVolumeMLD
    : 0;

  return {
    scope1: Math.round(scope1 * 100) / 100,
    scope2: Math.round(scope2 * 100) / 100,
    scope3: Math.round(scope3 * 100) / 100,
    totalKg: Math.round(totalKg * 100) / 100,
    totalTonnes: Math.round(totalTonnes * 100) / 100,
    carbonPerMLD: Math.round(carbonPerMLD * 100) / 100,
    carbonPerCapita: Math.round(carbonPerCapita * 100) / 100,
    carbonOfWaterLosses: Math.round(carbonOfWaterLosses * 100) / 100,
    energyIntensity: Math.round(energyIntensity * 100) / 100,
    hasElectricity,
    hasDiesel,
    hasRenewable,
    hasChemicals,
    hasAnyData,
  };
}
