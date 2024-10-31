import React, { createContext, useState, useEffect } from "react"

/*
* the main goal of tge auth context is to provide a way to protect the inner meat
  of the app, any page or component past the Acces page
  requires a token to be set to get to them.
  for api calls that required a token we gave two options for token 
  retrieval: from the context itself OR from localstorage
  in our api calls we played around with using either option
*/

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

  //checks if token exists in local storage on app load
  //and places in context
  useEffect(() => {
    const storedToken = localStorage.getItem("token")
    if (storedToken) {
      setToken(storedToken)
    }
  }, [])

  //setting the token
  const login = (newToken: string) => {
    setToken(newToken)
    localStorage.setItem("token", newToken)
  }

  //removing the token
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
