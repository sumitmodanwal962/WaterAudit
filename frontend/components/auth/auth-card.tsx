"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Droplets } from "lucide-react"
import { LoginForm } from "./login-form"
import { RegisterForm } from "./register-form"

type AuthTab = "login" | "register"

export function AuthCard() {
  const [activeTab, setActiveTab] = useState<AuthTab>("login")

  return (
    <motion.div
      className="w-full max-w-md mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Mobile Logo - only shown on mobile */}
      <motion.div
        className="flex items-center justify-center gap-2 mb-6 lg:hidden"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="p-2.5 bg-primary rounded-xl">
          <Droplets className="w-7 h-7 text-primary-foreground" />
        </div>
        <span className="text-2xl font-bold text-foreground">WaterAudit</span>
      </motion.div>

      {/* Card */}
      <div className="bg-card rounded-3xl shadow-xl shadow-primary/5 border border-border/50 overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-border">
          {(["login", "register"] as AuthTab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="relative flex-1 py-4 text-sm font-semibold transition-colors"
            >
              <span
                className={
                  activeTab === tab
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }
              >
                {tab === "login" ? "Login" : "Register"}
              </span>
              {activeTab === tab && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  layoutId="activeTab"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Form Content */}
        <div className="p-6 sm:p-8 max-h-[70vh] overflow-y-auto">
          <AnimatePresence mode="wait">
            {activeTab === "login" ? (
              <LoginForm key="login" />
            ) : (
              <RegisterForm key="register" />
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Footer text */}
      <motion.p
        className="text-center text-sm text-muted-foreground mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        By continuing, you agree to our{" "}
        <button className="text-primary hover:text-primary/80 font-medium transition-colors">
          Terms of Service
        </button>{" "}
        and{" "}
        <button className="text-primary hover:text-primary/80 font-medium transition-colors">
          Privacy Policy
        </button>
      </motion.p>
    </motion.div>
  )
}
