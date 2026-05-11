"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import {
  ArrowLeft, MapPin, Calendar, Users2, ClipboardList,
  BarChart3, Trash2, Pencil, CheckCircle2, Clock, AlertCircle,
  Droplets, Building2, Factory, Home, ChevronRight
} from "lucide-react"
import { getProject, deleteProject, Project } from "@/lib/api"

function typeLabel(t?: string) {
  const map: Record<string, string> = {
    commercial: "Commercial", industrial: "Industrial",
    residential: "Residential", municipal: "Municipal",
  }
  return t ? (map[t] || t) : "General"
}

function TypeIcon({ type }: { type?: string }) {
  const cls = "h-5 w-5"
  switch (type) {
    case "commercial": return <Building2 className={cls} />
    case "industrial": return <Factory className={cls} />
    case "residential": return <Home className={cls} />
    default: return <Droplets className={cls} />
  }
}

function typeBadgeColor(type?: string) {
  switch (type) {
    case "commercial": return "bg-emerald-100 text-emerald-700"
    case "industrial": return "bg-slate-100 text-slate-600"
    case "residential": return "bg-violet-100 text-violet-700"
    default: return "bg-sky-100 text-sky-700"
  }
}

function statusBadge(status: string) {
  switch (status) {
    case "completed": return <span className="flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700"><CheckCircle2 className="h-3 w-3" />Completed</span>
    case "archived": return <span className="flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600"><Clock className="h-3 w-3" />Archived</span>
    default: return <span className="flex items-center gap-1.5 rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700"><Clock className="h-3 w-3" />Active</span>
  }
}

function formatDate(d?: string) {
  if (!d) return "—"
  return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
}

type Tab = "overview" | "team"

