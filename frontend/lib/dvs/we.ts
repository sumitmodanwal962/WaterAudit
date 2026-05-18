import { DVSCategory } from "./types";

export const WE: DVSCategory = {
  categoryKey: "WE",
  label: "Water Exported (WE)",
  description: "Volumes of water exported to other utilities",
  inputs: [
    { key: "WE", label: "Water Exported", description: "Total volume of water exported to other utilities", type: "volume", unit: "MLD" },
  ],
  skipRules: [
    // Q1 (idx 0): "No" = no exported volumes → skip everything else
    { questionIndex: 0, triggerValue: "no", skipQuestionIndices: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
    // Q3 (idx 2): "Not done for the last 5 years" (option 5) → skip Q4, Q5
    { questionIndex: 2, triggerValue: "5", skipQuestionIndices: [3, 4] },
    // Q6 (idx 5): "Not from last 5 years" (option 4) → skip Q7, Q8
    { questionIndex: 5, triggerValue: "4", skipQuestionIndices: [6, 7] },
    // Q7 (idx 6): "No" → skip Q8
    { questionIndex: 6, triggerValue: "no", skipQuestionIndices: [7] },
  ],
  validationQuestions: [
    {
      question: "Did the utility export and supply water to other utilities or bulk consumers, etc, during the audit year?",
      inputType: "yesno",
      weight: 0,
      scores: [10, 1]
    },
    {
      question: "What percentage of the utility's exported water is measured through installed and functional flow meters?",
      inputType: "select",
      options: [
        "> 90%",
        "80-90%",
        "60-80%",
        "40-60%",
        "20-40%",
        "< 20%"
      ],
      weight: 20,
      scores: [10, 8, 6, 4, 2, 1]
    },
    {
      question: "How frequently are the flow meters at the export point electronically calibrated to authenticate accuracy?",
      inputType: "select",
      options: [
        "No need to calibrate",
        "Quarterly",
        "Semi-Annually",
        "Annually",
        "Once in 2 years",
        "Not done for the last 5 years"
      ],
      weight: 15,
      scores: [10, 9, 8, 6, 4, 0]
    },
    {
      question: "To what extent is data transfer integrity incorporated into the electronic calibration procedure for exported water?",
      inputType: "select",
      options: [
        "Both secondary and tertiary devices",
        "Only at secondary devices because non availability of tertiary devices",
        "Only at secondary devices",
        "Not checked or not known"
      ],
      weight: 10,
      scores: [10, 7, 4, 0]
    },
    {
      question: "Is the latest electronic calibration report for exported water available for technical review?",
      inputType: "yesno",
      weight: 5,
      scores: [10, 0]
    },
    {
      question: "How frequently is on-site metering flow accuracy testing carried out for exported water?",
      inputType: "select",
      options: [
        "Quarterly",
        "Semi-Annually",
        "Annually",
        "Once in two years",
        "Not from last 5 years"
      ],
      weight: 15,
      scores: [10, 8, 6, 4, 0]
    },
    {
      question: "Is the latest on-site flow accuracy test report for exported water available for examination?",
      inputType: "yesno",
      weight: 5,
      scores: [10, 0]
    },
    {
      question: "What is the total volume-weighted average from in-situ flow tests for exported water during the audit year?",
      inputType: "select",
      options: [
        "\u2264 (\u00B12%)",
        "(\u00B12% to \u00B15%)",
        "\u2265 (\u00B15%)"
      ],
      weight: 15,
      scores: [10, 5, 2]
    },
    {
      question: "Have the testing and calibration procedures for exported water been reviewed to ensure compliance with the Manual for water supply system: Drink from Tap manual?",
      inputType: "yesno",
      weight: 5,
      scores: [10, 0]
    },
    {
      question: "What is the frequency of recording exported water meter readings?",
      inputType: "select",
      options: [
        "Continuous",
        "Daily",
        "Once every week",
        "Once every month",
        "Not every month"
      ],
      weight: 5,
      scores: [10, 8, 5, 2, 0]
    },
    {
      question: "How frequently is exported water data checked for anomalous observations, missing records, or errors in meter readings?",
      inputType: "select",
      options: [
        "Daily or periodically",
        "Once every week",
        "Once every month",
        "Not on every month",
        "Not known or not verified periodically"
      ],
      weight: 5,
      scores: [10, 7, 4, 1, 0]
    }
  ]
};
