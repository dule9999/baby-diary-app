import * as SecureStore from 'expo-secure-store'
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react'
import { User } from '@sharedTypes'
import { getToken, login as loginService, logout as logoutService, getCurrentUser } from '@services'
import { Loader } from '@components'

const TOKEN_KEY = 'auth_token'

interface AuthContextType {
  authed: boolean
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authed, setAuthed] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [ready, setReady] = useState(false)

  // Run once on mount: check if token exists and fetch user
  useEffect(() => {
    (async () => {
      const token = await getToken()
      if (token) {
        try {
          const currentUser = await getCurrentUser()
          setUser(currentUser)
          setAuthed(true)
        } catch (err) {
          console.error('No valid session, going to login.', err)
          setUser(null)
          setAuthed(false)
        }
      }
      setReady(true)
    })()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      await loginService(email, password) // stores token
      const currentUser = await getCurrentUser() // fetch user
      setUser(currentUser)
      setAuthed(true)
    } catch (err) {
      console.error('Login failed', err)
      setUser(null)
      setAuthed(false)
      throw err
    }
  }

  const logout = async () => {
    setUser(null)
    setAuthed(false)
    await logoutService() // deletes token
  }

  if (!ready) return <Loader /> // show splash/loading screen while fetching

  return (
    <AuthContext.Provider value={{ authed, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook to consume auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
