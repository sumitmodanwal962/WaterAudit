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
        "Volumetric tariff with regular revision, fully applied and audited",
        "Volumetric tariff reliably applied for all metered customers",
        "Volumetric tariff applied for most customers but with known gaps",
        "Volumetric tariff exists but is outdated or inconsistently applied",
        "No volumetric tariff \u2014 flat rate only"
      ]
    },
    {
      question: "Choose the option that best describes how the input was derived.",
      inputType: "select",
      options: [
        "Derived from audited financial records with independent verification",
        "Calculated from detailed billing data with tariff slab analysis",
        "Calculated from billing summary reports",
        "Rough estimate from total revenue \u00F7 total billed volume",
        "Default or assumed value"
      ]
    },
    {
      question: "Is there any additional volumetric revenue the utility receives that depends on water meter readings, such as sewer?",
      inputType: "select",
      options: [
        "Yes, tracked and fully included in the audit calculation",
        "Yes, tracked but not included in audit",
        "Yes, but not tracked separately",
        "No additional volumetric revenue",
        "Unknown"
      ]
    },
    {
      question: "Has the input derivation been reviewed by someone with expert knowledge in the M36 methodology?",
      inputType: "select",
      options: [
        "Reviewed and certified by an accredited water audit / M36 expert",
        "Reviewed by an external consultant",
        "Reviewed internally by trained staff",
        "Reviewed internally by non-specialist staff",
        "No review"
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
        "Tariff regularly revised, uniformly applied, and independently audited",
        "Tariff reliably and consistently applied for all customers",
        "Tariff applied for most customers with some inconsistencies",
        "Tariff exists but is outdated or inconsistently applied",
        "No defined tariff structure"
      ]
    },
    {
      question: "How were the billing and tariff data used for the audit derived or compiled (e.g., from billing software, manual registers, or revenue reports)?",
      inputType: "select",
      options: [
        "Extracted from audited billing software and cross-verified with revenue/financial records",
        "Extracted from billing software with detailed account-level analysis",
        "Extracted from billing software (summary level)",
        "Compiled from manual registers or paper records",
        "Derived from rough estimates or assumptions"
      ]
    },
    {
      question: "Does the utility collect any linked volumetric charges (e.g., sewerage, wastewater, or environmental fee) that depend on metered water use?",
      inputType: "select",
      options: [
        "Yes, tracked and fully integrated into the audit calculation",
        "Yes, tracked but not included in the audit",
        "Yes, but not tracked separately",
        "No linked volumetric charges",
        "Unknown"
      ]
    },
    {
      question: "Have the tariff and billing data inputs been verified or reviewed by a qualified auditor or domain expert, in line with recognized water audit practices?",
      inputType: "select",
      options: [
        "Independently verified and certified by an accredited expert",
        "Reviewed by an external consultant or auditor",
        "Reviewed internally by trained billing / finance staff",
        "Reviewed internally by non-specialist staff",
        "No verification or review"
      ]
    }
  ]
};
