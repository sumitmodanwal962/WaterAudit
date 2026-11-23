import { getRedirectResult, GoogleAuthProvider, signInWithRedirect, type User } from "firebase/auth"
import { register } from "@/lib/api"
import { auth } from "@/lib/firebase"

const redirectKey = "wa_google_redirect_role"
const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

type AccountRole = "user" | "admin"

export type GoogleRedirectFailure = {
  message: string
  retryRole?: AccountRole
}

export async function startGoogleRedirect(role: AccountRole = "user") {
  if (!auth) throw new Error("Google sign-in is unavailable.")

  sessionStorage.setItem(redirectKey, role)
  try {
    await signInWithRedirect(auth, new GoogleAuthProvider())
  } catch (error) {
    sessionStorage.removeItem(redirectKey)
    throw error
  }
}

export async function completeGoogleRedirect(): Promise<GoogleRedirectFailure | null> {
  const role = sessionStorage.getItem(redirectKey)
  if (role !== "user" && role !== "admin") return null

  try {
    const result = await getRedirectResult(auth)
    if (!result) {
      return {
        message: "Google sign-in returned without a result. Please try again.",
        retryRole: role,
      }
    }

    await ensureGoogleProfile(result.user, role)
    return null
  } finally {
    sessionStorage.removeItem(redirectKey)
  }
}

async function ensureGoogleProfile(user: User, role: AccountRole) {
  const token = await user.getIdToken()
  const profile = await fetch(`${apiUrl}/api/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
  })

  if (profile.ok) return
  if (profile.status !== 404) throw new Error("Could not load your WaterAudit profile. Please try again.")
  if (!user.email) throw new Error("Google did not provide an email address for your WaterAudit account.")

  await register({
    email: user.email,
    firebase_uid: user.uid,
    full_name: user.displayName ?? undefined,
    role,
  })
}

export function googleSignInError(error: unknown) {
  if (error instanceof Error) {
    if ("code" in error && error.code === "auth/unauthorized-domain") {
      return "Google sign-in is unavailable on this domain."
    }
    return error.message
  }
  return "Google sign-in failed. Please try again."
}
