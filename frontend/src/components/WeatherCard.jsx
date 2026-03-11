// frontend/src/components/WeatherCard.jsx
import React from 'react'

export default function WeatherCard({ data, displayTemp, unit, onToggleUnits }) {
  if (!data) return null

  const tempUnit = unit === 'C' ? '°C' : '°F'

  // WeatherAPI icons may be returned as //cdn... so ensure protocol
  const iconUrl = data.icon ? (data.icon.startsWith('http') ? data.icon : `https:${data.icon}`) : null

  return (
    <div className="weather-card">
      <div className="weather-top">
        <div>
          <h2>{data.city}</h2>
          <p className="cond">{data.condition}</p>
        </div>
        <div className="temp-block">
          {iconUrl && <img src={iconUrl} alt={data.condition} className={`weather-icon ${data.condition?.toLowerCase?.()}`} />}
          <div className="temps">
            <div className="temp-main">{displayTemp == null ? '—' : Math.round(displayTemp)}{tempUnit}</div>
          </div>
        </div>
      </div>

      <div className="weather-grid">
        <div>Humidity: <strong>{data.humidity}%</strong></div>
        <div>Wind: <strong>{data.wind} {data.wind_unit}</strong></div>
      </div>

      <div className="card-actions">
        <button
          className="unit-toggle"
          onClick={() => onToggleUnits(unit === 'C' ? 'F' : 'C')}
          aria-label="Toggle units"
        >
          C / F
        </button>
      </div>
    </div>
  )
}