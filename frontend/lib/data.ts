// Re-export everything from the modular DVS structure
// This file is kept for backward compatibility with existing imports.

export {
  DATA_INPUTS,
  VALIDATION_QUESTIONS,
  CATEGORY_MAP,
  ALL_DVS_CATEGORIES,
  SUPPLEMENTARY_INPUTS,
} from "./dvs";

export type { ValidationQuestion, DataInput, DVSCategory } from "./dvs";
