import { DVSCategory } from "./types";

export const LM: DVSCategory = {
  categoryKey: "Lm",
  label: "Length of Mains",
  description: "Total length of water distribution mains",
  inputs: [
    { key: "Lm", label: "Length of Mains", description: "Total length of water distribution mains", type: "number", unit: "km" },
  ],
  validationQuestions: [
    {
      question: "How was the data on the length of water mains collected or calculated?",
      inputType: "select",
      options: [
        "Extracted from a field-verified and regularly updated GIS database",
        "Extracted from a GIS database",
        "Measured from updated paper maps or CAD drawings",
        "Derived from old paper maps or design drawings",
        "Rough estimate or assumed value"
      ]
    },
    {
      question: "Are fire hydrant connections and laterals included in the total length of mains?",
      inputType: "select",
      options: [
        "Yes, fully included based on measured data",
        "Yes, included based on estimates",
        "Partially included",
        "No, excluded entirely",
        "Not sure / unknown"
      ]
    },
    {
      question: "How is the record of water mains (like GIS map, asset register, or ledger) updated and maintained?",
      inputType: "select",
      options: [
        "Continuously updated in real time or near-real time",
        "Updated annually with new installations and replacements",
        "Updated periodically (every few years)",
        "Records exist but are rarely updated",
        "No records maintained"
      ]
    },
    {
      question: "How often is the mains inventory (GIS or records) verified in the field to ensure it matches actual ground conditions?",
      inputType: "select",
      options: [
        "Verified regularly on a systematic / rolling basis",
        "Verified annually on a sample basis",
        "Verified once every few years",
        "Verified only during major projects or repairs",
        "Never verified in the field"
      ]
    }
  ]
};
