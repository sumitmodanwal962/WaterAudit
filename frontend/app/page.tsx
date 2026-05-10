import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Droplets, ArrowRight, BarChart3, ShieldCheck, Zap } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6 md:gap-10">
            <Link href="/" className="flex items-center space-x-2">
              <div className="p-1.5 bg-primary rounded-lg">
                <Droplets className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold inline-block text-xl">WaterAudit</span>
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
                Home
              </Link>
              <Link href="#about" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                About
              </Link>
              <Link href="#services" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                Services
              </Link>
              <Link href="#contact" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                Contact
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" className="hidden sm:inline-flex">
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button>Register</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="relative px-4 pt-24 pb-32 md:pt-32 md:pb-40 overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background"></div>
          
          <div className="container mx-auto text-center">
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 mb-8">
              🚀 The Future of Water Management
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Smart Water Auditing <br className="hidden md:block" /> Made Simple
            </h1>
            <p className="max-w-[42rem] mx-auto text-muted-foreground text-lg sm:text-xl mb-10">
              Monitor, analyze, and optimize your water usage with our cutting-edge AI-powered platform. Save resources, reduce costs, and build a sustainable future.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register">
                <Button size="lg" className="w-full sm:w-auto gap-2">
                  Get Started <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="#services">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features / Services Section */}
        <section id="services" className="py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Everything you need</h2>
              <p className="text-muted-foreground max-w-[42rem] mx-auto">
                Our platform provides a comprehensive suite of tools to help you understand and improve your water efficiency.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-card p-6 rounded-2xl border shadow-sm hover:shadow-md transition-shadow">
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 text-primary">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Real-time Analytics</h3>
                <p className="text-muted-foreground">
                  Track your water consumption patterns with detailed, easy-to-understand visualizations.
                </p>
              </div>
              <div className="bg-card p-6 rounded-2xl border shadow-sm hover:shadow-md transition-shadow">
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 text-primary">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Compliance Tracking</h3>
                <p className="text-muted-foreground">
                  Ensure your facility meets all local and international water usage regulations automatically.
                </p>
              </div>
              <div className="bg-card p-6 rounded-2xl border shadow-sm hover:shadow-md transition-shadow">
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 text-primary">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Smart Alerts</h3>
                <p className="text-muted-foreground">
                  Receive instant notifications about potential leaks or unusual consumption spikes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-6">About WaterAudit</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              We are on a mission to revolutionize how organizations manage their water resources. By combining advanced sensors with intuitive software, we make water conservation accessible, measurable, and highly impactful.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="contact" className="border-t py-12 bg-muted/30">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Droplets className="w-5 h-5 text-primary" />
            <span className="font-semibold text-lg">WaterAudit</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} WaterAudit Inc. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Terms</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
