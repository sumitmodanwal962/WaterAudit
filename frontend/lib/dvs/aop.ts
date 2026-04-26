import { DVSCategory } from "./types";

export const AOP: DVSCategory = {
  categoryKey: "AOP",
  label: "Average Operating Pressure",
  description: "Average system operating pressure",
  inputs: [
    { key: "AOP", label: "Average Operating Pressure", description: "Average system operating pressure", type: "number", unit: "psi" },
  ],
  validationQuestions: [
    {
      question: "How is the boundary integrity of the pressure zones in the system checked and ensured?",
      inputType: "select",
      options: [
        "No defined pressure zones",
        "Pressure zones defined on paper but not verified",
        "Periodic manual boundary checks",
        "Regular boundary checks with documented results",
        "Continuous monitoring with closed boundaries and automated alerts"
      ]
    },
    {
      question: "How are one-time pressure readings (for example, from hydrants) recorded or collected?",
      inputType: "select",
      options: [
        "Not collected",
        "Occasionally collected during complaints or repairs",
        "Collected periodically at selected points",
        "Regularly collected at representative points with documented results",
        "Systematically collected at all key points as part of a monitoring program"
      ]
    },
    {
      question: "How is continuous pressure data collected through data loggers or telemetry systems?",
      inputType: "select",
      options: [
        "No continuous data collection",
        "Data loggers at a few critical points only",
        "Data loggers at several representative points",
        "Telemetry / SCADA at key distribution points with regular download",
        "Comprehensive SCADA network with real-time data and analytics"
      ]
    },
    {
      question: "How is long-term continuous pressure monitoring carried out in the system?",
      inputType: "select",
      options: [
        "No long-term monitoring",
        "Occasional temporary monitoring campaigns",
        "Annual monitoring campaigns at selected points",
        "Permanent loggers at key locations with periodic data review",
        "Permanent network-wide monitoring with real-time analysis"
      ]
    },
    {
      question: "How was the average operating pressure data collected or calculated?",
      inputType: "select",
      options: [
        "Assumed or default value",
        "Estimated from a few spot readings",
        "Calculated from periodic pressure surveys",
        "Calculated from continuous pressure data at key points (time- and flow-weighted)",
        "Calculated from comprehensive network modelling and verified monitoring data"
      ]
    }
  ]
};
