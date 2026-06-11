"use client"

import { useEffect, useState, Suspense } from "react"
import { ArrowLeft, CheckCircle2, ShieldAlert, ShieldCheck, Save, Loader2, Leaf } from "lucide-react"
import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"
import { DATA_INPUTS, VALIDATION_QUESTIONS, CATEGORY_MAP, ALL_DVS_CATEGORIES, CARBON_INPUTS } from "@/lib/data"
import { gradeCategory } from "@/lib/dvs/calculator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getDataInput, saveDataInput } from "@/lib/api"
import { useAudit } from "@/contexts/AuditContext"

function DataInputPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const projectId = searchParams.get("projectId") ? Number(searchParams.get("projectId")) : null;

  const { dataValues, setDataValues, validationScores, setValidationScores, updateDataValue } = useAudit();

  const [activeModalCategory, setActiveModalCategory] = useState<string | null>(null);
  const [modalAnswers, setModalAnswers] = useState<Record<string, string>>({});

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  // Fetch existing progress
  useEffect(() => {
    if (!projectId) return;

    setLoading(true);
    getDataInput(projectId)
      .then(res => {
        if (res) {
          setDataValues(res.data_values || {});
          setValidationScores(res.validation_scores || {});
          setModalAnswers(res.modal_answers || {});
        }
      })
      .catch(err => {
        console.error("Failed to load progress:", err);
        if (err.message?.includes("401")) router.push("/login");
      })
      .finally(() => setLoading(false));
  }, [projectId, router]);

  const handleSaveProgress = async () => {
    if (!projectId) {
      alert("No project selected to save progress.");
      return;
    }

    setSaving(true);
    setMessage(null);
    try {
      await saveDataInput(projectId, {
        data_values: dataValues,
        validation_scores: validationScores,
        modal_answers: modalAnswers,
      });
      setMessage({ type: 'success', text: 'Progress saved successfully!' });
      setTimeout(() => setMessage(null), 3000);
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Failed to save progress' });
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (key: string, value: string) => {
    updateDataValue(key, value);
  };

  const handleValidateClick = (categoryKey: string) => {
    if (categoryKey) {
      setModalAnswers({});
      setActiveModalCategory(categoryKey);
    }
  };

  const handleModalAnswer = (questionId: string, value: string) => {
    setModalAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const closeModal = () => {
    setActiveModalCategory(null);
  };

  const confirmValidation = () => {
    if (activeModalCategory) {
      const categoryInfo = ALL_DVS_CATEGORIES.find(c => c.categoryKey === activeModalCategory);
      if (categoryInfo) {
        const questions = categoryInfo.validationQuestions;
        const indices: (number | null)[] = [];

        questions.forEach((q, idx) => {
          if (skippedIndices.has(idx)) {
            indices.push(null);
            return;
          }
          const ans = modalAnswers[`q_${activeModalCategory}_${idx}`];
          if (ans === undefined) {
            indices.push(null);
          } else if (q.inputType === "yesno") {
            // Yes/No arrays typically follow [yes_score, no_score].
            // Yes = index 0, No = index 1
            indices.push(ans === "yes" ? 0 : 1);
          } else if (q.inputType === "select") {
            indices.push(parseInt(ans, 10));
          } else {
            indices.push(null);
          }
        });

        const grade = gradeCategory(indices, questions);
        setValidationScores(prev => ({ ...prev, [activeModalCategory]: grade * 10 }));
      }
    }
    closeModal();
  };

  // Safe fallback if `categoryId` not found
  const modalQuestions = activeModalCategory ? VALIDATION_QUESTIONS[activeModalCategory] : [];

  // Skip rules logic: compute which question indices should be hidden
  const activeCategory = activeModalCategory
    ? ALL_DVS_CATEGORIES.find(c => c.categoryKey === activeModalCategory)
    : null;

  const skippedIndices = new Set<number>();
  if (activeCategory?.skipRules) {
    for (const rule of activeCategory.skipRules) {
      const answerKey = `q_${activeModalCategory}_${rule.questionIndex}`;
      if (modalAnswers[answerKey] === rule.triggerValue) {
        rule.skipQuestionIndices.forEach(i => skippedIndices.add(i));
      }
    }
  }

  // Build all questions with original indices and skip status
  const allQuestionsWithMeta = modalQuestions
    ? modalQuestions.map((q, idx) => ({ ...q, originalIndex: idx, isSkipped: skippedIndices.has(idx) }))
    : [];

  return (
    <div className="mx-auto max-w-6xl space-y-8 pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link
            href={projectId ? `/dashboard/projects/${projectId}` : "/dashboard"}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-[#0f172a]">Data Input & Validation</h1>
            <p className="text-slate-500">Enter system values and answer validation questions</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleSaveProgress}
            disabled={saving || !projectId}
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-[#0f172a] shadow-sm hover:bg-slate-50 transition-all active:scale-95 disabled:opacity-50"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4 text-[#0284c7]" />}
            Save Progress
          </button>
          <Link
            href={projectId ? `/dashboard/results?projectId=${projectId}` : "/dashboard/results"}
            className="flex items-center justify-center gap-2 rounded-xl bg-[#0f172a] px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-black transition-all active:scale-95"
          >
            <CheckCircle2 className="h-4 w-4" />
            Complete Audit Entry
          </Link>
        </div>
      </div>

      {message && (
        <div className={`p-4 rounded-2xl text-sm font-medium animate-in fade-in slide-in-from-top-2 duration-300 ${message.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
          {message.text}
        </div>
      )}



      {loading ? (
        <div className="flex flex-col items-center justify-center py-32 gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-[#0284c7]" />
          <p className="text-slate-400 font-medium">Loading project progress...</p>
        </div>
      ) : (
        <>
          <div className="mb-10">
            <h2 className="text-xl font-bold text-[#0f172a] mb-6">Core System Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {DATA_INPUTS.filter(input => CATEGORY_MAP[input.key]).map((input) => {
                const categoryKey = CATEGORY_MAP[input.key];
                const score = categoryKey ? validationScores[categoryKey] : undefined;
                const isValidated = score !== undefined;

                return (
                  <div key={input.key} className="flex flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-slate-300 transition-all">
                    <div className="flex-1 mb-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-bold text-[#0f172a] text-lg leading-tight">{input.label}</h3>
                        <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600 border border-slate-200 whitespace-nowrap">
                          {input.key}
                        </span>
                      </div>
                      <p className="text-sm text-slate-500 mb-4 h-10 line-clamp-2">{input.description}</p>

                      {!input.noInput && (
                        <div className="flex items-center bg-slate-50 rounded-xl border border-slate-200 overflow-hidden focus-within:ring-1 focus-within:ring-[#0284c7] focus-within:border-[#0284c7] transition-all">
                          <input
                            type={input.type === 'number' || input.type === 'volume' || input.type === 'integer' || input.type === 'currency' ? 'number' : 'text'}
                            placeholder="0.00"
                            value={dataValues[input.key] || ''}
                            onChange={(e) => handleInputChange(input.key, e.target.value)}
                            className="w-full bg-transparent px-4 py-3 text-sm font-medium text-[#0f172a] outline-none"
                          />
                          <div className="px-3 text-xs font-semibold text-slate-400 bg-slate-100 border-l border-slate-200 h-full flex items-center justify-center whitespace-nowrap">
                            {input.unit}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="mt-auto pt-4 border-t border-slate-100">
                      <button
                        onClick={() => handleValidateClick(categoryKey!)}
                        className={`w-full flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold transition-colors border ${isValidated ? 'bg-[#dcfce7] border-[#bbf7d0] text-[#166534] hover:bg-[#bbf7d0]' : 'bg-white border-slate-200 text-[#0f172a] hover:bg-slate-50 hover:border-slate-300 shadow-sm'}`}
                      >
                        {isValidated ? (
                          <>
                            <ShieldCheck className="h-4 w-4" />
                            Validated ({score.toFixed(1)} / 10)
                          </>
                        ) : (
                          <>
                            <ShieldAlert className="h-4 w-4 text-[#0284c7]" />
                            Validate Data
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#0f172a] mb-6">Supplementary Details</h2>
            <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
              <ul className="divide-y divide-slate-100">
                {DATA_INPUTS.filter(input => !CATEGORY_MAP[input.key] && !CARBON_INPUTS.some(c => c.key === input.key)).map((input) => (
                  <li key={input.key} className="p-5 sm:p-6 hover:bg-slate-50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1.5">
                        <h3 className="font-bold text-[#0f172a] text-sm sm:text-base">{input.label}</h3>
                        <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-semibold text-slate-500 border border-slate-200 whitespace-nowrap">
                          {input.key}
                        </span>
                      </div>
                      <p className="text-sm text-slate-500 max-w-2xl leading-relaxed">{input.description}</p>
                    </div>

                    <div className="w-full md:w-72 shrink-0">
                      <div className="flex items-center bg-slate-50 rounded-xl border border-slate-200 overflow-hidden focus-within:ring-1 focus-within:ring-[#0284c7] focus-within:border-[#0284c7] transition-all shadow-sm">
                        <input
                          type={input.type === 'number' || input.type === 'volume' || input.type === 'integer' || input.type === 'currency' ? 'number' : 'text'}
                          placeholder="0.00"
                          value={dataValues[input.key] || ''}
                          onChange={(e) => handleInputChange(input.key, e.target.value)}
                          className="w-full bg-transparent px-4 py-2.5 text-sm font-medium text-[#0f172a] outline-none"
                        />
                        <div className="px-4 text-xs font-semibold text-slate-400 bg-slate-100 border-l border-slate-200 h-full flex items-center justify-center whitespace-nowrap">
                          {input.unit}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Carbon Footprint Inputs Section */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50">
                <Leaf className="h-4.5 w-4.5 text-emerald-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#0f172a]">Carbon Footprint Inputs</h2>
                <p className="text-xs text-slate-500">Energy & emissions data for carbon footprint analysis (GHG Protocol)</p>
              </div>
            </div>
            <div className="rounded-3xl border border-emerald-200 bg-white shadow-sm overflow-hidden">
              <div className="px-5 py-3 bg-emerald-50/60 border-b border-emerald-100 flex items-center gap-2">
                <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Only electricity consumption is required — all other fields are optional</span>
              </div>
              <ul className="divide-y divide-emerald-50">
                {CARBON_INPUTS.map((input) => (
                  <li key={input.key} className="p-5 sm:p-6 hover:bg-emerald-50/30 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1.5">
                        <h3 className="font-bold text-[#0f172a] text-sm sm:text-base">{input.label}</h3>
                        <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-600 border border-emerald-200 whitespace-nowrap">
                          {input.key}
                        </span>
                      </div>
                      <p className="text-sm text-slate-500 max-w-2xl leading-relaxed">{input.description}</p>
                    </div>

                    <div className="w-full md:w-72 shrink-0">
                      <div className="flex items-center bg-emerald-50/40 rounded-xl border border-emerald-200 overflow-hidden focus-within:ring-1 focus-within:ring-emerald-500 focus-within:border-emerald-500 transition-all shadow-sm">
                        <input
                          type="number"
                          placeholder="0.00"
                          value={dataValues[input.key] || ''}
                          onChange={(e) => handleInputChange(input.key, e.target.value)}
                          className="w-full bg-transparent px-4 py-2.5 text-sm font-medium text-[#0f172a] outline-none"
                        />
                        <div className="px-4 text-xs font-semibold text-emerald-500 bg-emerald-50 border-l border-emerald-200 h-full flex items-center justify-center whitespace-nowrap">
                          {input.unit}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Validation Modal Overlay */}
          {activeModalCategory && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 overflow-y-auto">
              <div className="bg-white rounded-3xl shadow-xl w-full max-w-3xl my-auto animate-in fade-in zoom-in-95 duration-200 overflow-hidden flex flex-col max-h-[90vh]">
                <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
                  <div>
                    <h2 className="text-xl font-bold text-[#0f172a]">Validate: {activeModalCategory}</h2>
                    <p className="text-sm text-slate-500">Answer the following to calculate the validity score.</p>
                  </div>
                  <button
                    onClick={closeModal}
                    className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
                    aria-label="Close"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                  </button>
                </div>

                <div className="p-6 overflow-y-auto space-y-6 bg-slate-50 flex-1">
                  {allQuestionsWithMeta && allQuestionsWithMeta.length > 0 ? (
                    <>
                      {allQuestionsWithMeta.map((q) => (
                        <div
                          key={q.originalIndex}
                          className={`bg-white border rounded-2xl p-5 shadow-sm transition-all ${q.isSkipped
                              ? "opacity-40 pointer-events-none select-none border-slate-100"
                              : "border-slate-200"
                            }`}
                        >
                          <p className="font-semibold text-[#0f172a] mb-4 flex gap-3 text-sm">
                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e0f2fe] text-xs font-bold text-[#0284c7]">
                              {q.originalIndex + 1}
                            </span>
                            <span className="mt-0.5">{q.question}</span>
                          </p>

                          <div className="ml-9">
                            {/* Yes / No */}
                            {q.inputType === "yesno" && (
                              <div className="max-w-xs">
                                <Select
                                  name={`q_${activeModalCategory}_${q.originalIndex}`}
                                  onValueChange={(value) => handleModalAnswer(`q_${activeModalCategory}_${q.originalIndex}`, value)}
                                >
                                  <SelectTrigger className="w-full bg-white">
                                    <SelectValue placeholder="Select an option" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="yes">Yes</SelectItem>
                                    <SelectItem value="no">No</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            )}

                            {/* Percentage (capped at 100) */}
                            {q.inputType === "percentage" && (
                              <div className="flex items-center gap-2 max-w-xs">
                                <input
                                  type="number"
                                  min={0}
                                  max={100}
                                  placeholder="0"
                                  onInput={(e) => {
                                    const input = e.target as HTMLInputElement;
                                    if (Number(input.value) > 100) input.value = "100";
                                    if (Number(input.value) < 0) input.value = "0";
                                  }}
                                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-[#0284c7] focus:ring-1 focus:ring-[#0284c7] transition-all"
                                />
                                <span className="text-sm text-slate-500 font-semibold">%</span>
                              </div>
                            )}

                            {/* Number with optional unit */}
                            {q.inputType === "number" && (
                              <div className="flex items-center gap-2 max-w-sm">
                                <input
                                  type="number"
                                  min={0}
                                  placeholder={q.placeholder || "Enter value"}
                                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-[#0284c7] focus:ring-1 focus:ring-[#0284c7] transition-all"
                                />
                                {q.unit && <span className="text-xs text-slate-400 font-semibold whitespace-nowrap">{q.unit}</span>}
                              </div>
                            )}

                            {/* Free text */}
                            {q.inputType === "text" && (
                              <textarea
                                rows={2}
                                placeholder={q.placeholder || "Describe in detail..."}
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-[#0284c7] focus:ring-1 focus:ring-[#0284c7] transition-all resize-none"
                              />
                            )}

                            {/* Select with explicit domain-specific options */}
                            {q.inputType === "select" && q.options && (
                              <div className="max-w-full">
                                <Select
                                  name={`q_${activeModalCategory}_${q.originalIndex}`}
                                  onValueChange={(value) => handleModalAnswer(`q_${activeModalCategory}_${q.originalIndex}`, value)}
                                >
                                  <SelectTrigger className="w-full bg-white text-left text-sm h-auto min-h-10 py-2.5">
                                    <SelectValue placeholder="Select an option" />
                                  </SelectTrigger>
                                  <SelectContent className="max-w-[calc(100vw-3rem)] sm:max-w-xl">
                                    {q.options.map((opt, oIdx) => (
                                      <SelectItem key={oIdx} value={String(oIdx)} className="text-sm whitespace-normal py-2 leading-snug">
                                        {opt}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}


                    </>
                  ) : (
                    <div className="p-10 text-center text-slate-500">
                      No validation questions mapped for this category yet.
                    </div>
                  )}
                </div>

                <div className="px-6 py-5 border-t border-slate-100 bg-white sticky bottom-0 flex justify-end gap-3 z-10">
                  <button
                    onClick={closeModal}
                    className="px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmValidation}
                    className="px-6 py-2.5 rounded-xl bg-[#0284c7] text-white text-sm font-semibold shadow-sm hover:bg-[#0369a1] transition-all flex items-center gap-2"
                  >
                    <ShieldCheck className="h-4 w-4" />
                    Save Answers
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default function DataInputPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center py-32 gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-[#0284c7]" />
        <p className="text-slate-400 font-medium animate-pulse">Loading project progress...</p>
      </div>
    }>
      <DataInputPageContent />
    </Suspense>
  );
}
