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
        "Continuous monitoring with closed boundaries and automated alerts",
        "Regular boundary checks with documented results",
        "Periodic manual boundary checks",
        "Pressure zones defined on paper but not verified",
        "No defined pressure zones"
      ]
    },
    {
      question: "How are one-time pressure readings (for example, from hydrants) recorded or collected?",
      inputType: "select",
      options: [
        "Systematically collected at all key points as part of a monitoring program",
        "Regularly collected at representative points with documented results",
        "Collected periodically at selected points",
        "Occasionally collected during complaints or repairs",
        "Not collected"
      ]
    },
    {
      question: "How is continuous pressure data collected through data loggers or telemetry systems?",
      inputType: "select",
      options: [
        "Comprehensive SCADA network with real-time data and analytics",
        "Telemetry / SCADA at key distribution points with regular download",
        "Data loggers at several representative points",
        "Data loggers at a few critical points only",
        "No continuous data collection"
      ]
    },
    {
      question: "How is long-term continuous pressure monitoring carried out in the system?",
      inputType: "select",
      options: [
        "Permanent network-wide monitoring with real-time analysis",
        "Permanent loggers at key locations with periodic data review",
        "Annual monitoring campaigns at selected points",
        "Occasional temporary monitoring campaigns",
        "No long-term monitoring"
      ]
    },
    {
      question: "How was the average operating pressure data collected or calculated?",
      inputType: "select",
      options: [
        "Calculated from comprehensive network modelling and verified monitoring data",
        "Calculated from continuous pressure data at key points (time- and flow-weighted)",
        "Calculated from periodic pressure surveys",
        "Estimated from a few spot readings",
        "Assumed or default value"
      ]
    }
  ]
};
