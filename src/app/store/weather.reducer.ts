import { createReducer, on } from '@ngrx/store';
import { initialWeatherState } from './weather.state';
import {
  getAndSaveYesterdayHourlyWeatherData,
  getAndSaveYesterdayHourlyWeatherDataSuccess,
  getCurrentCityWeatherDetailsSuccess,
  getNewSavedFavoriteCityDataSuccess,
  setLoggedIn,
  setLoggedOut,
  setSelectedCity,
  setUsername,
  unsaveFavoriteCitySuccess
} from './weather.actions';
import { FavoriteCity } from '../models/weather';

export const weatherReducer = createReducer(
  initialWeatherState,
  on(setUsername, (state, props) => ({
    ...state,
    username: props.username
  })),
  on(setLoggedIn, state => ({
    ...state,
    isLoggedIn: true
  })),
  on(setLoggedOut, state => ({
    ...state,
    isLoggedIn: false,
    favoriteCitiesData: []
  })),
  on(setSelectedCity, (state, props) => ({
    ...state,
    selectedCity: props.cityName
  })),
  on(getNewSavedFavoriteCityDataSuccess, (state, props) => ({
    ...state,
    favoriteCitiesData: [...state.favoriteCitiesData, props.cityData].sort((a, b) =>
      a.cityName.localeCompare(b.cityName)
    )
  })),
  on(unsaveFavoriteCitySuccess, (state, props) => ({
    ...state,
    favoriteCitiesData: state.favoriteCitiesData.filter(
      (cityDetails: FavoriteCity) => cityDetails.cityName !== props.cityToUnsave
    )
  })),
  on(getAndSaveYesterdayHourlyWeatherData, state => ({
    ...state,
    lineChartLoading: true
  })),
  on(getAndSaveYesterdayHourlyWeatherDataSuccess, (state, props) => ({
    ...state,
    yesterdayHourlyData: props.hourlyData,
    lineChartLoading: false
  })),
  on(getCurrentCityWeatherDetailsSuccess, (state, props) => ({
    ...state,
    currentCityWeatherDetails: props.weatherDetails
  }))
);
