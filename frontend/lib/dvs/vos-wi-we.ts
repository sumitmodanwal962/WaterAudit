import { DVSCategory } from "./types";

export const VOS_WI_WE: DVSCategory = {
  categoryKey: "VOS_WI_WE",
  label: "Volume from Own Sources / Water Imported / Water Exported",
  description: "Water production, import, and export volumes",
  inputs: [
    { key: "VOS", label: "Volume from Own Sources", description: "Total volume of water produced from own sources", type: "volume", unit: "MLD" },
    { key: "WI", label: "Water Imported", description: "Total volume of water imported from external sources", type: "volume", unit: "MLD" },
    { key: "WE", label: "Water Exported", description: "Total volume of water exported to other utilities", type: "volume", unit: "MLD" },
  ],
  validationQuestions: [
    {
      question: "Did the utility produce and supply water from its own sources, such as borewells, treatment plants, or local reservoirs, etc, during the audit year?",
      inputType: "yesno"
    },
    {
      question: "What percentage of the utility's self-produced water is measured through installed and functional flow meters?",
      inputType: "select",
      options: [
        "< 20%",
        "20-40%",
        "40-60%",
        "60-80%",
        "80-90%",
        "> 90%"
      ]
    },
    {
      question: "How frequently are the flow meters at the source electronically calibrated to authenticate accuracy?",
      inputType: "select",
      options: [
        "Not done for the last 5 years",
        "Once in 2 years",
        "Annually",
        "Semi-Annually",
        "Quarterly",
        "No need to calibrate"
      ]
    },
    {
      question: "To what extent is data transfer integrity incorporated into the electronic calibration procedure?",
      inputType: "select",
      options: [
        "Not checked or not known",
        "Only at secondary devices",
        "Both secondary and tertiary devices",
        "Only at secondary devices because non availability of tertiary devices"
      ]
    },
    {
      question: "Is the latest electronic calibration report available for technical review?",
      inputType: "yesno"
    },
    {
      question: "How frequently is on-site metering flow accuracy testing carried out?",
      inputType: "select",
      options: [
        "Not from last 5 years",
        "Once in two years",
        "Annually",
        "Semi-Annually",
        "Quarterly"
      ]
    },
    {
      question: "Is the latest on-site flow accuracy test report available for examination?",
      inputType: "yesno"
    },
    {
      question: "What is the total volume-weighted average from in-situ flow tests during the audit year?",
      inputType: "select",
      options: [
        "\u2265 (\u00B15%)",
        "(\u00B12% to \u00B15%)",
        "\u2264 (\u00B12%)"
      ]
    },
    {
      question: "Have the testing and calibration procedures been reviewed to ensure compliance with the Manual for water supply system: Drink from Tap manual?",
      inputType: "yesno"
    },
    {
      question: "What is the frequency of recording finished water meter readings?",
      inputType: "select",
      options: [
        "Not every month",
        "Once every month",
        "Once every week",
        "Daily",
        "Continuous"
      ]
    },
    {
      question: "How frequently is data checked for anomalous observations, missing records, or errors in meter readings?",
      inputType: "select",
      options: [
        "Not known or not verified periodically",
        "Not on every month",
        "Once every month",
        "Once every week",
        "Daily or periodically"
      ]
    }
  ]
};
