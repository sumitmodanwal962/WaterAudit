import { DVSCategory } from "./types";

export const UMAC: DVSCategory = {
  categoryKey: "UMAC",
  label: "Unbilled Metered Authorized Consumption",
  description: "Unbilled but metered authorized water consumption",
  inputs: [
    { key: "UMAC", label: "Unbilled Metered Authorized Consumption", description: "Unbilled but metered authorized water consumption", type: "volume", unit: "MLD" },
  ],
  skipRules: [
    { questionIndex: 0, triggerValue: "no", skipQuestionIndices: [1, 2, 3, 4] },
  ],
  validationQuestions: [
    {
      question: "Were there any metered connections where water use went unbilled during the audit year?",
      inputType: "yesno"
    },
    {
      question: "Is there a formal utility policy that identifies which metered connections are exempt from billing?",
      inputType: "yesno"
    },
    {
      question: "What is the number of metered connections for which water use is not billed?",
      inputType: "select",
      options: [
        "Checked based on total availability",
        "Projected based on total availability",
        "Not known"
      ]
    },
    {
      question: "What is the usual frequency of meter readings for unbilled consumers?",
      inputType: "select",
      options: [
        "Regularly",
        "Monthly",
        "Once two months",
        "Quarterly",
        "Semi-annually",
        "Annually"
      ]
    },
    {
      question: "How frequently are meter readings for unbilled consumers reviewed for potential errors?",
      inputType: "select",
      options: [
        "Monthly",
        "Once three months",
        "Semi-annually",
        "Annually",
        "Once two years",
        "No verification done"
      ]
    }
  ]
};
