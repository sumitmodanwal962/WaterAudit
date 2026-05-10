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
      question: "In what method was the data on the length of water mains collected?",
      inputType: "select",
      options: [
        "Verified directly from mains inventory records (GIS, logbooks, and related documentation)",
        "Provisionally estimated in the absence of precise data"
      ]
    },
    {
      question: "Does the input derivation include hydrant laterals?",
      inputType: "yesno"
    },
    {
      question: "How is the record of water mains (like GIS map, asset register, or ledger) updated and maintained?",
      inputType: "select",
      options: [
        "Additions and subtractions in the mains inventory (GIS, logbooks, etc.) are recorded and updated at least annually",
        "Additions and subtractions to the mains inventory (GIS, logbooks, etc.) are recorded, but updates are performed less than annually",
        "Mains inventory (GIS, logbooks, etc.) is either not maintained or not kept up to date"
      ]
    },
    {
      question: "How often is the mains inventory (GIS or records) verified in the field to ensure it matches actual ground conditions?",
      inputType: "select",
      options: [
        "Field validation performed",
        "No field validation is performed, either during routine operations or through dedicated validation projects"
      ]
    }
  ]
};
