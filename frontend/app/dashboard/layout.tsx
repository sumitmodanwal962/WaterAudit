import { Bell, Settings, Droplets } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b bg-white px-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#007ba7]">
            <Droplets className="h-6 w-6 text-white" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold leading-none text-[#0f172a]">AquaAudit</h1>
            <span className="text-xs font-medium text-slate-500 mt-1">Water Conservation Platform</span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-slate-500">
          <button className="rounded-full p-2 hover:bg-slate-100 transition-colors">
            <Bell className="h-5 w-5" />
          </button>
          <button className="rounded-full p-2 hover:bg-slate-100 transition-colors">
            <Settings className="h-5 w-5" />
          </button>
          <Avatar className="h-9 w-9 bg-[#10b981] text-white cursor-pointer hover:opacity-90">
            <AvatarFallback className="bg-emerald-500 text-white font-medium">U</AvatarFallback>
          </Avatar>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="mx-auto max-w-7xl pt-8 pb-16 px-6">
        {children}
      </main>
    </div>
  )
}
