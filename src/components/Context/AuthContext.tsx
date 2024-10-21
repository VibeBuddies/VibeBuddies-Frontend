import React, { createContext, useState, useEffect } from "react"

interface AuthContextType {
  token: string | null
  login: (token: string, username: string) => void
  logout: () => void
  isAuthenticated: boolean
  username: string | null
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null)
  const [username, setUsername] = useState<string | null>(null)

  // Check if token exists in local storage on app load
  useEffect(() => {
    const storedToken = localStorage.getItem("token")
    if (storedToken) {
      setToken(storedToken)
    }
  }, [])

  const login = (newToken: string, newUsername: string) => {
    setToken(newToken)
    setUsername(newUsername)
    localStorage.setItem("token", newToken) // Save token in local storage
  }

  const logout = () => {
    setToken(null)
    localStorage.removeItem("token") // Clear token from local storage
  }

  const isAuthenticated = !!token

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated, username }}>
      {children}
    </AuthContext.Provider>
  )
}
