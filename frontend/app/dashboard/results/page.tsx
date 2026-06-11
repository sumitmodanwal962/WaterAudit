"use client"

import { useState, useEffect, Suspense } from "react"
import { ArrowLeft, Download, Share2, ClipboardList, Loader2, Wrench, DollarSign, FileSpreadsheet, X, AlertCircle, CalendarRange, Clock, PieChart, TrendingUp, CheckCircle, Leaf, Zap, Factory, FlaskConical, Sun } from "lucide-react"
import { CoverageIcon, PerCapitaIcon, WaterLossIcon, ContinuityIcon, QualityIcon, PressureIcon, RevenueRatioIcon, ZapIcon, BasicGaugeIcon, MoneyIcon } from "@/components/CustomIcons"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { getDataInput, getProject, Project } from "@/lib/api"
import { ALL_DVS_CATEGORIES, CATEGORY_MAP } from "@/lib/dvs"
import { calculateDVS, calculateKPIs } from "@/lib/dvs/calculator"
import { useAudit } from "@/contexts/AuditContext"
import { generateAuditReport } from "@/lib/pdfGenerator"
import { calculateCarbonFootprint, CarbonFootprintResults } from "@/lib/carbonCalculator"

// ── Animated Gauge Component ─────────────────────────────────────

function GaugeChart({ value, max, label, icon: Icon, color, suffix = "" }: {
  value: number;
  max: number;
  label: string;
  icon: React.ElementType;
  color: string;
  suffix?: string;
}) {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => setAnimatedValue(value), 200);
    return () => clearTimeout(timeout);
  }, [value]);

  const percentage = Math.max(0, Math.min((animatedValue / max) * 100, 100));
  const radius = 90;
  const circumference = Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  // Color ranges
  const getColor = () => {
    if (color === "auto") {
      if (percentage >= 75) return { stroke: "#22c55e", bg: "rgba(34,197,94,0.1)", text: "#16a34a" };
      if (percentage >= 50) return { stroke: "#f59e0b", bg: "rgba(245,158,11,0.1)", text: "#d97706" };
      if (percentage >= 25) return { stroke: "#f97316", bg: "rgba(249,115,22,0.1)", text: "#ea580c" };
      return { stroke: "#ef4444", bg: "rgba(239,68,68,0.1)", text: "#dc2626" };
    }
    return { stroke: color, bg: `${color}15`, text: color };
  };

  const colors = getColor();

  return (
    <div className="relative flex flex-col items-center gap-3 rounded-3xl border border-slate-200 bg-white p-6 pt-12 shadow-sm hover:shadow-lg hover:border-slate-300 transition-all duration-300">
      <div className="absolute top-4 left-4 flex h-14 w-14 items-center justify-center rounded-xl shadow-sm" style={{ backgroundColor: colors.bg }}>
        <Icon className="h-8 w-8" style={{ color: colors.stroke }} />
      </div>
      <div className="relative">
        <svg width="180" height="100" viewBox="0 0 200 110" className="drop-shadow-sm">
          {/* Background track */}
          <path
            d="M 10 100 A 90 90 0 0 1 190 100"
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="14"
            strokeLinecap="round"
          />
          {/* Animated fill */}
          <path
            d="M 10 100 A 90 90 0 0 1 190 100"
            fill="none"
            stroke={colors.stroke}
            strokeWidth="14"
            strokeLinecap="round"
            strokeDasharray={`${circumference}`}
            strokeDashoffset={strokeDashoffset}
            style={{
              transition: "stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1)",
              filter: `drop-shadow(0 0 6px ${colors.stroke}40)`
            }}
          />
          {/* Tick marks */}
          {[0, 25, 50, 75, 100].map((tick) => {
            const angle = Math.PI - (tick / 100) * Math.PI;
            const x1 = 100 + 90 * Math.cos(angle);
            const y1 = 100 - 90 * Math.sin(angle);
            const x2 = 100 + 83 * Math.cos(angle);
            const y2 = 100 - 83 * Math.sin(angle);
            return (
              <line key={tick} x1={x1} y1={y1} x2={x2} y2={y2}
                stroke="#cbd5e1" strokeWidth="1.5" />
            );
          })}
        </svg>
        {/* Center value */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-1">
          <span className="text-3xl font-extrabold tracking-tight" style={{ color: colors.text }}>
            {animatedValue >= 1000 ? Math.round(animatedValue).toLocaleString() : animatedValue.toFixed(2)}
          </span>
          {suffix && <span className="text-xs font-medium text-slate-400 -mt-0.5">{suffix}</span>}
        </div>
      </div>
      <div className="flex items-center justify-center text-center mt-1">
        <span className="text-sm font-bold text-slate-700">{label}</span>
      </div>
    </div>
  );
}

// ── Weight Breakdown Bar ─────────────────────────────────────────

