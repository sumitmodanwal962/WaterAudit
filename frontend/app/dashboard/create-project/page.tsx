"use client"

import { useState } from "react"
import { ArrowLeft, Building2, Users2, Info, CheckCircle2, Plus, Trash2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { createProject } from "@/lib/api"

interface TeamMember { id: number; name: string; email: string; role: string }

const inputCls = "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#0284c7] focus:ring-1 focus:ring-[#0284c7] transition-all hover:bg-white focus:bg-white"

export default function CreateProjectPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [form, setForm] = useState({
    title: "", scope: "", project_type: "", location: "", description: "",
    population: "", capacity: "",
    lead_name: "", lead_email: "",
  })

  const addTeamMember = () => setTeamMembers(p => [...p, { id: Date.now(), name: "", email: "", role: "" }])
  const removeTeamMember = (id: number) => setTeamMembers(p => p.filter(m => m.id !== id))

  const handleSubmit = async () => {
    if (!form.title.trim()) { setError("Project name is required"); return }
    if (!form.lead_name.trim() || !form.lead_email.trim()) { setError("Lead auditor name and email are required"); return }
    setSubmitting(true)
    setError(null)
    try {
      const project = await createProject({
        title: form.title,
        scope: form.scope || undefined,
        project_type: form.project_type || undefined,
        location: form.location || undefined,
        description: form.description || undefined,
        population: form.population ? parseInt(form.population) : undefined,
        capacity: form.capacity || undefined,
        lead_auditor_name: form.lead_name || undefined,
        lead_auditor_email: form.lead_email || undefined,
      })
      router.push(`/dashboard/data-input?projectId=${project.id}`)
    } catch (e: any) {
      setError(e.message || "Failed to create project")
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8 pb-20">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard" className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 hover:text-[#0284c7] transition-colors shadow-sm">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#0f172a]">Create New Project</h1>
          <p className="text-slate-500">Enter project information and assign team members</p>
        </div>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Step sidebar */}
        <div className="hidden md:block col-span-1 border-r border-slate-200 pr-6">
          <ul className="space-y-6 relative">
            {[
              { n: 1, title: "Project Details", sub: "Scope, type & capacity" },
              { n: 2, title: "Team Details", sub: "Assign audit members" },
            ].map(({ n, title, sub }) => (
              <li key={n} className="flex items-start gap-4">
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-bold shadow-sm transition-colors ${currentStep === n ? "bg-[#0284c7] text-white" : currentStep > n ? "bg-emerald-500 text-white" : "bg-white border border-slate-200 text-slate-400"}`}>{n}</div>
                <div>
                  <h3 className={`font-semibold ${currentStep === n ? "text-[#0f172a]" : "text-slate-400"}`}>{title}</h3>
                  <p className="text-sm text-slate-400">{sub}</p>
                </div>
              </li>
            ))}
            <div className="absolute left-[15px] top-8 bottom-12 w-px bg-slate-200 -z-10" />
          </ul>
        </div>

        {/* Form */}
        <div className="col-span-1 md:col-span-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">

            {/* Step 1 */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-in slide-in-from-right-4 fade-in duration-300">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 text-[#0284c7]"><Building2 className="h-5 w-5" /></div>
                  <h2 className="text-xl font-bold text-[#0f172a]">Project Information</h2>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-[#0f172a] mb-2">Project Name <span className="text-red-500">*</span></label>
                    <input type="text" value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} placeholder="e.g., Riverside Municipal Audit" className={inputCls} />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-[#0f172a] mb-2">Audit Scope</label>
                      <div className="relative">
                        <select value={form.scope} onChange={e => setForm(p => ({ ...p, scope: e.target.value }))} className={`${inputCls} pr-10 appearance-none`}>
                          <option value="">Select scope...</option>
                          <option value="dma">District Metered Area (DMA)</option>
                          <option value="utility">Utility Area</option>
                          <option value="zone">Operational Zone</option>
                          <option value="other">Other Facility / Plant</option>
                        </select>
                        <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#0f172a] mb-2">Project Type</label>
                      <div className="relative">
                        <select value={form.project_type} onChange={e => setForm(p => ({ ...p, project_type: e.target.value }))} className={`${inputCls} pr-10 appearance-none`}>
                          <option value="">Select type...</option>
                          <option value="municipal">Municipal</option>
                          <option value="commercial">Commercial</option>
                          <option value="industrial">Industrial</option>
                          <option value="residential">Residential</option>
                        </select>
                        <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#0f172a] mb-2">Location</label>
                    <input type="text" value={form.location} onChange={e => setForm(p => ({ ...p, location: e.target.value }))} placeholder="City, State" className={inputCls} />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#0f172a] mb-2">Description</label>
                    <textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} placeholder="Brief project description..." rows={3}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#0284c7] focus:ring-1 focus:ring-[#0284c7] transition-all hover:bg-white focus:bg-white resize-none" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-[#0f172a] mb-2">Total Population</label>
                      <input type="number" value={form.population} onChange={e => setForm(p => ({ ...p, population: e.target.value }))} placeholder="e.g., 50000" className={inputCls} />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#0f172a] mb-2">Population Served / Cap.</label>
                      <input type="text" value={form.capacity} onChange={e => setForm(p => ({ ...p, capacity: e.target.value }))} placeholder="e.g., 45000 or 100 MLD" className={inputCls} />
                      <p className="mt-1.5 text-xs text-slate-400 flex items-center gap-1"><Info className="h-3 w-3" /> Served pop. or industrial capacity</p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 flex justify-end">
                  <button onClick={() => setCurrentStep(2)} disabled={!form.title.trim()}
                    className="flex items-center gap-2 rounded-xl bg-[#0284c7] px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#0369a1] transition-all active:scale-95 disabled:opacity-50">
                    Continue to Team Details
                    <ArrowLeft className="h-4 w-4 rotate-180" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2 */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-in slide-in-from-right-4 fade-in duration-300">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 text-[#0284c7]"><Users2 className="h-5 w-5" /></div>
                  <h2 className="text-xl font-bold text-[#0f172a]">Audit Team Details</h2>
                </div>

                <div className="space-y-5">
                  <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5 space-y-4">
                    <h3 className="font-semibold text-sm text-slate-600 uppercase tracking-wider">Lead Auditor <span className="text-red-400">*</span></h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-[#0f172a] mb-2">Full Name</label>
                        <input type="text" value={form.lead_name} onChange={e => setForm(p => ({ ...p, lead_name: e.target.value }))} placeholder="Jane Doe"
                          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#0284c7] focus:ring-1 focus:ring-[#0284c7] transition-all" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-[#0f172a] mb-2">Email Address</label>
                        <input type="email" value={form.lead_email} onChange={e => setForm(p => ({ ...p, lead_email: e.target.value }))} placeholder="jane@example.com"
                          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#0284c7] focus:ring-1 focus:ring-[#0284c7] transition-all" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-semibold text-[#0f172a]">Additional Team Members</label>
                      <button onClick={addTeamMember} className="flex items-center gap-1.5 text-sm font-medium text-[#0284c7] hover:text-[#0369a1] transition-colors">
                        <Plus className="h-4 w-4" />Add Member
                      </button>
                    </div>
                    {teamMembers.length === 0 ? (
                      <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
                        <p className="text-sm text-slate-500 mb-3">No additional members added.</p>
                        <button onClick={addTeamMember} className="inline-flex items-center gap-2 rounded-lg bg-white border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 shadow-sm hover:bg-slate-50 transition-all">
                          <Plus className="h-4 w-4" />Add Team Member
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {teamMembers.map((member) => (
                          <div key={member.id} className="relative rounded-xl border border-slate-200 bg-white p-4 shadow-sm group">
                            <button onClick={() => removeTeamMember(member.id)}
                              className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white border border-slate-200 text-slate-400 hover:text-red-500 hover:border-red-500 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100 shadow-sm">
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                              <input type="text" placeholder="Name" className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-[#0284c7] focus:ring-1 focus:ring-[#0284c7] transition-all" />
                              <input type="text" placeholder="Role / Position" className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-[#0284c7] focus:ring-1 focus:ring-[#0284c7] transition-all" />
                              <input type="email" placeholder="Email" className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-[#0284c7] focus:ring-1 focus:ring-[#0284c7] transition-all" />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                  <button onClick={() => setCurrentStep(1)}
                    className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600 shadow-sm hover:bg-slate-50 transition-all active:scale-95">
                    <ArrowLeft className="h-4 w-4" />Back
                  </button>
                  <button onClick={handleSubmit} disabled={submitting}
                    className="flex items-center gap-2 rounded-xl bg-[#0f172a] px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-black transition-all active:scale-95 disabled:opacity-60">
                    {submitting
                      ? <><span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />Creating…</>
                      : <><CheckCircle2 className="h-4 w-4" />Submit & Create Project</>}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
