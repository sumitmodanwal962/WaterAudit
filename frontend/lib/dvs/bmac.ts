import { DVSCategory } from "./types";

export const BMAC: DVSCategory = {
  categoryKey: "BMAC",
  label: "Billed Metered Authorized Consumption",
  description: "Billed and metered authorized water consumption",
  inputs: [
    { key: "BMAC", label: "Billed Metered Authorized Consumption", description: "Billed and metered authorized water consumption", type: "volume", unit: "MLD" },
  ],
  validationQuestions: [
    {
      question: "Whether any customers were provided with any metered water connections during the audit year?",
      inputType: "yesno"
    },
    {
      question: "What proportion of billed metered consumers are billed using actual meter readings in a standard billing cycle?",
      inputType: "select",
      options: [
        "< 10%",
        "10%-20%",
        "30%-50%",
        "50%-70%",
        "70%-90%",
        "> 90%"
      ]
    },
    {
      question: "What is the frequency of consumer meter readings taken by the utility? If there are different meter reading schedules, what is the most common frequency for most customers?",
      inputType: "select",
      options: [
        "Semi-annually",
        "Quarterly",
        "Once in two months",
        "Monthly",
        "Once every week"
      ]
    },
    {
      question: "Has the BMAC volume been adjusted to accurately represent water consumption during the audit year?",
      inputType: "yesno"
    },
    {
      question: "What is the frequency with which utility staff conduct internal reviews of the BMAC data?",
      inputType: "select",
      options: [
        "For every billing phase",
        "More regularly than annually",
        "Annually",
        "Less regularly than annually",
        "No evaluation"
      ]
    },
    {
      question: "How detailed is the level of assessment during the internal review of BMAC data?",
      inputType: "select",
      options: [
        "No evaluation",
        "Minimal level of assessment",
        "Moderate level of assessment",
        "Detailed level of assessment",
        "Comprehensive level of assessment"
      ]
    },
    {
      question: "Has an independent reviewer recently examined the utility\u2019s billing data? If so, when?",
      inputType: "select",
      options: [
        "Yes, but exactly not known",
        "Yes, 5 years back",
        "Within 2 to 5 years",
        "Within 2 years"
      ]
    },
    {
      question: "How comprehensive was the independent review of the billing data?",
      inputType: "select",
      options: [
        "Not reviewed",
        "Reviewed by third party authority officials"
      ]
    }
  ]
};
