"use client"

import { useState } from "react"
import { ArrowLeft, Building2, Users2, Info, CheckCircle2, Plus, Trash2 } from "lucide-react"
import Link from "next/link"

interface TeamMember {
  id: number;
  name: string;
  email: string;
  role: string;
}

export default function CreateProjectPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  const addTeamMember = () => {
    setTeamMembers([...teamMembers, { id: Date.now(), name: '', email: '', role: '' }]);
  };

  const removeTeamMember = (id: number) => {
    setTeamMembers(teamMembers.filter(m => m.id !== id));
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8 pb-20">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link 
          href="/dashboard"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#0f172a]">Create New Project</h1>
          <p className="text-slate-500">Enter project information and assign team members</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Navigation Sidebar */}
        <div className="hidden md:block col-span-1 border-r border-slate-200 pr-6">
          <ul className="space-y-6 relative">
            {/* Step 1 */}
            <li className="flex items-start gap-4">
              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-bold shadow-sm transition-colors ${currentStep === 1 ? 'bg-[#0284c7] text-white' : 'bg-white border border-slate-200 text-slate-400'}`}>
                1
              </div>
              <div>
                <h3 className={`font-semibold ${currentStep === 1 ? 'text-[#0f172a]' : 'text-slate-500'}`}>Project Details</h3>
                <p className="text-sm text-slate-500">Scope, population & capacity</p>
              </div>
            </li>
            {/* Connector */}
            <div className="absolute left-[15px] top-8 bottom-12 w-px bg-slate-200 -z-10" />

            {/* Step 2 */}
            <li className="flex items-start gap-4">
              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-bold shadow-sm transition-colors ${currentStep === 2 ? 'bg-[#0284c7] text-white' : 'bg-white border border-slate-200 text-slate-400'}`}>
                2
              </div>
              <div>
                <h3 className={`font-semibold ${currentStep === 2 ? 'text-[#0f172a]' : 'text-slate-500'}`}>Team Details</h3>
                <p className="text-sm text-slate-500">Assign audit members</p>
              </div>
            </li>
          </ul>
        </div>

        {/* Form Container */}
        <div className="col-span-1 md:col-span-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
            
            {/* Step 1 Content */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-in slide-in-from-right-4 fade-in duration-300">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e0f2fe] text-[#0284c7]">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <h2 className="text-xl font-bold text-[#0f172a]">Project Information</h2>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-[#0f172a] mb-2">Project Name <span className="text-red-500">*</span></label>
                    <input 
                      type="text" 
                      placeholder="e.g., Riverside Municipal Audit" 
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#0284c7] focus:ring-1 focus:ring-[#0284c7] transition-all hover:bg-white focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#0f172a] mb-2">Audit Scope <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <select defaultValue="" className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#0284c7] focus:ring-1 focus:ring-[#0284c7] transition-all hover:bg-white focus:bg-white pr-10 text-slate-700">
                        <option value="" disabled>Select the scope of audit...</option>
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-[#0f172a] mb-2">Total Population</label>
                      <input 
                        type="number" 
                        placeholder="e.g., 50000" 
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#0284c7] focus:ring-1 focus:ring-[#0284c7] transition-all hover:bg-white focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#0f172a] mb-2">Population Served / Cap.</label>
                      <input 
                        type="text" 
                        placeholder="e.g., 45000 or 100 MLD" 
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#0284c7] focus:ring-1 focus:ring-[#0284c7] transition-all hover:bg-white focus:bg-white"
                      />
                      <p className="mt-1.5 text-xs text-slate-500 flex items-center gap-1">
                        <Info className="h-3 w-3" /> Served pop. or industrial capacity
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 flex justify-end">
                  <button 
                    onClick={() => setCurrentStep(2)}
                    className="flex items-center justify-center gap-2 rounded-xl bg-[#0284c7] px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#0369a1] transition-all active:scale-95"
                  >
                    Continue to Team Details
                    <ArrowLeft className="h-4 w-4 rotate-180" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2 Content */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-in slide-in-from-right-4 fade-in duration-300">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e0f2fe] text-[#0284c7]">
                    <Users2 className="h-5 w-5" />
                  </div>
                  <h2 className="text-xl font-bold text-[#0f172a]">Audit Team Details</h2>
                </div>

                <div className="space-y-5">
                  <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5 space-y-4">
                    <h3 className="font-semibold text-sm text-slate-600 uppercase tracking-wider mb-2">Lead Auditor</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-[#0f172a] mb-2">Full Name <span className="text-red-500">*</span></label>
                        <input 
                          type="text" 
                          placeholder="Jane Doe" 
                          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#0284c7] focus:ring-1 focus:ring-[#0284c7] transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-[#0f172a] mb-2">Email Address <span className="text-red-500">*</span></label>
                        <input 
                          type="email" 
                          placeholder="jane@example.com" 
                          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#0284c7] focus:ring-1 focus:ring-[#0284c7] transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-semibold text-[#0f172a]">Additional Team Members</label>
                      <button 
                        onClick={addTeamMember}
                        className="flex items-center gap-1.5 text-sm font-medium text-[#0284c7] hover:text-[#0369a1] transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                        Add Member
                      </button>
                    </div>
                    
                    {teamMembers.length === 0 ? (
                      <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
                        <p className="text-sm text-slate-500 mb-3">No additional team members added. For large projects, it's recommended to add co-auditors or technical leads.</p>
                        <button 
                          onClick={addTeamMember}
                          className="inline-flex items-center gap-2 rounded-lg bg-white border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 shadow-sm hover:bg-slate-50 transition-all"
                        >
                          <Plus className="h-4 w-4" />
                          Add Team Member
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {teamMembers.map((member, index) => (
                          <div key={member.id} className="relative rounded-xl border border-slate-200 bg-white p-4 shadow-sm group">
                            <button 
                              onClick={() => removeTeamMember(member.id)}
                              className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white border border-slate-200 text-slate-400 hover:text-red-500 hover:border-red-500 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100 shadow-sm"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                              <div>
                                <label className="block text-xs font-semibold text-slate-500 mb-1.5">Name</label>
                                <input 
                                  type="text" 
                                  placeholder="Member Name" 
                                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-[#0284c7] focus:ring-1 focus:ring-[#0284c7] transition-all"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-semibold text-slate-500 mb-1.5">Role / Position</label>
                                <input 
                                  type="text" 
                                  placeholder="e.g. Field Engineer" 
                                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-[#0284c7] focus:ring-1 focus:ring-[#0284c7] transition-all"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-semibold text-slate-500 mb-1.5">Email</label>
                                <input 
                                  type="email" 
                                  placeholder="member@example.com" 
                                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-[#0284c7] focus:ring-1 focus:ring-[#0284c7] transition-all"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                  <button 
                    onClick={() => setCurrentStep(1)}
                    className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600 shadow-sm hover:bg-slate-50 transition-all active:scale-95"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </button>
                  <button 
                    className="flex items-center justify-center gap-2 rounded-xl bg-[#0f172a] px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-black transition-all active:scale-95"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    Submit & Create Project
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
