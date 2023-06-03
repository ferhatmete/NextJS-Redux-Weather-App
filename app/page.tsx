"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./GlobalRedux/store";
import { fetchWeather } from "./GlobalRedux/Features/weather/weatherSlice";

const Weather = () => {
  const dispatch = useDispatch();
  const [selectedCity, setSelectedCity] = useState("Istanbul"); // Default city

  useEffect(() => {
    dispatch(fetchWeather(selectedCity));
  }, [dispatch, selectedCity]);

  const weatherData = useSelector((state: RootState) => state.weather.data);
  const loading = useSelector((state: RootState) => state.weather.loading);
  const error = useSelector((state: RootState) => state.weather.error);

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(event.target.value);
  };

  return (
    <div className="weather">
      <h1>Weather App</h1>
      <label htmlFor="citySelect">Select City:</label>
      <select id="citySelect" value={selectedCity} onChange={handleCityChange}>
        <option value="Istanbul">Istanbul</option>
        <option value="Ankara">Ankara</option>
        <option value="Izmir">Izmir</option>
        <option value="Paris">Paris</option>
        <option value="New York">New York</option>
        <option value="Berlin">Berlin</option>
        <option value="Madrid">Madrid</option>
        <option value="London">London</option>
        {/* Add more cities as needed */}
      </select>

      {loading ? (
        <p>Collecting weather data...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : weatherData ? (
        <div>
          <h2>{weatherData.name} Weather</h2>
          <p>Temperature: {weatherData.main.temp.toFixed(1)}°C</p>
          <p>Humidity: {weatherData.main.humidity}</p>
          <p>Pressure: {weatherData.main.pressure}</p>
          <p>Wind speed: {weatherData.wind.speed}</p>
          <p>Sky: {weatherData.weather[0].description}</p>
          {/*eslint-disable-next-line @next/next/no-img-element */}
          <img
            style={{ width: "100" }}
            src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
            alt="Weather Icon"
          />
          {/* Add more weather information as needed */}
        </div>
      ) : null}
    </div>
  );
};

export default Weather;
