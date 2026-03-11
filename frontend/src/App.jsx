import React, { useState, useEffect } from 'react'
import SearchBar from './components/SearchBar'
import WeatherCard from './components/WeatherCard'
import MapView from './components/MapView'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'

export default function App() {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [units, setUnits] = useState('metric')
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
      const url = `${API_BASE}/weather?city=${encodeURIComponent(city)}&units=${units}`
      const res = await fetch(url)
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.error || 'Error fetching weather')
      }
      const data = await res.json()
      // data is the simplified payload from backend
      setWeather(data)
      // update recent
      setRecent(prev => [city, ...prev.filter(c => c.toLowerCase() !== city.toLowerCase())].slice(0, 6))
    } catch (err) {
      setError(err.message)
      setWeather(null)
    } finally {
      setLoading(false)
    }
  }

  const onToggleUnits = (newUnits) => {
    setUnits(newUnits)
    // If we already have a weather, re-fetch in new units
    if (weather) {
      search(weather.city)
    }
  }

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
            <WeatherCard data={weather} units={units} onToggleUnits={onToggleUnits} />
            <MapView coords={weather.coords} city={weather.city} temp={weather.temperature} units={weather.units} />
          </>
        )}
      </main>
      <footer className="footer">
        <small>Powered by OpenWeatherMap & Nominatim</small>
      </footer>
    </div>
  )
}
