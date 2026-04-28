"use client"

import { useState } from "react"
import { ArrowLeft, CheckCircle2, ShieldAlert, ShieldCheck } from "lucide-react"
import Link from "next/link"
import { DATA_INPUTS, VALIDATION_QUESTIONS, CATEGORY_MAP } from "@/lib/data"

export default function DataInputPage() {
  const [dataValues, setDataValues] = useState<Record<string, string>>({});
  const [activeModalCategory, setActiveModalCategory] = useState<string | null>(null);
  const [validationStatuses, setValidationStatuses] = useState<Record<string, boolean>>({});

  const handleInputChange = (key: string, value: string) => {
    setDataValues(prev => ({ ...prev, [key]: value }));
  };

  const handleValidateClick = (categoryKey: string) => {
    if (categoryKey) {
      setActiveModalCategory(categoryKey);
    }
  };

  const closeModal = () => {
    setActiveModalCategory(null);
  };

  const confirmValidation = () => {
    if (activeModalCategory) {
      setValidationStatuses(prev => ({ ...prev, [activeModalCategory]: true }));
    }
    closeModal();
  };

  // Safe fallback if `categoryId` not found
  const modalQuestions = activeModalCategory ? VALIDATION_QUESTIONS[activeModalCategory] : [];

  return (
    <div className="mx-auto max-w-6xl space-y-8 pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link 
            href="/dashboard/create-project"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-[#0f172a]">Data Input & Validation</h1>
            <p className="text-slate-500">Enter system values and answer validation questions</p>
          </div>
        </div>
        <Link
          href="/dashboard/results"
          className="flex items-center justify-center gap-2 rounded-xl bg-[#0f172a] px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-black transition-all active:scale-95"
        >
          <CheckCircle2 className="h-4 w-4" />
          Complete Audit Entry
        </Link>
      </div>

      {/* Input Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {DATA_INPUTS.map((input) => {
          const categoryKey = CATEGORY_MAP[input.key];
          const isValidated = categoryKey ? validationStatuses[categoryKey] : false;

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
              </div>

              {categoryKey ? (
                <div className="mt-auto pt-4 border-t border-slate-100">
                  <button 
                    onClick={() => handleValidateClick(categoryKey)}
                    className={`w-full flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold transition-colors border ${isValidated ? 'bg-[#dcfce7] border-[#bbf7d0] text-[#166534] hover:bg-[#bbf7d0]' : 'bg-white border-slate-200 text-[#0f172a] hover:bg-slate-50 hover:border-slate-300 shadow-sm'}`}
                  >
                    {isValidated ? (
                      <>
                        <ShieldCheck className="h-4 w-4" />
                        Validated
                      </>
                    ) : (
                      <>
                        <ShieldAlert className="h-4 w-4 text-[#0284c7]" />
                        Validate Data
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <div className="mt-auto pt-4 border-t border-slate-100 text-center text-xs font-medium text-slate-400">
                  No validation required
                </div>
              )}
            </div>
          );
        })}
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
              {modalQuestions && modalQuestions.length > 0 ? (
                modalQuestions.map((q, idx) => (
                    <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                      <p className="font-semibold text-[#0f172a] mb-4 flex gap-3 text-sm">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e0f2fe] text-xs font-bold text-[#0284c7]">
                          {idx + 1}
                        </span>
                        <span className="mt-0.5">{q.question}</span>
                      </p>
                      
                      <div className="ml-9">
                        {/* Yes / No */}
                        {q.inputType === "yesno" && (
                          <div className="flex gap-3">
                            <label className="flex-1 flex items-center justify-center gap-2 cursor-pointer rounded-xl border border-slate-200 p-3 hover:border-[#0284c7] hover:bg-[#f0f9ff] transition-all has-[:checked]:border-[#0284c7] has-[:checked]:bg-[#f0f9ff] has-[:checked]:ring-1 has-[:checked]:ring-[#0284c7]">
                              <input type="radio" name={`q_${activeModalCategory}_${idx}`} value="yes" className="w-4 h-4 text-[#0284c7] focus:ring-[#0284c7]" />
                              <span className="text-sm font-medium text-slate-700">Yes</span>
                            </label>
                            <label className="flex-1 flex items-center justify-center gap-2 cursor-pointer rounded-xl border border-slate-200 p-3 hover:border-[#0284c7] hover:bg-[#f0f9ff] transition-all has-[:checked]:border-[#0284c7] has-[:checked]:bg-[#f0f9ff] has-[:checked]:ring-1 has-[:checked]:ring-[#0284c7]">
                              <input type="radio" name={`q_${activeModalCategory}_${idx}`} value="no" className="w-4 h-4 text-[#0284c7] focus:ring-[#0284c7]" />
                              <span className="text-sm font-medium text-slate-700">No</span>
                            </label>
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
                          <div className="space-y-2">
                            {q.options.map((opt, oIdx) => (
                              <label key={oIdx} className="flex items-start gap-3 cursor-pointer p-2.5 rounded-xl border border-transparent hover:bg-slate-50 hover:border-slate-200 transition-all has-[:checked]:bg-[#f0f9ff] has-[:checked]:border-[#0284c7]">
                                <input type="radio" name={`q_${activeModalCategory}_${idx}`} value={String(oIdx)} className="w-4 h-4 mt-0.5 text-[#0284c7] focus:ring-[#0284c7] border-gray-300 shrink-0" />
                                <span className="text-sm text-slate-700 font-medium">{opt}</span>
                              </label>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                ))
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
    </div>
  )
}
