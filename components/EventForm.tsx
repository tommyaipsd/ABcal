'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { X, Clock, Calendar, Type, Palette, Bell } from 'lucide-react'

const colors = [
  '#3b82f6', '#ef4444', '#10b981', '#f59e0b', 
  '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16'
]

export default function EventForm({ selectedDate, onSubmit, onClose }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    start_time: format(selectedDate, "yyyy-MM-dd'T'HH:mm"),
    color: '#3b82f6',
    all_day: false,
    reminder_15min: true,
    reminder_1hr: false,
    reminder_1day: false
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    
    let startTime = new Date(formData.start_time)
    let endTime = new Date(startTime)
    
    if (formData.all_day) {
      startTime.setHours(0, 0, 0, 0)
      endTime.setHours(23, 59, 59, 999)
    } else {
      // Default 1-hour duration
      endTime.setHours(startTime.getHours() + 1)
    }
    
    onSubmit({
      ...formData,
      start_time: startTime.toISOString(),
      end_time: endTime.toISOString()
    })
  }

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Add New Event</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Type className="inline h-4 w-4 mr-1" />
              Event Title
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Enter event title"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Add a description (optional)"
            />
          </div>

          {/* All Day Toggle */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="all_day"
              checked={formData.all_day}
              onChange={(e) => handleChange('all_day', e.target.checked)}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor="all_day" className="ml-2 text-sm text-gray-700">
              All day event
            </label>
          </div>

          {/* Date and Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="inline h-4 w-4 mr-1" />
              {formData.all_day ? 'Date' : 'Start Time'}
            </label>
            <input
              type={formData.all_day ? "date" : "datetime-local"}
              required
              value={formData.all_day ? formData.start_time.split('T')[0] : formData.start_time}
              onChange={(e) => {
                if (formData.all_day) {
                  handleChange('start_time', `${e.target.value}T00:00`)
                } else {
                  handleChange('start_time', e.target.value)
                }
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Color Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Palette className="inline h-4 w-4 mr-1" />
              Color
            </label>
            <div className="flex space-x-2">
              {colors.map(color => (
                <button
                  key={color}
                  type="button"
                  onClick={() => handleChange('color', color)}
                  className={`w-8 h-8 rounded-full border-2 ${formData.color === color ? 'border-gray-400' : 'border-transparent'}`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          {/* Reminders */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              <Bell className="inline h-4 w-4 mr-1" />
              Reminders
            </label>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="reminder_15min"
                  checked={formData.reminder_15min}
                  onChange={(e) => handleChange('reminder_15min', e.target.checked)}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="reminder_15min" className="ml-2 text-sm text-gray-700">
                  15 minutes before
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="reminder_1hr"
                  checked={formData.reminder_1hr}
                  onChange={(e) => handleChange('reminder_1hr', e.target.checked)}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="reminder_1hr" className="ml-2 text-sm text-gray-700">
                  1 hour before
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="reminder_1day"
                  checked={formData.reminder_1day}
                  onChange={(e) => handleChange('reminder_1day', e.target.checked)}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="reminder_1day" className="ml-2 text-sm text-gray-700">
                  1 day before
                </label>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
            >
              Create Event
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}