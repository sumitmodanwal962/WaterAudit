"use client"

import { useEffect, useState, useCallback } from "react"
import {
  Droplets, Building2, Factory, Home, Search,
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

export default function AuditsPage() {
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
    if (!confirm("Delete this official project? This cannot be undone.")) return
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

  // Filtered list
  const filtered = projects.filter(p => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      (p.location ?? "").toLowerCase().includes(search.toLowerCase())
    const matchesFilter = filter === "all" || p.project_type === filter
    return matchesSearch && matchesFilter
  })

  const publicProjects = filtered.filter(p => p.owner_id !== user?.id)

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#0f172a] mb-1">
            Official Public Audits 📋
          </h1>
          <p className="text-slate-500 text-lg">Browse verified water audits completed by administrators</p>
        </div>
        <button
          onClick={fetchProjects}
          className="hidden sm:flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 shadow-sm hover:bg-slate-50 transition-all"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </button>
      </div>

      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-end">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search city, location, or title..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="h-10 w-full sm:w-[280px] rounded-full border border-slate-200 bg-white pl-10 pr-4 text-sm outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all shadow-sm"
              />
            </div>
            {/* Filter tabs */}
            <div className="flex rounded-full border border-slate-200 bg-white p-1 shadow-sm overflow-x-auto gap-0.5">
              {(
                ["all", "commercial", "industrial", "residential"] as FilterType[]
              ).map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium capitalize transition-all whitespace-nowrap ${
                    filter === f
                      ? "bg-amber-500 text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {f === "all" ? (
                    <Droplets className="h-3.5 w-3.5" />
                  ) : f === "commercial" ? (
                    <Building2 className="h-3.5 w-3.5" />
                  ) : f === "industrial" ? (
                    <Factory className="h-3.5 w-3.5" />
                  ) : (
                    <Home className="h-3.5 w-3.5" />
                  )}
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
          ) : publicProjects.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center py-20 text-slate-400">
              <Droplets className="h-12 w-12 mb-4 opacity-30" />
              <p className="text-lg font-medium">
                {search || filter !== "all" ? "No official audits match your filter" : "No official audits yet"}
              </p>
              <p className="text-sm mt-1">
                {search || filter !== "all"
                  ? "Try clearing your search or filter"
                  : "Completed official audits will appear here"}
              </p>
            </div>
          ) : (
            publicProjects.map(project => (
              <Link
                key={project.id}
                href={`/dashboard/projects/${project.id}`}
                className="group flex flex-col justify-between rounded-3xl border-2 border-amber-200/60 bg-amber-50/30 p-7 shadow-sm hover:shadow-lg hover:border-amber-300 hover:-translate-y-0.5 transition-all cursor-pointer relative"
              >
                {project.project_type && (
                  <span className={`absolute right-6 top-6 flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${typeColor(project.project_type)}`}>
                    {typeIcon(project.project_type)}
                    {project.project_type.charAt(0).toUpperCase() + project.project_type.slice(1)}
                  </span>
                )}

                <div className="mb-6 pr-28">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-[10px] font-bold rounded-md uppercase tracking-wider">Verified</span>
                  </div>
                  <h3 className="mb-2 text-xl font-bold leading-tight text-[#0f172a] line-clamp-2 group-hover:text-amber-700 transition-colors">
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
                    <div className="flex items-center gap-2">
                      {user?.role === "superadmin" && (
                        <button
                          onClick={e => handleDelete(e, project.id)}
                          disabled={deletingId === project.id}
                          className="opacity-0 group-hover:opacity-100 flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs font-medium text-red-500 hover:bg-red-50 transition-all"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          <span className="hidden sm:inline">Delete</span>
                        </button>
                      )}
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-100 text-amber-600 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ChevronRight className="h-4 w-4" />
                      </div>
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
