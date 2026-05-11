import { DVSCategory } from "./types";

export const BMAC: DVSCategory = {
  categoryKey: "BMAC",
  label: "Billed Metered Authorized Consumption",
  description: "Billed and metered authorized water consumption",
  inputs: [
    { key: "BMAC", label: "Billed Metered Authorized Consumption", description: "Billed and metered authorized water consumption", type: "volume", unit: "MLD" },
  ],
  skipRules: [
    // Q1 (idx 0): "No" = no metered connections → skip everything else
    { questionIndex: 0, triggerValue: "no", skipQuestionIndices: [1, 2, 3, 4, 5, 6, 7] },
    // Q7 (idx 6): "Yes, but exactly not known" (option 3) → skip Q8
    { questionIndex: 6, triggerValue: "3", skipQuestionIndices: [7] },
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
        "> 90%",
        "70%-90%",
        "50%-70%",
        "30%-50%",
        "10%-20%",
        "< 10%"
      ]
    },
    {
      question: "What is the frequency of consumer meter readings taken by the utility? If there are different meter reading schedules, what is the most common frequency for most customers?",
      inputType: "select",
      options: [
        "Once every week",
        "Monthly",
        "Once in two months",
        "Quarterly",
        "Semi-annually"
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
        "Comprehensive level of assessment",
        "Detailed level of assessment",
        "Moderate level of assessment",
        "Minimal level of assessment",
        "No evaluation"
      ]
    },
    {
      question: "Has an independent reviewer recently examined the utility\u2019s billing data? If so, when?",
      inputType: "select",
      options: [
        "Within 2 years",
        "Within 2 to 5 years",
        "Yes, 5 years back",
        "Yes, but exactly not known"
      ]
    },
    {
      question: "How comprehensive was the independent review of the billing data?",
      inputType: "select",
      options: [
        "Reviewed by third party authority officials",
        "Not reviewed"
      ]
    }
  ]
};
