import {
  configureStore,
  ThunkAction,
  Action,
  AnyAction,
} from "@reduxjs/toolkit";
import weatherReducer from "../GlobalRedux/Features/weather/weatherSlice";
import forecastReducer from "../GlobalRedux/Features/forecast/forecastSlice";

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    forecast: forecastReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string> | AnyAction
>;
