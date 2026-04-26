import { DVSCategory } from "./types";

export const SDHE: DVSCategory = {
  categoryKey: "SDHE",
  label: "Systematic Data Handling Errors",
  description: "Adjustments related to data handling and reporting errors",
  inputs: [
    { key: "SDHE", label: "Systematic Data Handling Errors", description: "Adjustments related to data handling and reporting errors", type: "volume", unit: "MLD" },
  ],
  validationQuestions: [
    {
      question: "What is the default status shown in the worksheet for this data entry?",
      inputType: "select",
      options: [
        "Default used with no review",
        "Default accepted after basic check",
        "Default value modified with rough estimate",
        "Custom value entered based on available data",
        "Custom value entered based on verified data"
      ]
    },
    {
      question: "How was the input data generated or calculated?",
      inputType: "select",
      options: [
        "Default value used (no calculation)",
        "Rough estimate based on experience / assumption",
        "Calculated from billing system summary reports",
        "Calculated from detailed billing data analysis",
        "Derived from comprehensive metering and billing system audit"
      ]
    },
    {
      question: "What kind of checks or validations are done in the billing software to ensure correct unit conversions between meter readings and billing units?",
      inputType: "select",
      options: [
        "No automated checks exist",
        "Manual spot-checks by billing staff",
        "Basic automated validation (range checks only)",
        "Automated validation with exception reporting and manual review",
        "Full automated validation with audit trail and regular third-party review"
      ]
    },
    {
      question: "What is the utility\u2019s policy to ensure that new water connections start being metered and billed without any delay?",
      inputType: "select",
      options: [
        "No policy exists",
        "Policy exists but not enforced",
        "Policy exists with occasional compliance checks",
        "Policy exists with regular monitoring and reporting",
        "Strict policy with automated tracking and zero-delay billing activation"
      ]
    },
    {
      question: "What type of auditing or review is carried out for the billing process?",
      inputType: "select",
      options: [
        "No auditing or review",
        "Internal review only when issues are reported",
        "Periodic internal review (annual or less)",
        "Regular internal audit (quarterly or more) with documented findings",
        "Independent external audit with documented findings and corrective actions"
      ]
    }
  ]
};
