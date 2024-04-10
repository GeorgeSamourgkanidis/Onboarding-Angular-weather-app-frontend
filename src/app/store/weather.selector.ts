import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WeatherState } from './weather.state';

const weatherState = createFeatureSelector<WeatherState>('weather');

export const selectFavoriteCities = createSelector(weatherState, (state: WeatherState) => state.favoriteCities);
export const selectCurrentWeather = createSelector(weatherState, (state: WeatherState) => state.currentData);
