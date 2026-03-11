import React from 'react'

export default function WeatherCard({ data, units, onToggleUnits }) {
  if (!data) return null

  const isMetric = units === 'metric'
  const tempUnit = isMetric ? '°C' : '°F'

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
            <div className="temp-main">{Math.round(data.temperature)}{tempUnit}</div>
          </div>
        </div>
      </div>

      <div className="weather-grid">
        <div>Humidity: <strong>{data.humidity}%</strong></div>
        <div>Wind: <strong>{data.wind} {data.wind_unit}</strong></div>
      </div>

      <div className="card-actions">
        <div className="units">
          <label>
            <input type="radio" name="units" checked={isMetric} onChange={() => onToggleUnits('metric')} /> Celsius
          </label>
          <label>
            <input type="radio" name="units" checked={!isMetric} onChange={() => onToggleUnits('imperial')} /> Fahrenheit
          </label>
        </div>
      </div>
    </div>
  )
}
