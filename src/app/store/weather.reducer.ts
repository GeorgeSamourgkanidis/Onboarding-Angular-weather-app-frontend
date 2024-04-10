import { createReducer, on } from '@ngrx/store';
import { initialWeatherState } from './weather.state';
import {
  getCurrentWeather,
  saveFavoriteCitySuccess,
  setSelectedCity,
  unsaveFavoriteCitySuccess
} from './weather.actions';

export const weatherReducer = createReducer(
  initialWeatherState,
  on(getCurrentWeather, state => ({
    ...state,
    currentData: 'test'
  })),
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
  }))
);
