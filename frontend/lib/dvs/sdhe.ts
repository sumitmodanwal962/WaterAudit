import { DVSCategory } from "./types";

export const SDHE: DVSCategory = {
  categoryKey: "SDHE",
  label: "Systematic Data Handling Error",
  description: "Adjustments related to data handling and reporting errors",
  inputs: [
    { key: "SDHE", label: "Systematic Data Handling Errors", description: "Adjustments related to data handling and reporting errors", type: "volume", unit: "MLD" },
  ],
  validationQuestions: [
    {
      question: "What is the default status shown in the worksheet for this data entry?",
      inputType: "select",
      options: [
        "Default is applied as the custom field was chosen without entering a value"
      ]
    },
    {
      question: "How was the input data generated or calculated?",
      inputType: "select",
      options: [
        "Estimated through account-level analysis undertaken to identify inaccuracies in unbilled consumption",
        "Estimated based on field-identified cases of unrecorded unbilled consumption",
        "Estimated"
      ]
    },
    {
      question: "What kind of checks or validations are done in the billing software to ensure correct unit conversions between meter readings and billing units?",
      inputType: "select",
      options: [
        "All meter multipliers have been analyzed to confirm multiplier conversion in the billing system is correct",
        "Meter multipliers were sampled and checked to ensure that their conversion factors are correctly applied within the billing system",
        "None"
      ]
    },
    {
      question: "What is the utility\u2019s policy to ensure that new water connections start being metered and billed without any delay?",
      inputType: "select",
      options: [
        "The policy is well established and consistently followed across operations",
        "The policy is clearly defined, but its implementation is inconsistent",
        "A policy is in place, but lacks clarity",
        "No policy has been established"
      ]
    },
    {
      question: "What steps of auditing or review are carried out for the billing process?",
      inputType: "select",
      options: [
        "A comprehensive review addressing stuck meters, prolonged estimations, and incorrect multiplier coding was completed within two years prior to the audit",
        "A comprehensive assessment addressing stuck meters, prolonged estimations, and incorrect multiplier coding was completed within five years preceding the audit",
        "An annual review of billing data is undertaken to detect routine errors, but a focused assessment of potential systematic data-handling issues has not yet been carried out",
        "None"
      ]
    }
  ]
};