function WeightBar({ label, weight, grade, weighted }: {
  label: string;
  weight: number;
  grade: number;
  weighted: number;
}) {
  const [animatedWidth, setAnimatedWidth] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => setAnimatedWidth(grade * 100), 300);
    return () => clearTimeout(timeout);
  }, [grade]);

  const barColor = grade >= 0.75 ? "#22c55e" : grade >= 0.5 ? "#f59e0b" : grade >= 0.25 ? "#f97316" : "#ef4444";

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-slate-700">{label}</span>
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-slate-400">Weight: {(weight * 100).toFixed(0)}%</span>
          <span className="text-sm font-bold" style={{ color: barColor }}>
            {(grade * 100).toFixed(1)}%
          </span>
        </div>
      </div>
      <div className="h-3 rounded-full bg-slate-100 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: `${animatedWidth}%`,
            backgroundColor: barColor,
            boxShadow: `0 0 8px ${barColor}40`
          }}
        />
      </div>
    </div>
  );
}

// ── Main Results Page ────────────────────────────────────────────

const getDVSGrade = (score: number) => {
  if (score >= 90) return { label: "Excellent", color: "#16a34a", bg: "#dcfce7" };
  if (score >= 75) return { label: "Good", color: "#2563eb", bg: "#dbeafe" };
  if (score >= 50) return { label: "Moderate", color: "#d97706", bg: "#fef3c7" };
  if (score >= 25) return { label: "Low", color: "#ea580c", bg: "#ffedd5" };
  return { label: "Very Low", color: "#dc2626", bg: "#fee2e2" };
};

interface DvsZoneData {
  id: string;
  range: string;
  zone: string;
  frequency: string;
  interpretation: string;
  issues: string[];
  interventions: string[];
  color: string;
  bgColor: string;
  borderColor: string;
}

const DVS_RANGES: DvsZoneData[] = [
  {
    id: "critical",
    range: "< 20",
    zone: "Critical Reliability Zone",
    frequency: "Continuous / Complete Infrastructure Renewal",
    interpretation: "Extremely poor data: system cannot be trusted",
    issues: [
      "Utility data cannot be trusted.",
      "Source flow, bulk metering, customer metering, billing, or pressure data missing/inaccurate.",
      "KPIs (NRW, ILI, RWR, ELL) are unreliable."
    ],
    interventions: [
      "Immediate reinstallation or repair of all production/bulk meters.",
      "Replace old/non-functioning customer meters (start with ≥60% consumers).",
      "Conduct full pipeline condition assessment.",
      "Rebuild basic GIS, DMA maps, and connection inventories.",
      "Begin full infrastructure renewal planning cycle.",
      "Implement basic data capture and validation workflows."
    ],
    color: "#ef4444",
    bgColor: "rgba(239, 68, 68, 0.05)",
    borderColor: "rgba(239, 68, 68, 0.2)",
  },
  {
    id: "low",
    range: "20–50",
    zone: "Low Reliability Zone",
    frequency: "Quarterly Water Audit",
    interpretation: "Low reliability: aggressive monitoring needed",
    issues: [
      "Incomplete customer metering; limited pressure data; billing gaps.",
      "Real losses estimation is unreliable.",
      "High dependence on assumed values."
    ],
    interventions: [
      "Conduct a targeted production meter calibration program.",
      "Perform sample-area studies: leak survey, unauthorized consumption survey, sample customer meter testing.",
      "DMA creation for systematic monitoring.",
      "Improve SCADA data logging consistency.",
      "Improve billing accuracy & recover missing consumption records.",
      "Strengthen asset records: pipe materials, ages, valve locations."
    ],
    color: "#f97316",
    bgColor: "rgba(249, 115, 22, 0.05)",
    borderColor: "rgba(249, 115, 22, 0.2)",
  },
  {
    id: "moderate",
    range: "50–80",
    zone: "Moderate Reliability Zone",
    frequency: "Every 6 Months",
    interpretation: "Moderate reliability: semi-annual audits recommended",
    issues: [
      "Most core data streams exist but have moderate uncertainty.",
      "Real losses can be estimated but require refinement.",
      "Apparent losses influenced by meter accuracy and unmetered consumption."
    ],
    interventions: [
      "Establish formal, documented data collection SOPs.",
      "Upgrade customer meter accuracy (testing & replacement cycle).",
      "Implement night-flow analysis in DMAs for real-loss estimation.",
      "Begin pressure management pilots.",
      "Improve accuracy of connection counts & billed consumption.",
      "Plan 5 to 7-year meter replacement cycle.",
      "Implement water balance validation each audit period."
    ],
    color: "#f59e0b",
    bgColor: "rgba(245, 158, 11, 0.05)",
    borderColor: "rgba(245, 158, 11, 0.2)",
  },
  {
    id: "good",
    range: "80–90",
    zone: "Good Reliability Zone",
    frequency: "Annual Water Audit",
    interpretation: "Good reliability: yearly review is adequate",
    issues: [
      "Good-quality source, consumption, and pressure data.",
      "NRW, RWR, ELL, and ILI indicators trustworthy."
    ],
    interventions: [
      "Institutionalize annual water audit procedure.",
      "Expand active leakage control using AWWA-recommended protocols: acoustic loggers, flow/pressure monitoring, system-wide leakage scanning.",
      "Establish medium-term (3–5 year) performance improvement plan.",
      "Enhance GIS and customer database accuracy.",
      "Prioritize pipeline rehabilitation based on break history and leakage hotspots.",
      "Improve billing & collection efficiency where <98%."
    ],
    color: "#2563eb",
    bgColor: "rgba(37, 99, 235, 0.05)",
    borderColor: "rgba(37, 99, 235, 0.2)",
  },
  {
    id: "excellent",
    range: "> 90",
    zone: "Excellent / Best-in-Class Reliability Zone",
    frequency: "Biannual (Once Every 2 Years)",
    interpretation: "Excellent reliability: data can support longer audit cycle",
    issues: [
      "Highly reliable, clean, consistent data.",
      "Audit results can be used confidently for strategic planning."
    ],
    interventions: [
      "Implement predictive leakage management (SCADA + analytics).",
      "Expand AMI/AMR coverage to 100%.",
      "Continue systematic pressure management optimization.",
      "Use KPIs (NRW, ILI, RWR, ELL) for performance benchmarking.",
      "Conduct real-loss target review annually.",
      "Implement long-term (10+ year) infrastructure renewal program."
    ],
    color: "#16a34a",
    bgColor: "rgba(22, 163, 74, 0.05)",
    borderColor: "rgba(22, 163, 74, 0.2)",
  }
];

