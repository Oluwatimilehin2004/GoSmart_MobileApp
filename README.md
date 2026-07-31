# GoSmart Mobile App

Real-time bus tracking for Kigali's Kimironko corridor — native iOS/Android app built with **React Native (Expo)**, sharing the same Django REST API as the GoSmart web application.

This app lets passengers see live bus positions and get arrival alerts, lets drivers broadcast their bus's GPS location, and lets admins manage routes, stops, and buses — all from a phone.

---

## 1. Tech Stack

| Layer | Technology |
|---|---|
| Framework | React Native + Expo (managed workflow) |
| Language | TypeScript |
| Routing | Expo Router (file-based, route groups per role) |
| UI components | Gluestack UI |
| Global/auth state | Zustand |
| Server state & caching | TanStack Query (React Query) |
| Maps | `react-native-maps` + OpenStreetMap tiles (via CARTO), no API key required |
| Notifications | `expo-notifications` (local notifications) |
| Location | `expo-location` |
| Fonts | Urbanist (headings), Poppins (body) via `@expo-google-fonts` |
| Backend | Django REST Framework (shared with the web app) — see the backend repo's README for API details |

---

## 2. Project Structure

```
gosmart-mobile/
├── app/
│   ├── _layout.tsx              # Root layout — fonts, theme, auth hydration
│   ├── index.tsx                # Entry redirect (role-based routing)
│   ├── (auth)/                  # Login, Register, Consent screens
│   ├── (passenger)/             # Passenger tab group: Home/Map, Alerts, Reports, Profile
│   ├── (driver)/                # Driver tab group: Trip, Profile
│   └── (admin)/                 # Admin tab group: Routes, Stops, Links, Buses, Profile
├── src/
│   ├── api/                     # API client + typed endpoint functions
│   ├── components/              # Shared UI components (markers, cards, badges)
│   ├── hooks/                   # Data-fetching and device hooks (GPS, notifications)
│   ├── stores/                  # Zustand stores (auth)
│   ├── theme/                   # Colors, typography, ThemeProvider
│   ├── notifications/           # Local notification setup
│   └── utils/                   # Helpers (route colors, guards)
├── assets/
│   ├── images/                  # App icon, splash screen
│   └── markers/                 # Custom map marker graphics (bus, avatar)
├── app.json                     # Expo config
├── babel.config.js
└── package.json
```

---

## 3. Setup

### Prerequisites
- Node.js (LTS) and npm
- Expo Go app on your phone (for quick testing), or Android Studio / Xcode for emulators
- The GoSmart Django backend running and reachable on your network (see backend README)

### Install dependencies

```bash
npm install
```

### Run the app

```bash
npx expo start
```

- Press **`a`** to open on a connected Android emulator
- Press **`i`** to open on an iOS simulator (macOS only)
- Scan the QR code with **Expo Go** to run on a physical phone

The app automatically detects the correct backend host at runtime (via Expo's `hostUri`) — no manual IP configuration needed when switching between an emulator, simulator, or physical device. See `src/api/config.ts` for details.

### Backend connection

Make sure the Django backend is running and accessible from your network:
```bash
python manage.py runserver 0.0.0.0:8000
```
And that `ALLOWED_HOSTS` in the backend's `settings.py` includes your machine's LAN IP (or `'*'` for local development).

---

## 4. Roles & Features

The app has three role-based experiences, each with its own tab bar, determined automatically at login by the account's `role` field.

### Passenger
- **Live map** — see all active buses on a selected route, with a draggable bottom sheet listing nearby buses and their live/offline status
- **Route browsing** — view routes, their ordered stops, and buses currently assigned to each
- **Arrival alerts** — select a boarding stop, see live ETA, and get notified as the bus approaches; after boarding, set a second alert for your destination stop
- **Ratings** — rate a bus's cleanliness and safety with quick-select tags or free text
- **Traffic & bus reports** — flag traffic conditions or report on a bus you're currently riding (requires confirming you're on board first)
- **Profile** — account details, appearance (light/dark mode), and access to alerts/reports

### Driver
- **Trip control** — start/end a trip, which begins broadcasting GPS location to the backend every 5 seconds (foreground only)
- **Manual location entry** — fallback for testing or when GPS is unavailable
- **Live status** — see your assigned bus, route, and current broadcasting state at a glance
- **Profile** — license number, assigned bus, and account settings

### Admin
- **Routes / Stops / Route↔Stop Links / Buses** — full CRUD management for the transit network
- **Driver assignment** — assign a registered driver to a specific bus
- **Profile** — quick access to all management sections plus live fleet stats (route count, bus count, live-now count)

---

## 5. Known Limitations (by design, not oversight)

- **Foreground-only GPS sharing** — background tracking would require a custom native build (`expo prebuild` + a dev client), which is out of scope for this project's timeline. The driver's screen must stay open and the phone unlocked while broadcasting.
- **Local notifications, not true push** — alerts fire reliably while the app is open or recently backgrounded; a full push-notification server (Expo push tokens / FCM / APNs) was not built for this milestone.
- **Expo Go cannot run local notifications reliably on SDK 53+** — use a standalone/dev client build for full notification testing; the app detects Expo Go and logs a console message instead of crashing.
- **Manual admin operations** — routes, stops, and driver assignments are entered manually by an admin. This is a known scaling limitation, flagged directly by early user testing, and is the top recommendation for future work (see the project's Final Report, Chapter 6).

---

## 6. Test Accounts

| Role | Username | Notes |
|---|---|---|
| Passenger | `aline` | General passenger testing |
| Driver | `eric` | Assigned to bus `RAC-100A` |
| Driver | `claude_h` | Assigned to bus `RAC-205B` |
| Admin | `joseph_admin` | Full route/stop/bus management access |

*(Passwords are managed separately — see your team's shared credentials, not committed to this repository.)*

---

## 7. Team

| Member | Role |
|---|---|
| Ntwali Beni David | Project Lead / Integration |
| Ojudun Ayomide Oluwatimilehin | Backend Developer |
| Mizero Eloi | — |
| Nyirihirwe Yves | Code Quality |
| Joseph Marube | Database Architect & Full-Stack |

---

## 8. Related Repositories

- Backend (Django REST API): see the main GoSmart repository README for endpoint documentation
- Web app (React): see the web app's own README for browser-specific setup
