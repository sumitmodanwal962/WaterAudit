import { DVSCategory } from "./types";

export const NC: DVSCategory = {
  categoryKey: "Nc",
  label: "Number of Service Connections",
  description: "Total number of service connections",
  inputs: [
    { key: "Nc", label: "Number of Service Connections", description: "Total number of service connections", type: "integer", unit: "count" },
  ],
  validationQuestions: [
    {
      question: "How was the information about service connections collected or calculated?",
      inputType: "select",
      options: [
        "Rough estimate or assumed value",
        "Derived from old billing records",
        "Extracted from current billing system",
        "Cross-referenced billing, GIS, and field data",
        "Comprehensive field-verified database"
      ]
    },
    {
      question: "On what data or records is the total count of service connections based?",
      inputType: "select",
      options: [
        "Rough departmental estimate",
        "Billing records only",
        "Billing + connection application records",
        "GIS database with billing cross-reference",
        "Field-verified GIS with complete asset register"
      ]
    },
    {
      question: "Are inactive (but still connected or pressurized) service lines included in the count? (These could be metered or unmetered.)",
      inputType: "select",
      options: [
        "Unknown / not tracked",
        "No, only active connections counted",
        "Partially included",
        "Yes, included based on estimates",
        "Yes, fully included based on verified records"
      ]
    },
    {
      question: "How is the record of service connections (like GIS, billing data, or registers) updated and maintained?",
      inputType: "select",
      options: [
        "No systematic records",
        "Records exist but rarely updated",
        "Updated periodically (every few years)",
        "Updated annually with new and decommissioned connections",
        "Continuously updated in real time or near-real time"
      ]
    },
    {
      question: "How often is the service connection inventory (GIS or records) verified in the field to ensure it matches actual site conditions?",
      inputType: "select",
      options: [
        "Never verified in the field",
        "Verified only during major projects",
        "Verified once every few years",
        "Verified annually on a sample basis",
        "Verified regularly on a systematic / rolling basis"
      ]
    }
  ]
};