const getDvsZoneData = (score: number): DvsZoneData => {
  if (score < 20) return DVS_RANGES[0];
  if (score <= 50) return DVS_RANGES[1];
  if (score <= 80) return DVS_RANGES[2];
  if (score <= 90) return DVS_RANGES[3];
  return DVS_RANGES[4];
};

const TIMELINE_STEPS = [
  {
    period: "Short-Term",
    duration: "0 to 2 years",
    color: "#0284c7",
    items: [
      "Speed and quality of repairs (reported & unreported leaks).",
      "Acoustic leak detection and rapid repair.",
      "Implement RWH, greywater reuse, and sewer tax reforms."
    ]
  },
  {
    period: "Medium-Term",
    duration: "3 to 5 years",
    color: "#4f46e5",
    items: [
      "Pressure Management: reduce pressure to 15–21 m, installation of PRVs, SCADA-linked pressure zoning.",
      "100% smart metering with calibration schedule."
    ]
  },
  {
    period: "Long-Term",
    duration: "6+ years",
    color: "#0d9488",
    items: [
      "Infrastructure renewal programs.",
      "New billing systems, AMR/AMI rollout.",
      "Comprehensive leakage reduction projects."
    ]
  }
];

function RecommendationModal({ dvsScore, onClose }: { dvsScore: number; onClose: () => void }) {
  const currentZone = getDvsZoneData(dvsScore);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl my-auto animate-in fade-in zoom-in-95 duration-300 overflow-hidden flex flex-col max-h-[92vh] border border-slate-100">
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-sm z-20">
          <div className="flex items-center gap-3.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-50 text-[#0284c7] shadow-inner">
              <FileSpreadsheet className="h-5.5 w-5.5" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-800 tracking-tight">Recommended Action Plan Sheet</h2>
              <p className="text-xs text-slate-500 font-medium">Diagnostic roadmap & governance protocols based on DVS score</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="h-9 w-9 flex items-center justify-center rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-all border border-slate-200 shadow-sm cursor-pointer"
            aria-label="Close"
          >
            <X className="h-4.5 w-4.5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 bg-slate-50/50 flex-1">
          {/* Current Status Hero Banner */}
          <div
            className="rounded-3xl border p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 transition-all shadow-sm"
            style={{
              borderColor: currentZone.borderColor,
              backgroundColor: currentZone.bgColor,
              boxShadow: `0 4px 20px -2px ${currentZone.color}08`
            }}
          >
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-xs font-black tracking-widest uppercase px-3 py-1 rounded-full text-white shadow-sm" style={{ backgroundColor: currentZone.color }}>
                  Current Zone
                </span>
                <span className="text-lg font-extrabold text-slate-800">{currentZone.zone}</span>
              </div>
              <h3 className="text-2xl font-black tracking-tight text-slate-900">
                Data Validity Score: <span style={{ color: currentZone.color }}>{dvsScore.toFixed(2)} / 100</span>
              </h3>
              <p className="text-sm font-semibold text-slate-600 italic">
                &ldquo;{currentZone.interpretation}&rdquo;
              </p>
            </div>

            <div className="flex flex-col gap-1 items-start md:items-end bg-white px-5 py-4 rounded-2xl border border-slate-200/60 shadow-sm shrink-0">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <Clock className="h-3.5 w-3.5 text-slate-400" />
                Audit Frequency
              </div>
              <span className="text-lg font-black" style={{ color: currentZone.color }}>
                {currentZone.frequency}
              </span>
            </div>
          </div>

          {/* DVS-Based Audit Frequency Table */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="h-2 w-2 rounded-full bg-[#0284c7]" />
              <h4 className="text-base font-extrabold text-slate-800 uppercase tracking-wider">DVS-Based Audit Frequency Table</h4>
            </div>
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold uppercase text-slate-500 tracking-wider">
                      <th className="px-6 py-4">DVS Range</th>
                      <th className="px-6 py-4">Audit Frequency</th>
                      <th className="px-6 py-4">Interpretation</th>
                      <th className="px-6 py-4 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {DVS_RANGES.map((row) => {
                      const isActive = row.id === currentZone.id;
                      return (
                        <tr
                          key={row.id}
                          className={`transition-all ${
                            isActive
                              ? "font-semibold bg-slate-50/50"
                              : "opacity-60"
                          }`}
                          style={
                            isActive
                              ? {
                                  boxShadow: `inset 4px 0 0 ${row.color}`,
                                }
                              : {}
                          }
                        >
                          <td className="px-6 py-4.5 whitespace-nowrap">
                            <span
                              className={`inline-flex px-2.5 py-1 rounded-lg text-xs font-bold`}
                              style={{
                                color: row.color,
                                backgroundColor: `${row.color}15`,
                              }}
                            >
                              DVS {row.range}
                            </span>
                          </td>
                          <td className="px-6 py-4.5 font-bold text-slate-800">
                            {row.frequency}
                          </td>
                          <td className="px-6 py-4.5 text-slate-500 max-w-xs sm:max-w-sm truncate md:whitespace-normal">
                            {row.interpretation}
                          </td>
                          <td className="px-6 py-4.5 text-center whitespace-nowrap">
                            {isActive ? (
                              <span
                                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold text-white shadow-sm"
                                style={{ backgroundColor: row.color }}
                              >
                                Active
                              </span>
                            ) : (
                              <span className="text-xs font-semibold text-slate-400">
                                &mdash;
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Diagnostic Breakdown & Recommendations Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* System Issues Card */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-50 text-rose-500 shadow-inner">
                  <AlertCircle className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h4 className="text-base font-extrabold text-slate-800 tracking-tight">Range-Specific System Issues</h4>
                  <p className="text-xxs text-slate-400 font-bold uppercase tracking-wider">Identified data reliability bottlenecks</p>
                </div>
              </div>
              <ul className="space-y-3 flex-1">
                {currentZone.issues.map((issue, idx) => (
                  <li key={idx} className="flex gap-3 text-sm text-slate-600 font-medium">
                    <span className="h-2 w-2 rounded-full bg-rose-400 mt-2 shrink-0" />
                    <span>{issue}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Interventions Card */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 shadow-inner">
                  <CheckCircle className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h4 className="text-base font-extrabold text-slate-800 tracking-tight">Recommended Interventions</h4>
                  <p className="text-xxs text-slate-400 font-bold uppercase tracking-wider">Key steps to improve data quality</p>
                </div>
              </div>
              <ul className="space-y-3.5 flex-1">
                {currentZone.interventions.map((intervention, idx) => (
                  <li key={idx} className="flex gap-3.5 text-sm text-slate-600 font-medium">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 shrink-0">
                      <CheckCircle className="h-3 w-3" />
                    </div>
                    <span>{intervention}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action Roadmap Timeline */}
          <div className="space-y-5 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 shadow-inner">
                <CalendarRange className="h-4.5 w-4.5" />
              </div>
              <div>
                <h4 className="text-base font-extrabold text-slate-800 tracking-tight">Long-Term Improvement Roadmap</h4>
                <p className="text-xxs text-slate-400 font-bold uppercase tracking-wider">Strategic timeline for pipeline & meter systems</p>
              </div>
            </div>

            <div className="relative pl-6 sm:pl-8 border-l-2 border-slate-200/80 ml-3 space-y-8 pt-4">
              {TIMELINE_STEPS.map((step, idx) => (
                <div key={idx} className="relative group">
                  {/* Timeline Indicator Dot */}
                  <div
                    className="absolute -left-10 sm:-left-12 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-white border-2 shadow-sm transition-all group-hover:scale-110 animate-in fade-in duration-350"
                    style={{ borderColor: step.color }}
                  >
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: step.color }} />
                  </div>

                  {/* Step Content */}
                  <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <h5 className="text-base font-extrabold text-slate-800">{step.period}</h5>
                      <span
                        className="inline-flex px-2.5 py-0.5 rounded-full text-xxs font-bold text-white shadow-sm w-fit"
                        style={{ backgroundColor: step.color }}
                      >
                        {step.duration}
                      </span>
                    </div>

                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {step.items.map((item, itemIdx) => (
                        <li
                          key={itemIdx}
                          className="bg-slate-50/50 rounded-2xl border border-slate-200/50 p-4 text-sm text-slate-600 font-medium hover:border-slate-300 hover:bg-slate-100/50 transition-colors"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-5 border-t border-slate-100 bg-white sticky bottom-0 flex justify-end gap-3 z-20">
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-black text-white text-sm font-semibold shadow-md transition-all active:scale-95 cursor-pointer"
          >
            Close Plan Sheet
          </button>
        </div>
      </div>
    </div>
  );
}

function ResultsPageContent() {
    const searchParams = useSearchParams();
    const projectId = searchParams.get("projectId") ? Number(searchParams.get("projectId")) : null;

    const { dataValues: contextDataValues, validationScores: contextValidationScores, setDataValues: setContextDataValues, setValidationScores: setContextValidationScores } = useAudit();

    const [loading, setLoading] = useState(true);
    const [project, setProject] = useState<Project | null>(null);
    const [dataValues, setDataValues] = useState<Record<string, string>>(contextDataValues);
    const [validationScores, setValidationScores] = useState<Record<string, number>>(contextValidationScores);

    // Real scores based on data
    const [dvsScore, setDvsScore] = useState(0);
    const [breakdown, setBreakdown] = useState<any[]>([]);
    const [showPlanSheet, setShowPlanSheet] = useState(false);

    useEffect(() => {
      async function loadData() {
        if (!projectId) {
          setLoading(false);
          return;
        }

        try {
          const projData = await getProject(projectId);
          setProject(projData);

          // If we already have data in context, we don't strictly need to fetch, but we can to ensure it's up to date.
          // To make it offline/session resilient, use context first.
          if (Object.keys(contextDataValues).length > 0 || Object.keys(contextValidationScores).length > 0) {
            setDataValues(contextDataValues);
            setValidationScores(contextValidationScores);
            
            const numericData = Object.keys(contextDataValues || {}).reduce((acc, key) => {
              acc[key] = Number(contextDataValues![key]) || 0;
              return acc;
            }, {} as Record<string, number>);

            const { overall, breakdown: newBreakdown } = calculateDVS(contextValidationScores || {}, numericData);
            setDvsScore(overall);
            setBreakdown(newBreakdown);
            setLoading(false);
            return;
          }

          const progress = await getDataInput(projectId);
          if (progress) {
            setDataValues(progress.data_values || {});
            setValidationScores(progress.validation_scores || {});
            
            // Also sync it to context so it's available globally
            setContextDataValues(progress.data_values || {});
            setContextValidationScores(progress.validation_scores || {});

            // Calculate real DVS score
            const numericData = Object.keys(progress.data_values || {}).reduce((acc, key) => {
              acc[key] = Number(progress.data_values![key]) || 0;
              return acc;
            }, {} as Record<string, number>);

            const { overall, breakdown: newBreakdown } = calculateDVS(progress.validation_scores || {}, numericData);
            setDvsScore(overall);
            setBreakdown(newBreakdown);
          }
        } catch (error) {
          console.error("Failed to load audit results:", error);
          // Fallback to empty calculations so the UI still loads
          setDvsScore(0);
          setBreakdown([]);
        } finally {
          setLoading(false);
        }
      }

      loadData();
    }, [projectId]);





    // DVS grade label
    const grade = getDVSGrade(dvsScore);

    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center py-40 gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-[#0284c7]" />
          <p className="text-slate-500 font-medium animate-pulse">Analyzing audit results...</p>
        </div>
      );
    }

    // Derived Indicators for the end of the page
    const calcIndicatorNum = (formula: () => number) => {
      try {
        const val = formula();
        return isFinite(val) ? val : 0;
      } catch (e) {
        return 0;
      }
    };

    // Calculate real KPIs using the new formulas
    const numericData = Object.keys(dataValues).reduce((acc, key) => {
      acc[key] = Number(dataValues[key]) || 0;
      return acc;
    }, {} as Record<string, number>);

    const realKpis = calculateKPIs(numericData);
    const carbonResults = calculateCarbonFootprint(numericData);

    const indicatorsData = [
      {
        label: "Non-Revenue Water",
        value: realKpis.nrwPercentage,
        max: 100,
        icon: WaterLossIcon,
        color: "auto",
        suffix: "%"
      },
      {
        label: "Revenue Water Ratio",
        value: realKpis.revenueWaterRatio,
        max: 100,
        icon: RevenueRatioIcon,
        color: "auto",
        suffix: "%"
      },
      {
        label: "Infrastructure Leakage",
        value: realKpis.infrastructureLeakageIndex,
        max: 10,
        icon: WaterLossIcon,
        color: "auto"
      },
      {
        label: "CARL",
        value: realKpis.carl,
        max: Math.max(realKpis.carl * 1.2, 1000),
        icon: ZapIcon,
        color: "#0284c7",
        suffix: "L"
      },
      {
        label: "UARL",
        value: realKpis.uarl,
        max: Math.max(realKpis.uarl * 1.2, 1000),
        icon: BasicGaugeIcon,
        color: "#0284c7",
        suffix: "L"
      },
      {
        label: "Supply Coverage",
        value: calcIndicatorNum(() => (Number(dataValues.HouseholdsWithConnection || 0) * 100) / Number(dataValues.TotalHouseholds || 1)),
        max: 100,
        icon: CoverageIcon,
        color: "auto",
        suffix: "%"
      },
      {
        label: "Per Capita Supply",
        value: calcIndicatorNum(() => Number(dataValues.WaterSupplied || 0) / (Number(dataValues.DaysInMonth || 1) * Number(dataValues.Population || 1))),
        max: 200,
        icon: PerCapitaIcon,
        color: "#0284c7",
        suffix: "LPCD"
      },
      {
        label: "Metering Extent",
        value: calcIndicatorNum(() => (Number(dataValues.MeteredDirectConnections || 0) + Number(dataValues.MeteredPublicStandposts || 0)) * 100 / (Number(dataValues.TotalDirectConnections || 0) + Number(dataValues.TotalMeteredDirectConnections || 1))),
        max: 100,
        icon: BasicGaugeIcon,
        color: "auto",
        suffix: "%"
      },
      {
        label: "Water Quality",
        value: calcIndicatorNum(() => (Number(dataValues.WaterQualitySamples || 0) * 100) / Number(dataValues.TotalComplaints || 1)),
        max: 100,
        icon: QualityIcon,
        color: "auto",
        suffix: "%"
      },
      {
        label: "Complaint Redressal",
        value: calcIndicatorNum(() => Number(dataValues.ComplaintsRedressed || 0) * 100 / Number(dataValues.TotalComplaints || 1)),
        max: 100,
        icon: Wrench,
        color: "auto",
        suffix: "%"
      },
      {
        label: "Cost Recovery",
        value: calcIndicatorNum(() => Number(dataValues.AnnualRevenues || 0) * 100 / Number(dataValues.AnnualExpenses || 1)),
        max: 100,
        icon: MoneyIcon,
        color: "auto",
        suffix: "%"
      },
      {
        label: "Collection Efficiency",
        value: calcIndicatorNum(() => Number(dataValues.CurrentRevenuesCollected || 0) * 100 / Number(dataValues.TotalRevenuesBilled || 1)),
        max: 100,
        icon: RevenueRatioIcon,
        color: "auto",
        suffix: "%"
      },
    ];

    // Derived KPIs for Gauge Charts
    const kpis = {
      nrwPercentage: realKpis.nrwPercentage,
      revenueWaterRatio: realKpis.revenueWaterRatio,
      economicalLeakageLevel: realKpis.economicalLeakageLevel,
      infrastructureLeakageIndex: realKpis.infrastructureLeakageIndex,
      coverageOfConnections: realKpis.coverageOfConnections,
      perCapitaWaterSupply: realKpis.perCapitaWaterSupply,
    };

    return (
      <div className="mx-auto max-w-6xl space-y-8 pb-20">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              href={projectId ? `/dashboard/data-input?projectId=${projectId}` : "/dashboard/data-input"}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-[#0f172a]">Audit Results</h1>
              <p className="text-slate-500">Data Validity Score & Key Performance Indicators</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors shadow-sm">
              <Share2 className="h-4 w-4" />
              Share
            </button>
            <button onClick={() => generateAuditReport(project, dvsScore, getDvsZoneData(dvsScore), kpis, dataValues)} className="flex items-center gap-2 rounded-xl bg-[#0f172a] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-black transition-all active:scale-95">
              <Download className="h-4 w-4" />
              Export Report
            </button>
          </div>
        </div>

        {/* ── Hero DVS Card ─────────────────────────────────────── */}
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#334155] p-8 text-white shadow-xl">
          <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/5 blur-2xl" />
          <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-[#0284c7]/10 blur-xl" />

          <div className="relative flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <div className="relative">
                <svg width="240" height="140" viewBox="0 0 260 150" className="drop-shadow-lg">
                  <defs>
                    <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#ef4444" />
                      <stop offset="30%" stopColor="#f59e0b" />
                      <stop offset="60%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#22c55e" />
                    </linearGradient>
                  </defs>
                  <path d="M 20 130 A 110 110 0 0 1 240 130" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="18" strokeLinecap="round" />
                  <path
                    d="M 20 130 A 110 110 0 0 1 240 130"
                    fill="none"
                    stroke="url(#gaugeGradient)"
                    strokeWidth="18"
                    strokeLinecap="round"
                    strokeDasharray={`${Math.PI * 110}`}
                    strokeDashoffset={`${Math.PI * 110 - (dvsScore / 100) * Math.PI * 110}`}
                    style={{ transition: "stroke-dashoffset 2s cubic-bezier(0.4, 0, 0.2, 1)" }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-end pb-3">
                  <span className="text-5xl font-black tracking-tighter">{dvsScore.toFixed(2)}</span>
                  <span className="text-xs font-medium text-white/50 mt-0.5">out of 100</span>
                </div>
              </div>
            </div>

            <div className="flex-1 space-y-4 text-center lg:text-left">
              <div>
                <div className="flex items-center justify-center lg:justify-start gap-3 mb-2">
                  <h2 className="text-2xl font-bold">Data Validity Score</h2>
                  <span className="rounded-full px-3 py-1 text-xs font-bold" style={{ backgroundColor: grade.bg, color: grade.color }}>
                    {grade.label}
                  </span>
                </div>
                <p className="text-white/60 text-sm max-w-md">
                  Evaluates the reliability of input data used in water audit analysis based on standard auditing principles.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Weight Breakdown ──────────────────────────────────── */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#e0f2fe]">
              <PieChart className="h-4.5 w-4.5 text-[#0284c7]" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#0f172a]">Category Breakdown</h3>
              <p className="text-xs text-slate-500">Weighted contribution of each data category</p>
            </div>
          </div>

          <div className="space-y-4">
            {breakdown.map((b, i) => (
              <WeightBar key={i} label={b.label} weight={b.weight} grade={b.grade} weighted={b.weighted} />
            ))}
          </div>
        </div>

        {/* ── Carbon Footprint Analysis ──────────────────────────── */}
        {carbonResults.hasAnyData && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50">
                <Leaf className="h-4.5 w-4.5 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#0f172a]">Carbon Footprint Analysis</h3>
                <p className="text-xs text-slate-500">GHG emissions from water utility operations (GHG Protocol)</p>
              </div>
            </div>

            {/* Hero Total Emissions Card */}
            <div className="relative overflow-hidden rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 p-8 text-white shadow-xl">
              <div className="absolute -top-16 -right-16 h-56 w-56 rounded-full bg-white/5 blur-2xl" />
              <div className="absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-emerald-400/10 blur-xl" />

              <div className="relative flex flex-col lg:flex-row items-center gap-8">
                <div className="flex-shrink-0 text-center">
                  <div className="relative inline-flex flex-col items-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 shadow-lg mb-4">
                      <Leaf className="h-10 w-10 text-emerald-300" />
                    </div>
                    <span className="text-5xl font-black tracking-tighter">{carbonResults.totalTonnes.toLocaleString(undefined, { maximumFractionDigits: 1 })}</span>
                    <span className="text-sm font-medium text-white/50 mt-1">tonnes CO₂ / year</span>
                  </div>
                </div>

                <div className="flex-1 space-y-5 w-full">
                  <div>
                    <h2 className="text-xl font-bold mb-1">Total Annual Carbon Footprint</h2>
                    <p className="text-white/50 text-sm">Breakdown by emission scope based on provided data</p>
                  </div>

                  {/* Scope Breakdown Bars */}
                  <div className="space-y-3">
                    {/* Scope 2 - Electricity (always shown if has data) */}
                    {carbonResults.hasElectricity && (() => {
                      const pct = carbonResults.totalKg > 0 ? (carbonResults.scope2 / carbonResults.totalKg) * 100 : 0;
                      return (
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between text-sm">
                            <span className="flex items-center gap-2 font-semibold">
                              <Zap className="h-3.5 w-3.5 text-yellow-300" />
                              Scope 2 — Grid Electricity
                            </span>
                            <span className="font-bold text-emerald-200">{(carbonResults.scope2 / 1000).toFixed(1)}t ({pct.toFixed(1)}%)</span>
                          </div>
                          <div className="h-2.5 rounded-full bg-white/10 overflow-hidden">
                            <div className="h-full rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 transition-all duration-1000 ease-out" style={{ width: `${pct}%` }} />
                          </div>
                        </div>
                      );
                    })()}

                    {/* Scope 1 - Diesel */}
                    {carbonResults.hasDiesel && (() => {
                      const pct = carbonResults.totalKg > 0 ? (carbonResults.scope1 / carbonResults.totalKg) * 100 : 0;
                      return (
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between text-sm">
                            <span className="flex items-center gap-2 font-semibold">
                              <Factory className="h-3.5 w-3.5 text-orange-300" />
                              Scope 1 — Diesel / Fuel
                            </span>
                            <span className="font-bold text-emerald-200">{(carbonResults.scope1 / 1000).toFixed(1)}t ({pct.toFixed(1)}%)</span>
                          </div>
                          <div className="h-2.5 rounded-full bg-white/10 overflow-hidden">
                            <div className="h-full rounded-full bg-gradient-to-r from-orange-400 to-red-500 transition-all duration-1000 ease-out" style={{ width: `${pct}%` }} />
                          </div>
                        </div>
                      );
                    })()}

                    {/* Scope 3 - Chemicals */}
                    {carbonResults.hasChemicals && (() => {
                      const pct = carbonResults.totalKg > 0 ? (carbonResults.scope3 / carbonResults.totalKg) * 100 : 0;
                      return (
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between text-sm">
                            <span className="flex items-center gap-2 font-semibold">
                              <FlaskConical className="h-3.5 w-3.5 text-purple-300" />
                              Scope 3 — Treatment Chemicals
                            </span>
                            <span className="font-bold text-emerald-200">{(carbonResults.scope3 / 1000).toFixed(1)}t ({pct.toFixed(1)}%)</span>
                          </div>
                          <div className="h-2.5 rounded-full bg-white/10 overflow-hidden">
                            <div className="h-full rounded-full bg-gradient-to-r from-purple-400 to-violet-500 transition-all duration-1000 ease-out" style={{ width: `${pct}%` }} />
                          </div>
                        </div>
                      );
                    })()}
                  </div>

                  {/* Renewable offset note */}
                  {carbonResults.hasRenewable && (
                    <div className="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-2.5 text-sm">
                      <Sun className="h-4 w-4 text-yellow-300" />
                      <span className="text-white/80">Renewable energy offset applied to Scope 2 calculation</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Carbon Normalized Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Carbon per MLD */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50">
                    <Leaf className="h-4 w-4 text-emerald-600" />
                  </div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Per MLD</span>
                </div>
                <div className="text-2xl font-black text-slate-800 tracking-tight">
                  {carbonResults.carbonPerMLD.toLocaleString(undefined, { maximumFractionDigits: 1 })}
                </div>
                <span className="text-xs font-medium text-slate-400">kgCO₂ / MLD processed</span>
              </div>

              {/* Carbon per Capita */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-50">
                    <PerCapitaIcon className="h-4 w-4 text-sky-600" />
                  </div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Per Capita</span>
                </div>
                <div className="text-2xl font-black text-slate-800 tracking-tight">
                  {carbonResults.carbonPerCapita.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </div>
                <span className="text-xs font-medium text-slate-400">kgCO₂ / person / year</span>
              </div>

              {/* Carbon of Water Losses */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-50">
                    <WaterLossIcon className="h-4 w-4 text-rose-500" />
                  </div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Wasted (NRW)</span>
                </div>
                <div className="text-2xl font-black text-rose-600 tracking-tight">
                  {(carbonResults.carbonOfWaterLosses / 1000).toLocaleString(undefined, { maximumFractionDigits: 1 })}
                </div>
                <span className="text-xs font-medium text-slate-400">tonnes CO₂ lost to NRW</span>
              </div>

              {/* Energy Intensity */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50">
                    <Zap className="h-4 w-4 text-amber-600" />
                  </div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Energy Intensity</span>
                </div>
                <div className="text-2xl font-black text-slate-800 tracking-tight">
                  {carbonResults.energyIntensity.toLocaleString(undefined, { maximumFractionDigits: 1 })}
                </div>
                <span className="text-xs font-medium text-slate-400">kWh / MLD</span>
              </div>
            </div>
          </div>
        )}

        {/* ── KPI Gauges Grid ───────────────────────────────────── */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f0fdf4]">
              <TrendingUp className="h-4.5 w-4.5 text-[#16a34a]" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#0f172a]">Key Performance Indicators</h3>
              <p className="text-xs text-slate-500">Real-time metrics from audit inputs</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <GaugeChart value={kpis.nrwPercentage} max={100} label="Non-Revenue Water" icon={WaterLossIcon} color="auto" suffix="%" />
            <GaugeChart value={kpis.revenueWaterRatio} max={100} label="Revenue Water Ratio" icon={RevenueRatioIcon} color="auto" suffix="%" />
            <GaugeChart value={kpis.economicalLeakageLevel} max={5} label="Economical Leakage" icon={ZapIcon} color="#0284c7" />
            <GaugeChart value={kpis.infrastructureLeakageIndex} max={10} label="Infrastructure Leakage Index" icon={WaterLossIcon} color="auto" />
            <GaugeChart value={kpis.coverageOfConnections} max={100} label="Supply Coverage" icon={CoverageIcon} color="auto" suffix="%" />
            <GaugeChart value={kpis.perCapitaWaterSupply} max={200} label="Per Capita Supply" icon={PerCapitaIcon} color="#0284c7" suffix="LPCD" />
          </div>
        </div>

        {/* ── Custom Indicator Values ───────────────────────────── */}
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100">
              <ClipboardList className="h-4.5 w-4.5 text-slate-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#0f172a]">Service Level Benchmarks</h3>
              <p className="text-xs text-slate-500">Calculated based on standard SLB formulas</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {indicatorsData.map((indicator, idx) => (
              <GaugeChart
                key={idx}
                value={indicator.value}
                max={indicator.max}
                label={indicator.label}
                icon={indicator.icon}
                color={indicator.color}
                suffix={indicator.suffix}
              />
            ))}
          </div>
        </div>

        {/* Recommended Action Plan Button & Modal */}
        <div className="flex flex-col items-center justify-center pt-8 border-t border-slate-200 mt-10">
          <div className="text-center max-w-lg mb-5">
            <h4 className="text-lg font-bold text-slate-800">Need a structured path forward?</h4>
            <p className="text-sm text-slate-500 font-medium mt-1">
              Get detailed, time-bound diagnostic recommendations and audit frequency guidance customized for your DVS score.
            </p>
          </div>
          <button
            onClick={() => setShowPlanSheet(true)}
            className="flex items-center gap-3 rounded-2xl bg-gradient-to-r from-[#0284c7] to-[#0369a1] px-8 py-4 text-base font-bold text-white shadow-lg hover:shadow-xl hover:from-[#0369a1] hover:to-[#0284c7] transition-all active:scale-95 duration-200 cursor-pointer"
          >
            <FileSpreadsheet className="h-5 w-5" />
            View Recommended Action Plan
          </button>
        </div>

        {showPlanSheet && (
          <RecommendationModal
            dvsScore={dvsScore}
            onClose={() => setShowPlanSheet(false)}
          />
        )}
      </div>
    );
  }

export default function ResultsPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center py-40 gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-[#0284c7]" />
        <p className="text-slate-500 font-medium animate-pulse">Analyzing audit results...</p>
      </div>
    }>
      <ResultsPageContent />
    </Suspense>
  );
}
