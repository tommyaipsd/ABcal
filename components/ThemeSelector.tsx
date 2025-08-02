'use client'

import { useState } from 'react'
import { useTheme } from '../lib/themeContext'
import { Palette, Check } from 'lucide-react'

export default function ThemeSelector() {
  const { currentTheme, changeTheme, themes } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  const themeColors = {
    blue: '#3b82f6',
    pink: '#ec4899',
    yellow: '#eab308',
    green: '#22c55e',
    purple: '#a855f7',
    orange: '#f97316'
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
        title="Change Theme"
      >
        <Palette className="h-4 w-4" />
        <span className="hidden sm:inline">{themes[currentTheme].name}</span>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-20">
            <div className="p-3">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Choose Theme</h3>
              <div className="grid grid-cols-3 gap-2">
                {Object.entries(themes).map(([key, theme]) => (
                  <button
                    key={key}
                    onClick={() => {
                      changeTheme(key)
                      setIsOpen(false)
                    }}
                    className={`relative flex flex-col items-center p-2 rounded-lg border-2 transition-all ${
                      currentTheme === key 
                        ? 'border-gray-400 bg-gray-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div 
                      className="w-6 h-6 rounded-full mb-1"
                      style={{ backgroundColor: themeColors[key] }}
                    />
                    <span className="text-xs text-gray-700">{theme.name}</span>
                    {currentTheme === key && (
                      <Check className="absolute top-1 right-1 h-3 w-3 text-gray-600" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}