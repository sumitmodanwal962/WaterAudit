import { DVSCategory } from "./types";

export const BUAC: DVSCategory = {
  categoryKey: "BUAC",
  label: "Billed Unmetered Authorized Consumption",
  description: "Billed but unmetered authorized water consumption",
  inputs: [
    { key: "BUAC", label: "Billed Unmetered Authorized Consumption", description: "Billed but unmetered authorized water consumption", type: "volume", unit: "MLD" },
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
        "< 10%",
        "10%-20%",
        "30%-50%",
        "50%-70%",
        "70%-90%",
        "> 90%"
      ]
    },
    {
      question: "What method is used to calculate or estimate water use for unmetered consumers?",
      inputType: "select",
      options: [
        "Calculate approximately",
        "Assessed based on guesses of consumption",
        "Derived from similar customer groups within the utility\u2019s metered population, but the sample size available was limited",
        "Estimated per unmetered customer or based on representative system-wide statistical samples"
      ]
    },
    {
      question: "How frequently does the utility estimate consumption for unmetered consumers?",
      inputType: "select",
      options: [
        "Monthly",
        "Once two months",
        "Quarterly",
        "Semi-annually",
        "Annually"
      ]
    }
  ]
};
