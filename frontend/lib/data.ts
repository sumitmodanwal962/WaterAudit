export const DATA_INPUTS = [
  { key: "VOS", label: "Volume from Own Sources", description: "Total volume of water produced from own sources", type: "volume", unit: "MLD" },
  { key: "WI", label: "Water Imported", description: "Total volume of water imported from external sources", type: "volume", unit: "MLD" },
  { key: "WE", label: "Water Exported", description: "Total volume of water exported to other utilities", type: "volume", unit: "MLD" },
  { key: "BMAC", label: "Billed Metered Authorized Consumption", description: "Billed and metered authorized water consumption", type: "volume", unit: "MLD" },
  { key: "BUAC", label: "Billed Unmetered Authorized Consumption", description: "Billed but unmetered authorized water consumption", type: "volume", unit: "MLD" },
  { key: "UMAC", label: "Unbilled Metered Authorized Consumption", description: "Unbilled but metered authorized water consumption", type: "volume", unit: "MLD" },
  { key: "UUAC", label: "Unbilled Unmetered Authorized Consumption", description: "Unbilled and unmetered authorized water consumption", type: "volume", unit: "MLD" },
  { key: "SDHE", label: "Systematic Data Handling Errors", description: "Adjustments related to data handling and reporting errors", type: "volume", unit: "MLD" },
  { key: "CMI", label: "Customer Metering Inaccuracies", description: "Volume of losses due to customer meter inaccuracies", type: "volume", unit: "MLD" },
  { key: "UWW", label: "Unaccounted Wastewater", description: "Volume of unaccounted wastewater", type: "volume", unit: "MLD" },
  { key: "UC", label: "Unauthorized Consumption", description: "Volume of water consumed without authorization", type: "volume", unit: "MLD" },
  { key: "Lm", label: "Length of Mains", description: "Total length of water distribution mains", type: "number", unit: "km" },
  { key: "Nc", label: "Number of Service Connections", description: "Total number of service connections", type: "integer", unit: "count" },
  { key: "SCDensity", label: "Service Connection Density", description: "Number of service connections per km of mains", type: "number", unit: "connections/km" },
  { key: "Lp", label: "Average Length of Customer Service Line", description: "Average length of private customer service lines", type: "number", unit: "km" },
  { key: "AOP", label: "Average Operating Pressure", description: "Average system operating pressure", type: "number", unit: "psi" },
  { key: "CRUC", label: "Customer Retail Unit Charge", description: "Average retail charge per unit of water", type: "currency", unit: "INR/MLD" },
  { key: "RealLossesPerConnection", label: "Volume of Real Losses", description: "Real losses per connection per day", type: "number", unit: "litres/connection/day" },
  { key: "MarginalCostWater", label: "Marginal Cost of Water Production", description: "Cost of producing one additional unit of water (power, chemicals, labour)", type: "currency", unit: "INR/MLD" },
  { key: "AnnualLeakageControlCost", label: "Annual Cost of Leakage Control", description: "Annual cost for DMA establishment, leakage detection, and O&M", type: "currency", unit: "INR" },
  { key: "TotalWaterLosses", label: "Total Water Losses", description: "Total water losses in the distribution system", type: "volume", unit: "MLD" },
  { key: "ApparentLosses", label: "Apparent Losses", description: "Losses due to meter inaccuracies, unauthorized consumption, and data errors", type: "volume", unit: "MLD" },
  { key: "VPC", label: "Variable Production Cost", description: "Variable cost of producing one unit of water", type: "currency", unit: "INR/MLD" },
  { key: "HouseholdsWithConnection", label: "Households With Direct Connection", description: "Total households that have direct water supply connections", type: "integer", unit: "count" },
  { key: "TotalHouseholds", label: "Total Households in Service Area", description: "Total households in the service area", type: "integer", unit: "count" },
  { key: "WaterSupplied", label: "Water Supplied to Network", description: "Total water supplied to the distribution system", type: "volume", unit: "litres" },
  { key: "DaysInMonth", label: "Number of Days in Month", description: "Number of days used for monthly calculations", type: "integer", unit: "days" },
  { key: "Population", label: "Population Served", description: "Total population served by the water utility", type: "integer", unit: "count" },
  { key: "MeteredDirectConnections", label: "Metered Direct Connections", description: "Number of metered direct service connections", type: "integer", unit: "count" },
  { key: "MeteredPublicStandposts", label: "Metered Public Standposts", description: "Number of metered public standposts", type: "integer", unit: "count" },
  { key: "TotalDirectConnections", label: "Total Direct Connections", description: "Total number of direct service connections", type: "integer", unit: "count" },
  { key: "TotalMeteredDirectConnections", label: "Total Metered Direct Service Connections", description: "Total number of direct service connections that are metered", type: "integer", unit: "count" },
  { key: "WaterQualitySamples", label: "Water Quality Samples Meeting Standards", description: "Number of samples meeting potable water standards in the month", type: "integer", unit: "count" },
  { key: "TotalComplaints", label: "Total Water Supply Complaints", description: "Total number of water supply related complaints received per month", type: "integer", unit: "count" },
  { key: "ComplaintsRedressed", label: "Complaints Redressed", description: "Total number of complaints redressed within the month", type: "integer", unit: "count" },
  { key: "AnnualRevenues", label: "Total Annual Operating Revenues", description: "Total operating revenues of the utility for the year", type: "currency", unit: "INR" },
  { key: "AnnualExpenses", label: "Total Annual Operating Expenses", description: "Total operating expenses of the utility", type: "currency", unit: "INR" },
  { key: "CurrentRevenuesCollected", label: "Current Revenues Collected", description: "Revenue actually collected during the year", type: "currency", unit: "INR" },
  { key: "TotalRevenuesBilled", label: "Total Revenues Billed", description: "Total revenue billed during the year", type: "currency", unit: "INR" },
  { key: "HoursPerDay", label: "Average Hours of Water Supply Per Day", description: "Average number of supply hours per day", type: "number", unit: "hours/day" }
];

