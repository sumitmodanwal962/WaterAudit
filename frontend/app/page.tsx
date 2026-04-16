import { AuthCard } from "@/components/auth/auth-card"
import { HeroSection } from "@/components/auth/hero-section"

export default function AuthPage() {
  return (
    <main className="min-h-screen flex">
      {/* Left side - Hero Section (hidden on mobile) */}
      <HeroSection />

      {/* Right side - Auth Card */}
      <div className="flex-1 lg:w-1/2 flex items-center justify-center p-6 sm:p-8 lg:p-12 bg-background">
        <AuthCard />
      </div>
    </main>
  )
}
