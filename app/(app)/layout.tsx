"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { BottomNav } from "@/components/bottom-nav"

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, isLoading } = useAuth()
  const [shouldRedirect, setShouldRedirect] = useState(false)

  useEffect(() => {
    if (!isLoading && !user) {
      const isLogged = localStorage.getItem("loggedIn")
      if (isLogged !== "true") {
        setShouldRedirect(true)
      }
    }
  }, [user, isLoading])

  useEffect(() => {
    if (shouldRedirect) {
      window.location.href = "/"
    }
  }, [shouldRedirect])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center animate-pulse">
          <span className="text-xl font-bold text-primary-foreground">99</span>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {children}
      <BottomNav />
    </div>
  )
}
