import { DVSCategory } from "./types";

export const BUAC: DVSCategory = {
  categoryKey: "BUAC",
  label: "Billed Unmetered Authorized Consumption",
  description: "Billed but unmetered authorized water consumption",
  inputs: [
    { key: "BUAC", label: "Billed Unmetered Authorized Consumption", description: "Billed but unmetered authorized water consumption", type: "volume", unit: "MLD" },
  ],
  validationQuestions: [
    {
      question: "Was there any billed water used for consumers without meters during the audit year?",
      inputType: "yesno"
    },
    {
      question: "What percentage of billed consumers do not have water meters (based on number of connections)?",
      inputType: "percentage"
    },
    {
      question: "What method is used to calculate or estimate water use for unmetered consumers?",
      inputType: "select",
      options: [
        "No estimation method used",
        "Flat-rate assumption (same for all consumers)",
        "Category-based per-capita norms (residential, commercial, etc.)",
        "Estimates derived from comparable metered consumer data",
        "Field-verified estimates using temporary metering or surveys"
      ]
    },
    {
      question: "How often is water consumption for unmetered consumers estimated or updated?",
      inputType: "select",
      options: [
        "Never updated after initial estimate",
        "Updated only when major changes occur",
        "Updated annually",
        "Updated semi-annually",
        "Updated quarterly or more frequently"
      ]
    }
  ]
};
