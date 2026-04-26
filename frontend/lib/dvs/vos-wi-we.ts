import { DVSCategory } from "./types";

export const VOS_WI_WE: DVSCategory = {
  categoryKey: "VOS_WI_WE",
  label: "Volume from Own Sources / Water Imported / Water Exported",
  description: "Water production, import, and export volumes with error adjustments",
  inputs: [
    { key: "VOS", label: "Volume from Own Sources", description: "Total volume of water produced from own sources", type: "volume", unit: "MLD" },
    { key: "WI", label: "Water Imported", description: "Total volume of water imported from external sources", type: "volume", unit: "MLD" },
    { key: "WE", label: "Water Exported", description: "Total volume of water exported to other utilities", type: "volume", unit: "MLD" },
  ],
  validationQuestions: [
    {
      question: "Did the water utility draw any water from its own sources during the audit year?",
      inputType: "yesno"
    },
    {
      question: "What percentage of the self-supplied water is measured by meters?",
      inputType: "percentage"
    },
    {
      question: "How often is electronic calibration of flow meters carried out?",
      inputType: "select",
      options: [
        "Never performed",
        "Only when a fault is detected",
        "Once every 2–5 years",
        "Annually",
        "Semi-annually or more frequently"
      ]
    },
    {
      question: "What type of data transfer errors are verified during the electronic calibration process?",
      inputType: "select",
      options: [
        "No verification done",
        "Only signal output is checked",
        "Signal output and totaliser readings are compared",
        "Full end-to-end data path verification (sensor → logger → SCADA/database)",
        "Automated continuous data integrity checks"
      ]
    },
    {
      question: "Is the latest record or report of electronic calibration available for inspection?",
      inputType: "select",
      options: [
        "No records exist",
        "Records exist but are incomplete or outdated (>3 years)",
        "Records exist but not easily accessible",
        "Up-to-date records are available on request",
        "Complete digital records are readily accessible and regularly maintained"
      ]
    },
    {
      question: "How frequently is on-site flow accuracy testing of meters done?",
      inputType: "select",
      options: [
        "Never performed",
        "Only when a fault is detected",
        "Once every 2–5 years",
        "Annually",
        "Semi-annually or more frequently"
      ]
    },
    {
      question: "Is the latest on-site flow accuracy test report available for inspection?",
      inputType: "select",
      options: [
        "No reports exist",
        "Reports exist but are incomplete or outdated (>3 years)",
        "Reports exist but not easily accessible",
        "Up-to-date reports are available on request",
        "Complete digital reports are readily accessible and regularly maintained"
      ]
    },
    {
      question: "What are the total volume-weighted average results from the latest on-site flow accuracy checks?",
      inputType: "select",
      options: [
        "No accuracy data available",
        "Accuracy within ±10% or worse",
        "Accuracy within ±5–10%",
        "Accuracy within ±2–5%",
        "Accuracy within ±2% or better"
      ]
    },
    {
      question: "Have the testing and calibration procedures been reviewed to ensure compliance with standard manuals or guidelines?",
      inputType: "select",
      options: [
        "No review conducted",
        "Informal / ad-hoc review only",
        "Internal review done but not documented",
        "Documented internal review following standard procedures",
        "Independent third-party audit and certification completed"
      ]
    },
    {
      question: "How often are final (treated) water meter readings recorded?",
      inputType: "select",
      options: [
        "Not recorded",
        "Monthly or less frequently",
        "Weekly",
        "Daily (manual log)",
        "Continuous / real-time (SCADA or telemetry)"
      ]
    },
    {
      question: "How frequently is data checked for abnormal values, missing records, or errors in meter readings?",
      inputType: "select",
      options: [
        "No checks performed",
        "Only when an issue is reported",
        "Monthly or quarterly review",
        "Weekly review",
        "Automated real-time anomaly detection"
      ]
    }
  ]
};
