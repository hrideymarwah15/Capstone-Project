# 🏎️ F1 Race Intelligence Platform

## 📌 Overview

F1 Race Intelligence Platform is a real-time web application that provides live race tracking and analytics for Formula 1. The application visualizes ongoing races through a 2D track interface where each driver is represented as a moving entity with continuously updating position data.

The platform combines live race tracking with structured analytics to deliver an interactive and data-driven experience.

---

## 🎯 Purpose

The purpose of this project is to build a real-time data-driven web application that demonstrates:

* Integration of external APIs
* Dynamic UI updates based on live data streams
* Efficient data processing using JavaScript
* Interactive visualization of race movement and standings

---

## 🚀 Core Features

### 🏁 Live Race Tracker (Real-Time 2D Visualization)

* Real-time race tracking with continuously updating driver positions
* 2D track rendering with drivers represented as moving points
* Dynamic position updates based on live race data
* Lap progression and race status tracking
* Smooth UI updates to reflect real-time changes

### 📊 Analytics Dashboard

* Live driver standings
* Constructor standings
* Sorting by points, rank, and performance metrics
* Filtering by teams
* Real-time updates reflected in analytics

### 🔍 Data Interaction

* Search functionality for drivers
* Filtering using array higher-order functions
* Sorting using array higher-order functions
* Efficient rendering using `.map()`

---

## 🌐 APIs Used

### Ergast F1 API/f1-data

Provides:

* Race schedules
* Driver standings
* Constructor standings

Base URL:
http://ergast.com/api/f1

### Live Timing Data Layer/f1-data

Real-time race updates are handled through continuous data fetching and state updates to simulate live telemetry and positional changes.

---

## 🛠️ Technologies Used

* Vanilla JavaScript (Milestone 2 implementation)
* JavaScript (ES6+)
* HTML5
* CSS3
* Tailwind CSS
* Fetch API
* React Hooks (`useState`, `useEffect`)

---

## ⚙️ Project Structure

```text
src/
 ├── components/
 │    ├── Navbar.jsx
 │    ├── RaceCard.jsx
 │    ├── DriverTable.jsx
 │    ├── TrackSimulator.jsx
 │    └── SearchFilter.jsx
 │
 ├── pages/
 │    ├── Dashboard.jsx
 │    ├── Races.jsx
 │    └── RaceDetails.jsx
 │
 ├── services/
 │    └── api.js
 │
 ├── App.js
 └── main.jsx
```

---

## 🧠 Real-Time Tracking System

* Live race data is continuously fetched at short intervals
* Driver positions are recalculated and updated dynamically
* Each driver is mapped to a coordinate on a predefined track layout
* Movement is rendered using timed updates for smooth transitions
* UI reflects real-time race progression without requiring page reload

---

## 📦 Installation & Setup

### Clone the repository

```bash
git clone https://github.com/your-username/f1-race-intelligence.git
cd f1-race-intelligence
```

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
open index.html
```

### Access the application

```text
http://localhost:5173
```

---

## 🌍 Deployment

The application can be deployed using modern hosting platforms such as Vercel or Netlify for fast and reliable delivery.

---

## 🏁 Conclusion

F1 Race Intelligence Platform demonstrates the ability to build a real-time, interactive, and scalable frontend application. It integrates live data, processes it efficiently, and visualizes it through an intuitive and responsive interface, reflecting real-world product design and engineering practices.
