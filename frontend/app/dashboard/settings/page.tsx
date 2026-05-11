"use client"

import { useState } from "react"
import { ArrowLeft, Bell, Globe, Shield, User, Trash2, ChevronRight, Monitor, Moon, Sun } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/AuthContext"

type Tab = "account" | "notifications" | "preferences" | "security"

function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button onClick={onChange} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${checked ? "bg-[#0284c7]" : "bg-slate-200"}`}>
      <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${checked ? "translate-x-6" : "translate-x-1"}`} />
    </button>
  )
}

function SectionTitle({ icon: Icon, title, desc, color = "sky" }: { icon: React.ElementType; title: string; desc?: string; color?: string }) {
  const colors: Record<string, string> = { sky: "bg-sky-100 text-[#0284c7]", violet: "bg-violet-100 text-violet-600", amber: "bg-amber-100 text-amber-600", red: "bg-red-100 text-red-600" }
  return (
    <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
      <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${colors[color]}`}><Icon className="h-5 w-5" /></div>
      <div><h3 className="font-bold text-[#0f172a]">{title}</h3>{desc && <p className="text-sm text-slate-500">{desc}</p>}</div>
    </div>
  )
}

export default function SettingsPage() {
  const { user, logout } = useAuth()
  const [tab, setTab] = useState<Tab>("account")

  const [notifs, setNotifs] = useState({
    email_project: true, email_alerts: true, email_weekly: false,
    push_alerts: true, push_updates: false,
  })
  const [prefs, setPrefs] = useState({
    theme: "system" as "light" | "dark" | "system",
    units: "litres" as "litres" | "gallons",
    dateFormat: "DD/MM/YYYY",
    language: "en",
  })

  const tabs: { key: Tab; label: string; icon: React.ElementType }[] = [
    { key: "account", label: "Account", icon: User },
    { key: "notifications", label: "Notifications", icon: Bell },
    { key: "preferences", label: "Preferences", icon: Globe },
    { key: "security", label: "Security", icon: Shield },
  ]

  return (
    <div className="mx-auto max-w-4xl space-y-8 pb-20">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard" className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 hover:text-[#0284c7] transition-colors shadow-sm">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#0f172a]">Settings</h1>
          <p className="text-slate-500 mt-0.5">Manage your account preferences</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-sm space-y-1">
            {tabs.map(({ key, label, icon: Icon }) => (
              <button key={key} onClick={() => setTab(key)}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${tab === key ? "bg-sky-50 text-[#0284c7]" : "text-slate-600 hover:bg-slate-50"}`}>
                <Icon className="h-4 w-4 shrink-0" />
                {label}
                {tab === key && <ChevronRight className="ml-auto h-4 w-4" />}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="md:col-span-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-8">

            {/* ── Account ── */}
            {tab === "account" && (
              <div className="space-y-6">
                <SectionTitle icon={User} title="Account Details" />
                <div className="space-y-3">
                  {[
                    { label: "Name", value: user?.full_name || "Not set" },
                    { label: "Email", value: user?.email || "—" },
                    { label: "Account Type", value: user?.user_type === "organisation" ? "Organisation" : "Individual" },
                    { label: "Status", value: user?.is_active ? "Active" : "Inactive" },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
                      <span className="text-sm text-slate-500 font-medium">{label}</span>
                      <span className="text-sm font-semibold text-[#0f172a]">{value}</span>
                    </div>
                  ))}
                </div>

                <Link href="/dashboard/profile"
                  className="flex items-center justify-between rounded-xl border border-sky-200 bg-sky-50 px-4 py-3.5 text-sm font-medium text-[#0284c7] hover:bg-sky-100 transition-colors">
                  Edit profile information
                  <ChevronRight className="h-4 w-4" />
                </Link>

                {/* Danger Zone */}
                <div className="rounded-2xl border border-red-200 bg-red-50/50 p-5 space-y-3">
                  <h4 className="text-sm font-bold text-red-700">Danger Zone</h4>
                  <p className="text-xs text-red-500">These actions are irreversible. Please proceed with caution.</p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button onClick={logout}
                      className="flex items-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors shadow-sm">
                      Sign out of all devices
                    </button>
                    <button className="flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-700 transition-colors shadow-sm">
                      <Trash2 className="h-4 w-4" />
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ── Notifications ── */}
            {tab === "notifications" && (
              <div className="space-y-6">
                <SectionTitle icon={Bell} title="Notification Preferences" desc="Choose what you want to be notified about" />

                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Email Notifications</h4>
                  {[
                    { key: "email_project" as const, label: "Project updates", desc: "When a project is created or updated" },
                    { key: "email_alerts" as const, label: "Leak & anomaly alerts", desc: "Critical water system alerts" },
                    { key: "email_weekly" as const, label: "Weekly digest", desc: "Summary of your projects every Monday" },
                  ].map(({ key, label, desc }) => (
                    <div key={key} className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-4 py-4">
                      <div>
                        <p className="text-sm font-semibold text-[#0f172a]">{label}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{desc}</p>
                      </div>
                      <Toggle checked={notifs[key]} onChange={() => setNotifs(p => ({ ...p, [key]: !p[key] }))} />
                    </div>
                  ))}

                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 pt-2">Push Notifications</h4>
                  {[
                    { key: "push_alerts" as const, label: "Real-time alerts", desc: "Instant notifications for critical issues" },
                    { key: "push_updates" as const, label: "App updates", desc: "New features and platform news" },
                  ].map(({ key, label, desc }) => (
                    <div key={key} className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-4 py-4">
                      <div>
                        <p className="text-sm font-semibold text-[#0f172a]">{label}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{desc}</p>
                      </div>
                      <Toggle checked={notifs[key]} onChange={() => setNotifs(p => ({ ...p, [key]: !p[key] }))} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── Preferences ── */}
            {tab === "preferences" && (
              <div className="space-y-6">
                <SectionTitle icon={Globe} title="Display & Regional" desc="Customise your experience" color="violet" />

                {/* Theme */}
                <div>
                  <label className="block text-sm font-semibold text-[#0f172a] mb-3">Theme</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: "light", label: "Light", icon: Sun },
                      { value: "dark", label: "Dark", icon: Moon },
                      { value: "system", label: "System", icon: Monitor },
                    ].map(({ value, label, icon: Icon }) => (
                      <button key={value} onClick={() => setPrefs(p => ({ ...p, theme: value as "light" | "dark" | "system" }))}
                        className={`flex flex-col items-center gap-2 rounded-xl border-2 px-4 py-4 text-sm font-medium transition-all ${prefs.theme === value ? "border-[#0284c7] bg-sky-50 text-[#0284c7]" : "border-slate-200 text-slate-600 hover:border-slate-300"}`}>
                        <Icon className="h-5 w-5" />
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Units */}
                <div>
                  <label className="block text-sm font-semibold text-[#0f172a] mb-3">Water Volume Units</label>
                  <div className="flex gap-3">
                    {["litres", "gallons"].map(u => (
                      <button key={u} onClick={() => setPrefs(p => ({ ...p, units: u as "litres" | "gallons" }))}
                        className={`flex-1 rounded-xl border-2 py-3 text-sm font-medium capitalize transition-all ${prefs.units === u ? "border-[#0284c7] bg-sky-50 text-[#0284c7]" : "border-slate-200 text-slate-600"}`}>
                        {u}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Date Format */}
                <div>
                  <label className="block text-sm font-semibold text-[#0f172a] mb-2">Date Format</label>
                  <select value={prefs.dateFormat} onChange={e => setPrefs(p => ({ ...p, dateFormat: e.target.value }))}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 px-4 text-sm outline-none focus:border-[#0284c7] focus:ring-1 focus:ring-[#0284c7] focus:bg-white transition-all">
                    <option value="DD/MM/YYYY">DD/MM/YYYY (Indian)</option>
                    <option value="MM/DD/YYYY">MM/DD/YYYY (US)</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD (ISO)</option>
                  </select>
                </div>

                {/* Language */}
                <div>
                  <label className="block text-sm font-semibold text-[#0f172a] mb-2">Language</label>
                  <select value={prefs.language} onChange={e => setPrefs(p => ({ ...p, language: e.target.value }))}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 px-4 text-sm outline-none focus:border-[#0284c7] focus:ring-1 focus:ring-[#0284c7] focus:bg-white transition-all">
                    <option value="en">English</option>
                    <option value="hi">Hindi</option>
                    <option value="mr">Marathi</option>
                    <option value="ta">Tamil</option>
                    <option value="te">Telugu</option>
                  </select>
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-end">
                  <button className="flex items-center gap-2 rounded-xl bg-[#0284c7] px-6 py-3 text-sm font-semibold text-white hover:bg-[#0369a1] transition-all active:scale-95 shadow-sm">
                    Save Preferences
                  </button>
                </div>
              </div>
            )}

            {/* ── Security ── */}
            {tab === "security" && (
              <div className="space-y-6">
                <SectionTitle icon={Shield} title="Security Settings" desc="Manage your account security" color="amber" />

                {/* Active sessions */}
                <div>
                  <h4 className="text-sm font-semibold text-[#0f172a] mb-3">Active Sessions</h4>
                  <div className="rounded-xl border border-slate-200 divide-y divide-slate-100 overflow-hidden">
                    {[
                      { device: "Chrome on Windows", location: "Mumbai, India", current: true, time: "Now" },
                      { device: "Safari on iPhone", location: "Pune, India", current: false, time: "2 hours ago" },
                    ].map((s, i) => (
                      <div key={i} className="flex items-center justify-between px-4 py-3.5 bg-white">
                        <div>
                          <p className="text-sm font-semibold text-[#0f172a]">{s.device}</p>
                          <p className="text-xs text-slate-400">{s.location} · {s.time}</p>
                        </div>
                        {s.current
                          ? <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">Current</span>
                          : <button className="text-xs text-red-500 hover:text-red-700 font-medium">Revoke</button>}
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2FA */}
                <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-[#0f172a]">Two-Factor Authentication</h4>
                      <p className="text-xs text-slate-500 mt-1">Add an extra layer of security to your account</p>
                    </div>
                    <span className="text-xs font-semibold bg-slate-100 text-slate-500 px-2.5 py-1 rounded-full">Coming Soon</span>
                  </div>
                </div>

                {/* Change password link */}
                <Link href="/dashboard/profile"
                  className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-medium text-slate-700 hover:bg-white hover:border-[#0284c7] hover:text-[#0284c7] transition-all">
                  <div>
                    <p className="font-semibold">Change Password</p>
                    <p className="text-xs text-slate-400 mt-0.5">Update your login password from the Profile page</p>
                  </div>
                  <ChevronRight className="h-4 w-4 shrink-0" />
                </Link>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}
