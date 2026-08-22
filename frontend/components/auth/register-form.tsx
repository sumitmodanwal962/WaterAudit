"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  MapPin,
  Building2,
  Briefcase,
  AlertCircle,
  CheckCircle2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useRouter } from "next/navigation"
import { auth } from "@/lib/firebase"
import { createUserWithEmailAndPassword, sendEmailVerification, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { useAuth } from "@/contexts/AuthContext"

type UserRole = "user" | "admin"

export function RegisterForm() {
  const [role, setRole] = useState<UserRole>("user")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [gender, setGender] = useState<string>("")
  const router = useRouter()
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    const form = e.target as HTMLFormElement

    const email = (form.elements.namedItem("regEmail") as HTMLInputElement).value
    const password = (form.elements.namedItem("regPassword") as HTMLInputElement).value
    const contact = (form.elements.namedItem("contact") as HTMLInputElement).value
    const address = (form.elements.namedItem("address") as HTMLInputElement).value
    const location = (form.elements.namedItem("location") as HTMLInputElement).value

    // Validate password length
    if (password.length < 6) {
      setError("Password must be at least 6 characters long")
      setIsLoading(false)
      return
    }

    // Build the request body
    const body: Record<string, string> = {
      email,
      role,
      user_type: "individual", // Keep as individual by default
      contact,
      address,
      location,
      full_name: (form.elements.namedItem("fullName") as HTMLInputElement).value,
      gender,
    }

    if (role === "admin") {
      body.org_name = (form.elements.namedItem("orgName") as HTMLInputElement).value
      body.designation = (form.elements.namedItem("designation") as HTMLInputElement).value
    }

    try {
      // Create user in Firebase first
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      body.firebase_uid = userCredential.user.uid

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.detail || "Registration failed. Please try again.")
        return
      }

      await sendEmailVerification(userCredential.user)
      await signOut(auth)

      setSuccess("Account created! Please check your email to verify your account before logging in.")

      // Redirect to login page
      setTimeout(() => {
        router.push("/login")
      }, 3000)
    } catch (err: any) {
      setError(err.message || "Registration failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const provider = new GoogleAuthProvider()
      const userCredential = await signInWithPopup(auth, provider)
      const token = await userCredential.user.getIdToken()
      
      // Check if user exists in DB
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/users/me`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      
      if (!res.ok) {
        // Register them if they don't exist
        await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/auth/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: userCredential.user.email,
            firebase_uid: userCredential.user.uid,
            full_name: userCredential.user.displayName,
            role: role
          })
        })
      }
      
      await login(token)
      setSuccess("Successfully registered/logged in! Redirecting...")
      setTimeout(() => router.push("/dashboard"), 800)
    } catch (err: any) {
      setError(err.message || "Google Sign-In failed.")
    } finally {
      setIsLoading(false)
    }
  }

  const formVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-5"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm"
        >
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </motion.div>
      )}

      {/* Success Message */}
      {success && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 px-4 py-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-sm"
        >
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{success}</span>
        </motion.div>
      )}

      {/* User Role Toggle */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-foreground">
          Account Type
        </Label>
        <div className="flex gap-3 p-1.5 bg-muted rounded-xl">
          <button
            type="button"
            onClick={() => setRole("user")}
            className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${role === "user"
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
              }`}
          >
            User
          </button>
          <button
            type="button"
            onClick={() => setRole("admin")}
            className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${role === "admin"
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
              }`}
          >
            Admin
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={role}
          variants={formVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.2 }}
          className="space-y-4"
        >
          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-sm font-medium text-foreground">
              Full Name
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Enter your full name"
                className="pl-11 h-12 rounded-xl bg-input border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                required
                onChange={() => setError(null)}
              />
            </div>
          </div>

          {/* Gender */}
          <div className="space-y-2">
            <Label htmlFor="gender" className="text-sm font-medium text-foreground">
              Gender
            </Label>
            <Select required onValueChange={(value) => setGender(value)}>
              <SelectTrigger className="h-12 rounded-xl bg-input border-border focus:border-primary focus:ring-2 focus:ring-primary/20">
                <SelectValue placeholder="Select your gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
                <SelectItem value="prefer-not">Prefer not to say</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {role === "admin" && (
            <>
              {/* Organisation Name */}
              <div className="space-y-2">
                <Label htmlFor="orgName" className="text-sm font-medium text-foreground">
                  Organisation Name
                </Label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="orgName"
                    name="orgName"
                    type="text"
                    placeholder="Enter organisation name"
                    className="pl-11 h-12 rounded-xl bg-input border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    required
                    onChange={() => setError(null)}
                  />
                </div>
              </div>

              {/* Designation */}
              <div className="space-y-2">
                <Label htmlFor="designation" className="text-sm font-medium text-foreground">
                  Designation
                </Label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="designation"
                    name="designation"
                    type="text"
                    placeholder="Enter your designation"
                    className="pl-11 h-12 rounded-xl bg-input border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    required
                    onChange={() => setError(null)}
                  />
                </div>
              </div>
            </>
          )}

          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="regEmail" className="text-sm font-medium text-foreground">
              Email
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                id="regEmail"
                name="regEmail"
                type="email"
                placeholder="Enter your email"
                className="pl-11 h-12 rounded-xl bg-input border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                required
                onChange={() => setError(null)}
              />
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-2">
            <Label htmlFor="contact" className="text-sm font-medium text-foreground">
              Contact Details
            </Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                id="contact"
                name="contact"
                type="tel"
                placeholder="Enter your phone number"
                className="pl-11 h-12 rounded-xl bg-input border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                required
                onChange={() => setError(null)}
              />
            </div>
          </div>

          {/* Address */}
          <div className="space-y-2">
            <Label htmlFor="address" className="text-sm font-medium text-foreground">
              Address
            </Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
              <Input
                id="address"
                name="address"
                type="text"
                placeholder="Enter your address"
                className="pl-11 h-12 rounded-xl bg-input border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                required
                onChange={() => setError(null)}
              />
            </div>
          </div>

          {/* Location Field */}
          <div className="space-y-2">
            <Label htmlFor="location" className="text-sm font-medium text-foreground">
              Location
            </Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                id="location"
                name="location"
                type="text"
                placeholder="Enter your location"
                className="pl-11 h-12 rounded-xl bg-input border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                required
                onChange={() => setError(null)}
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label htmlFor="regPassword" className="text-sm font-medium text-foreground">
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                id="regPassword"
                name="regPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password (min 6 characters)"
                className="pl-11 pr-11 h-12 rounded-xl bg-input border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                required
                minLength={6}
                onChange={() => setError(null)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30 disabled:opacity-70"
        disabled={isLoading}
      >
        {isLoading ? (
          <motion.div
            className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          />
        ) : (
          "Create Account"
        )}
      </Button>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-card text-muted-foreground">Or register with</span>
        </div>
      </div>
      
      <Button
        type="button"
        variant="outline"
        className="w-full h-12 rounded-xl border-border bg-transparent hover:bg-muted text-foreground font-semibold"
        onClick={handleGoogleSignIn}
        disabled={isLoading}
      >
        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
        Sign up with Google
      </Button>
    </motion.form>
  )
}