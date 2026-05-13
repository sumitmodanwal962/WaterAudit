import { DVSCategory } from "./types";

export const LP: DVSCategory = {
  categoryKey: "Lp",
  label: "Average Length of Customer Service Line",
  description: "Average length of private customer service lines",
  inputs: [
    { key: "Lp", label: "Average Length of Customer Service Line", description: "Average length of private customer service lines", type: "number", unit: "km" },
  ],
  skipRules: [
    // Q2 (idx 1): "Provisionally estimated..." (option 2) → skip Q3
    { questionIndex: 1, triggerValue: "2", skipQuestionIndices: [2] },
  ],
  validationQuestions: [
    {
      question: "Are customer water meters usually installed near the boundary wall or on the property line?",
      inputType: "yesno",
      weight: 10,
      scores: [10, 5]
    },
    {
      question: "How was the information about the average length of customer service lines collected or calculated?",
      inputType: "select",
      options: [
        "Data obtained from comprehensive mapping and complete customer inventory",
        "Data derived from study-based sampling of a portion of the system",
        "Provisionally estimated in the absence of precise data"
      ],
      weight: 30,
      scores: [10, 7, 2]
    },
    {
      question: "How is the mapping of customer service lines and meter locations updated and maintained?",
      inputType: "select",
      options: [
        "Changes to the service line and meter location inventory are recorded and updated at least annually",
        "Changes to the service line and meter location inventory are recorded, but updates occur less than once a year",
        "Customer service line and meter location inventory is either not maintained or not kept up to date"
      ],
      weight: 30,
      scores: [10, 6, 0]
    },
    {
      question: "How often is the mapping of service lines verified in the field to ensure it matches actual ground conditions?",
      inputType: "select",
      options: [
        "Field validation is carried out, either through routine work order processes or dedicated validation projects",
        "No field validation is performed"
      ],
      weight: 10,
      scores: [10, 0]
    },
    {
      question: "What is the policy that defines where the utility’s ownership of the service line ends, and the customer’s ownership begins?",
      inputType: "select",
      options: [
        "Policy is clearly defined, and its implementation in practice is regularly followed",
        "Policy is clearly defined, but its implementation in practice is uncertain",
        "Policy exists but lacks clarity",
        "No formal policy exists"
      ],
      weight: 20,
      scores: [10, 6, 3, 0]
    }
  ]
};
