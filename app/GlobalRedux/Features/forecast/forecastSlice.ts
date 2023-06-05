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
      const url = `https://www.metaweather.com/api/location/search/?query=${encodeURIComponent(
        selectedCity
      )}`;
      const response = await axios.get(url);

      if (response.data.length > 0) {
        const woeid = response.data[0].woeid;
        const forecastUrl = `https://www.metaweather.com/api/location/${woeid}/`;
        const forecastResponse = await axios.get(forecastUrl);
        dispatch(fetchForecastSuccess(forecastResponse.data));
        console.log(forecastResponse.data);
      } else {
        dispatch(fetchForecastFailure("Location not found."));
      }
    } catch (error: any) {
      dispatch(fetchForecastFailure(error.message));
    }
  };

// export const fetchForecast =
//   (selectedCity: string): AppThunk =>
//   async (dispatch) => {
//     dispatch(fetchForecastStart());

//     try {
//       const apiKey = "96c9a7480514c86df884329855d8dac9";
//       // const url = `https://api.openweathermap.org/data/2.5/forecast?q=${selectedCity}&appid=${apiKey}&units=metric`;
//       const url = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${selectedCity}&cnt=5&appid=${apiKey}&units=metric`;

//       const response = await axios.get(url);
//       dispatch(fetchForecastSuccess(response.data));
//       console.log(response.data);
//     } catch (error) {}
//   };
