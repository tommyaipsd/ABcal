// Notification utilities
export const requestNotificationPermission = async () => {
  if (!('Notification' in window)) {
    console.log('This browser does not support notifications')
    return false
  }

  if (Notification.permission === 'granted') {
    return true
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission()
    return permission === 'granted'
  }

  return false
}

export const showNotification = (title, options = {}) => {
  if (Notification.permission === 'granted') {
    const notification = new Notification(title, {
      icon: '/icon-192x192.png',
      badge: '/icon-192x192.png',
      ...options
    })

    notification.onclick = () => {
      window.focus()
      notification.close()
    }

    return notification
  }
}

export const scheduleReminder = (event) => {
  const now = new Date()
  const eventStart = new Date(event.start_time)
  
  // Calculate reminder times
  const reminders = []
  
  if (event.reminder_15min) {
    const reminder15 = new Date(eventStart.getTime() - 15 * 60 * 1000)
    if (reminder15 > now) {
      reminders.push({
        time: reminder15,
        message: `${event.title} starts in 15 minutes`
      })
    }
  }
  
  if (event.reminder_1hr) {
    const reminder1hr = new Date(eventStart.getTime() - 60 * 60 * 1000)
    if (reminder1hr > now) {
      reminders.push({
        time: reminder1hr,
        message: `${event.title} starts in 1 hour`
      })
    }
  }
  
  if (event.reminder_1day) {
    const reminder1day = new Date(eventStart.getTime() - 24 * 60 * 60 * 1000)
    if (reminder1day > now) {
      reminders.push({
        time: reminder1day,
        message: `${event.title} is tomorrow`
      })
    }
  }

  // Schedule notifications
  reminders.forEach(reminder => {
    const timeout = reminder.time.getTime() - now.getTime()
    if (timeout > 0) {
      setTimeout(() => {
        showNotification('Calendar Reminder', {
          body: reminder.message,
          tag: `reminder-${event.id}`,
          requireInteraction: true
        })
      }, timeout)
    }
  })
}