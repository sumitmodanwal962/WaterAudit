import { DVSCategory } from "./types";

export const CMI: DVSCategory = {
  categoryKey: "CMI",
  label: "Customer Metering Inaccuracies",
  description: "Volume of losses due to customer meter inaccuracies",
  inputs: [
    { key: "CMI", label: "Customer Metering Inaccuracies", description: "Volume of losses due to customer meter inaccuracies", type: "volume", unit: "MLD" },
  ],
  validationQuestions: [
    {
      question: "Were there any customers with metered water connections during the audit year?",
      inputType: "yesno"
    },
    {
      question: "Are customer meters tested only when a complaint or billing issue is reported?",
      inputType: "select",
      options: [
        "Comprehensive proactive testing program; complaints are rare",
        "Primarily proactive testing with complaints handled separately",
        "Mix of complaint-based and scheduled proactive testing",
        "Mostly on complaint, with very limited proactive testing",
        "Yes, only on complaint"
      ]
    },
    {
      question: "For small-size customer meters, how often are meters tested proactively (apart from complaint-based testing)?",
      inputType: "select",
      options: [
        "Every 1\u20133 years or per manufacturer recommendation",
        "Once every 3\u20135 years",
        "Once every 5\u201310 years",
        "Only when meter age exceeds 10+ years",
        "No proactive testing"
      ]
    },
    {
      question: "Which types of small-size customer meters are covered under proactive testing activities?",
      inputType: "select",
      options: [
        "All meter types comprehensively as per a documented schedule",
        "All meter types on a rotational / sampling basis",
        "Meters in high-consumption areas only",
        "Only very old or suspected faulty meters",
        "None"
      ]
    },
    {
      question: "For medium and large customer meters, how often are proactive tests carried out?",
      inputType: "select",
      options: [
        "Annually or more frequently",
        "Once every 1\u20133 years",
        "Once every 5\u201310 years",
        "Only when meter age exceeds 10+ years",
        "No proactive testing"
      ]
    },
    {
      question: "Which types of medium and large customer meters are included in the proactive testing program?",
      inputType: "select",
      options: [
        "All medium and large meters comprehensively as per a documented schedule",
        "All medium and large meters on a rotational / sampling basis",
        "Bulk, industrial, and major commercial meters",
        "Only bulk or industrial meters",
        "None"
      ]
    },
    {
      question: "How was the input data for this section collected or derived?",
      inputType: "select",
      options: [
        "Derived from comprehensive meter testing and analysis program",
        "Derived from statistically significant meter test sample",
        "Derived from meter test results of a small sample",
        "Rough estimate based on experience / assumption",
        "Default value used (no data collection)"
      ]
    },
    {
      question: "Has the input data been reviewed by a qualified expert familiar with the standard water audit methodology?",
      inputType: "select",
      options: [
        "Reviewed and certified by an accredited water audit expert",
        "Reviewed by an external consultant",
        "Reviewed internally by trained staff",
        "Reviewed internally by non-specialist staff",
        "No review"
      ]
    },
    {
      question: "How frequently are customer meters replaced, and for which categories of meters?",
      inputType: "select",
      options: [
        "Comprehensive age-based and performance-based replacement program for all categories",
        "Scheduled replacement program for most categories",
        "Periodic replacement for some categories (e.g., oldest meters)",
        "Replaced only on failure",
        "No replacement program"
      ]
    },
    {
      question: "How reliable are the records related to meter installation and maintenance?",
      inputType: "select",
      options: [
        "Comprehensive digital asset management system with full history",
        "Digital records (database or GIS) with regular updates",
        "Basic paper or spreadsheet records",
        "Incomplete or inconsistent paper records",
        "No records maintained"
      ]
    }
  ]
};
