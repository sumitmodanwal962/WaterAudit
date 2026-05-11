"use client"

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from "react"
import { getMe, UserProfile } from "@/lib/api"

interface AuthContextType {
  user: UserProfile | null
  token: string | null
  isLoading: boolean
  login: (token: string) => Promise<void>
  logout: () => void
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  isLoading: true,
  login: async () => {},
  logout: () => {},
  refreshUser: async () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const refreshUser = useCallback(async () => {
    try {
      const me = await getMe()
      setUser(me)
    } catch {
      setUser(null)
      setToken(null)
      localStorage.removeItem("wa_token")
    }
  }, [])

  useEffect(() => {
    const stored = localStorage.getItem("wa_token")
    if (stored) {
      setToken(stored)
      getMe()
        .then(setUser)
        .catch(() => {
          localStorage.removeItem("wa_token")
          setToken(null)
        })
        .finally(() => setIsLoading(false))
    } else {
      setIsLoading(false)
    }
  }, [])

  const login = async (newToken: string) => {
    localStorage.setItem("wa_token", newToken)
    setToken(newToken)
    const me = await getMe()
    setUser(me)
  }

  const logout = () => {
    localStorage.removeItem("wa_token")
    setToken(null)
    setUser(null)
    window.location.href = "/login"
  }

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
