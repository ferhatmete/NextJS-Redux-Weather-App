"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../../../GlobalRedux/store";
import axios from "axios";

interface WeatherData {
  list: any;
  name: string;
  main: {
    temp: number;
    aqi: number;
    humidity: number;
    pressure: number;
  };
  wind: {
    speed: number;
  };
  weather: [
    {
      icon: any;
      description: string;
    }
  ];
}

interface WeatherState {
  data: WeatherData | null;
  loading: boolean;
  error: string | null;
}

const initialState: WeatherState = {
  data: null,
  loading: false,
  error: null,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    fetchWeatherStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchWeatherSuccess(state, action: PayloadAction<WeatherData>) {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchWeatherFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchWeatherStart, fetchWeatherSuccess, fetchWeatherFailure } =
  weatherSlice.actions;

export default weatherSlice.reducer;

export const fetchWeather =
  (selectedCity: string): AppThunk =>
  async (dispatch) => {
    dispatch(fetchWeatherStart());

    try {
      const apiKey =
        process.env.NODE_ENV === "production"
          ? process.env.NEXT_PUBLIC_API_KEY
          : process.env.NEXT_PUBLIC_API_KEY;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=${apiKey}&units=metric`;
      const response = await axios.get(url);
      dispatch(fetchWeatherSuccess(response.data));
    } catch (error) {}
  };
