"use client"

import { createContext, useContext, useEffect, useRef, useState, useCallback, ReactNode } from "react"
import { getMe, UserProfile } from "@/lib/api"
import { auth } from "@/lib/firebase"
import { completeGoogleRedirect, googleSignInError, type GoogleRedirectFailure } from "@/lib/google-auth"
import { onIdTokenChanged, signOut, type User } from "firebase/auth"

interface AuthContextType {
  user: UserProfile | null
  token: string | null
  isLoading: boolean
  googleRedirectError: GoogleRedirectFailure | null
  login: (token: string) => Promise<void>
  logout: () => void
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  isLoading: true,
  googleRedirectError: null,
  login: async () => {},
  logout: () => {},
  refreshUser: async () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [googleRedirectError, setGoogleRedirectError] = useState<GoogleRedirectFailure | null>(null)
  const redirectCompletion = useRef<Promise<GoogleRedirectFailure | null> | null>(null)

  const refreshUser = useCallback(async () => {
    try {
      const me = await getMe()
      setUser(me)
    } catch {
      setUser(null)
      setToken(null)
      localStorage.removeItem("wa_token")
      window.location.href = "/login"
    }
  }, [])

  useEffect(() => {
    if (!auth) {
      setIsLoading(false);
      return;
    }
    const handleTokenChange = async (firebaseUser: User | null) => {
      if (firebaseUser) {
        const currentToken = await firebaseUser.getIdToken()
        localStorage.setItem("wa_token", currentToken)
        setToken(currentToken)
        try {
          const me = await getMe()
          setUser(me)
        } catch (e) {
          console.error("Failed to fetch user profile:", e)
          setUser(null)
        }
      } else {
        localStorage.removeItem("wa_token")
        setToken(null)
        setUser(null)
      }
      setIsLoading(false)
    }

    // Finish profile creation before the initial token listener loads it.
    redirectCompletion.current ??= completeGoogleRedirect().catch((error: unknown) => ({
      message: googleSignInError(error),
    }))
    let active = true
    let unsubscribe: (() => void) | undefined
    void redirectCompletion.current.then((error) => {
      if (!active) return
      setGoogleRedirectError(error)
      unsubscribe = onIdTokenChanged(auth, handleTokenChange)
    })

    return () => {
      active = false
      unsubscribe?.()
    }
  }, [])

  const login = async (newToken: string) => {
    // newToken is passed from Firebase login, or we just rely on onIdTokenChanged
    localStorage.setItem("wa_token", newToken)
    setToken(newToken)
    try {
      const me = await getMe()
      setUser(me)
    } catch (e) {
      console.error("Failed to fetch user profile:", e)
    }
  }

  const logout = async () => {
    await signOut(auth)
    localStorage.removeItem("wa_token")
    setToken(null)
    setUser(null)
    window.location.href = "/login"
  }

  return (
    <AuthContext.Provider value={{ user, token, isLoading, googleRedirectError, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
