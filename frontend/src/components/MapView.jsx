import React, { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'

// Fix default marker icon (works with many bundlers)
import markerUrl from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

let DefaultIcon = L.icon({
  iconUrl: markerUrl,
  shadowUrl: markerShadow,
  iconAnchor: [12, 41]
})
L.Marker.prototype.options.icon = DefaultIcon

function FlyTo({ coords }) {
  const map = useMap()
  useEffect(() => {
    if (coords) {
      map.flyTo([coords.lat, coords.lon], 10, { duration: 1.2 })
    }
  }, [coords])
  return null
}

export default function MapView({ coords, city, temp, unit }) {
  const center = coords ? [coords.lat, coords.lon] : [20, 0]

  const unitSymbol = unit === 'C' ? '°C' : '°F'

  return (
    <div className="map-card">
      <MapContainer center={center} zoom={10} style={{ height: 360, width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {coords && (
          <Marker position={[coords.lat, coords.lon]}>
            <Popup>
              <div>
                <strong>{city}</strong>
                <div>{temp == null ? '—' : Math.round(temp)} {unitSymbol}</div>
              </div>
            </Popup>
          </Marker>
        )}
        <FlyTo coords={coords} />
      </MapContainer>
    </div>
  )
}