// ──────────────────────────────────────────────────────────────────
// Validation Questions — each question now specifies its own
// inputType: "yesno" | "percentage" | "select" | "number" | "text"
// and, for "select", an array of domain-specific options.
// ──────────────────────────────────────────────────────────────────

export interface ValidationQuestion {
  question: string;
  inputType: "yesno" | "percentage" | "select" | "number" | "text";
  options?: string[];          // only used when inputType === "select"
  unit?: string;               // only used when inputType === "number"
  placeholder?: string;        // hint text for number / text inputs
}

export const VALIDATION_QUESTIONS: Record<string, ValidationQuestion[]> = {

  /* ── VOS / WI / WE ─────────────────────────────────────────── */
  "VOS_WI_WE": [
    {
      question: "Did the water utility draw any water from its own sources during the audit year?",
      inputType: "yesno"
    },
    {
      question: "What percentage of the self-supplied water is measured by meters?",
      inputType: "percentage"
    },
    {
      question: "How often is electronic calibration of flow meters carried out?",
      inputType: "select",
      options: [
        "Never performed",
        "Only when a fault is detected",
        "Once every 2–5 years",
        "Annually",
        "Semi-annually or more frequently"
      ]
    },
    {
      question: "What type of data transfer errors are verified during the electronic calibration process?",
      inputType: "select",
      options: [
        "No verification done",
        "Only signal output is checked",
        "Signal output and totaliser readings are compared",
        "Full end-to-end data path verification (sensor → logger → SCADA/database)",
        "Automated continuous data integrity checks"
      ]
    },
    {
      question: "Is the latest record or report of electronic calibration available for inspection?",
      inputType: "select",
      options: [
        "No records exist",
        "Records exist but are incomplete or outdated (>3 years)",
        "Records exist but not easily accessible",
        "Up-to-date records are available on request",
        "Complete digital records are readily accessible and regularly maintained"
      ]
    },
    {
      question: "How frequently is on-site flow accuracy testing of meters done?",
      inputType: "select",
      options: [
        "Never performed",
        "Only when a fault is detected",
        "Once every 2–5 years",
        "Annually",
        "Semi-annually or more frequently"
      ]
    },
    {
      question: "Is the latest on-site flow accuracy test report available for inspection?",
      inputType: "select",
      options: [
        "No reports exist",
        "Reports exist but are incomplete or outdated (>3 years)",
        "Reports exist but not easily accessible",
        "Up-to-date reports are available on request",
        "Complete digital reports are readily accessible and regularly maintained"
      ]
    },
    {
      question: "What are the total volume-weighted average results from the latest on-site flow accuracy checks?",
      inputType: "select",
      options: [
        "No accuracy data available",
        "Accuracy within ±10% or worse",
        "Accuracy within ±5–10%",
        "Accuracy within ±2–5%",
        "Accuracy within ±2% or better"
      ]
    },
    {
      question: "Have the testing and calibration procedures been reviewed to ensure compliance with standard manuals or guidelines?",
      inputType: "select",
      options: [
        "No review conducted",
        "Informal / ad-hoc review only",
        "Internal review done but not documented",
        "Documented internal review following standard procedures",
        "Independent third-party audit and certification completed"
      ]
    },
    {
      question: "How often are final (treated) water meter readings recorded?",
      inputType: "select",
      options: [
        "Not recorded",
        "Monthly or less frequently",
        "Weekly",
        "Daily (manual log)",
        "Continuous / real-time (SCADA or telemetry)"
      ]
    },
    {
      question: "How frequently is data checked for abnormal values, missing records, or errors in meter readings?",
      inputType: "select",
      options: [
        "No checks performed",
        "Only when an issue is reported",
        "Monthly or quarterly review",
        "Weekly review",
        "Automated real-time anomaly detection"
      ]
    }
  ],

  /* ── VOS/WI/WE Error Adjustment ────────────────────────────── */
  "VOS_WI_WE_EA": [
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
  ],

  /* ── BMAC ───────────────────────────────────────────────────── */
  "BMAC": [
    {
      question: "Were any customers provided metered water connections during the audit year?",
      inputType: "yesno"
    },
    {
      question: "For billed and metered consumers, what percentage of bills are based on actual meter readings in a normal billing cycle?",
      inputType: "percentage"
    },
    {
      question: "How often does the utility take meter readings from its customers?",
      inputType: "select",
      options: [
        "Annually or less frequently",
        "Half-yearly",
        "Quarterly",
        "Bi-monthly",
        "Monthly or more frequently"
      ]
    },
    {
      question: "If there are different meter reading schedules, what is the most common frequency for most customers?",
      inputType: "select",
      options: [
        "Annually or less frequently",
        "Half-yearly",
        "Quarterly",
        "Bi-monthly",
        "Monthly or more frequently"
      ]
    },
    {
      question: "Is the BMAC volume adjusted so that it accurately represents water consumption during the audit year?",
      inputType: "select",
      options: [
        "No adjustment made",
        "Minor adjustment using rough estimates",
        "Adjusted using average consumption factors",
        "Adjusted using pro-rata calculations for each billing cycle",
        "Precisely adjusted using actual daily / monthly meter data"
      ]
    },
    {
      question: "How often do utility staff conduct internal reviews of the BMAC data?",
      inputType: "select",
      options: [
        "No internal reviews",
        "Only when discrepancies are reported",
        "Annually",
        "Quarterly",
        "Monthly or more frequently"
      ]
    },
    {
      question: "What level of detail is checked during the internal review of BMAC data?",
      inputType: "select",
      options: [
        "No review performed",
        "Only totals are verified",
        "Totals and sample accounts are checked",
        "Detailed check of major consumer categories",
        "Comprehensive account-level audit with statistical sampling"
      ]
    },
    {
      question: "When was the last billing data review conducted by a person who is independent of the utility\u2019s billing team?",
      inputType: "select",
      options: [
        "Never conducted",
        "More than 5 years ago",
        "Within the last 3–5 years",
        "Within the last 1–2 years",
        "Within the last 12 months"
      ]
    },
    {
      question: "What level of detail was covered in that independent review of billing data?",
      inputType: "select",
      options: [
        "No independent review conducted",
        "Only summary-level totals reviewed",
        "Sample-based review of selected accounts",
        "Detailed review of major consumer categories and anomalies",
        "Full account-level forensic audit with documented findings"
      ]
    }
  ],

  /* ── BUAC ───────────────────────────────────────────────────── */
  "BUAC": [
    {
      question: "Was there any billed water used for consumers without meters during the audit year?",
      inputType: "yesno"
    },
    {
      question: "What percentage of billed consumers do not have water meters (based on number of connections)?",
      inputType: "percentage"
    },
    {
      question: "What method is used to calculate or estimate water use for unmetered consumers?",
      inputType: "select",
      options: [
        "No estimation method used",
        "Flat-rate assumption (same for all consumers)",
        "Category-based per-capita norms (residential, commercial, etc.)",
        "Estimates derived from comparable metered consumer data",
        "Field-verified estimates using temporary metering or surveys"
      ]
    },
    {
      question: "How often is water consumption for unmetered consumers estimated or updated?",
      inputType: "select",
      options: [
        "Never updated after initial estimate",
        "Updated only when major changes occur",
        "Updated annually",
        "Updated semi-annually",
        "Updated quarterly or more frequently"
      ]
    }
  ],

  /* ── UMAC ───────────────────────────────────────────────────── */
  "UMAC": [
    {
      question: "Did the water utility have any metered connections where water use was not billed during the audit year?",
      inputType: "yesno"
    },
    {
      question: "Does the utility have a clear policy mentioning which metered connections are exempted from billing?",
      inputType: "select",
      options: [
        "No policy exists",
        "Informal understanding only",
        "Written policy exists but is not consistently followed",
        "Written policy exists and is mostly followed",
        "Documented, approved policy that is strictly enforced and regularly reviewed"
      ]
    },
    {
      question: "How many metered connections exist that are not billed for water use?",
      inputType: "number",
      unit: "connections",
      placeholder: "Enter number of connections"
    },
    {
      question: "How frequently are meters of unbilled consumers read? (If there are multiple schedules, select the most common one.)",
      inputType: "select",
      options: [
        "Never read",
        "Annually or less frequently",
        "Half-yearly",
        "Quarterly",
        "Monthly or more frequently"
      ]
    },
    {
      question: "How often are the unbilled metered readings checked or reviewed for possible errors?",
      inputType: "select",
      options: [
        "No checks performed",
        "Only when an issue is reported",
        "Annually",
        "Quarterly",
        "Monthly or more frequently"
      ]
    }
  ],

  /* ── UUAC ───────────────────────────────────────────────────── */
  "UUAC": [
    {
      question: "What is the default status shown in the worksheet for unbilled\u2013unmetered use?",
      inputType: "select",
      options: [
        "Default used with no review",
        "Default accepted after basic check",
        "Default value modified with rough estimate",
        "Custom value entered based on available data",
        "Custom value entered based on field-verified data"
      ]
    },
    {
      question: "How clearly does the utility understand the total amount of unbilled and unmetered water use?",
      inputType: "select",
      options: [
        "No understanding / not tracked",
        "Very rough estimate only",
        "Moderate understanding based on assumptions",
        "Good understanding based on indirect data and analysis",
        "Comprehensive understanding based on field measurements and studies"
      ]
    },
    {
      question: "What type of records or logs are maintained for unbilled and unmetered water use?",
      inputType: "select",
      options: [
        "No records maintained",
        "Informal notes only",
        "Basic log of major unbilled uses (fire fighting, flushing, etc.)",
        "Detailed log with estimated volumes per use event",
        "Comprehensive records with measured or metered volumes per event"
      ]
    },
    {
      question: "How is the unbilled and unmetered water use mainly estimated?",
      inputType: "select",
      options: [
        "Not estimated / default percentage assumed",
        "Fixed percentage of system input volume",
        "Category-based estimates (flushing, fire, construction, etc.)",
        "Estimates supported by operational data and field observations",
        "Field measurements and temporary metering campaigns"
      ]
    }
  ],

  /* ── SDHE ───────────────────────────────────────────────────── */
  "SDHE": [
    {
      question: "What is the default status shown in the worksheet for this data entry?",
      inputType: "select",
      options: [
        "Default used with no review",
        "Default accepted after basic check",
        "Default value modified with rough estimate",
        "Custom value entered based on available data",
        "Custom value entered based on verified data"
      ]
    },
    {
      question: "How was the input data generated or calculated?",
      inputType: "select",
      options: [
        "Default value used (no calculation)",
        "Rough estimate based on experience / assumption",
        "Calculated from billing system summary reports",
        "Calculated from detailed billing data analysis",
        "Derived from comprehensive metering and billing system audit"
      ]
    },
    {
      question: "What kind of checks or validations are done in the billing software to ensure correct unit conversions between meter readings and billing units?",
      inputType: "select",
      options: [
        "No automated checks exist",
        "Manual spot-checks by billing staff",
        "Basic automated validation (range checks only)",
        "Automated validation with exception reporting and manual review",
        "Full automated validation with audit trail and regular third-party review"
      ]
    },
    {
      question: "What is the utility\u2019s policy to ensure that new water connections start being metered and billed without any delay?",
      inputType: "select",
      options: [
        "No policy exists",
        "Policy exists but not enforced",
        "Policy exists with occasional compliance checks",
        "Policy exists with regular monitoring and reporting",
        "Strict policy with automated tracking and zero-delay billing activation"
      ]
    },
    {
      question: "What type of auditing or review is carried out for the billing process?",
      inputType: "select",
      options: [
        "No auditing or review",
        "Internal review only when issues are reported",
        "Periodic internal review (annual or less)",
        "Regular internal audit (quarterly or more) with documented findings",
        "Independent external audit with documented findings and corrective actions"
      ]
    }
  ],

  /* ── CMI ────────────────────────────────────────────────────── */
  "CMI": [
    {
      question: "Were there any customers with metered water connections during the audit year?",
      inputType: "yesno"
    },
    {
      question: "Are customer meters tested only when a complaint or billing issue is reported?",
      inputType: "select",
      options: [
        "Yes, only on complaint",
        "Mostly on complaint, with very limited proactive testing",
        "Mix of complaint-based and scheduled proactive testing",
        "Primarily proactive testing with complaints handled separately",
        "Comprehensive proactive testing program; complaints are rare"
      ]
    },
    {
      question: "For small-size customer meters, how often are meters tested proactively (apart from complaint-based testing)?",
      inputType: "select",
      options: [
        "No proactive testing",
        "Only when meter age exceeds 10+ years",
        "Once every 5–10 years",
        "Once every 3–5 years",
        "Every 1–3 years or per manufacturer recommendation"
      ]
    },
    {
      question: "Which types of small-size customer meters are covered under proactive testing activities?",
      inputType: "select",
      options: [
        "None",
        "Only very old or suspected faulty meters",
        "Meters in high-consumption areas only",
        "All meter types on a rotational / sampling basis",
        "All meter types comprehensively as per a documented schedule"
      ]
    },
    {
      question: "For medium and large customer meters, how often are proactive tests carried out?",
      inputType: "select",
      options: [
        "No proactive testing",
        "Only when meter age exceeds 10+ years",
        "Once every 5–10 years",
        "Once every 1–3 years",
        "Annually or more frequently"
      ]
    },
    {
      question: "Which types of medium and large customer meters are included in the proactive testing program?",
      inputType: "select",
      options: [
        "None",
        "Only bulk or industrial meters",
        "Bulk, industrial, and major commercial meters",
        "All medium and large meters on a rotational / sampling basis",
        "All medium and large meters comprehensively as per a documented schedule"
      ]
    },
    {
      question: "How was the input data for this section collected or derived?",
      inputType: "select",
      options: [
        "Default value used (no data collection)",
        "Rough estimate based on experience / assumption",
        "Derived from meter test results of a small sample",
        "Derived from statistically significant meter test sample",
        "Derived from comprehensive meter testing and analysis program"
      ]
    },
    {
      question: "Has the input data been reviewed by a qualified expert familiar with the standard water audit methodology?",
      inputType: "select",
      options: [
        "No review",
        "Reviewed internally by non-specialist staff",
        "Reviewed internally by trained staff",
        "Reviewed by an external consultant",
        "Reviewed and certified by an accredited water audit expert"
      ]
    },
    {
      question: "How frequently are customer meters replaced, and for which categories of meters?",
      inputType: "select",
      options: [
        "No replacement program",
        "Replaced only on failure",
        "Periodic replacement for some categories (e.g., oldest meters)",
        "Scheduled replacement program for most categories",
        "Comprehensive age-based and performance-based replacement program for all categories"
      ]
    },
    {
      question: "How reliable are the records related to meter installation and maintenance?",
      inputType: "select",
      options: [
        "No records maintained",
        "Incomplete or inconsistent paper records",
        "Basic paper or spreadsheet records",
        "Digital records (database or GIS) with regular updates",
        "Comprehensive digital asset management system with full history"
      ]
    }
  ],

  /* ── UC (Unauthorized Consumption) ──────────────────────────── */
  "UC": [
    {
      question: "What is the default status shown in the worksheet for this data entry?",
      inputType: "select",
      options: [
        "Default used with no review",
        "Default accepted after basic check",
        "Default value modified with rough estimate",
        "Custom value entered based on available data",
        "Custom value entered based on verified data"
      ]
    },
    {
      question: "How was the information or input for unauthorized consumption collected or derived?",
      inputType: "select",
      options: [
        "Default value used (no investigation)",
        "Rough estimate based on general assumptions",
        "Estimate based on illegal connection surveys in some areas",
        "Estimate based on systematic surveys and enforcement data",
        "Derived from comprehensive anti-theft programs with measured data"
      ]
    },
    {
      question: "How effectively does the utility monitor and track unauthorized or illegal water use?",
      inputType: "select",
      options: [
        "No monitoring at all",
        "Reactive only (acts on complaints or tips)",
        "Periodic field surveys in known problem areas",
        "Regular surveillance with dedicated teams and reporting",
        "Continuous monitoring with technology (smart meters, GIS, DMA analysis) and dedicated enforcement"
      ]
    }
  ],

  /* ── Lm (Length of Mains) ───────────────────────────────────── */
  "Lm": [
    {
      question: "How was the data on the length of water mains collected or calculated?",
      inputType: "select",
      options: [
        "Rough estimate or assumed value",
        "Derived from old paper maps or design drawings",
        "Measured from updated paper maps or CAD drawings",
        "Extracted from a GIS database",
        "Extracted from a field-verified and regularly updated GIS database"
      ]
    },
    {
      question: "Are fire hydrant connections and laterals included in the total length of mains?",
      inputType: "select",
      options: [
        "Not sure / unknown",
        "No, excluded entirely",
        "Partially included",
        "Yes, included based on estimates",
        "Yes, fully included based on measured data"
      ]
    },
    {
      question: "How is the record of water mains (like GIS map, asset register, or ledger) updated and maintained?",
      inputType: "select",
      options: [
        "No records maintained",
        "Records exist but are rarely updated",
        "Updated periodically (every few years)",
        "Updated annually with new installations and replacements",
        "Continuously updated in real time or near-real time"
      ]
    },
    {
      question: "How often is the mains inventory (GIS or records) verified in the field to ensure it matches actual ground conditions?",
      inputType: "select",
      options: [
        "Never verified in the field",
        "Verified only during major projects or repairs",
        "Verified once every few years",
        "Verified annually on a sample basis",
        "Verified regularly on a systematic / rolling basis"
      ]
    }
  ],

  /* ── Nc (Number of Service Connections) ─────────────────────── */
  "Nc": [
    {
      question: "How was the information about service connections collected or calculated?",
      inputType: "select",
      options: [
        "Rough estimate or assumed value",
        "Derived from old billing records",
        "Extracted from current billing system",
        "Cross-referenced billing, GIS, and field data",
        "Comprehensive field-verified database"
      ]
    },
    {
      question: "On what data or records is the total count of service connections based?",
      inputType: "select",
      options: [
        "Rough departmental estimate",
        "Billing records only",
        "Billing + connection application records",
        "GIS database with billing cross-reference",
        "Field-verified GIS with complete asset register"
      ]
    },
    {
      question: "Are inactive (but still connected or pressurized) service lines included in the count? (These could be metered or unmetered.)",
      inputType: "select",
      options: [
        "Unknown / not tracked",
        "No, only active connections counted",
        "Partially included",
        "Yes, included based on estimates",
        "Yes, fully included based on verified records"
      ]
    },
    {
      question: "How is the record of service connections (like GIS, billing data, or registers) updated and maintained?",
      inputType: "select",
      options: [
        "No systematic records",
        "Records exist but rarely updated",
        "Updated periodically (every few years)",
        "Updated annually with new and decommissioned connections",
        "Continuously updated in real time or near-real time"
      ]
    },
    {
      question: "How often is the service connection inventory (GIS or records) verified in the field to ensure it matches actual site conditions?",
      inputType: "select",
      options: [
        "Never verified in the field",
        "Verified only during major projects",
        "Verified once every few years",
        "Verified annually on a sample basis",
        "Verified regularly on a systematic / rolling basis"
      ]
    }
  ],

  /* ── Lp (Average Length of Customer Service Line) ───────────── */
  "Lp": [
    {
      question: "Are customer water meters usually installed near the boundary wall or on the property line?",
      inputType: "select",
      options: [
        "No — meters are inside the property at varying distances",
        "Mostly no — mixed locations with no standard",
        "About half at boundary, half inside",
        "Mostly yes — at or near the boundary wall",
        "Yes — standard practice to install at the boundary/property line"
      ]
    },
    {
      question: "How was the information about the average length of customer service lines collected or calculated?",
      inputType: "select",
      options: [
        "Default assumption used (no measurement)",
        "Rough estimate based on typical plot sizes",
        "Measured for a small sample of connections",
        "Measured for a statistically significant sample",
        "Comprehensive measurement from GIS / as-built records"
      ]
    },
    {
      question: "How is the mapping of customer service lines and meter locations updated and maintained?",
      inputType: "select",
      options: [
        "No mapping exists",
        "Paper records / sketches exist but are rarely updated",
        "Basic digital records updated periodically",
        "GIS-based mapping updated annually",
        "GIS-based mapping updated continuously with field verification"
      ]
    },
    {
      question: "How often is the mapping of service lines verified in the field to ensure it matches actual ground conditions?",
      inputType: "select",
      options: [
        "Never verified",
        "Verified only during major works",
        "Verified once every few years",
        "Verified annually on a sample basis",
        "Verified regularly on a systematic / rolling basis"
      ]
    },
    {
      question: "What is the policy that defines where the utility\u2019s ownership of the service line ends, and the customer\u2019s ownership begins?",
      inputType: "select",
      options: [
        "No defined policy",
        "Informal understanding only",
        "Written policy exists but is inconsistently applied",
        "Written policy exists and is mostly followed",
        "Clearly documented, legally enforceable policy that is consistently applied"
      ]
    }
  ],

  /* ── AOP (Average Operating Pressure) ───────────────────────── */
  "AOP": [
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
  ],

  /* ── CRUC (Customer Retail Unit Charge) ─────────────────────── */
  "CRUC": [
    {
      question: "Was any metered consumption billed on a volumetric basis in the audit period?",
      inputType: "yesno"
    },
    {
      question: "Which best describes the use and reliability of the current rate structure?",
      inputType: "select",
      options: [
        "No volumetric tariff — flat rate only",
        "Volumetric tariff exists but is outdated or inconsistently applied",
        "Volumetric tariff applied for most customers but with known gaps",
        "Volumetric tariff reliably applied for all metered customers",
        "Volumetric tariff with regular revision, fully applied and audited"
      ]
    },
    {
      question: "Choose the option that best describes how the input was derived.",
      inputType: "select",
      options: [
        "Default or assumed value",
        "Rough estimate from total revenue ÷ total billed volume",
        "Calculated from billing summary reports",
        "Calculated from detailed billing data with tariff slab analysis",
        "Derived from audited financial records with independent verification"
      ]
    },
    {
      question: "Is there any additional volumetric revenue the utility receives that depends on water meter readings, such as sewer?",
      inputType: "select",
      options: [
        "Unknown",
        "No additional volumetric revenue",
        "Yes, but not tracked separately",
        "Yes, tracked but not included in audit",
        "Yes, tracked and fully included in the audit calculation"
      ]
    },
    {
      question: "Has the input derivation been reviewed by someone with expert knowledge in the M36 methodology?",
      inputType: "select",
      options: [
        "No review",
        "Reviewed internally by non-specialist staff",
        "Reviewed internally by trained staff",
        "Reviewed by an external consultant",
        "Reviewed and certified by an accredited water audit / M36 expert"
      ]
    },
    {
      question: "Was customer water consumption billed based on actual meter readings (volumetric tariff) during the audit year?",
      inputType: "yesno"
    },
    {
      question: "How reliable and consistently applied is the current tariff structure (per-kiloliter rate, slab, or flat charge) used by the utility?",
      inputType: "select",
      options: [
        "No defined tariff structure",
        "Tariff exists but is outdated or inconsistently applied",
        "Tariff applied for most customers with some inconsistencies",
        "Tariff reliably and consistently applied for all customers",
        "Tariff regularly revised, uniformly applied, and independently audited"
      ]
    },
    {
      question: "How were the billing and tariff data used for the audit derived or compiled (e.g., from billing software, manual registers, or revenue reports)?",
      inputType: "select",
      options: [
        "Derived from rough estimates or assumptions",
        "Compiled from manual registers or paper records",
        "Extracted from billing software (summary level)",
        "Extracted from billing software with detailed account-level analysis",
        "Extracted from audited billing software and cross-verified with revenue/financial records"
      ]
    },
    {
      question: "Does the utility collect any linked volumetric charges (e.g., sewerage, wastewater, or environmental fee) that depend on metered water use?",
      inputType: "select",
      options: [
        "Unknown",
        "No linked volumetric charges",
        "Yes, but not tracked separately",
        "Yes, tracked but not included in the audit",
        "Yes, tracked and fully integrated into the audit calculation"
      ]
    },
    {
      question: "Have the tariff and billing data inputs been verified or reviewed by a qualified auditor or domain expert, in line with recognized water audit practices?",
      inputType: "select",
      options: [
        "No verification or review",
        "Reviewed internally by non-specialist staff",
        "Reviewed internally by trained billing / finance staff",
        "Reviewed by an external consultant or auditor",
        "Independently verified and certified by an accredited expert"
      ]
    }
  ],

  /* ── UWW (Unaccounted Wastewater) ───────────────────────────── */
  "UWW": [
    {
      question: "How reliable are the data sources used for estimating wastewater generation (e.g., household surveys, water supply data, or design assumptions)?",
      inputType: "select",
      options: [
        "Assumed design norms only",
        "Fixed return ratio (no validation)",
        "Derived from supply data (partial check)",
        "Field-verified per-capita discharge",
        "Continuous metering with verified return ratio"
      ]
    },
    {
      question: "Are wastewater flow measurements at pumping stations, manholes, or treatment plants regularly verified for accuracy?",
      inputType: "select",
      options: [
        "Not verified",
        "Verified during fault events",
        "Annual internal test",
        "Semi-annual calibration",
        "Continuous or SCADA-based verification"
      ]
    },
    {
      question: "How consistent are the wastewater data records (daily, monthly, or annually) maintained across multiple agencies or departments?",
      inputType: "select",
      options: [
        "No coordination",
        "Irregular reporting",
        "Annual reconciliation",
        "Monthly cross-verification",
        "Integrated centralized database"
      ]
    },
    {
      question: "Are flow meters and sensors in the wastewater system calibrated and maintained as per standard procedures?",
      inputType: "select",
      options: [
        "Not calibrated",
        "Irregular manual check",
        "Annual internal calibration",
        "Bi-annual standard calibration",
        "Third-party certified calibration"
      ]
    },
    {
      question: "How are missing data, meter malfunctions, or gaps in flow records identified and corrected in official reporting?",
      inputType: "select",
      options: [
        "Not addressed",
        "Manually corrected",
        "Simple interpolation",
        "Automated flagging",
        "Real-time SCADA correction"
      ]
    },
    {
      question: "What level of confidence does the utility have in the accuracy and completeness of wastewater generation and collection data?",
      inputType: "select",
      options: [
        "Very Low",
        "Low",
        "Medium",
        "High",
        "Very High"
      ]
    }
  ]
};

// Map each specific data key to its relevant validation question category
export const CATEGORY_MAP: Record<string, string> = {
  "VOS": "VOS_WI_WE",
  "WI": "VOS_WI_WE",
  "WE": "VOS_WI_WE",
  "BMAC": "BMAC",
  "BUAC": "BUAC",
  "UMAC": "UMAC",
  "UUAC": "UUAC",
  "SDHE": "SDHE",
  "CMI": "CMI",
  "UWW": "UWW",
  "UC": "UC",
  "Lm": "Lm",
  "Nc": "Nc",
  "Lp": "Lp",
  "AOP": "AOP",
  "CRUC": "CRUC"
};
