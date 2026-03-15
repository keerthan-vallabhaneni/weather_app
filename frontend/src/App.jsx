// frontend/src/App.jsx
import React, { useState, useEffect, useCallback } from 'react'
import SearchBar from './components/SearchBar'
import WeatherCard from './components/WeatherCard'
import MapView from './components/MapView'

// Default to the deployed Render backend. Override locally with VITE_BACKEND_URL in your frontend env.
const API_BASE = import.meta.env.VITE_BACKEND_URL || 'https://weather-website-lmq6.onrender.com'

export default function App() {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  // unit: 'C' or 'F' for display. Backend is always queried for Celsius.
  const [unit, setUnit] = useState('C')
  const [recent, setRecent] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('recent-searches') || '[]')
    } catch { return [] }
  })

  useEffect(() => {
    localStorage.setItem('recent-searches', JSON.stringify(recent))
  }, [recent])

  const search = async (city) => {
    setLoading(true)
    setError(null)
    try {
      // Always request backend default (which returns Celsius) to keep one source of truth
      const url = `${API_BASE}/weather?city=${encodeURIComponent(city)}`
      const res = await fetch(url)
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.error || 'Error fetching weather')
      }
      const data = await res.json()
      // Backend returns temperature in Celsius. Store original Celsius value to allow client-side conversion.
      setWeather({ ...data, tempC: data.temperature })
      // update recent
      setRecent(prev => [city, ...prev.filter(c => c.toLowerCase() !== city.toLowerCase())].slice(0, 6))
    } catch (err) {
      setError(err.message)
      setWeather(null)
    } finally {
      setLoading(false)
    }
  }

  // Toggle between Celsius and Fahrenheit without re-fetching the API.
  const onToggleUnits = useCallback((newUnit) => {
    setUnit(newUnit)
    // Do not re-fetch. Conversions are done client-side from stored Celsius value.
  }, [])

  const convertTemp = useCallback((tempC) => {
    if (tempC == null) return null
    if (unit === 'C') return tempC
    // C -> F
    return (tempC * 9) / 5 + 32
  }, [unit])

  return (
    <div className="app-container">
      <header className="header">
        <h1>Weather Statistics</h1>
      </header>
      <main className="main">
        <SearchBar onSearch={search} recent={recent} onRecentClick={(c) => search(c)} />

        {loading && <div className="loading">Loading...</div>}
        {error && <div className="error">{error}</div>}

        {weather && (
          <>
            <WeatherCard
              data={weather}
              displayTemp={convertTemp(weather.tempC)}
              unit={unit}
              onToggleUnits={onToggleUnits}
            />
            <MapView
              coords={weather.coords}
              city={weather.city}
              temp={convertTemp(weather.tempC)}
              unit={unit}
            />
          </>
        )}
      </main>
      <footer className="footer">
        <small>Powered by WeatherAPI</small>
      </footer>
    </div>
  )
}