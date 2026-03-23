"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  username: string
  name: string
}

interface AuthContextType {
  user: User | null
  login: (username: string, password: string) => boolean
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const MOCK_USER = {
  username: "nelischarello",
  password: "172559",
  name: "Nelis Charello"
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const isLogged = localStorage.getItem("loggedIn")
    if (isLogged === "true") {
      setUser({ username: MOCK_USER.username, name: MOCK_USER.name })
    }
    setIsLoading(false)
  }, [])

  const login = (username: string, password: string): boolean => {
    if (username === MOCK_USER.username && password === MOCK_USER.password) {
      const userData = { username: MOCK_USER.username, name: MOCK_USER.name }
      setUser(userData)
      localStorage.setItem("loggedIn", "true")
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("loggedIn")
    window.location.href = "/"
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
