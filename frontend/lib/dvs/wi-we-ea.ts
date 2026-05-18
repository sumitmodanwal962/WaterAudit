import { DVSCategory } from "./types";

export const WI_WE_EA: DVSCategory = {
  categoryKey: "WI_WE_EA",
  label: "WI/WE Error Adjustment",
  description: "Error adjustment for water imported and exported volumes",
  inputs: [
    { key: "WE_WI_EA", label: "WE/WI Error Adjustment", description: "Error adjustment for imported/exported water", type: "volume", unit: "MLD", noInput: true },
  ],
  validationQuestions: [
    {
      question: "Is there a formal bulk water supply agreement or MoU between the supplying and receiving utility defining purchase terms, metering, and quality standards?",
      inputType: "select",
      options: [
        "Yes, and the agreement has been written",
        "Yes, but not in written agreement",
        "No"
      ],
      weight: 15,
      scores: [10, 4, 0]
    },
    {
      question: "Does the bulk water supply agreement clearly specify meter calibration, accuracy testing, and verification protocols for imported water measurement?",
      inputType: "select",
      options: [
        "Yes, calculated frequently in a year",
        "Yes, calculated semi-annually",
        "Yes, it is calculated annually",
        "No"
      ],
      weight: 25,
      scores: [10, 8, 6, 0]
    },
    {
      question: "Have flow test and calibration outcomes been used to update the error adjustment factors in the audit?",
      inputType: "select",
      options: [
        "Yes, test results are analyzed, and error adjustment has been made",
        "Yes, test results are analyzed, and no error adjustment has been made",
        "No"
      ],
      weight: 45,
      scores: [10, 6, 0]
    },
    {
      question: "Who is authorized to access, verify, and maintain the import water meter readings and archived records, the receiving utility, supplier, or joint verification team?",
      inputType: "select",
      options: [
        "Import and Export Water Utilities Officials",
        "Export or Import Water Utilities Officials"
      ],
      weight: 15,
      scores: [10, 4]
    }
  ]
};
