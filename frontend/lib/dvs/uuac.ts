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
      question: "What is the default status shown in the worksheet for unbilled unmetered use?",
      inputType: "select",
      options: [
        "A system-specific volume has been provided"
      ]
    },
    {
      question: "To what extent does the utility have clarity on unbilled unmetered water use?",
      inputType: "select",
      options: [
        "Not known",
        "Some instances are known, but a full record is not available",
        "Most are identified and monitored",
        "A complete record is available"
      ]
    },
    {
      question: "What best describes the type of records the utility keeps for instances of unbilled unmetered consumption?",
      inputType: "select",
      options: [
        "Record is not available",
        "Records are available, but no complete documents are available",
        "Complete records are available"
      ]
    },
    {
      question: "What method is used to quantify the bulk of unbilled unmetered water use?",
      inputType: "select",
      options: [
        "Approximate estimation",
        "Based on a mix of approximate estimates and event-specific assessments",
        "Estimated using event counts combined with standard usage values",
        "Fully derived from individual event estimates"
      ]
    }
  ]
};
