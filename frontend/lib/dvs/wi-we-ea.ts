import { DVSCategory } from "./types";

export const WI_WE_EA: DVSCategory = {
  categoryKey: "WI_WE_EA",
  label: "WIEA / WEEA (Water Import/Export Error Adjustment)",
  description: "Error adjustments for water imported and exported volumes",
  inputs: [],
  validationQuestions: [
    {
      question: "Is there a formal bulk water supply agreement or MoU between the supplying and receiving utility defining purchase terms, metering, and quality standards?",
      inputType: "select",
      options: [
        "Yes, and the agreement has been written",
        "Yes, but not in written agreement",
        "No"
      ]
    },
    {
      question: "Does the bulk water supply agreement clearly specify meter calibration, accuracy testing, and verification protocols for imported water measurement?",
      inputType: "select",
      options: [
        "Yes, it is calculated annually",
        "Yes, calculated semi-annually",
        "Yes, calculated frequently in a year",
        "No"
      ]
    },
    {
      question: "Have flow test and calibration outcomes been used to update the error adjustment factors in the audit?",
      inputType: "select",
      options: [
        "Yes, test results are analyzed, and error adjustment has been made",
        "Yes, test results are analyzed, and no error adjustment has been made",
        "No"
      ]
    },
    {
      question: "Who is authorized to access, verify, and maintain the import water meter readings and archived records, the receiving utility, supplier, or joint verification team?",
      inputType: "select",
      options: [
        "Import and Export Water Utilities Officials",
        "Export or Import Water Utilities Officials"
      ]
    }
  ]
};
