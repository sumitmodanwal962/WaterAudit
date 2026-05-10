// Barrel export — all DVS categories and shared types

export type { ValidationQuestion, DataInput, DVSCategory } from "./types";
export { calculateDVS, calculateKPIs, gradeCategory, DVS_WEIGHTS } from "./calculator";
export type { DVSCategoryWeight, KPIResults } from "./calculator";

export { VOS_WI_WE } from "./vos-wi-we";
export { VOS_WI_WE_EA } from "./vos-wi-we-ea";
export { WI_WE_EA } from "./wi-we-ea";
export { BMAC } from "./bmac";
export { BUAC } from "./buac";
export { UMAC } from "./umac";
export { UUAC } from "./uuac";
export { SDHE } from "./sdhe";
export { CMI } from "./cmi";
export { UC } from "./uc";
export { LM } from "./lm";
export { NC } from "./nc";
export { LP } from "./lp";
export { AOP } from "./aop";
export { CRUC } from "./cruc";
export { UWW } from "./uww";

// ── Convenience aggregates used by the data-input page ──────────

import { VOS_WI_WE } from "./vos-wi-we";
import { VOS_WI_WE_EA } from "./vos-wi-we-ea";
import { WI_WE_EA } from "./wi-we-ea";
import { BMAC } from "./bmac";
import { BUAC } from "./buac";
import { UMAC } from "./umac";
import { UUAC } from "./uuac";
import { SDHE } from "./sdhe";
import { CMI } from "./cmi";
import { UC } from "./uc";
import { LM } from "./lm";
import { NC } from "./nc";
import { LP } from "./lp";
import { AOP } from "./aop";
import { CRUC } from "./cruc";
import { UWW } from "./uww";
import { DVSCategory, DataInput, ValidationQuestion } from "./types";

/** Ordered list of all DVS categories */
export const ALL_DVS_CATEGORIES: DVSCategory[] = [
  VOS_WI_WE,
  VOS_WI_WE_EA,
  WI_WE_EA,
  BMAC,
  BUAC,
  UMAC,
  UUAC,
  SDHE,
  CMI,
  UC,
  LM,
  NC,
  LP,
  AOP,
  CRUC,
  UWW,
];

/** Flat list of all data inputs (from all categories) */
export const ALL_DATA_INPUTS: DataInput[] = ALL_DVS_CATEGORIES.flatMap(c => c.inputs);

/** Look up validation questions by category key */
export const VALIDATION_QUESTIONS: Record<string, ValidationQuestion[]> = Object.fromEntries(
  ALL_DVS_CATEGORIES.map(c => [c.categoryKey, c.validationQuestions])
);

/** Map each individual input key → its parent category key */
export const CATEGORY_MAP: Record<string, string> = Object.fromEntries(
  ALL_DVS_CATEGORIES.flatMap(c =>
    c.inputs.map(inp => [inp.key, c.categoryKey])
  )
);

/** Non-categorized supplementary inputs (no validation questions) */
export const SUPPLEMENTARY_INPUTS: DataInput[] = [
  { key: "SCDensity", label: "Service Connection Density", description: "Number of service connections per km of mains", type: "number", unit: "connections/km" },
  { key: "RealLossesPerConnection", label: "Volume of Real Losses", description: "Real losses per connection per day", type: "number", unit: "litres/connection/day" },
  { key: "MarginalCostWater", label: "Marginal Cost of Water Production", description: "Cost of producing one additional unit of water (power, chemicals, labour)", type: "currency", unit: "INR/MLD" },
  { key: "AnnualLeakageControlCost", label: "Annual Cost of Leakage Control", description: "Annual cost for DMA establishment, leakage detection, and O&M", type: "currency", unit: "INR" },
  { key: "TotalWaterLosses", label: "Total Water Losses", description: "Total water losses in the distribution system", type: "volume", unit: "MLD" },
  { key: "ApparentLosses", label: "Apparent Losses", description: "Losses due to meter inaccuracies, unauthorized consumption, and data errors", type: "volume", unit: "MLD" },
  { key: "VPC", label: "Variable Production Cost", description: "Variable cost of producing one unit of water", type: "currency", unit: "INR/MLD" },
  { key: "HouseholdsWithConnection", label: "Households With Direct Connection", description: "Total households that have direct water supply connections", type: "integer", unit: "count" },
  { key: "TotalHouseholds", label: "Total Households in Service Area", description: "Total households in the service area", type: "integer", unit: "count" },
  { key: "WaterSupplied", label: "Water Supplied to Network", description: "Total water supplied to the distribution system", type: "volume", unit: "litres" },
  { key: "DaysInMonth", label: "Number of Days in Month", description: "Number of days used for monthly calculations", type: "integer", unit: "days" },
  { key: "Population", label: "Population Served", description: "Total population served by the water utility", type: "integer", unit: "count" },
  { key: "MeteredDirectConnections", label: "Metered Direct Connections", description: "Number of metered direct service connections", type: "integer", unit: "count" },
  { key: "MeteredPublicStandposts", label: "Metered Public Standposts", description: "Number of metered public standposts", type: "integer", unit: "count" },
  { key: "TotalDirectConnections", label: "Total Direct Connections", description: "Total number of direct service connections", type: "integer", unit: "count" },
  { key: "TotalMeteredDirectConnections", label: "Total Metered Direct Service Connections", description: "Total number of direct service connections that are metered", type: "integer", unit: "count" },
  { key: "WaterQualitySamples", label: "Water Quality Samples Meeting Standards", description: "Number of samples meeting potable water standards in the month", type: "integer", unit: "count" },
  { key: "TotalComplaints", label: "Total Water Supply Complaints", description: "Total number of water supply related complaints received per month", type: "integer", unit: "count" },
  { key: "ComplaintsRedressed", label: "Complaints Redressed", description: "Total number of complaints redressed within the month", type: "integer", unit: "count" },
  { key: "AnnualRevenues", label: "Total Annual Operating Revenues", description: "Total operating revenues of the utility for the year", type: "currency", unit: "INR" },
  { key: "AnnualExpenses", label: "Total Annual Operating Expenses", description: "Total operating expenses of the utility", type: "currency", unit: "INR" },
  { key: "CurrentRevenuesCollected", label: "Current Revenues Collected", description: "Revenue actually collected during the year", type: "currency", unit: "INR" },
  { key: "TotalRevenuesBilled", label: "Total Revenues Billed", description: "Total revenue billed during the year", type: "currency", unit: "INR" },
  { key: "HoursPerDay", label: "Average Hours of Water Supply Per Day", description: "Average number of supply hours per day", type: "number", unit: "hours/day" },
];

/** Combined flat list: categorized inputs first, then supplementary */
export const DATA_INPUTS: DataInput[] = [...ALL_DATA_INPUTS, ...SUPPLEMENTARY_INPUTS];
