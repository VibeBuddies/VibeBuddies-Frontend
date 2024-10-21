import React, { createContext, useState, useEffect } from "react"

interface AuthContextType {
  token: string | null
  login: (token: string) => void
  logOff: () => void
  isAuthenticated: boolean
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null)

  // Check if token exists in local storage on app load
  useEffect(() => {
    const storedToken = localStorage.getItem("token")
    if (storedToken) {
      setToken(storedToken)
    }
  }, [])

  const login = (newToken: string) => {
    setToken(newToken)
    localStorage.setItem("token", newToken)
  }

  const logOff = () => {
    setToken(null)
    localStorage.removeItem("token")
  }

  const isAuthenticated = !!token

  return (
    <AuthContext.Provider value={{ token, login, logOff, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}
