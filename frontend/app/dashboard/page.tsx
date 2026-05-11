"use client"

import { useEffect, useState, useCallback } from "react"
import {
  Droplets, Building2, Factory, Home, FolderPlus, Search,
  MapPin, Calendar, ChevronRight, Trash2, RefreshCw, AlertCircle,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { listProjects, deleteProject, Project } from "@/lib/api"
import { useAuth } from "@/contexts/AuthContext"

type FilterType = "all" | "commercial" | "industrial" | "residential" | "municipal"

function timeAgo(dateStr?: string): string {
  if (!dateStr) return "Recently"
  const diff = Date.now() - new Date(dateStr).getTime()
  const days = Math.floor(diff / 86400000)
  if (days === 0) return "Updated today"
  if (days === 1) return "Updated 1 day ago"
  if (days < 7) return `Updated ${days} days ago`
  const weeks = Math.floor(days / 7)
  if (weeks === 1) return "Updated 1 week ago"
  return `Updated ${weeks} weeks ago`
}

function typeIcon(type?: string) {
  switch (type) {
    case "commercial": return <Building2 className="h-4 w-4" />
    case "industrial": return <Factory className="h-4 w-4" />
    case "residential": return <Home className="h-4 w-4" />
    default: return <Droplets className="h-4 w-4" />
  }
}

function typeColor(type?: string) {
  switch (type) {
    case "commercial": return "bg-emerald-100 text-emerald-700"
    case "industrial": return "bg-slate-100 text-slate-600"
    case "residential": return "bg-violet-100 text-violet-700"
    default: return "bg-sky-100 text-sky-700"
  }
}

function SkeletonCard() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm animate-pulse">
      <div className="h-5 bg-slate-200 rounded-lg w-3/4 mb-3" />
      <div className="h-3 bg-slate-100 rounded w-1/2 mb-6" />
      <div className="h-3 bg-slate-100 rounded w-full mb-2" />
      <div className="h-3 bg-slate-100 rounded w-2/3 mb-6" />
      <div className="h-3 bg-slate-100 rounded w-1/3" />
    </div>
  )
}

