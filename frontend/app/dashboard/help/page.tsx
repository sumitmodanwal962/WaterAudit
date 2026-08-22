"use client"

import { Mail, LifeBuoy, BookOpen, MessageCircle } from "lucide-react"

export default function HelpPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-10">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground mb-2">
          Help & Support
        </h1>
        <p className="text-muted-foreground text-lg">
          Need assistance? We're here to help you with your water audits.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {/* Contact Support Card */}
        <div className="rounded-3xl border border-border bg-card p-8 shadow-sm text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sky-100 dark:bg-sky-900/30 mb-6">
            <Mail className="h-8 w-8 text-sky-600 dark:text-sky-400" />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">Contact Support</h2>
          <p className="text-muted-foreground mb-6">
            Have a specific issue or need technical assistance? Email our dedicated support team directly.
          </p>
          <a
            href="mailto:wateraudit.support@gmail.com"
            className="inline-flex w-full items-center justify-center rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            wateraudit.support@gmail.com
          </a>
        </div>

        {/* FAQ Placeholder Card */}
        <div className="rounded-3xl border border-border bg-card p-8 shadow-sm text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30 mb-6">
            <BookOpen className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">Documentation</h2>
          <p className="text-muted-foreground mb-6">
            Browse our comprehensive guides and tutorials to learn how to conduct perfect water audits.
          </p>
          <button
            disabled
            className="inline-flex w-full items-center justify-center rounded-xl border border-border bg-muted px-4 py-3 text-sm font-semibold text-muted-foreground cursor-not-allowed"
          >
            Coming Soon
          </button>
        </div>
      </div>

      {/* General Information Box */}
      <div className="rounded-3xl border border-sky-200 dark:border-sky-900/50 bg-sky-50 dark:bg-sky-900/10 p-8">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sky-100 dark:bg-sky-900/30">
            <LifeBuoy className="h-6 w-6 text-sky-600 dark:text-sky-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-sky-900 dark:text-sky-100 mb-2">General Assistance</h3>
            <p className="text-sky-800 dark:text-sky-200/80 leading-relaxed">
              If you're having trouble submitting an audit, make sure you've filled out all required fields. For administrators, remember that you can only create audits for cities that have been explicitly assigned to your account by a Superadmin.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
