import { createAction, props } from '@ngrx/store';

export const setSelectedCity = createAction('setSelectedCity', props<{ cityName: string }>());
export const getFavoriteCities = createAction('getFavoriteCities');
export const setFavoriteCities = createAction('setFavoriteCities', props<{ favoriteCities: string[] }>());
export const saveFavoriteCity = createAction('saveFavoriteCity', props<{ cityToSave: string }>());
export const saveFavoriteCitySuccess = createAction('saveFavoriteCitySuccess', props<{ cityToSave: string }>());
export const unsaveFavoriteCity = createAction('unsaveFavoriteCity', props<{ cityToUnsave: string }>());
export const unsaveFavoriteCitySuccess = createAction('unsaveFavoriteCitySuccess', props<{ cityToUnsave: string }>());

export const getAndSaveYesterdayHourlyWeatherData = createAction(
  'get yesterday weather data and save only hourly data to state',
  props<{ cityName: string }>()
);
export const getAndSaveYesterdayHourlyWeatherDataSuccess = createAction(
  'get yesterday weather data and save only hourly data to state Success',
  props<{ hourlyData: string[] }>()
);
