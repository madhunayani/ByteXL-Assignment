import { useState, useEffect } from 'react';
import axios from 'axios';

export default function WeatherModule() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [city, setCity] = useState('Hyderabad');
  const [inputCity, setInputCity] = useState('');

  const fetchWeather = async (cityName) => {
    setIsLoading(true);
    setError('');
    try {
      const response = await axios.get(`/api/weather?city=${cityName}`);
      setData(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch weather data');
      setData(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, [city]); // Only 'city' as dependency

  const handleSearch = () => {
    if (inputCity.trim()) {
      setCity(inputCity);
      setInputCity('');
    }
  };

  return (
    <div className="module-container weather-module">
      <h2>🌤️ Weather Details</h2>
      
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter city name..."
          value={inputCity}
          onChange={(e) => setInputCity(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {isLoading && <p className="loading">Loading...</p>}
      
      {error && <p className="error">❌ {error}</p>}
      
      {data && !error && (
        <div className="weather-card">
          <h3>{data.city}, {data.country}</h3>
          <p className="temperature">{data.temperature}°C</p>
          <p className="condition">{data.condition}</p>
          <p className="description">{data.description}</p>
          <div className="weather-details">
            <p>💧 Humidity: {data.humidity}%</p>
            <p>💨 Wind Speed: {data.windSpeed} m/s</p>
            <p>🌡️ Feels Like: {data.feelsLike}°C</p>
          </div>
        </div>
      )}
    </div>
  );
}
