import { DVSCategory } from "./types";

export const UWW: DVSCategory = {
  categoryKey: "UWW",
  label: "Unaccounted Wastewater",
  description: "Volume of unaccounted wastewater in the system",
  inputs: [
    { key: "UWW", label: "Unaccounted Wastewater", description: "Volume of unaccounted wastewater", type: "volume", unit: "MLD" },
  ],
  validationQuestions: [
    {
      question: "How reliable are the data sources used for estimating wastewater generation (e.g., household surveys, water supply data, or design assumptions)?",
      inputType: "select",
      options: [
        "Assumed design norms only",
        "Fixed return ratio (no validation)",
        "Derived from supply data (partial check)",
        "Field-verified per-capita discharge",
        "Continuous metering with verified return ratio"
      ]
    },
    {
      question: "Are wastewater flow measurements at pumping stations, manholes, or treatment plants regularly verified for accuracy?",
      inputType: "select",
      options: [
        "Not verified",
        "Verified during fault events",
        "Annual internal test",
        "Semi-annual calibration",
        "Continuous or SCADA-based verification"
      ]
    },
    {
      question: "How consistent are the wastewater data records (daily, monthly, or annually) maintained across multiple agencies or departments?",
      inputType: "select",
      options: [
        "No coordination",
        "Irregular reporting",
        "Annual reconciliation",
        "Monthly cross-verification",
        "Integrated centralized database"
      ]
    },
    {
      question: "Are flow meters and sensors in the wastewater system calibrated and maintained as per standard procedures?",
      inputType: "select",
      options: [
        "Not calibrated",
        "Irregular manual check",
        "Annual internal calibration",
        "Bi-annual standard calibration",
        "Third-party certified calibration"
      ]
    },
    {
      question: "How are missing data, meter malfunctions, or gaps in flow records identified and corrected in official reporting?",
      inputType: "select",
      options: [
        "Not addressed",
        "Manually corrected",
        "Simple interpolation",
        "Automated flagging",
        "Real-time SCADA correction"
      ]
    },
    {
      question: "What level of confidence does the utility have in the accuracy and completeness of wastewater generation and collection data?",
      inputType: "select",
      options: [
        "Very Low",
        "Low",
        "Medium",
        "High",
        "Very High"
      ]
    }
  ]
};
