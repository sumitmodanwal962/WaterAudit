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
        "Comprehensive field-verified database",
        "Cross-referenced billing, GIS, and field data",
        "Extracted from current billing system",
        "Derived from old billing records",
        "Rough estimate or assumed value"
      ]
    },
    {
      question: "On what data or records is the total count of service connections based?",
      inputType: "select",
      options: [
        "Field-verified GIS with complete asset register",
        "GIS database with billing cross-reference",
        "Billing + connection application records",
        "Billing records only",
        "Rough departmental estimate"
      ]
    },
    {
      question: "Are inactive (but still connected or pressurized) service lines included in the count? (These could be metered or unmetered.)",
      inputType: "select",
      options: [
        "Yes, fully included based on verified records",
        "Yes, included based on estimates",
        "Partially included",
        "No, only active connections counted",
        "Unknown / not tracked"
      ]
    },
    {
      question: "How is the record of service connections (like GIS, billing data, or registers) updated and maintained?",
      inputType: "select",
      options: [
        "Continuously updated in real time or near-real time",
        "Updated annually with new and decommissioned connections",
        "Updated periodically (every few years)",
        "Records exist but rarely updated",
        "No systematic records"
      ]
    },
    {
      question: "How often is the service connection inventory (GIS or records) verified in the field to ensure it matches actual site conditions?",
      inputType: "select",
      options: [
        "Verified regularly on a systematic / rolling basis",
        "Verified annually on a sample basis",
        "Verified once every few years",
        "Verified only during major projects",
        "Never verified in the field"
      ]
    }
  ]
};
