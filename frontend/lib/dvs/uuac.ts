import { DVSCategory } from "./types";

export const UUAC: DVSCategory = {
  categoryKey: "UUAC",
  label: "Unbilled Unmetered Authorized Consumption",
  description: "Unbilled and unmetered authorized water consumption",
  inputs: [
    { key: "UUAC", label: "Unbilled Unmetered Authorized Consumption", description: "Unbilled and unmetered authorized water consumption", type: "volume", unit: "MLD" },
  ],
  validationQuestions: [
    {
      question: "What is the default status shown in the worksheet for unbilled\u2013unmetered use?",
      inputType: "select",
      options: [
        "Default used with no review",
        "Default accepted after basic check",
        "Default value modified with rough estimate",
        "Custom value entered based on available data",
        "Custom value entered based on field-verified data"
      ]
    },
    {
      question: "How clearly does the utility understand the total amount of unbilled and unmetered water use?",
      inputType: "select",
      options: [
        "No understanding / not tracked",
        "Very rough estimate only",
        "Moderate understanding based on assumptions",
        "Good understanding based on indirect data and analysis",
        "Comprehensive understanding based on field measurements and studies"
      ]
    },
    {
      question: "What type of records or logs are maintained for unbilled and unmetered water use?",
      inputType: "select",
      options: [
        "No records maintained",
        "Informal notes only",
        "Basic log of major unbilled uses (fire fighting, flushing, etc.)",
        "Detailed log with estimated volumes per use event",
        "Comprehensive records with measured or metered volumes per event"
      ]
    },
    {
      question: "How is the unbilled and unmetered water use mainly estimated?",
      inputType: "select",
      options: [
        "Not estimated / default percentage assumed",
        "Fixed percentage of system input volume",
        "Category-based estimates (flushing, fire, construction, etc.)",
        "Estimates supported by operational data and field observations",
        "Field measurements and temporary metering campaigns"
      ]
    }
  ]
};
