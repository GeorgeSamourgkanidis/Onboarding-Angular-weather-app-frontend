import { createAction } from '@ngrx/store';

export const getCurrentWeather = createAction('getCurrentWeather');
export const saveFavoriteCity = createAction('saveFavoriteCity');
export const saveFavoriteCitySuccess = createAction('saveFavoriteCitySuccess');
