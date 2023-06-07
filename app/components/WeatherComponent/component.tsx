/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../GlobalRedux/store";
import { fetchWeather } from "../../GlobalRedux/Features/weather/weatherSlice";
import { fetchForecast } from "../..//GlobalRedux/Features/forecast/forecastSlice";

import "./component.css";

import clearSky from "../../../public/images/clear-sky.jpg";
import fewClouds from "../../../public/images/few-clouds.jpg";
import scatteredClouds from "../../../public/images/scattered-clouds.jpg";
import brokenClouds from "../../../public/images/broken-clouds.jpg";
import showerRain from "../../../public/images/shower-rain.jpg";
import rain from "../../../public/images/rain.jpg";
import thunderstorm from "../../../public/images/thunderstorm.jpg";
import snow from "../../../public/images/snow.jpg";
import mist from "../../../public/images/mist.jpg";

const Weather = () => {
  const dispatch = useDispatch();
  const [selectedCity, setSelectedCity] = useState("Istanbul"); // Default city

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

  // Change container background according to sky status

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(event.target.value);
  };
  useEffect(() => {
    dispatch<any>(fetchWeather(selectedCity));
    dispatch<any>(fetchForecast(selectedCity));
  }, [dispatch, selectedCity]);

  const setContainerStyle = (weather: string) => {
    const container = document.querySelector(".container") as HTMLElement;
    const weatherStatus = document.querySelector(
      ".weather-data-info-name"
    )?.textContent;
    console.log(weatherStatus);

    if (container && weatherStatus) {
      if (weatherStatus === "clear sky") {
        container.style.backgroundImage = `url(${clearSky.src})`;
      } else if (weatherStatus === "few clouds") {
        container.style.backgroundImage = `url(${fewClouds.src})`;
      } else if (weatherStatus === "scattered clouds") {
        container.style.backgroundImage = `url(${scatteredClouds.src})`;
      } else if (weatherStatus === "broken clouds") {
        container.style.backgroundImage = `url(${brokenClouds.src})`;
      } else if (weatherStatus === "shower rain") {
        container.style.backgroundImage = `url(${showerRain.src})`;
      } else if (weatherStatus === "rain") {
        container.style.backgroundImage = `url(${rain.src})`;
      } else if (weatherStatus === "thunderstorm") {
        container.style.backgroundImage = `url(${thunderstorm.src})`;
      } else if (weatherStatus === "snow") {
        container.style.backgroundImage = `url(${snow.src})`;
      } else if (weatherStatus === "mist") {
        container.style.backgroundImage = `url(${mist.src})`;
      }
    }
  };

  useEffect(() => {
    if (weatherData) {
      const weather = weatherData.weather[0].description;
      setContainerStyle(weather);
    }
  }, [weatherData]);

  return (
    <>
      <div className={`container ${weatherData ? "show" : ""}`}>
        <h1>Weather App</h1>
        <div className="city-select">
          <label htmlFor="citySelect">Select City: </label>
          <select
            id="citySelect"
            value={selectedCity}
            onChange={handleCityChange}
          >
            {/* TR */}
            <option value="Istanbul">Istanbul</option>
            <option value="Ankara">Ankara</option>
            <option value="Izmir">Izmir</option>
            <option value="Antalya">Antalya</option>
            <option value="Bursa">Bursa</option>
            <option value="Sivas">Sivas</option>
            <option value="Erzincan">Erzincan</option>
            <option value="Kars">Kars</option>
            <option value="Gaziantep">Gaziantep</option>
            <option value="Diyarbakir">Diyarbakir</option>
            <option value="Kayseri">Kayseri</option>
            <option value="Eskisehir">Eskisehir</option>
            <option value="Konya">Konya</option>
            <option value="Adana">Adana</option>
            <option value="Mersin">Mersin</option>
            <option value="Trabzon">Trabzon</option>
            <option value="Samsun">Samsun</option>
            <option value="Malatya">Malatya</option>
            <option value="Paris">Paris</option>
            <option value="New York">New York</option>
            <option value="Berlin">Berlin</option>
            <option value="Madrid">Madrid</option>
            <option value="London">London</option>
            <option value="Rome">Rome</option>
            <option value="Moscow">Moscow</option>
            <option value="Tokyo">Tokyo</option>
            <option value="Beijing">Beijing</option>
            <option value="Sydney">Sydney</option>
            <option value="Cairo">Cairo</option>
            <option value="Rio de Janeiro">Rio de Janeiro</option>
            <option value="Buenos Aires">Buenos Aires</option>
            <option value="Mexico City">Mexico City</option>
            <option value="Los Angeles">Los Angeles</option>
            <option value="Toronto">Toronto</option>
            <option value="Vancouver">Vancouver</option>
            <option value="Cape Town">Cape Town</option>
            <option value="Mumbai">Mumbai</option>
            <option value="New Delhi">New Delhi</option>
            <option value="Jakarta">Jakarta</option>
            <option value="Bangkok">Bangkok</option>
            <option value="Hong Kong">Hong Kong</option>
            <option value="Seoul">Seoul</option>
            <option value="Taipei">Taipei</option>
            <option value="Manila">Manila</option>
            <option value="Hanoi">Hanoi</option>
            <option value="Singapore">Singapore</option>
            <option value="Kuala Lumpur">Kuala Lumpur</option>
            <option value="Dubai">Dubai</option>
            <option value="Copenhagen">Copenhagen</option>
            <option value="Stockholm">Stockholm</option>
            <option value="Helsinki">Helsinki</option>
            <option value="Oslo">Oslo</option>
            <option value="Reykjavik">Reykjavik</option>
            <option value="Havana">Havana</option>
            <option value="Santiago">Santiago</option>
            <option value="Bogota">Bogota</option>
            <option value="Lima">Lima</option>
            <option value="Sao Paulo">Sao Paulo</option>
            <option value="Budapest">Budapest</option>
            <option value="Vienna">Vienna</option>
            <option value="Prague">Prague</option>
            <option value="Warsaw">Warsaw</option>
            <option value="Athens">Athens</option>
            <option value="Zurich">Zurich</option>
            <option value="Amsterdam">Amsterdam</option>
            <option value="Brussels">Brussels</option>
            <option value="Lisbon">Lisbon</option>
            <option value="Dublin">Dublin</option>
            <option value="Riga">Riga</option>
            <option value="Vilnius">Vilnius</option>
            <option value="Tallinn">Tallinn</option>
            <option value="Belgrade">Belgrade</option>
            <option value="Bucharest">Bucharest</option>
            <option value="Sofia">Sofia</option>
            <option value="Kiev">Kiev</option>
            <option value="Minsk">Minsk</option>
            <option value="Tehran">Tehran</option>
            <option value="Baghdad">Baghdad</option>
            <option value="Jerusalem">Jerusalem</option>
            <option value="Cape Town">Cape Town</option>
            <option value="Nairobi">Nairobi</option>
            <option value="Lagos">Lagos</option>
            <option value="Casablanca">Casablanca</option>
            <option value="Algiers">Algiers</option>
            <option value="Tunis">Tunis</option>
            <option value="Cairo">Cairo</option>
            <option value="Dakar">Dakar</option>
            <option value="Accra">Accra</option>
            <option value="Abidjan">Abidjan</option>
            <option value="Addis Ababa">Addis Ababa</option>
            <option value="Nairobi">Nairobi</option>
            <option value="Khartoum">Khartoum</option>
            <option value="Kampala">Kampala</option>
            <option value="Dar es Salaam">Dar es Salaam</option>
            <option value="Lusaka">Lusaka</option>
            <option value="Harare">Harare</option>
            <option value="Johannesburg">Johannesburg</option>
            <option value="Cape Town">Cape Town</option>
            <option value="Pretoria">Pretoria</option>
            <option value="Durban">Durban</option>
            <option value="Port Elizabeth">Port Elizabeth</option>
            <option value="Bloemfontein">Bloemfontein</option>
            <option value="Luanda">Luanda</option>
            <option value="Windhoek">Windhoek</option>
            <option value="Gaborone">Gaborone</option>
            <option value="Maseru">Maseru</option>
            <option value="Mbabane">Mbabane</option>
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
                    <span className="weather-data-info-name">
                      {weatherData.weather[0].description}
                    </span>
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
                          <div key={index} className="forecast-status-box">
                            <div className="forecast-status-days">
                              <p>{getDayName(new Date(item.dt_txt))}</p>
                            </div>
                            <div className="forecast-status-data" key={index}>
                              <img
                                style={{ width: "50" }}
                                src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`}
                                alt="Weather Icon"
                              />
                              <p>{item.main.temp.toFixed(1)}°C</p>
                              <p>{item.weather[0].description}</p>
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
