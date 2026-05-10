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
        "Yes \u2014 standard practice to install at the boundary/property line",
        "Mostly yes \u2014 at or near the boundary wall",
        "About half at boundary, half inside",
        "Mostly no \u2014 mixed locations with no standard",
        "No \u2014 meters are inside the property at varying distances"
      ]
    },
    {
      question: "How was the information about the average length of customer service lines collected or calculated?",
      inputType: "select",
      options: [
        "Comprehensive measurement from GIS / as-built records",
        "Measured for a statistically significant sample",
        "Measured for a small sample of connections",
        "Rough estimate based on typical plot sizes",
        "Default assumption used (no measurement)"
      ]
    },
    {
      question: "How is the mapping of customer service lines and meter locations updated and maintained?",
      inputType: "select",
      options: [
        "GIS-based mapping updated continuously with field verification",
        "GIS-based mapping updated annually",
        "Basic digital records updated periodically",
        "Paper records / sketches exist but are rarely updated",
        "No mapping exists"
      ]
    },
    {
      question: "How often is the mapping of service lines verified in the field to ensure it matches actual ground conditions?",
      inputType: "select",
      options: [
        "Verified regularly on a systematic / rolling basis",
        "Verified annually on a sample basis",
        "Verified once every few years",
        "Verified only during major works",
        "Never verified"
      ]
    },
    {
      question: "What is the policy that defines where the utility\u2019s ownership of the service line ends, and the customer\u2019s ownership begins?",
      inputType: "select",
      options: [
        "Clearly documented, legally enforceable policy that is consistently applied",
        "Written policy exists and is mostly followed",
        "Written policy exists but is inconsistently applied",
        "Informal understanding only",
        "No defined policy"
      ]
    }
  ]
};
