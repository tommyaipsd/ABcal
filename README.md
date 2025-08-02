# Household Calendar App

A real-time shared calendar application for families and households with cross-platform support and push notifications.

## Features

- **Real-time Sync**: Events sync instantly across all devices
- **Push Notifications**: Get notified when events are added or approaching
- **Cross-Platform**: Works on Android, iOS, and desktop as a Progressive Web App
- **Multi-user Support**: Each household member can add and view events
- **Customizable Reminders**: Set reminders 15 minutes, 1 hour, or 1 day before events
- **Offline Support**: Basic functionality works even without internet

## Tech Stack

- **Frontend**: Next.js 13.5.1 with App Router, Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Real-time + Auth)
- **Notifications**: Web Push API + Service Workers
- **Icons**: Lucide React

## Setup Instructions

### 1. Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to the SQL editor and run the database schema from `lib/supabase.js`
3. Get your project URL and anon key from Settings > API

### 2. Environment Configuration

Update `.env.local` with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your-actual-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-actual-anon-key
```

### 3. Installation

```bash
npm install
npm run dev
```

### 4. PWA Installation

On mobile devices, you can "Add to Home Screen" to install the app like a native app.

## Usage

1. **Sign up/Sign in**: Create an account or sign in with existing credentials
2. **Add Events**: Click the "Add Event" button to create new calendar entries
3. **View Calendar**: Browse events in the monthly calendar view
4. **Notifications**: Allow notifications when prompted for real-time updates
5. **Reminders**: Configure reminder preferences when creating events

## Database Schema

The app uses the following Supabase tables:

- `profiles`: User information (extends auth.users)
- `events`: Calendar events with metadata

## Push Notifications

The app supports:
- Instant notifications when events are added by other users
- Reminder notifications before events start
- Offline notification queueing via service workers

## Cross-Platform Compatibility

- **Android**: Full PWA support with app-like experience
- **iOS**: Safari PWA support (iOS 11.3+)
- **Desktop**: Works in all modern browsers

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT License