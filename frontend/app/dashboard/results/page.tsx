"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Download, Share2, TrendingUp, Droplets, PieChart, Shield, Gauge, Users, Zap, ClipboardList, Loader2 } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { getDataInput } from "@/lib/api"
import { ALL_DVS_CATEGORIES, CATEGORY_MAP } from "@/lib/dvs"
import { gradeCategory, calculateKPIs } from "@/lib/dvs/calculator"

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

  const percentage = Math.min((animatedValue / max) * 100, 100);
  const radius = 80;
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
    <div className="flex flex-col items-center gap-3 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-lg hover:border-slate-300 transition-all duration-300">
      <div className="relative">
        <svg width="180" height="100" viewBox="0 0 200 110" className="drop-shadow-sm">
          {/* Background track */}
          <path
            d="M 10 100 A 80 80 0 0 1 190 100"
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="14"
            strokeLinecap="round"
          />
          {/* Animated fill */}
          <path
            d="M 10 100 A 80 80 0 0 1 190 100"
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
            {animatedValue.toFixed(2)}
          </span>
          {suffix && <span className="text-xs font-medium text-slate-400 -mt-0.5">{suffix}</span>}
        </div>
      </div>
      <div className="flex items-center gap-2 text-center">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg" style={{ backgroundColor: colors.bg }}>
          <Icon className="h-3.5 w-3.5" style={{ color: colors.stroke }} />
        </div>
        <span className="text-sm font-semibold text-slate-700">{label}</span>
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

