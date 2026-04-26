import { DVSCategory } from "./types";

export const LP: DVSCategory = {
  categoryKey: "Lp",
  label: "Average Length of Customer Service Line",
  description: "Average length of private customer service lines",
  inputs: [
    { key: "Lp", label: "Average Length of Customer Service Line", description: "Average length of private customer service lines", type: "number", unit: "km" },
  ],
  validationQuestions: [
    {
      question: "Are customer water meters usually installed near the boundary wall or on the property line?",
      inputType: "select",
      options: [
        "No \u2014 meters are inside the property at varying distances",
        "Mostly no \u2014 mixed locations with no standard",
        "About half at boundary, half inside",
        "Mostly yes \u2014 at or near the boundary wall",
        "Yes \u2014 standard practice to install at the boundary/property line"
      ]
    },
    {
      question: "How was the information about the average length of customer service lines collected or calculated?",
      inputType: "select",
      options: [
        "Default assumption used (no measurement)",
        "Rough estimate based on typical plot sizes",
        "Measured for a small sample of connections",
        "Measured for a statistically significant sample",
        "Comprehensive measurement from GIS / as-built records"
      ]
    },
    {
      question: "How is the mapping of customer service lines and meter locations updated and maintained?",
      inputType: "select",
      options: [
        "No mapping exists",
        "Paper records / sketches exist but are rarely updated",
        "Basic digital records updated periodically",
        "GIS-based mapping updated annually",
        "GIS-based mapping updated continuously with field verification"
      ]
    },
    {
      question: "How often is the mapping of service lines verified in the field to ensure it matches actual ground conditions?",
      inputType: "select",
      options: [
        "Never verified",
        "Verified only during major works",
        "Verified once every few years",
        "Verified annually on a sample basis",
        "Verified regularly on a systematic / rolling basis"
      ]
    },
    {
      question: "What is the policy that defines where the utility\u2019s ownership of the service line ends, and the customer\u2019s ownership begins?",
      inputType: "select",
      options: [
        "No defined policy",
        "Informal understanding only",
        "Written policy exists but is inconsistently applied",
        "Written policy exists and is mostly followed",
        "Clearly documented, legally enforceable policy that is consistently applied"
      ]
    }
  ]
};
