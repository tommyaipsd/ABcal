'use client'

import './globals.css'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { requestNotificationPermission } from '../lib/notifications'
import { ThemeProvider } from '../lib/themeContext'

export default function RootLayout({
  children,
}) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log('Layout: Setting up auth listener...')
    
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Layout: Initial session:', session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Layout: Auth state changed:', event, session)
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    // Request notification permission
    requestNotificationPermission()

    return () => subscription.unsubscribe()
  }, [])

  if (loading) {
    return (
      <html lang="en">
        <head>
          <title>ABCal - Household Calendar</title>
          <meta name="description" content="Shared family calendar with real-time sync" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="manifest" href="/manifest.json" />
          <meta name="theme-color" content="#3b82f6" />
          <link rel="apple-touch-icon" href="/icon-192x192.png" />
        </head>
        <body className="bg-gray-50 min-h-screen">
          <ThemeProvider>
            <div className="min-h-screen flex items-center justify-center">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500"></div>
            </div>
          </ThemeProvider>
        </body>
      </html>
    )
  }

  return (
    <html lang="en">
      <head>
        <title>ABCal - Household Calendar</title>
        <meta name="description" content="Shared family calendar with real-time sync" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3b82f6" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
      </head>
      <body className="bg-gray-50 min-h-screen">
        <ThemeProvider>
          <div className="min-h-screen">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}