import { DVSCategory } from "./types";

export const BMAC: DVSCategory = {
  categoryKey: "BMAC",
  label: "Billed Metered Authorized Consumption",
  description: "Billed and metered authorized water consumption",
  inputs: [
    { key: "BMAC", label: "Billed Metered Authorized Consumption", description: "Billed and metered authorized water consumption", type: "volume", unit: "MLD" },
  ],
  validationQuestions: [
    {
      question: "Were any customers provided metered water connections during the audit year?",
      inputType: "yesno"
    },
    {
      question: "For billed and metered consumers, what percentage of bills are based on actual meter readings in a normal billing cycle?",
      inputType: "percentage"
    },
    {
      question: "How often does the utility take meter readings from its customers?",
      inputType: "select",
      options: [
        "Annually or less frequently",
        "Half-yearly",
        "Quarterly",
        "Bi-monthly",
        "Monthly or more frequently"
      ]
    },
    {
      question: "If there are different meter reading schedules, what is the most common frequency for most customers?",
      inputType: "select",
      options: [
        "Annually or less frequently",
        "Half-yearly",
        "Quarterly",
        "Bi-monthly",
        "Monthly or more frequently"
      ]
    },
    {
      question: "Is the BMAC volume adjusted so that it accurately represents water consumption during the audit year?",
      inputType: "select",
      options: [
        "No adjustment made",
        "Minor adjustment using rough estimates",
        "Adjusted using average consumption factors",
        "Adjusted using pro-rata calculations for each billing cycle",
        "Precisely adjusted using actual daily / monthly meter data"
      ]
    },
    {
      question: "How often do utility staff conduct internal reviews of the BMAC data?",
      inputType: "select",
      options: [
        "No internal reviews",
        "Only when discrepancies are reported",
        "Annually",
        "Quarterly",
        "Monthly or more frequently"
      ]
    },
    {
      question: "What level of detail is checked during the internal review of BMAC data?",
      inputType: "select",
      options: [
        "No review performed",
        "Only totals are verified",
        "Totals and sample accounts are checked",
        "Detailed check of major consumer categories",
        "Comprehensive account-level audit with statistical sampling"
      ]
    },
    {
      question: "When was the last billing data review conducted by a person who is independent of the utility\u2019s billing team?",
      inputType: "select",
      options: [
        "Never conducted",
        "More than 5 years ago",
        "Within the last 3\u20135 years",
        "Within the last 1\u20132 years",
        "Within the last 12 months"
      ]
    },
    {
      question: "What level of detail was covered in that independent review of billing data?",
      inputType: "select",
      options: [
        "No independent review conducted",
        "Only summary-level totals reviewed",
        "Sample-based review of selected accounts",
        "Detailed review of major consumer categories and anomalies",
        "Full account-level forensic audit with documented findings"
      ]
    }
  ]
};
