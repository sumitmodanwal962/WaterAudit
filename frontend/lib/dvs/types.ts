// Shared types for all DVS question files

export interface ValidationQuestion {
  question: string;
  inputType: "yesno" | "percentage" | "select" | "number" | "text";
  options?: string[];
  unit?: string;
  placeholder?: string;
}

export interface DataInput {
  key: string;
  label: string;
  description: string;
  type: "volume" | "number" | "integer" | "currency";
  unit: string;
}

export interface DVSCategory {
  categoryKey: string;
  label: string;
  description: string;
  inputs: DataInput[];
  validationQuestions: ValidationQuestion[];
}
