const axios = require('axios');

// Using WeatherAPI (current.json)
const WEATHERAPI_URL = 'http://api.weatherapi.com/v1/current.json';

const getWeatherByCity = async (req, res) => {
  try {
    const city = req.query.city;
    const units = req.query.units || 'metric'; // 'metric' -> Celsius, 'imperial' -> Fahrenheit

    if (!city) {
      return res.status(400).json({ error: 'Missing city parameter' });
    }

    const apiKey = process.env.WEATHERAPI_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'Server missing WeatherAPI key' });
    }

    const resp = await axios.get(WEATHERAPI_URL, {
      params: {
        key: apiKey,
        q: city,
        aqi: 'yes'
      }
    });

    const d = resp.data;
    if (!d || !d.location || !d.current) {
      return res.status(502).json({ error: 'Invalid data from WeatherAPI' });
    }

    // Choose temperature based on units
    const temperature = units === 'imperial' ? d.current.temp_f : d.current.temp_c;

    const payload = {
      city: d.location.name,
      temperature,
      condition: d.current.condition && d.current.condition.text,
      humidity: d.current.humidity,
      wind: units === 'imperial' ? d.current.wind_mph : d.current.wind_kph,
      wind_unit: units === 'imperial' ? 'mph' : 'kph',
      icon: d.current.condition && d.current.condition.icon,
      coords: { lat: d.location.lat, lon: d.location.lon },
      units,
      raw: d,
    };

    return res.json(payload);
  } catch (err) {
    console.error('Error in getWeatherByCity', err.stack || err);
    if (err.response) {
      console.error('Upstream response status:', err.response.status);
      console.error('Upstream response data:', err.response.data);
      const status = err.response.status || 500;
      const upstreamMessage = err.response.data && (err.response.data.error || err.response.data);
      // WeatherAPI returns an object with error.message sometimes
      const message = upstreamMessage && upstreamMessage.message ? upstreamMessage.message : upstreamMessage;
      return res.status(status).json({ error: message || 'Upstream API error' });
    }
    return res.status(500).json({ error: 'Unexpected server error' });
  }
};

module.exports = { getWeatherByCity };
