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
        "Rough estimate or assumed value",
        "Derived from old paper maps or design drawings",
        "Measured from updated paper maps or CAD drawings",
        "Extracted from a GIS database",
        "Extracted from a field-verified and regularly updated GIS database"
      ]
    },
    {
      question: "Are fire hydrant connections and laterals included in the total length of mains?",
      inputType: "select",
      options: [
        "Not sure / unknown",
        "No, excluded entirely",
        "Partially included",
        "Yes, included based on estimates",
        "Yes, fully included based on measured data"
      ]
    },
    {
      question: "How is the record of water mains (like GIS map, asset register, or ledger) updated and maintained?",
      inputType: "select",
      options: [
        "No records maintained",
        "Records exist but are rarely updated",
        "Updated periodically (every few years)",
        "Updated annually with new installations and replacements",
        "Continuously updated in real time or near-real time"
      ]
    },
    {
      question: "How often is the mains inventory (GIS or records) verified in the field to ensure it matches actual ground conditions?",
      inputType: "select",
      options: [
        "Never verified in the field",
        "Verified only during major projects or repairs",
        "Verified once every few years",
        "Verified annually on a sample basis",
        "Verified regularly on a systematic / rolling basis"
      ]
    }
  ]
};
