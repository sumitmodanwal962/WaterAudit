import { DVSCategory } from "./types";

export const CRUC: DVSCategory = {
  categoryKey: "CRUC",
  label: "Customer Retail Unit Charge",
  description: "Average retail charge per unit of water",
  inputs: [
    { key: "CRUC", label: "Customer Retail Unit Charge", description: "Average retail charge per unit of water", type: "currency", unit: "INR/MLD" },
  ],
  validationQuestions: [
    {
      question: "Was any metered consumption billed on a volumetric basis in the audit period?",
      inputType: "yesno"
    },
    {
      question: "Which best describes the use and reliability of the current rate structure?",
      inputType: "select",
      options: [
        "No volumetric tariff \u2014 flat rate only",
        "Volumetric tariff exists but is outdated or inconsistently applied",
        "Volumetric tariff applied for most customers but with known gaps",
        "Volumetric tariff reliably applied for all metered customers",
        "Volumetric tariff with regular revision, fully applied and audited"
      ]
    },
    {
      question: "Choose the option that best describes how the input was derived.",
      inputType: "select",
      options: [
        "Default or assumed value",
        "Rough estimate from total revenue \u00F7 total billed volume",
        "Calculated from billing summary reports",
        "Calculated from detailed billing data with tariff slab analysis",
        "Derived from audited financial records with independent verification"
      ]
    },
    {
      question: "Is there any additional volumetric revenue the utility receives that depends on water meter readings, such as sewer?",
      inputType: "select",
      options: [
        "Unknown",
        "No additional volumetric revenue",
        "Yes, but not tracked separately",
        "Yes, tracked but not included in audit",
        "Yes, tracked and fully included in the audit calculation"
      ]
    },
    {
      question: "Has the input derivation been reviewed by someone with expert knowledge in the M36 methodology?",
      inputType: "select",
      options: [
        "No review",
        "Reviewed internally by non-specialist staff",
        "Reviewed internally by trained staff",
        "Reviewed by an external consultant",
        "Reviewed and certified by an accredited water audit / M36 expert"
      ]
    },
    {
      question: "Was customer water consumption billed based on actual meter readings (volumetric tariff) during the audit year?",
      inputType: "yesno"
    },
    {
      question: "How reliable and consistently applied is the current tariff structure (per-kiloliter rate, slab, or flat charge) used by the utility?",
      inputType: "select",
      options: [
        "No defined tariff structure",
        "Tariff exists but is outdated or inconsistently applied",
        "Tariff applied for most customers with some inconsistencies",
        "Tariff reliably and consistently applied for all customers",
        "Tariff regularly revised, uniformly applied, and independently audited"
      ]
    },
    {
      question: "How were the billing and tariff data used for the audit derived or compiled (e.g., from billing software, manual registers, or revenue reports)?",
      inputType: "select",
      options: [
        "Derived from rough estimates or assumptions",
        "Compiled from manual registers or paper records",
        "Extracted from billing software (summary level)",
        "Extracted from billing software with detailed account-level analysis",
        "Extracted from audited billing software and cross-verified with revenue/financial records"
      ]
    },
    {
      question: "Does the utility collect any linked volumetric charges (e.g., sewerage, wastewater, or environmental fee) that depend on metered water use?",
      inputType: "select",
      options: [
        "Unknown",
        "No linked volumetric charges",
        "Yes, but not tracked separately",
        "Yes, tracked but not included in the audit",
        "Yes, tracked and fully integrated into the audit calculation"
      ]
    },
    {
      question: "Have the tariff and billing data inputs been verified or reviewed by a qualified auditor or domain expert, in line with recognized water audit practices?",
      inputType: "select",
      options: [
        "No verification or review",
        "Reviewed internally by non-specialist staff",
        "Reviewed internally by trained billing / finance staff",
        "Reviewed by an external consultant or auditor",
        "Independently verified and certified by an accredited expert"
      ]
    }
  ]
};
