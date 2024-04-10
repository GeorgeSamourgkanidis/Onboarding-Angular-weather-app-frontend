import { createAction, props } from '@ngrx/store';

export const setSelectedCity = createAction('setSelectedCity', props<{ cityName: string }>());
export const getCurrentWeather = createAction('getCurrentWeather');
export const saveFavoriteCity = createAction('saveFavoriteCity');
export const saveFavoriteCitySuccess = createAction('saveFavoriteCitySuccess', props<{ cityToSave: string }>());
export const unsaveFavoriteCity = createAction('saveFavoriteCity');
export const unsaveFavoriteCitySuccess = createAction('unsaveFavoriteCitySuccess', props<{ cityToUnsave: string }>());
