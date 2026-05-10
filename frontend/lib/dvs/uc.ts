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
        "Custom value entered based on verified data",
        "Custom value entered based on available data",
        "Default value modified with rough estimate",
        "Default accepted after basic check",
        "Default used with no review"
      ]
    },
    {
      question: "How was the information or input for unauthorized consumption collected or derived?",
      inputType: "select",
      options: [
        "Derived from comprehensive anti-theft programs with measured data",
        "Estimate based on systematic surveys and enforcement data",
        "Estimate based on illegal connection surveys in some areas",
        "Rough estimate based on general assumptions",
        "Default value used (no investigation)"
      ]
    },
    {
      question: "How effectively does the utility monitor and track unauthorized or illegal water use?",
      inputType: "select",
      options: [
        "Continuous monitoring with technology (smart meters, GIS, DMA analysis) and dedicated enforcement",
        "Regular surveillance with dedicated teams and reporting",
        "Periodic field surveys in known problem areas",
        "Reactive only (acts on complaints or tips)",
        "No monitoring at all"
      ]
    }
  ]
};
