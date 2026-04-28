import { DVSCategory } from "./types";

export const VOS_WI_WE_EA: DVSCategory = {
  categoryKey: "VOS_WI_WE_EA",
  label: "VOSEA (Error Adjustment)",
  description: "Error adjustments for volume from own sources",
  inputs: [],
  validationQuestions: [
    {
      question: "Are water storage tank levels automatically monitored and documented every day?",
      inputType: "yesno"
    },
    {
      question: "Are day-to-day changes in storage tank water volumes of the distribution system included while considering the \u201Cdaily volume from own sources\u201D?",
      inputType: "select",
      options: [
        "Yes",
        "No",
        "Not known"
      ]
    },
    {
      question: "Is the yearly net change in distribution system storage considered in the data for \u201CVolume from Own Sources\u201D or in the VOSEA calculation?",
      inputType: "yesno"
    },
    {
      question: "Are flow test and electronic calibration results integrated into the VOSEA data for the water audit?",
      inputType: "select",
      options: [
        "Due to unavailability of results the error adjustments have been made",
        "Results are available but not analyzed",
        "Results are available and error adjustment has been made",
        "Results are available and analyzed but no error adjustment has been made"
      ]
    }
  ]
};
