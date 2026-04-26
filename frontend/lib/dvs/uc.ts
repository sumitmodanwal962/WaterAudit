import { DVSCategory } from "./types";

export const UC: DVSCategory = {
  categoryKey: "UC",
  label: "Unauthorized Consumption",
  description: "Volume of water consumed without authorization",
  inputs: [
    { key: "UC", label: "Unauthorized Consumption", description: "Volume of water consumed without authorization", type: "volume", unit: "MLD" },
  ],
  validationQuestions: [
    {
      question: "What is the default status shown in the worksheet for this data entry?",
      inputType: "select",
      options: [
        "Default used with no review",
        "Default accepted after basic check",
        "Default value modified with rough estimate",
        "Custom value entered based on available data",
        "Custom value entered based on verified data"
      ]
    },
    {
      question: "How was the information or input for unauthorized consumption collected or derived?",
      inputType: "select",
      options: [
        "Default value used (no investigation)",
        "Rough estimate based on general assumptions",
        "Estimate based on illegal connection surveys in some areas",
        "Estimate based on systematic surveys and enforcement data",
        "Derived from comprehensive anti-theft programs with measured data"
      ]
    },
    {
      question: "How effectively does the utility monitor and track unauthorized or illegal water use?",
      inputType: "select",
      options: [
        "No monitoring at all",
        "Reactive only (acts on complaints or tips)",
        "Periodic field surveys in known problem areas",
        "Regular surveillance with dedicated teams and reporting",
        "Continuous monitoring with technology (smart meters, GIS, DMA analysis) and dedicated enforcement"
      ]
    }
  ]
};
