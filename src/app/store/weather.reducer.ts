import { createReducer, on } from '@ngrx/store';
import { initialWeatherState } from './weather.state';
import {
  getAndSaveYesterdayHourlyWeatherData,
  getAndSaveYesterdayHourlyWeatherDataSuccess,
  saveFavoriteCitySuccess,
  setSelectedCity,
  unsaveFavoriteCitySuccess
} from './weather.actions';

export const weatherReducer = createReducer(
  initialWeatherState,
  on(setSelectedCity, (state, props) => ({
    ...state,
    selectedCity: props.cityName
  })),
  on(saveFavoriteCitySuccess, (state, props) => ({
    ...state,
    favoriteCities: [...state.favoriteCities, props.cityToSave]
  })),
  on(unsaveFavoriteCitySuccess, (state, props) => ({
    ...state,
    favoriteCities: state.favoriteCities.filter(cityName => cityName !== props.cityToUnsave)
  })),
  on(getAndSaveYesterdayHourlyWeatherData, state => ({
    ...state,
    lineChartLoading: true
  })),
  on(getAndSaveYesterdayHourlyWeatherDataSuccess, (state, props) => ({
    ...state,
    yesterdayHourlyData: props.hourlyData,
    lineChartLoading: false
  }))
);
