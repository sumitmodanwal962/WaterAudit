import { DVSCategory } from "./types";

export const BUAC: DVSCategory = {
  categoryKey: "BUAC",
  label: "Billed Unmetered Authorized Consumption",
  description: "Billed but unmetered authorized water consumption",
  inputs: [
    { key: "BUAC", label: "Billed Unmetered Authorized Consumption", description: "Billed but unmetered authorized water consumption", type: "volume", unit: "MLD" },
  ],
  skipRules: [
    { questionIndex: 0, triggerValue: "no", skipQuestionIndices: [1, 2, 3] },
  ],
  validationQuestions: [
    {
      question: "Were unmetered consumers billed for water usage during the audit year?",
      inputType: "yesno"
    },
    {
      question: "What proportion of billed connections are unmetered?",
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
      question: "What method is used to calculate or estimate water use for unmetered consumers?",
      inputType: "select",
      options: [
        "Estimated per unmetered customer or based on representative system-wide statistical samples",
        "Derived from similar customer groups within the utility\u2019s metered population, but the sample size available was limited",
        "Assessed based on guesses of consumption",
        "Calculate approximately"
      ]
    },
    {
      question: "How frequently does the utility estimate consumption for unmetered consumers?",
      inputType: "select",
      options: [
        "Annually",
        "Semi-annually",
        "Quarterly",
        "Once two months",
        "Monthly"
      ]
    }
  ]
};
