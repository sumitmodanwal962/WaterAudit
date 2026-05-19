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
      question: "To what extent does the utility have clarity on unbilled unmetered water use?",
      inputType: "select",
      options: [
        "A complete record is available",
        "Most are identified and monitored",
        "Some instances are known, but a full record is not available",
        "Not known"
      ],
      weight: 30,
      scores: [10, 7, 3, 0]
    },
    {
      question: "What best describes the type of records the utility keeps for instances of unbilled unmetered consumption?",
      inputType: "select",
      options: [
        "Complete records are available",
        "Records are available, but no complete documents are available",
        "Record is not available"
      ],
      weight: 30,
      scores: [10, 5, 0]
    },
    {
      question: "What method is used to quantify the bulk of unbilled unmetered water use?",
      inputType: "select",
      options: [
        "Fully derived from individual event estimates",
        "Estimated using event counts combined with standard usage values",
        "Based on a mix of approximate estimates and event-specific assessments",
        "Approximate estimation"
      ],
      weight: 40,
      scores: [10, 8, 5, 2]
    }
  ]
};
