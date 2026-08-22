"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { 
  Bell, Settings, Droplets, ChevronDown, User, LogOut, 
  X, Menu, LayoutDashboard, FileText, BarChart3, HelpCircle,
  Sun, Moon, Laptop, Shield
} from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useAuth } from "@/contexts/AuthContext"
import { useTheme } from "next-themes"

const navLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/audits", label: "Audits", icon: FileText },
  { href: "/dashboard/help", label: "Help", icon: HelpCircle },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout, isLoading } = useAuth()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/login")
    }
  }, [user, isLoading, router])

  if (isLoading || !user) {
    return <div className="min-h-screen flex items-center justify-center bg-background"><div className="animate-spin h-8 w-8 border-4 border-sky-500 border-t-transparent rounded-full" /></div>
  }

  const toggleTheme = () => {
    if (theme === "light") setTheme("dark")
    else if (theme === "dark") setTheme("system")
    else setTheme("light")
  }

  const displayName = user?.full_name || user?.email?.split('@')[0] || "User"
  const initials = displayName.charAt(0).toUpperCase()

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-30 flex h-18 items-center justify-between border-b border-border bg-card/95 backdrop-blur-sm px-4 sm:px-6 shadow-sm">
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#0284c7] to-[#0ea5e9] shadow-md shadow-sky-200 dark:shadow-none group-hover:shadow-sky-300 transition-shadow">
            <Droplets className="h-5 w-5 text-white" />
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="text-lg font-bold leading-none text-foreground">WaterAudit</span>
            <span className="text-[11px] font-medium text-muted-foreground mt-0.5">Water Auditing Platform</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || (href !== "/dashboard" && pathname.startsWith(href))
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all ${
                  active
                    ? "bg-sky-50 text-[#0284c7] dark:bg-sky-950/40 dark:text-sky-400"
                    : "text-muted-foreground hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-100"
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            )
          })}
          {user?.role === "superadmin" && (
            <Link
              href="/dashboard/admin"
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all ${
                pathname.startsWith("/dashboard/admin")
                  ? "bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400"
                  : "text-muted-foreground hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-100"
              }`}
            >
              <Shield className="h-4 w-4" />
              Admin
            </Link>
          )}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Theme Selector Button */}
          <button
            onClick={toggleTheme}
            className="rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100 transition-all cursor-pointer"
            title={mounted ? `Theme: ${theme}` : "Theme: System"}
          >
            {!mounted ? (
              <Sun className="h-5 w-5 animate-pulse text-slate-400" />
            ) : theme === "light" ? (
              <Sun className="h-5 w-5 text-amber-500" />
            ) : theme === "dark" ? (
              <Moon className="h-5 w-5 text-indigo-400" />
            ) : (
              <Laptop className="h-5 w-5 text-sky-400" />
            )}
          </button>

          {/* Bell */}
          <button className="relative rounded-full p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
          </button>

          {/* User dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2.5 rounded-xl px-2.5 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#0284c7] to-[#0ea5e9] text-white text-sm font-bold shadow-sm">
                {initials}
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-sm font-semibold text-foreground leading-tight max-w-[120px] truncate">
                  {displayName}
                </span>
                <span className="text-xs text-muted-foreground leading-tight max-w-[120px] truncate">
                  {user?.email}
                </span>
              </div>
              <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 rounded-2xl border border-border bg-card py-2 shadow-xl dark:shadow-none z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                {/* User info header */}
                <div className="px-4 py-3 border-b border-border">
                  <p className="text-sm font-semibold text-foreground truncate">{displayName}</p>
                  <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                </div>
                <div className="py-1">
                  <Link
                    href="/dashboard/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-[#0284c7] transition-colors"
                  >
                    <User className="h-4 w-4" />
                    My Profile
                  </Link>
                  <Link
                    href="/dashboard/settings"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-[#0284c7] transition-colors"
                  >
                    <Settings className="h-4 w-4" />
                    Settings
                  </Link>
                </div>
                <div className="border-t border-border pt-1">
                  <button
                    onClick={logout}
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden rounded-full p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-card px-4 py-3 space-y-1 shadow-sm">
          {navLinks.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || (href !== "/dashboard" && pathname.startsWith(href))
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
                  active 
                    ? "bg-sky-50 text-[#0284c7] dark:bg-sky-950/40 dark:text-sky-400" 
                    : "text-muted-foreground hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            )
          })}
          <Link
            href="/dashboard/profile"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-muted-foreground hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
          >
            <User className="h-4 w-4" />
            Profile
          </Link>
        </div>
      )}

      {/* Main Content */}
      <main className="mx-auto max-w-7xl pt-8 pb-16 px-4 sm:px-6">
        {children}
      </main>
    </div>
  )
}
