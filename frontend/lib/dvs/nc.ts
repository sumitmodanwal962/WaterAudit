import { DVSCategory } from "./types";

export const NC: DVSCategory = {
  categoryKey: "Nc",
  label: "Number of Service Connections",
  description: "Total number of service connections",
  inputs: [
    { key: "Nc", label: "Number of Service Connections", description: "Total number of service connections", type: "integer", unit: "count" },
  ],
  skipRules: [
    // Q1 (idx 0): "Provisionally estimated..." (option 1) → skip Q2, Q3
    { questionIndex: 0, triggerValue: "1", skipQuestionIndices: [1, 2] },
    // Q4 (idx 3): "not maintained or not kept up to date" (option 2) → skip Q5
    { questionIndex: 3, triggerValue: "2", skipQuestionIndices: [4] },
  ],
  validationQuestions: [
    {
      question: "In what method was the information about service connections collected?",
      inputType: "select",
      options: [
        "Data extracted from service inventory records (GIS, billing system, etc.)",
        "Provisionally estimated in the absence of precise data"
      ]
    },
    {
      question: "On what data or records is the total count of service connections based?",
      inputType: "select",
      options: [
        "Ground-based data (e.g., service connections, location identifiers)",
        "Non- ground -based data (e.g., meter count, customer count)",
        "Uncertain or not verified"
      ]
    },
    {
      question: "Does the input account for inactive service lines that remain pressurized, regardless of whether they are metered or not metered?",
      inputType: "yesno"
    },
    {
      question: "How is the record of service connections (like GIS, billing data, or registers) updated and maintained?",
      inputType: "select",
      options: [
        "Changes to the service line inventory (GIS, billing system, etc.) are recorded and updated at least annually",
        "Changes to the service line inventory (GIS, billing system, etc.) are recorded, but updates occur less than once a year",
        "Service line inventory (GIS, billing system, etc.) is either not maintained or not kept up to date"
      ]
    },
    {
      question: "How often is the service connection inventory (GIS or records) verified in the field to ensure it matches actual site conditions?",
      inputType: "select",
      options: [
        "Field validation is conducted across the entire system, through routine operations or dedicated validation projects",
        "Field validation is performed for a portion of the system, either during routine operations or through dedicated validation projects",
        "No field validation is performed"
      ]
    }
  ]
};
