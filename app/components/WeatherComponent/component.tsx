"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../GlobalRedux/store";
import { fetchWeather } from "../../GlobalRedux/Features/weather/weatherSlice";
import { fetchForecast } from "../..//GlobalRedux/Features/forecast/forecastSlice";

const Weather = () => {
  const dispatch = useDispatch();
  const [selectedCity, setSelectedCity] = useState("Istanbul"); // Default city

  useEffect(() => {
    dispatch<any>(fetchWeather(selectedCity));
  }, [dispatch, selectedCity]);

  useEffect(() => {
    dispatch<any>(fetchForecast(selectedCity));
  }, [dispatch, selectedCity]);

  const weatherData = useSelector((state: RootState) => state.weather.data);
  const forecastData = useSelector((state: RootState) => state.forecast.data);
  const loading = useSelector((state: RootState) => state.weather.loading);
  const forecastLoading = useSelector(
    (state: RootState) => state.forecast.loading
  );
  const error = useSelector((state: RootState) => state.weather.error);
  const forecastError = useSelector((state: RootState) => state.forecast.error);

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(event.target.value);
  };

  return (
    <>
      <div className="weather">
        <h1>Weather App</h1>
        <label htmlFor="citySelect">Select City:</label>
        <select
          id="citySelect"
          value={selectedCity}
          onChange={handleCityChange}
        >
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
            <h2>{weatherData.name}</h2>
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
      <div className="forecast">
        <h2>5 Day Forecast</h2>
        {forecastLoading ? (
          <p>Collecting forecast data...</p>
        ) : forecastError ? (
          <p>Error: {forecastError}</p>
        ) : forecastData ? (
          <div>
            {forecastData.list.map((item: any, index: number) => {
              // Check if the time is set to 12:00 (noon)
              if (item.dt_txt.includes("12:00")) {
                const date = item.dt_txt.split(" ")[0];
                return (
                  <div key={index}>
                    <p>
                      {date} - {item.main.temp.toFixed(1)}°C -{" "}
                      {item.weather[0].description}
                      {/*eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        style={{ width: "50" }}
                        src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`}
                        alt="Weather Icon"
                      />
                    </p>
                  </div>
                );
              }
              return null;
            })}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Weather;