export default function ProjectDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = Number(params.id)

  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [tab, setTab] = useState<Tab>("overview")
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    getProject(id)
      .then(setProject)
      .catch(e => {
        if (e.message?.includes("401")) router.push("/login")
        else setError(e.message || "Failed to load project")
      })
      .finally(() => setLoading(false))
  }, [id, router])

  const handleDelete = async () => {
    if (!confirm("Delete this project permanently? This cannot be undone.")) return
    setDeleting(true)
    try {
      await deleteProject(id)
      router.push("/dashboard")
    } catch {
      alert("Failed to delete project")
      setDeleting(false)
    }
  }

  if (loading) return (
    <div className="mx-auto max-w-4xl space-y-6 pb-20">
      <div className="h-10 w-48 rounded-xl bg-slate-200 animate-pulse" />
      <div className="h-40 rounded-3xl bg-slate-200 animate-pulse" />
      <div className="grid grid-cols-3 gap-4">
        {[1,2,3].map(i => <div key={i} className="h-24 rounded-2xl bg-slate-200 animate-pulse" />)}
      </div>
    </div>
  )

  if (error || !project) return (
    <div className="mx-auto max-w-4xl pb-20">
      <div className="flex flex-col items-center justify-center gap-4 py-20 text-slate-400">
        <AlertCircle className="h-12 w-12 opacity-40" />
        <p className="text-lg font-medium">{error || "Project not found"}</p>
        <Link href="/dashboard" className="text-sm text-[#0284c7] underline">Back to Dashboard</Link>
      </div>
    </div>
  )

  return (
    <div className="mx-auto max-w-4xl space-y-8 pb-20">
      {/* Back */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard" className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 hover:text-[#0284c7] transition-colors shadow-sm">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="min-w-0">
          <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Project</p>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0f172a] truncate">{project.title}</h1>
        </div>
      </div>

      {/* Hero Card */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${typeBadgeColor(project.project_type)}`}>
              <TypeIcon type={project.project_type} />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${typeBadgeColor(project.project_type)}`}>
                  {typeLabel(project.project_type)}
                </span>
                {statusBadge(project.status)}
              </div>
              {project.location && (
                <div className="flex items-center gap-1.5 text-sm text-slate-500 mb-1">
                  <MapPin className="h-4 w-4" />{project.location}
                </div>
              )}
              {project.description && (
                <p className="text-sm text-slate-500 leading-relaxed max-w-lg">{project.description}</p>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors shadow-sm">
              <Pencil className="h-4 w-4" />Edit
            </button>
            <button onClick={handleDelete} disabled={deleting}
              className="flex items-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors shadow-sm disabled:opacity-60">
              <Trash2 className="h-4 w-4" />
              {deleting ? "Deleting…" : "Delete"}
            </button>
          </div>
        </div>

        {/* Meta row */}
        <div className="mt-6 pt-5 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Scope", value: project.scope || "—" },
            { label: "Population", value: project.population ? project.population.toLocaleString() : "—" },
            { label: "Capacity", value: project.capacity || "—" },
            { label: "Created", value: formatDate(project.created_at) },
          ].map(({ label, value }) => (
            <div key={label} className="rounded-xl bg-slate-50 p-3">
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">{label}</p>
              <p className="text-sm font-semibold text-[#0f172a] mt-1 capitalize">{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link href={`/dashboard/data-input`}
          className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-sky-200 hover:shadow-md hover:-translate-y-0.5 transition-all">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-100 text-[#0284c7]">
              <ClipboardList className="h-6 w-6" />
            </div>
            <div>
              <p className="font-bold text-[#0f172a]">Data Input</p>
              <p className="text-sm text-slate-500">Enter audit measurements</p>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-slate-300 group-hover:text-[#0284c7] transition-colors" />
        </Link>

        <Link href={`/dashboard/results`}
          className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-emerald-200 hover:shadow-md hover:-translate-y-0.5 transition-all">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
              <BarChart3 className="h-6 w-6" />
            </div>
            <div>
              <p className="font-bold text-[#0f172a]">View Results</p>
              <p className="text-sm text-slate-500">Analyse audit findings</p>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-slate-300 group-hover:text-emerald-500 transition-colors" />
        </Link>
      </div>

      {/* Tabs */}
      <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="flex border-b border-slate-100">
          {([
            { key: "overview", label: "Overview", icon: ClipboardList },
            { key: "team", label: "Team", icon: Users2 },
          ] as { key: Tab; label: string; icon: React.ElementType }[]).map(({ key, label, icon: Icon }) => (
            <button key={key} onClick={() => setTab(key)}
              className={`flex items-center gap-2 px-6 py-4 text-sm font-semibold border-b-2 transition-colors ${tab === key ? "border-[#0284c7] text-[#0284c7]" : "border-transparent text-slate-500 hover:text-slate-700"}`}>
              <Icon className="h-4 w-4" />{label}
            </button>
          ))}
        </div>

        <div className="p-6 sm:p-8">
          {tab === "overview" && (
            <div className="space-y-5">
              <h3 className="font-bold text-[#0f172a]">Project Summary</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: "Project Name", value: project.title },
                  { label: "Type", value: typeLabel(project.project_type) },
                  { label: "Scope", value: project.scope || "—" },
                  { label: "Location", value: project.location || "—" },
                  { label: "Population", value: project.population ? project.population.toLocaleString() : "—" },
                  { label: "Capacity", value: project.capacity || "—" },
                  { label: "Status", value: project.status },
                  { label: "Last Updated", value: formatDate(project.updated_at) },
                ].map(({ label, value }) => (
                  <div key={label} className="flex flex-col gap-1 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
                    <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">{label}</span>
                    <span className="text-sm font-semibold text-[#0f172a] capitalize">{value}</span>
                  </div>
                ))}
              </div>

              {project.description && (
                <div className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-4">
                  <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Description</p>
                  <p className="text-sm text-slate-600 leading-relaxed">{project.description}</p>
                </div>
              )}
            </div>
          )}

          {tab === "team" && (
            <div className="space-y-5">
              <h3 className="font-bold text-[#0f172a]">Audit Team</h3>
              {project.lead_auditor_name ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#0284c7] to-[#0ea5e9] text-white text-sm font-bold">
                      {project.lead_auditor_name.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-[#0f172a]">{project.lead_auditor_name}</p>
                      <p className="text-sm text-slate-500 truncate">{project.lead_auditor_email}</p>
                    </div>
                    <span className="ml-auto shrink-0 rounded-full bg-sky-100 px-2.5 py-1 text-xs font-semibold text-sky-700">Lead Auditor</span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-slate-400">
                  <Users2 className="h-10 w-10 mb-3 opacity-30" />
                  <p className="text-sm">No team members assigned</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Last updated footer */}
      <p className="text-xs text-center text-slate-400 flex items-center justify-center gap-1.5">
        <Calendar className="h-3.5 w-3.5" />
        Last updated {formatDate(project.updated_at)}
      </p>
    </div>
  )
}
