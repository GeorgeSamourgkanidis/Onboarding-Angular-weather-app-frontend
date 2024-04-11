import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WeatherState } from './weather.state';

const weatherState = createFeatureSelector<WeatherState>('weather');

export const selectSelectedCity = createSelector(weatherState, (state: WeatherState) => state.selectedCity);

export const selectFavoriteCities = createSelector(weatherState, (state: WeatherState) => state.favoriteCities);

export const selectCityIsSaved = (cityName: string) =>
  createSelector(weatherState, (state: WeatherState) => state.favoriteCities.includes(cityName));

export const selectYesterdayHourlyData = createSelector(
  weatherState,
  (state: WeatherState) => state.yesterdayHourlyData
);

export const selectLineChartIsLoading = createSelector(weatherState, (state: WeatherState) => state.lineChartLoading);
