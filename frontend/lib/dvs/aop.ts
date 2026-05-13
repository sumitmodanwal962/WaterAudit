import { DVSCategory } from "./types";

export const AOP: DVSCategory = {
  categoryKey: "AOP",
  label: "Average Operating Pressure",
  description: "Average system operating pressure",
  inputs: [
    { key: "AOP", label: "Average Operating Pressure", description: "Average system operating pressure", type: "number", unit: "psi" },
  ],
  skipRules: [
    // Q3 (idx 2): "Pressure data is not monitored continuously" (option 3) → skip Q4
    { questionIndex: 2, triggerValue: "3", skipQuestionIndices: [3] },
  ],
  validationQuestions: [
    {
      question: "How is the boundary integrity of the pressure zones in the system checked and ensured?",
      inputType: "select",
      options: [
        "Not applicable, as the system functions as a single pressure zone",
        "Normally closed boundary valves between zones have been verified as fully closed within the past three years",
        "Normally closed boundary valves between zones were last verified as fully closed over three years ago",
        "Normally closed boundary valves between zones have not been verified to be fully closed"
      ],
      weight: 15,
      scores: [10, 10, 5, 0]
    },
    {
      question: "How are one-time pressure readings (for example, from hydrants) recorded or collected?",
      inputType: "select",
      options: [
        "Pressure data is collected annually during routine system flushing and/or hydrant testing",
        "Pressure data is collected only in response to low-pressure complaints or requests from new developments"
      ],
      weight: 10,
      scores: [10, 4]
    },
    {
      question: "How is continuous pressure data collected through data loggers or telemetry systems?",
      inputType: "select",
      options: [
        "Pressure is monitored at zone boundaries and at internal locations sufficient to represent the full pressure profile of the zones",
        "Pressure is monitored at zone boundaries and at selected internal locations, but does not capture the full pressure profile",
        "Pressure monitoring is conducted only at zone boundary points, such as supply entry points, PRVs",
        "Pressure data is not monitored continuously"
      ],
      weight: 25,
      scores: [10, 7, 4, 0]
    },
    {
      question: "How is long-term continuous pressure monitoring carried out in the system?",
      inputType: "select",
      options: [
        "Continuous, year-round data collection is conducted through permanent monitoring systems",
        "Temporary data loggers are deployed with sufficient coverage to capture seasonal variations throughout the year",
        "Temporary data loggers are deployed, but coverage is limited and does not capture seasonal variations throughout the year"
      ],
      weight: 20,
      scores: [10, 8, 4]
    },
    {
      question: "How is continuous pressure data gathered?",
      inputType: "select",
      options: [
        "Derived from a hydraulic model that has not been field-calibrated in the past five years",
        "Calculated from field data as a weighted average, in accordance with methods outlined in the 'Manual on Water Supply Systems: Drink from Tap",
        "A rough estimate is inferred from field measurements, without any formal analysis",
        "Provisionally estimated in the absence of precise data"
      ],
      weight: 30,
      scores: [10, 7, 4, 0]
    }
  ]
};
