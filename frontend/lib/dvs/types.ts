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

export interface SkipRule {
  /** Index of the question whose answer triggers the skip */
  questionIndex: number;
  /** The answer value that triggers the skip (e.g. "no" for yesno, or option index "5" for select) */
  triggerValue: string;
  /** Indices of questions to hide when triggered */
  skipQuestionIndices: number[];
}

export interface DVSCategory {
  categoryKey: string;
  label: string;
  description: string;
  inputs: DataInput[];
  validationQuestions: ValidationQuestion[];
  /** Conditional skip rules — hide certain questions based on answers to others */
  skipRules?: SkipRule[];
}
