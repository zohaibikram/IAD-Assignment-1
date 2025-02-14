import React, { useState, useEffect } from "react";
import "./Weather.css";
import { WiDaySunny, WiCloud, WiRain, WiSnow } from "react-icons/wi";

const API_KEY = "46b97dea9b564dc58a60f4a2c1cd995a";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const fetchWeather = () => {
    if (!city) return;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
      .then((res) => res.json())
      .then((data) => setWeather(data));
  };

  const getWeatherIcon = (weatherMain) => {
    switch (weatherMain) {
      case "Clear":
        return <WiDaySunny size={50} className="icon sunny" />;
      case "Clouds":
        return <WiCloud size={50} className="icon cloudy" />;
      case "Rain":
        return <WiRain size={50} className="icon rainy" />;
      case "Snow":
        return <WiSnow size={50} className="icon snowy" />;
      default:
        return <WiCloud size={50} className="icon" />;
    }
  };

  return (
    <div className="weather-app">
      <h1>Weather App</h1>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="city-input"
      />
      <button onClick={fetchWeather} className="fetch-button">Get Weather</button>
      {weather && weather.main ? (
        <div className="weather-card">
          <h2>{weather.name}, {weather.sys.country}</h2>
          {getWeatherIcon(weather.weather[0].main)}
          <p>{weather.weather[0].description}</p>
          <p className="temp">{weather.main.temp}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
        </div>
      ) : (
        weather && <p className="error">City not found. Try again!</p>
      )}
    </div>
  );
};

export default WeatherApp;
