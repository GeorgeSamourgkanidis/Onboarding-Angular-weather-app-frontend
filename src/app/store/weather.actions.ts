import { createAction, props } from '@ngrx/store';
import { CurrentCityWeatherDetails, FavoriteCity } from '../models/weather';

export const setUsername = createAction('setUsername', props<{ username: string }>());
export const setLoggedIn = createAction('setLoggedIn');
export const setLoggedOut = createAction('setLoggedOut');
export const setSelectedCity = createAction('setSelectedCity', props<{ cityName: string }>());
export const getFavoriteCities = createAction('getFavoriteCities');
export const setFavoriteCities = createAction('setFavoriteCities', props<{ favoriteCities: string[] }>());
export const saveFavoriteCity = createAction('saveFavoriteCity', props<{ cityToSave: string }>());
export const getNewSavedFavoriteCityData = createAction('getNewSavedFavoriteCityData', props<{ cityName: string }>());
export const getNewSavedFavoriteCityDataSuccess = createAction(
  'getNewSavedFavoriteCityDataSuccess',
  props<{ cityData: FavoriteCity }>()
);
export const unsaveFavoriteCity = createAction('unsaveFavoriteCity', props<{ cityToUnsave: string }>());
export const unsaveFavoriteCitySuccess = createAction('unsaveFavoriteCitySuccess', props<{ cityToUnsave: string }>());
export const getCurrentCityWeatherDetails = createAction('getCurrentCityWeatherDetails', props<{ cityName: string }>());
export const getCurrentCityWeatherDetailsSuccess = createAction(
  'getCurrentCityWeatherDetailsSuccess',
  props<{ weatherDetails: CurrentCityWeatherDetails }>()
);

export const getAndSaveYesterdayHourlyWeatherData = createAction(
  'get yesterday weather data and save only hourly data to state',
  props<{ cityName: string }>()
);
export const getAndSaveYesterdayHourlyWeatherDataSuccess = createAction(
  'get yesterday weather data and save only hourly data to state Success',
  props<{ hourlyData: string[] }>()
);
