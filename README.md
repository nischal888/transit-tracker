# TransitTracker – Real-Time Fleet Monitoring Dashboard

**TransitTracker** is a real-time web app for tracking vehicles on a live map. It shows the current location, speed, and status of each vehicle, and includes a live dashboard with charts for quick insights.

---

## What It Does

- **Live Map View**: Watch all vehicles move in real time on an interactive map.
- **Click for Details**: Click on a vehicle to see its ID, route, speed, and current status.
- **Auto-Fit View**: When the app loads, the map automatically zooms and centers to show all vehicles.
- **Live Dashboard**:
  - Pie chart showing how many vehicles are **On Time**, **Delayed**, or **Stopped**.
  - Line chart showing the **average speed** of the fleet over time.
- **Mobile-Friendly Design**: Works great on phones and tablets with a responsive layout and a handy bottom drawer for the dashboard.

---

## How It Works

TransitTracker has two parts:

### Frontend (User Interface)

Built using:

- **React 18 + TypeScript** – Modern web development tools for fast and reliable interfaces.
- **Redux Toolkit** – Manages all app state in one place.
- **WebSocket API** – Receives real-time vehicle updates from the server.
- **Leaflet + React-Leaflet** – Renders the interactive map.
- **Highcharts** – Used for dynamic and animated charts.
- **Tailwind CSS** – Makes the design clean, responsive, and mobile-friendly.
- **Vite** – Fast build tool for development and production.

### Backend (Simulator)

Built using:

- **Node.js + TypeScript** – Runs a lightweight server.
- **Express + ws** – Creates a WebSocket connection with clients.
- **Simulation Loop** – Randomly generates and updates vehicle data (no external APIs).

This setup allows full control over the data and avoids API limits.

---

## How to Run It Locally

You’ll need to start both the **backend server** and the **frontend app**.

### 1. Clone the Repository

```bash
git clone https://github.com/nischal888/transit-tracker.git
```

### 2. Start the Backend Server

```bash
cd transit-tracker-server
npm install
npm run dev
```

#### The backend will start at: http://localhost:8080

### 3. Start the Frontend App

```bash
cd transit-tracker-server
npm install
npm run dev
```

#### The frontend will start at: http://localhost:5173 (or a different port if 5173 is in use)

### Project Structure

- `transit-tracker/ ` React frontend with the map and dashboard UI
- `transit-tracker-server/ ` Node backend simulating vehicle data
