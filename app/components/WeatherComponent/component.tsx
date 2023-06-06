"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../GlobalRedux/store";
import { fetchWeather } from "../../GlobalRedux/Features/weather/weatherSlice";
import { fetchForecast } from "../..//GlobalRedux/Features/forecast/forecastSlice";

import "./component.css";

const Weather = () => {
  const dispatch = useDispatch();
  const [selectedCity, setSelectedCity] = useState("Istanbul"); // Default city

  useEffect(() => {
    dispatch<any>(fetchWeather(selectedCity));
    dispatch<any>(fetchForecast(selectedCity));
  }, [dispatch, selectedCity]);

  function getDayName(date: { getDay: () => any }) {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return days[date.getDay()];
  }

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
      <div className="container">
        <h1>Weather App</h1>
        <div className="city-select">
          <label htmlFor="citySelect">Select City: </label>
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
        </div>
        <div className="weather-status">
          <div className="weather">
            {loading ? (
              <p>Collecting weather data...</p>
            ) : error ? (
              <p>Error: {error}</p>
            ) : weatherData ? (
              <div className="weather-info">
                <div className="weather-city">
                  <h2>{weatherData.name}</h2>
                </div>
                <div className="weather-data">
                  <div className="weather-data-info">
                    <p>Temperature</p>
                    <span>{weatherData.main.temp.toFixed(1)}°C</span>
                  </div>
                  <div className="weather-data-info">
                    <p>Humidity</p>
                    <span>{weatherData.main.humidity}</span>
                  </div>
                  <div className="weather-data-info">
                    <p>Pressure</p>
                    <span>{weatherData.main.pressure}</span>
                  </div>
                  <div className="weather-data-info">
                    <p>Wind speed</p>
                    <span>{weatherData.wind.speed}</span>
                  </div>
                  <div className="weather-data-info">
                    <p>Sky</p>
                    <span>{weatherData.weather[0].description}</span>
                  </div>
                </div>
                {/*eslint-disable-next-line @next/next/no-img-element */}
                {/* <img
                style={{ width: "100" }}
                src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
                alt="Weather Icon"
              /> */}
                {/* Add more weather information as needed */}
              </div>
            ) : null}
          </div>
          <div className="forecast">
            <div className="forecast-header">
              <h2>5 Day Forecast</h2>
            </div>
            <div className="forecast-status">
              {forecastLoading ? (
                <p>Collecting forecast data...</p>
              ) : forecastError ? (
                <p>Error: {forecastError}</p>
              ) : forecastData ? (
                <div className="forecast-status-boxes">
                  {forecastData.list.map((item: any, index: number) => {
                    // Check if the time is set to 12:00 (noon)
                    if (item.dt_txt.includes("12:00")) {
                      return (
                        <>
                          <div className="forecast-status-box">
                            <div className="forecast-status-days">
                              <p>{getDayName(new Date(item.dt_txt))}</p>
                            </div>
                            <div className="forecast-status-data" key={index}>
                              <p>{item.main.temp.toFixed(1)}°C</p>
                              <p>{item.weather[0].description}</p>
                              <img
                                style={{ width: "50" }}
                                src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`}
                                alt="Weather Icon"
                              />
                            </div>
                          </div>
                        </>
                      );
                    }
                    return null;
                  })}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Weather;
