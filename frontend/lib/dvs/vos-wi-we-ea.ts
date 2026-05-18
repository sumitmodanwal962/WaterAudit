import { DVSCategory } from "./types";

export const VOS_WI_WE_EA: DVSCategory = {
  categoryKey: "VOS_WI_WE_EA",
  label: "VOSEA (Error Adjustment)",
  description: "Error adjustments for volume from own sources",
  inputs: [
    { key: "VOSEA", label: "VOS Error Adjustment", description: "Error adjustment volume for own sources", type: "volume", unit: "MLD", noInput: true },
  ],
  validationQuestions: [
    {
      question: "Are water storage tank levels automatically monitored and documented every day?",
      inputType: "yesno",
      weight: 15,
      scores: [10, 2]
    },
    {
      question: "Are day-to-day changes in storage tank water volumes of the distribution system included while considering the “daily volume from own sources”?",
      inputType: "select",
      options: [
        "Yes",
        "No",
        "Not known"
      ],
      weight: 25,
      scores: [10, 2, 0]
    },
    {
      question: "Is the yearly net change in distribution system storage considered in the data for “Volume from Own Sources” or in the VOSEA calculation?",
      inputType: "yesno",
      weight: 20,
      scores: [10, 2]
    },
    {
      question: "Are flow test and electronic calibration results integrated into the VOSEA data for the water audit?",
      inputType: "select",
      options: [
        "Results are available and analyzed, error adjustment has been made",
        "Results are available and analyzed but no error adjustment has been made",
        "Due to unavailability of results the error adjustments have been made",
        "Results are available but not analyzed"
      ],
      weight: 40,
      scores: [10, 6, 4, 1]
    }
  ]
};
