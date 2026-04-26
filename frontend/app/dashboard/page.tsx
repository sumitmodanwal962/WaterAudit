import {
  Droplets,
  Building2,
  Factory,
  Home,
  FolderPlus,
  Search,
  MapPin,
  Calendar,
  ChevronRight,
} from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const projects = [
    {
      id: 1,
      title: "Municipal Water Treatment Plant",
      location: "Mumbai, Maharashtra",
      description: "Comprehensive water efficiency audit for the city's main treatment facility...",
      updated: "Updated 2 days ago",
    },
    {
      id: 2,
      title: "Greenview Office Complex",
      location: "Bengaluru, Karnataka",
      description: "Commercial building water audit covering restrooms, cooling towers, an...",
      updated: "Updated 1 week ago",
    },
    {
      id: 3,
      title: "Riverside Manufacturing",
      location: "Chennai, Tamil Nadu",
      description: "Industrial facility assessment focusing on process water reduction and...",
      updated: "Updated 3 days ago",
    },
    {
      id: 4,
      title: "Sunset Residential Community",
      location: "New Delhi, Delhi",
      description: "Multi-family residential complex water audit including common areas, individu...",
      updated: "Updated 5 days ago",
    },
    {
      id: 5,
      title: "Harbor District Hospital",
      location: "Hyderabad, Telangana",
      description: "Healthcare facility water management assessment covering medical...",
      updated: "Updated 1 day ago",
    },
    {
      id: 6,
      title: "Valley Agricultural Center",
      location: "Pune, Maharashtra",
      description: "Agricultural water audit for irrigation efficiency, crop water requirements, an...",
      updated: "Updated 4 days ago",
    },
  ];

  return (
    <div className="space-y-10">
      {/* Header Section */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-[#0f172a] mb-2">Your Projects</h1>
        <p className="text-lg text-slate-500">Manage and monitor your water audit projects</p>
      </div>

      {/* Stats Cards Section */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Projects */}
        <div className="flex items-center gap-4 rounded-3xl border bg-white p-6 shadow-sm">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e0f2fe]">
            <Droplets className="h-7 w-7 text-[#0284c7]" />
          </div>
          <div>
            <div className="text-3xl font-bold text-[#0f172a]">6</div>
            <div className="text-sm font-medium text-slate-500">Total Projects</div>
          </div>
        </div>
        {/* Commercial */}
        <div className="flex items-center gap-4 rounded-3xl border bg-white p-6 shadow-sm">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#dcfce7]">
            <Building2 className="h-7 w-7 text-[#16a34a]" />
          </div>
          <div>
            <div className="text-3xl font-bold text-[#0f172a]">2</div>
            <div className="text-sm font-medium text-slate-500">Commercial</div>
          </div>
        </div>
        {/* Industrial */}
        <div className="flex items-center gap-4 rounded-3xl border bg-white p-6 shadow-sm">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f1f5f9]">
            <Factory className="h-7 w-7 text-[#475569]" />
          </div>
          <div>
            <div className="text-3xl font-bold text-[#0f172a]">3</div>
            <div className="text-sm font-medium text-slate-500">Industrial</div>
          </div>
        </div>
        {/* Residential */}
        <div className="flex items-center gap-4 rounded-3xl border bg-white p-6 shadow-sm">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f1f5f9]">
            <Home className="h-7 w-7 text-[#475569]" />
          </div>
          <div>
            <div className="text-3xl font-bold text-[#0f172a]">1</div>
            <div className="text-sm font-medium text-slate-500">Residential</div>
          </div>
        </div>
      </div>

      {/* Create New Project Section */}
      <Link href="/dashboard/create-project" className="w-full rounded-3xl border-2 border-dashed border-slate-200 bg-white py-16 text-center hover:border-[#0284c7] hover:bg-slate-50 transition-all flex flex-col items-center justify-center group cursor-pointer shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0284c7] focus:ring-offset-2">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#e0f2fe] group-hover:scale-105 transition-transform">
          <FolderPlus className="h-8 w-8 text-[#0284c7]" />
        </div>
        <h3 className="text-xl font-bold text-[#0f172a] mb-1 group-hover:text-[#0284c7] transition-colors">Create New Project</h3>
        <p className="text-slate-500">Start a new water audit project</p>
      </Link>

      {/* Existing Projects Header & Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold text-[#0f172a]">Existing Projects</h2>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search projects..."
              className="h-10 w-full sm:w-[250px] rounded-full border border-slate-200 bg-white pl-10 pr-4 text-sm outline-none focus:border-[#0284c7] focus:ring-1 focus:ring-[#0284c7] transition-all"
            />
          </div>
          <div className="flex rounded-full border border-slate-200 bg-white p-1 shadow-sm overflow-x-auto">
            <button className="flex items-center gap-2 rounded-full bg-[#0284c7] px-4 py-1.5 text-sm font-medium text-white shadow-sm">
              <Droplets className="h-4 w-4" />
              All
            </button>
            <button className="flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
              <Building2 className="h-4 w-4" />
              Commercial
            </button>
            <button className="flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
              <Factory className="h-4 w-4" />
              Industrial
            </button>
            <button className="flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
              <Home className="h-4 w-4" />
              Residential
            </button>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
        {projects.map((project) => (
          <div
            key={project.id}
            className="group flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-7 shadow-sm hover:shadow-md hover:border-slate-300 transition-all cursor-pointer relative"
          >
            {/* Top Right Arrow */}
            <div className="absolute right-6 top-6 flex h-8 w-8 items-center justify-center rounded-full bg-[#e0f2fe] text-[#0284c7] opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
              <ChevronRight className="h-5 w-5" />
            </div>
            
            <div className="mb-6 pr-10">
              <h3 className="mb-2 text-xl font-bold leading-tight text-[#0f172a] line-clamp-2">
                {project.title}
              </h3>
              <div className="flex items-center gap-1.5 text-sm font-medium text-slate-500">
                <MapPin className="h-4 w-4" />
                {project.location}
              </div>
            </div>

            <div>
              <p className="mb-6 text-sm text-slate-500 line-clamp-2 leading-relaxed">
                {project.description}
              </p>
              <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                <Calendar className="h-4 w-4" />
                {project.updated}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
