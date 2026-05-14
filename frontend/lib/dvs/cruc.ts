import { DVSCategory } from "./types";

export const CRUC: DVSCategory = {
  categoryKey: "CRUC",
  label: "Customer Retail Unit Charge",
  description: "Average retail charge per unit of water",
  inputs: [
    { key: "CRUC", label: "Customer Retail Unit Charge", description: "Average retail charge per unit of water", type: "currency", unit: "INR/MLD" },
  ],
  skipRules: [
    // Q1 (idx 0): "No" → skip Q2-Q5
    { questionIndex: 0, triggerValue: "no", skipQuestionIndices: [1, 2, 3, 4] },
  ],
  validationQuestions: [
    {
      question: "Was customer water consumption billed based on actual meter readings during the audit year?",
      inputType: "yesno",
      weight: 0,
      scores: [10, 1]
    },
    {
      question: "How accurately and effectively is the current rate structure being used?",
      inputType: "select",
      options: [
        "Customer bill calculations have been verified to ensure correct implementation of the prescribed rate structure",
        "Customer bill calculations have not been verified to ensure compliance with the prescribed rate structure"
      ],
      weight: 25,
      scores: [10, 0]
    },
    {
      question: "Select the option that best explains how the input was derived.",
      inputType: "select",
      options: [
        "A volume-weighted average of all applicable rates was calculated",
        "The rate structure consists of a single volumetric rate, which was used for this input",
        "A simple average of multiple rates was calculated",
        "The rate structure includes multiple volumetric rates, but only a single rate was applied for this input",
        "Provisionally estimated in the absence of precise data"
      ],
      weight: 35,
      scores: [10, 10, 6, 4, 1]
    },
    {
      question: "Does the utility receive any other volume-based revenue linked to water meter readings, such as sewer charges?",
      inputType: "select",
      options: [
        "No",
        "Yes, and the information has been factored into the volume-weighted average calculation",
        "Yes, but it has not been included in the volume-weighted average calculation"
      ],
      weight: 20,
      scores: [10, 10, 2]
    },
    {
      question: "Has someone with CPHEEO manual expertise reviewed the input derivation?",
      inputType: "yesno",
      weight: 20,
      scores: [10, 0]
    }
  ]
};