export default function ResultsPage() {
  // Demo values — in production these come from the validation answers
  const dvsScore = 72.45;
  const breakdown = [
    { label: "Supply Data", weight: 0.40, grade: 0.78, weighted: 0.312 },
    { label: "Customer Metering Data", weight: 0.30, grade: 0.65, weighted: 0.195 },
    { label: "Authorized Consumption & Losses", weight: 0.15, grade: 0.72, weighted: 0.108 },
    { label: "System Attributes", weight: 0.15, grade: 0.68, weighted: 0.102 },
  ];

  const kpis = {
    nrwPercentage: 34.56,
    revenueWaterRatio: 65.44,
    economicalLeakageLevel: 1.23,
    infrastructureLeakageIndex: 4.87,
    coverageOfConnections: 78.90,
    perCapitaWaterSupply: 112.50,
  };

  // DVS grade label
  const getDVSGrade = (score: number) => {
    if (score >= 90) return { label: "Excellent", color: "#16a34a", bg: "#dcfce7" };
    if (score >= 75) return { label: "Good", color: "#2563eb", bg: "#dbeafe" };
    if (score >= 50) return { label: "Moderate", color: "#d97706", bg: "#fef3c7" };
    if (score >= 25) return { label: "Low", color: "#ea580c", bg: "#ffedd5" };
    return { label: "Very Low", color: "#dc2626", bg: "#fee2e2" };
  };

  // ── Main Results Page ────────────────────────────────────────────

  export default function ResultsPage() {
    const searchParams = useSearchParams();
    const projectId = searchParams.get("projectId") ? Number(searchParams.get("projectId")) : null;

    const [loading, setLoading] = useState(true);
    const [dataValues, setDataValues] = useState<Record<string, string>>({});
    const [validationScores, setValidationScores] = useState<Record<string, number>>({});

    // Real scores based on data
    const [dvsScore, setDvsScore] = useState(0);
    const [breakdown, setBreakdown] = useState<any[]>([]);

    useEffect(() => {
      async function loadData() {
        if (!projectId) {
          setLoading(false);
          return;
        }

        try {
          const progress = await getDataInput(projectId);
          if (progress) {
            setDataValues(progress.data_values || {});
            setValidationScores(progress.validation_scores || {});

            // Calculate real DVS score
            let totalWeightedGrade = 0;
            let totalWeight = 0;

            const newBreakdown = ALL_DVS_CATEGORIES.map(category => {
              const selectedIndices = category.validationQuestions.map(q =>
                progress.validation_scores?.[q.id] !== undefined ? progress.validation_scores[q.id] : null
              );

              const grade = gradeCategory(selectedIndices, category.validationQuestions);
              const weight = 1 / ALL_DVS_CATEGORIES.length;
              totalWeightedGrade += grade * weight;
              totalWeight += weight;

              return {
                label: category.displayName,
                weight: weight,
                grade: grade,
                weighted: grade * weight
              };
            });

            setDvsScore((totalWeightedGrade / totalWeight) * 100);
            setBreakdown(newBreakdown);
          }
        } catch (error) {
          console.error("Failed to load audit results:", error);
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
    const calcIndicator = (formula: () => number) => {
      try {
        const val = formula();
        return isFinite(val) ? val.toFixed(2) : "0.00";
      } catch (e) {
        return "0.00";
      }
    };

    // Calculate real KPIs using the new formulas
    const numericData = Object.keys(dataValues).reduce((acc, key) => {
      acc[key] = Number(dataValues[key]) || 0;
      return acc;
    }, {} as Record<string, number>);

    const realKpis = calculateKPIs(numericData);

    const indicators = [
      {
        label: "Non-Revenue Water (NRW %)",
        value: realKpis.nrwPercentage.toFixed(2) + " %"
      },
      {
        label: "Revenue Water Ratio (RWR %)",
        value: realKpis.revenueWaterRatio.toFixed(2) + " %"
      },
      {
        label: "Infrastructure Leakage Index (ILI)",
        value: realKpis.infrastructureLeakageIndex.toFixed(2)
      },
      {
        label: "Current Annual Real Losses (CARL - Litres)",
        value: realKpis.carl.toLocaleString()
      },
      {
        label: "Unavoidable Annual Real Losses (UARL - Litres)",
        value: realKpis.uarl.toLocaleString()
      },
      {
        label: "Coverage of water supply (%)",
        value: calcIndicator(() => (Number(dataValues.HouseholdsWithConnection || 0) * 100) / Number(dataValues.TotalHouseholds || 1))
      },
      {
        label: "Per Capita Water Supplied (Liters/Month)",
        value: calcIndicator(() => Number(dataValues.WaterSupplied || 0) / (Number(dataValues.DaysInMonth || 1) * Number(dataValues.Population || 1)))
      },
      {
        label: "Extent of metering of water connections (%)",
        value: calcIndicator(() => (Number(dataValues.MeteredDirectConnections || 0) + Number(dataValues.MeteredPublicStandposts || 0)) * 100 / (Number(dataValues.TotalDirectConnections || 0) + Number(dataValues.TotalMeteredDirectConnections || 1)))
      },
      {
        label: "Quantity of Water Supplied (%)",
        value: calcIndicator(() => (Number(dataValues.WaterQualitySamples || 0) * 100) / Number(dataValues.TotalComplaints || 1))
      },
      {
        label: "Efficiency in redressal of customer complaints (%)",
        value: calcIndicator(() => Number(dataValues.ComplaintsRedressed || 0) * 100 / Number(dataValues.TotalComplaints || 1))
      },
      {
        label: "Cost Recovery in water supply services (%)",
        value: calcIndicator(() => Number(dataValues.AnnualRevenues || 0) * 100 / Number(dataValues.AnnualExpenses || 1))
      },
      {
        label: "Efficiency in the collection of water related charges (%)",
        value: calcIndicator(() => Number(dataValues.CurrentRevenuesCollected || 0) * 100 / Number(dataValues.TotalRevenuesBilled || 1))
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
            <button className="flex items-center gap-2 rounded-xl bg-[#0f172a] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-black transition-all active:scale-95">
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
            <GaugeChart value={kpis.nrwPercentage} max={100} label="Non-Revenue Water" icon={Droplets} color="auto" suffix="%" />
            <GaugeChart value={kpis.revenueWaterRatio} max={100} label="Revenue Water Ratio" icon={TrendingUp} color="auto" suffix="%" />
            <GaugeChart value={kpis.economicalLeakageLevel} max={5} label="Economical Leakage" icon={Zap} color="#0284c7" />
            <GaugeChart value={kpis.infrastructureLeakageIndex} max={10} label="Infrastructure Leakage Index" icon={Gauge} color="auto" />
            <GaugeChart value={kpis.coverageOfConnections} max={100} label="Supply Coverage" icon={Users} color="auto" suffix="%" />
            <GaugeChart value={kpis.perCapitaWaterSupply} max={200} label="Per Capita Supply" icon={Shield} color="#0284c7" suffix="LPCD" />
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
            {indicators.map((indicator, idx) => (
              <div key={idx} className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
                <span className="text-sm font-medium text-slate-600 pr-4">{indicator.label}</span>
                <span className="text-lg font-bold text-[#0f172a] whitespace-nowrap">{indicator.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