export default function DashboardPage() {
  const { user, isLoading: authLoading } = useAuth()
  const router = useRouter()

  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState<FilterType>("all")
  const [deletingId, setDeletingId] = useState<number | null>(null)

  const fetchProjects = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await listProjects()
      setProjects(data)
    } catch (err: any) {
      if (err.message?.includes("401")) {
        router.push("/login")
      } else {
        setError(err.message || "Failed to load projects")
      }
    } finally {
      setLoading(false)
    }
  }, [router])

  useEffect(() => {
    if (!authLoading) fetchProjects()
  }, [authLoading, fetchProjects])

  const handleDelete = async (e: React.MouseEvent, id: number) => {
    e.preventDefault()
    e.stopPropagation()
    if (!confirm("Delete this project? This cannot be undone.")) return
    setDeletingId(id)
    try {
      await deleteProject(id)
      setProjects(prev => prev.filter(p => p.id !== id))
    } catch {
      alert("Failed to delete project. Please try again.")
    } finally {
      setDeletingId(null)
    }
  }

  // Stats
  const total = projects.length
  const commercial = projects.filter(p => p.project_type === "commercial").length
  const industrial = projects.filter(p => p.project_type === "industrial").length
  const residential = projects.filter(p => p.project_type === "residential").length

  // Filtered list
  const filtered = projects.filter(p => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      (p.location ?? "").toLowerCase().includes(search.toLowerCase())
    const matchesFilter = filter === "all" || p.project_type === filter
    return matchesSearch && matchesFilter
  })

  const greeting = (() => {
    const h = new Date().getHours()
    if (h < 12) return "Good morning"
    if (h < 17) return "Good afternoon"
    return "Good evening"
  })()

  const displayName = user?.full_name?.split(" ")[0] || user?.email?.split("@")[0] || "there"

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#0f172a] mb-1">
            {greeting}, {displayName} 👋
          </h1>
          <p className="text-slate-500 text-lg">Manage and monitor your water audit projects</p>
        </div>
        <button
          onClick={fetchProjects}
          className="hidden sm:flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 shadow-sm hover:bg-slate-50 transition-all"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        {[
          { label: "Total Projects", value: total, icon: Droplets, bg: "bg-sky-100", color: "text-[#0284c7]" },
          { label: "Commercial", value: commercial, icon: Building2, bg: "bg-emerald-100", color: "text-emerald-600" },
          { label: "Industrial", value: industrial, icon: Factory, bg: "bg-slate-100", color: "text-slate-600" },
          { label: "Residential", value: residential, icon: Home, bg: "bg-violet-100", color: "text-violet-600" },
        ].map(({ label, value, icon: Icon, bg, color }) => (
          <div key={label} className="flex items-center gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${bg}`}>
              <Icon className={`h-7 w-7 ${color}`} />
            </div>
            <div>
              <div className="text-3xl font-bold text-[#0f172a]">
                {loading ? <span className="inline-block h-8 w-8 bg-slate-200 rounded animate-pulse" /> : value}
              </div>
              <div className="text-sm font-medium text-slate-500">{label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Create New Project */}
      <Link
        href="/dashboard/create-project"
        className="flex w-full flex-col items-center justify-center gap-4 rounded-3xl border-2 border-dashed border-slate-200 bg-white py-14 text-center hover:border-[#0284c7] hover:bg-sky-50/50 transition-all group shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0284c7] focus:ring-offset-2"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-sky-100 group-hover:bg-sky-200 group-hover:scale-105 transition-all shadow-sm shadow-sky-100">
          <FolderPlus className="h-8 w-8 text-[#0284c7]" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-[#0f172a] mb-1 group-hover:text-[#0284c7] transition-colors">
            Create New Project
          </h3>
          <p className="text-slate-500">Start a new water audit project</p>
        </div>
      </Link>

      {/* Existing Projects */}
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl font-bold text-[#0f172a]">Existing Projects</h2>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search projects..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="h-10 w-full sm:w-[240px] rounded-full border border-slate-200 bg-white pl-10 pr-4 text-sm outline-none focus:border-[#0284c7] focus:ring-1 focus:ring-[#0284c7] transition-all shadow-sm"
              />
            </div>
            {/* Filter tabs */}
            <div className="flex rounded-full border border-slate-200 bg-white p-1 shadow-sm overflow-x-auto gap-0.5">
              {(["all", "commercial", "industrial", "residential"] as FilterType[]).map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium capitalize transition-all whitespace-nowrap ${
                    filter === f
                      ? "bg-[#0284c7] text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {f === "all" ? <Droplets className="h-3.5 w-3.5" /> :
                   f === "commercial" ? <Building2 className="h-3.5 w-3.5" /> :
                   f === "industrial" ? <Factory className="h-3.5 w-3.5" /> :
                   <Home className="h-3.5 w-3.5" />}
                  {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Error state */}
        {error && (
          <div className="flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <p className="text-sm">{error}</p>
            <button onClick={fetchProjects} className="ml-auto text-sm underline">Retry</button>
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
          ) : filtered.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center py-20 text-slate-400">
              <Droplets className="h-12 w-12 mb-4 opacity-30" />
              <p className="text-lg font-medium">
                {search || filter !== "all" ? "No projects match your filter" : "No projects yet"}
              </p>
              <p className="text-sm mt-1">
                {search || filter !== "all"
                  ? "Try clearing your search or filter"
                  : "Create your first water audit project above"}
              </p>
            </div>
          ) : (
            filtered.map(project => (
              <Link
                key={project.id}
                href={`/dashboard/projects/${project.id}`}
                className="group flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-7 shadow-sm hover:shadow-lg hover:border-sky-200 hover:-translate-y-0.5 transition-all cursor-pointer relative"
              >
                {/* Type badge */}
                {project.project_type && (
                  <span className={`absolute right-6 top-6 flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${typeColor(project.project_type)}`}>
                    {typeIcon(project.project_type)}
                    {project.project_type.charAt(0).toUpperCase() + project.project_type.slice(1)}
                  </span>
                )}

                {/* Delete button */}
                <button
                  onClick={e => handleDelete(e, project.id)}
                  disabled={deletingId === project.id}
                  className="absolute left-6 bottom-6 opacity-0 group-hover:opacity-100 flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-red-500 hover:bg-red-50 transition-all"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  {deletingId === project.id ? "Deleting…" : "Delete"}
                </button>

                <div className="mb-6 pr-28">
                  <h3 className="mb-2 text-xl font-bold leading-tight text-[#0f172a] line-clamp-2 group-hover:text-[#0284c7] transition-colors">
                    {project.title}
                  </h3>
                  {project.location && (
                    <div className="flex items-center gap-1.5 text-sm font-medium text-slate-500">
                      <MapPin className="h-3.5 w-3.5" />
                      {project.location}
                    </div>
                  )}
                </div>

                <div>
                  {project.description && (
                    <p className="mb-5 text-sm text-slate-500 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  )}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                      <Calendar className="h-3.5 w-3.5" />
                      {timeAgo(project.updated_at)}
                    </div>
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-sky-50 text-[#0284c7] opacity-0 group-hover:opacity-100 transition-opacity">
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
