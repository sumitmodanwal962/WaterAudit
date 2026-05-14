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
        "Continuous metering with verified return ratio",
        "Field-verified per-capita discharge",
        "Derived from supply data (partial check)",
        "Fixed return ratio (no validation)",
        "Assumed design norms only"
      ],
      weight: 25,
      scores: [10, 8, 5, 2, 0]
    },
    {
      question: "Are wastewater flow measurements at pumping stations, manholes, or treatment plants regularly verified for accuracy?",
      inputType: "select",
      options: [
        "Continuous or SCADA-based verification",
        "Semi-annual calibration",
        "Annual internal test",
        "Verified during fault events",
        "Not verified"
      ],
      weight: 20,
      scores: [10, 8, 5, 2, 0]
    },
    {
      question: "How consistent are the wastewater data records (daily, monthly, or annually) maintained across multiple agencies or departments?",
      inputType: "select",
      options: [
        "Integrated centralized database",
        "Monthly cross-verification",
        "Annual reconciliation",
        "Irregular reporting",
        "No coordination"
      ],
      weight: 15,
      scores: [10, 8, 5, 2, 0]
    },
    {
      question: "Are flow meters and sensors in the wastewater system calibrated and maintained as per standard procedures?",
      inputType: "select",
      options: [
        "Third-party certified calibration",
        "Bi-annual standard calibration",
        "Annual internal calibration",
        "Irregular manual check",
        "Not calibrated"
      ],
      weight: 20,
      scores: [10, 8, 5, 2, 0]
    },
    {
      question: "How are missing data, meter malfunctions, or gaps in flow records identified and corrected in official reporting?",
      inputType: "select",
      options: [
        "Real-time SCADA correction",
        "Automated flagging",
        "Simple interpolation",
        "Manually corrected",
        "Not addressed"
      ],
      weight: 10,
      scores: [10, 8, 5, 2, 0]
    },
    {
      question: "What level of confidence does the utility have in the accuracy and completeness of wastewater generation and collection data?",
      inputType: "select",
      options: [
        "Very High",
        "High",
        "Medium",
        "Low",
        "Very Low"
      ],
      weight: 10,
      scores: [10, 8, 5, 2, 0]
    }
  ]
};
