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

type UserType = "individual" | "organisation"

export function RegisterForm() {
  const [userType, setUserType] = useState<UserType>("individual")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    router.push("/dashboard")
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
      {/* User Type Toggle */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-foreground">
          Account Type
        </Label>
        <div className="flex gap-3 p-1.5 bg-muted rounded-xl">
          <button
            type="button"
            onClick={() => setUserType("individual")}
            className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${userType === "individual"
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
              }`}
          >
            Individual
          </button>
          <button
            type="button"
            onClick={() => setUserType("organisation")}
            className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${userType === "organisation"
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
              }`}
          >
            Organisation
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={userType}
          variants={formVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.2 }}
          className="space-y-4"
        >
          {userType === "individual" ? (
            <>
              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-sm font-medium text-foreground">
                  Full Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    className="pl-11 h-12 rounded-xl bg-input border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    required
                  />
                </div>
              </div>

              {/* Gender */}
              <div className="space-y-2">
                <Label htmlFor="gender" className="text-sm font-medium text-foreground">
                  Gender
                </Label>
                <Select required>
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
            </>
          ) : (
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
                    type="text"
                    placeholder="Enter organisation name"
                    className="pl-11 h-12 rounded-xl bg-input border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    required
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
                    type="text"
                    placeholder="Enter your designation"
                    className="pl-11 h-12 rounded-xl bg-input border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    required
                  />
                </div>
              </div>
            </>
          )}

          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="regEmail" className="text-sm font-medium text-foreground">
              Email / Username
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                id="regEmail"
                type="email"
                placeholder="Enter your email"
                className="pl-11 h-12 rounded-xl bg-input border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                required
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
                type="tel"
                placeholder="Enter your phone number"
                className="pl-11 h-12 rounded-xl bg-input border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                required
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
                type="text"
                placeholder="Enter your address"
                className="pl-11 h-12 rounded-xl bg-input border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                required
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
                type="text"
                placeholder="Enter your location"
                className="pl-11 h-12 rounded-xl bg-input border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                required
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
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                className="pl-11 pr-11 h-12 rounded-xl bg-input border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                required
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
    </motion.form>
  )
}