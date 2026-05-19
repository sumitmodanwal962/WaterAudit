import { DVSCategory } from "./types";

export const UC: DVSCategory = {
  categoryKey: "UC",
  label: "Unauthorized Consumption",
  description: "Volume of water consumed without authorization",
  inputs: [
    { key: "UC", label: "Unauthorized Consumption", description: "Volume of water consumed without authorization", type: "volume", unit: "MLD" },
  ],
  validationQuestions: [
    {
      question: "How was the information or input for unauthorized consumption collected or derived?",
      inputType: "select",
      options: [
        "The custom volume is based on findings from a comprehensive system-wide study",
        "The custom volume is derived by extrapolating results from a system-wide study that sampled a defined portion of the network",
        "The custom volume is derived by extrapolating from identified cases of unauthorized consumption for which no backbilling was applied",
        "Approximated due to insufficient supporting data"
      ],
      weight: 50,
      scores: [10, 7, 5, 1]
    },
    {
      question: "How effectively do the utility monitor and track unauthorized or illegal water use?",
      inputType: "select",
      options: [
        "Comprehensive system-wide investigations into unauthorized consumption have been conducted and documented, extending beyond merely reactive detection of incidents",
        "Only limited investigations have been conducted into unauthorized consumption, primarily addressing incidents identified reactively, with comprehensive documentation lacking",
        "All discovered events have been documented",
        "Only a portion of discovered events has been documented; several others have not been recorded",
        "This parameter is not currently tracked"
      ],
      weight: 50,
      scores: [10, 4, 6, 2, 0]
    }
  ]
};
