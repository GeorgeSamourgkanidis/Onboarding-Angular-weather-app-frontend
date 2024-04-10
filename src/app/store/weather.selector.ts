import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WeatherState } from './weather.state';

const weatherState = createFeatureSelector<WeatherState>('weather');

export const selectCurrentWeather = createSelector(weatherState, (state: WeatherState) => state.currentData);
