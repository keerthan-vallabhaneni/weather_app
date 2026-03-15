# Weather Statistics Web Application

This project contains a backend (Express) and frontend (React + Vite) implementing a weather dashboard using OpenWeatherMap and Nominatim geocoding with an interactive Leaflet map.

Project layout

weather-app
│
├── backend
│   ├── server.js
│   ├── routes
│   └── controllers
│
├── frontend
│   ├── index.html
   └── src
│       ├── components
│       │   ├── SearchBar.jsx
│       │   ├── WeatherCard.jsx
│       │   └── MapView.jsx
│       ├── App.jsx
│       └── main.jsx
│
└── .env.example

Requirements

- Node.js (16+ recommended)
- npm

Setup

1) Backend

  cd weather-app/backend
  npm install

  Create a .env file (copy from .env.example) and set your OpenWeatherMap API key:

  OPENWEATHER_API_KEY=your_api_key_here

  Start the server:

  node server.js

  The server runs by default on http://localhost:5000 and exposes GET /weather?city=CityName&units=metric

Deployment

- Backend (deployed): https://weather-website-lmq6.onrender.com

  The frontend will use the deployed backend by default (see `frontend/src/App.jsx`). To point the frontend at a different backend (for local development), set the environment variable `VITE_BACKEND_URL` in the frontend before building or running Vite. Example:

  VITE_BACKEND_URL=http://localhost:5000

2) Frontend

  cd weather-app/frontend
  npm install
  npm run dev

  The Vite dev server (default) opens at http://localhost:5173 — it calls the backend at the URL configured by `VITE_BACKEND_URL` (or the deployed backend if that variable is not set).

Notes

- The backend hides the OpenWeatherMap API key and proxies requests to the weather API.
- Geocoding is done with Nominatim (OpenStreetMap) and requires a polite User-Agent (set in controller).
- The frontend stores recent searches in localStorage and supports Celsius/Fahrenheit toggle.
- Map uses react-leaflet and OpenStreetMap tiles; marker popup displays city and temperature.

API Example

GET https://weather-website-lmq6.onrender.com/weather?city=London&units=metric

Response (JSON)

{
  "city": "London",
  "coords": { "lat": 51.5073219, "lon": -0.1276474 },
  "temperature": 15.32,
  "feels_like": 14.2,
  "condition": "Clouds",
  "description": "broken clouds",
  "humidity": 72,
  "wind_speed": 3.6,
  "pressure": 1012,
  "sunrise": 167xxxx,
  "sunset": 167xxxx,
  "icon": "04d"
}
