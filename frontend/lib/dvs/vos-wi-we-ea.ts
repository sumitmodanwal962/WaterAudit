import { DVSCategory } from "./types";

export const VOS_WI_WE_EA: DVSCategory = {
  categoryKey: "VOS_WI_WE_EA",
  label: "VOS/WI/WE Error Adjustment",
  description: "Error adjustments for volume from own sources, water imported, and water exported",
  inputs: [],
  validationQuestions: [
    {
      question: "Are water storage tank levels automatically monitored and recorded every day?",
      inputType: "select",
      options: [
        "No monitoring at all",
        "Manual periodic checks only",
        "Manual daily readings",
        "Automated daily logging",
        "Continuous real-time SCADA monitoring"
      ]
    },
    {
      question: "Are daily changes in storage tank water volumes included while calculating the \u201Cdaily volume from own sources\u201D?",
      inputType: "select",
      options: [
        "Not considered at all",
        "Considered only occasionally",
        "Estimated using average assumptions",
        "Included based on daily manual readings",
        "Included based on automated / SCADA data"
      ]
    },
    {
      question: "Is the yearly net change in distribution system storage considered in the data for \u201CVolume from Own Sources\u201D or in the VOSEA calculation?",
      inputType: "select",
      options: [
        "Not considered",
        "Partially considered with rough estimates",
        "Considered using periodic manual measurements",
        "Considered using detailed monthly data",
        "Fully integrated using continuous monitoring data"
      ]
    },
    {
      question: "Are the results of field flow accuracy checks and/or electronic calibration included in the VOSEA section of the water audit?",
      inputType: "select",
      options: [
        "Not included",
        "Partially included without documentation",
        "Included based on outdated calibration data",
        "Included with current calibration results",
        "Fully included with documented, certified calibration results"
      ]
    }
  ]
};
