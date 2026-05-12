import { DVSCategory } from "./types";

export const CMI: DVSCategory = {
  categoryKey: "CMI",
  label: "Customer Metering Inaccuracies",
  description: "Volume of losses due to customer meter inaccuracies",
  inputs: [
    { key: "CMI", label: "Customer Metering Inaccuracies", description: "Volume of losses due to customer meter inaccuracies", type: "volume", unit: "MLD" },
  ],
  skipRules: [
    // Q1 (idx 0): "No" → skip all
    { questionIndex: 0, triggerValue: "no", skipQuestionIndices: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
    // Q3 (idx 2): last two options (idx 5, 6) → skip Q4 (idx 3)
    { questionIndex: 2, triggerValue: "5", skipQuestionIndices: [3] },
    { questionIndex: 2, triggerValue: "6", skipQuestionIndices: [3] },
    // Q5 (idx 4): last two options (idx 3, 4) → skip Q6 (idx 5)
    { questionIndex: 4, triggerValue: "3", skipQuestionIndices: [5] },
    { questionIndex: 4, triggerValue: "4", skipQuestionIndices: [5] },
  ],
  validationQuestions: [
    {
      question: "Did the audit period include any metered customer water usage?",
      inputType: "yesno",
      weight: 0,
      scores: [10, 1] // Answering 'no' (idx 1) leads to a score of 1.0/10 as requested.
    },
    {
      question: "Are customer meters tested only when a complaint or billing issue is reported?",
      inputType: "select",
      options: [
        "Responsive testing has been conducted",
        "No responsive testing has been conducted"
      ],
      weight: 5,
      scores: [10, 0]
    },
    {
      question: "What is the frequency of proactive testing for small-sized customer meters?",
      inputType: "select",
      options: [
        "This activity is ongoing and conducted annually",
        "This activity is performed on a repetitive basis and was last carried out within two years preceding the audit period",
        "Although no testing was performed, a minimum of 10% of the meter stock was replaced within the two years preceding the audit period",
        "This activity is performed on a repeated basis and was last carried out within the five years preceding the audit period",
        "This activity is not performed regularly; however, it was carried out within the five years preceding the audit period",
        "This is not performed on a periodic basis, and the last assessment was conducted over five years before the audit period",
        "No proactive testing of small consumer meters has been undertaken to date"
      ],
      weight: 15,
      scores: [10, 8, 7, 5, 3, 1, 0]
    },
    {
      question: "What types of meters are included in the proactive testing program for small-sized customer meters?",
      inputType: "select",
      options: [
        "Proactive testing is conducted using a representative sample of small meters",
        "Testing activities focus on selected groups of meters, with priority given to the oldest meters"
      ],
      weight: 10,
      scores: [10, 6]
    },
    {
      question: "What is the frequency of the proactive testing program for medium and large-sized customer meters?",
      inputType: "select",
      options: [
        "This activity is ongoing and is performed annually",
        "This activity is performed on a recurring basis and was completed within the last five years, but it is carried out less frequently than annually",
        "This activity is not performed regularly; however, a testing effort was carried out within the five years preceding the audit period",
        "This activity is not performed regularly, and the last testing effort was conducted over five years before the audit period",
        "No proactive testing of large meters has been undertaken to date"
      ],
      weight: 15,
      scores: [10, 7, 4, 1, 0]
    },
    {
      question: "How does the utility define the meters included in proactive testing for medium and large-sized customers?",
      inputType: "select",
      options: [
        "A proactive programme is in place wherein all large meters follow an established testing schedule",
        "Testing activities focus on selected meter groups, particularly those associated with high-revenue accounts"
      ],
      weight: 10,
      scores: [10, 7]
    },
    {
      question: "How was the input data for this section collected or derived?",
      inputType: "select",
      options: [
        "Derived from the latest meter accuracy tests, reflecting a complete assessment of all meter performance characteristics",
        "Although no meter accuracy test results were applied, a minimum of 50% of the meter stock was replaced within the two years preceding the audit period",
        "Derived from the latest meter accuracy testing, reflecting the full range of meter performance characteristics",
        "Although meter accuracy test data or manufacturer specifications are cited, they have not been evaluated or incorporated into the calculation process",
        "Derived as an approximation in the absence of any customer meter testing data"
      ],
      weight: 20,
      scores: [10, 8, 7, 3, 0]
    },
    {
      question: "Did an expert familiar with the CPHEEO manual review the input derivation?",
      inputType: "yesno",
      weight: 5,
      scores: [10, 0]
    },
    {
      question: "How frequently are customer meters replaced, and for which categories of meters?",
      inputType: "select",
      options: [
        "Meter replacement is undertaken proactively, informed by accuracy test results and evaluations of long-term performance trends",
        "A proactive annual replacement programme is implemented for specific meter groups, prioritizing those identified by age",
        "Meter replacement occurs solely in cases of total failure or specific exceptional situations",
        "No information available"
      ],
      weight: 10,
      scores: [10, 7, 2, 0]
    },
    {
      question: "How trustworthy are the records related to meter installation and maintenance?",
      inputType: "select",
      options: [
        "Comprehensive installation records are kept, documenting the installation date, type, size, and manufacturer of each meter",
        "Meter installation records exist, but they lack essential information including installation date, type, size, and manufacturer",
        "Documentation of installed meters is not being maintained"
      ],
      weight: 10,
      scores: [10, 4, 0]
    }
  ]
};
