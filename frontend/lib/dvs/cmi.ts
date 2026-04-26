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
        "Yes, only on complaint",
        "Mostly on complaint, with very limited proactive testing",
        "Mix of complaint-based and scheduled proactive testing",
        "Primarily proactive testing with complaints handled separately",
        "Comprehensive proactive testing program; complaints are rare"
      ]
    },
    {
      question: "For small-size customer meters, how often are meters tested proactively (apart from complaint-based testing)?",
      inputType: "select",
      options: [
        "No proactive testing",
        "Only when meter age exceeds 10+ years",
        "Once every 5\u201310 years",
        "Once every 3\u20135 years",
        "Every 1\u20133 years or per manufacturer recommendation"
      ]
    },
    {
      question: "Which types of small-size customer meters are covered under proactive testing activities?",
      inputType: "select",
      options: [
        "None",
        "Only very old or suspected faulty meters",
        "Meters in high-consumption areas only",
        "All meter types on a rotational / sampling basis",
        "All meter types comprehensively as per a documented schedule"
      ]
    },
    {
      question: "For medium and large customer meters, how often are proactive tests carried out?",
      inputType: "select",
      options: [
        "No proactive testing",
        "Only when meter age exceeds 10+ years",
        "Once every 5\u201310 years",
        "Once every 1\u20133 years",
        "Annually or more frequently"
      ]
    },
    {
      question: "Which types of medium and large customer meters are included in the proactive testing program?",
      inputType: "select",
      options: [
        "None",
        "Only bulk or industrial meters",
        "Bulk, industrial, and major commercial meters",
        "All medium and large meters on a rotational / sampling basis",
        "All medium and large meters comprehensively as per a documented schedule"
      ]
    },
    {
      question: "How was the input data for this section collected or derived?",
      inputType: "select",
      options: [
        "Default value used (no data collection)",
        "Rough estimate based on experience / assumption",
        "Derived from meter test results of a small sample",
        "Derived from statistically significant meter test sample",
        "Derived from comprehensive meter testing and analysis program"
      ]
    },
    {
      question: "Has the input data been reviewed by a qualified expert familiar with the standard water audit methodology?",
      inputType: "select",
      options: [
        "No review",
        "Reviewed internally by non-specialist staff",
        "Reviewed internally by trained staff",
        "Reviewed by an external consultant",
        "Reviewed and certified by an accredited water audit expert"
      ]
    },
    {
      question: "How frequently are customer meters replaced, and for which categories of meters?",
      inputType: "select",
      options: [
        "No replacement program",
        "Replaced only on failure",
        "Periodic replacement for some categories (e.g., oldest meters)",
        "Scheduled replacement program for most categories",
        "Comprehensive age-based and performance-based replacement program for all categories"
      ]
    },
    {
      question: "How reliable are the records related to meter installation and maintenance?",
      inputType: "select",
      options: [
        "No records maintained",
        "Incomplete or inconsistent paper records",
        "Basic paper or spreadsheet records",
        "Digital records (database or GIS) with regular updates",
        "Comprehensive digital asset management system with full history"
      ]
    }
  ]
};
