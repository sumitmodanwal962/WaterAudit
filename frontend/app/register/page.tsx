import { AuthCard } from "@/components/auth/auth-card"

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6 sm:p-8 lg:p-12 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background"></div>
      
      <AuthCard mode="register" />
    </main>
  )
}
