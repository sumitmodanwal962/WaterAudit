import { DVSCategory } from "./types";

export const UMAC: DVSCategory = {
  categoryKey: "UMAC",
  label: "Unbilled Metered Authorized Consumption",
  description: "Unbilled but metered authorized water consumption",
  inputs: [
    { key: "UMAC", label: "Unbilled Metered Authorized Consumption", description: "Unbilled but metered authorized water consumption", type: "volume", unit: "MLD" },
  ],
  validationQuestions: [
    {
      question: "Did the water utility have any metered connections where water use was not billed during the audit year?",
      inputType: "yesno"
    },
    {
      question: "Does the utility have a clear policy mentioning which metered connections are exempted from billing?",
      inputType: "select",
      options: [
        "No policy exists",
        "Informal understanding only",
        "Written policy exists but is not consistently followed",
        "Written policy exists and is mostly followed",
        "Documented, approved policy that is strictly enforced and regularly reviewed"
      ]
    },
    {
      question: "How many metered connections exist that are not billed for water use?",
      inputType: "number",
      unit: "connections",
      placeholder: "Enter number of connections"
    },
    {
      question: "How frequently are meters of unbilled consumers read? (If there are multiple schedules, select the most common one.)",
      inputType: "select",
      options: [
        "Never read",
        "Annually or less frequently",
        "Half-yearly",
        "Quarterly",
        "Monthly or more frequently"
      ]
    },
    {
      question: "How often are the unbilled metered readings checked or reviewed for possible errors?",
      inputType: "select",
      options: [
        "No checks performed",
        "Only when an issue is reported",
        "Annually",
        "Quarterly",
        "Monthly or more frequently"
      ]
    }
  ]
};
