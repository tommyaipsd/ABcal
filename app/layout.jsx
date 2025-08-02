'use client'

import './globals.css'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { requestNotificationPermission } from '../lib/notifications'
import { ThemeProvider } from '../lib/themeContext'

export default function RootLayout({
  children,
}) {
  useEffect(() => {
    console.log('Layout: Setting up auth listener...')
    
    // Request notification permission
    requestNotificationPermission()
  }, [])

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