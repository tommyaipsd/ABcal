'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { themes, getThemeCSS } from './themes'

const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('blue')

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('calendar-theme')
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme)
    }
  }, [])

  useEffect(() => {
    // Apply theme to document
    const style = document.getElementById('theme-styles')
    if (style) {
      style.remove()
    }

    const newStyle = document.createElement('style')
    newStyle.id = 'theme-styles'
    newStyle.textContent = getThemeCSS(currentTheme)
    document.head.appendChild(newStyle)

    // Save to localStorage
    localStorage.setItem('calendar-theme', currentTheme)
  }, [currentTheme])

  const changeTheme = (themeName) => {
    if (themes[themeName]) {
      setCurrentTheme(themeName)
    }
  }

  return (
    <ThemeContext.Provider value={{
      currentTheme,
      changeTheme,
      themes,
      themeConfig: themes[currentTheme]
    }}>
      {children}
    </ThemeContext.Provider>
  )
}