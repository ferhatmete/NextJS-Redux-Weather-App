"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../../../GlobalRedux/store";
import axios from "axios";

interface ForecastData {
  list: ForecastItem[];
}

interface ForecastItem {
  // Specify the properties present in each forecast item
  // For example:
  dt: number;
  main: {
    temp: number;
    humidity: number;
    // Include other properties as needed
  };
  // Add other properties as needed
}

interface ForecastState {
  data: ForecastData | null;
  loading: boolean;
  error: string | null;
}

const initialState: ForecastState = {
  data: null,
  loading: false,
  error: null,
};

const ForecastSlice = createSlice({
  name: "forecast",
  initialState,
  reducers: {
    fetchForecastStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchForecastSuccess(state, action: PayloadAction<ForecastData>) {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchForecastFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchForecastStart,
  fetchForecastSuccess,
  fetchForecastFailure,
} = ForecastSlice.actions;

export default ForecastSlice.reducer;

export const fetchForecast =
  (selectedCity: string): AppThunk =>
  async (dispatch) => {
    dispatch(fetchForecastStart());

    try {
      const apiKey =
        process.env.NODE_ENV === "production"
          ? process.env.NEXT_PUBLIC_API_KEY
          : process.env.NEXT_PUBLIC_API_KEY;
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${selectedCity}&appid=${apiKey}&units=metric`;
      const response = await axios.get(url);
      console.log(response.data);
      dispatch(fetchForecastSuccess(response.data));
    } catch (error) {}
  };
