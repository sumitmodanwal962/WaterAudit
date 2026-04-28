import { DVSCategory } from "./types";

export const UMAC: DVSCategory = {
  categoryKey: "UMAC",
  label: "Unbilled Metered Authorized Consumption",
  description: "Unbilled but metered authorized water consumption",
  inputs: [
    { key: "UMAC", label: "Unbilled Metered Authorized Consumption", description: "Unbilled but metered authorized water consumption", type: "volume", unit: "MLD" },
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
        "Not known",
        "Projected based on total availability",
        "Checked based on total availability"
      ]
    },
    {
      question: "What is the usual frequency of meter readings for unbilled consumers?",
      inputType: "select",
      options: [
        "Annually",
        "Semi-annually",
        "Quarterly",
        "Once two months",
        "Monthly",
        "Regularly"
      ]
    },
    {
      question: "How frequently are meter readings for unbilled consumers reviewed for potential errors?",
      inputType: "select",
      options: [
        "No verification done",
        "Once two years",
        "Annually",
        "Semi-annually",
        "Once three months",
        "Monthly"
      ]
    }
  ]
};
