import { DVSCategory } from "./types";

export const VPC: DVSCategory = {
  categoryKey: "VPC",
  label: "Variable Production Cost",
  description: "Variable cost of producing one unit of water",
  inputs: [
    { key: "VPC", label: "Variable Production Cost", description: "Variable cost of producing one unit of water", type: "currency", unit: "INR/MLD" },
  ],
  validationQuestions: [
    {
      question: "Choose the statement that most accurately reflects how this input value was determined",
      inputType: "select",
      options: [
        "The utility elected to use the CRUC value for entering the VPC",
        "The utility selected the most expensive source, and its unit cost was used for the calculation",
        "There are multiple water sources, and the input value was derived using a volume-weighted average of all sources",
        "There is only one water source, which served as the basis for the input derivation",
        "A simple average was computed using data from multiple sources",
        "Provisionally estimated in the absence of precise data"
      ]
    },
    {
      question: "Choose the option that most accurately describes the short-run marginal costs included in this input. Short-run marginal costs may comprise treatment chemicals and power, distribution pumping power, and water acquisition or extraction charges. Depending on the system design, some of these costs may not apply.\nThe auditor should evaluate system operations to determine which costs are relevant for the VPC calculation. Guidance is available in the latest CPHEEO Manual",
      inputType: "select",
      options: [
        "All relevant short-run marginal costs have been fully incorporated",
        "Only a portion of the relevant short-run marginal costs has been incorporated"
      ]
    },
    {
      question: "Choose the option that most accurately reflects the long-run marginal costs included in the input. These may include treatment residuals management, accelerated equipment wear due to operational use, payouts from main or service line break claims, costs linked to expanding supply capacity or managing scarcity, and full-cost pricing that incorporates lifecycle and externality costs. Depending on the system, some of these costs may not apply. The auditor should review system operations to determine which are relevant. Refer to the CPHEEO Manual for further guidance",
      inputType: "select",
      options: [
        "All relevant long-run marginal costs were assessed for applicability and have been fully incorporated",
        "Applicable long-run marginal costs were assessed, and while some have been incorporated, others remain excluded",
        "An evaluation of applicable long-run marginal costs has not been undertaken, and these costs have not been incorporated"
      ]
    },
    {
      question: "Has the derivation of this input been evaluated by a qualified expert?",
      inputType: "yesno"
    }
  ]
};
