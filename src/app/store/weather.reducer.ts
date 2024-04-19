import { createReducer, on } from '@ngrx/store';
import { initialWeatherState } from './weather.state';
import {
  getAndSaveYesterdayHourlyWeatherData,
  getAndSaveYesterdayHourlyWeatherDataSuccess,
  saveFavoriteCitySuccess,
  setFavoriteCities,
  setIsLoggedIn,
  setSelectedCity,
  setUsername,
  unsaveFavoriteCitySuccess
} from './weather.actions';

export const weatherReducer = createReducer(
  initialWeatherState,
  on(setUsername, (state, props) => ({
    ...state,
    username: props.username
  })),
  on(setIsLoggedIn, (state, props) => ({
    ...state,
    isLoggedIn: props.isLoggedIn
  })),
  on(setSelectedCity, (state, props) => ({
    ...state,
    selectedCity: props.cityName
  })),
  on(setFavoriteCities, (state, props) => ({
    ...state,
    favoriteCities: props.favoriteCities
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
