import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WeatherState } from './weather.state';

const weatherState = createFeatureSelector<WeatherState>('weather');

export const selectIsLoggedIn = createSelector(weatherState, (state: WeatherState) => state.isLoggedIn);

export const selectSelectedCity = createSelector(weatherState, (state: WeatherState) => state.selectedCity);

export const selectFavoriteCitiesData = createSelector(weatherState, (state: WeatherState) => state.favoriteCitiesData);

export const selectCityIsSaved = (cityName: string) =>
  createSelector(weatherState, (state: WeatherState) =>
    state.favoriteCitiesData.some(fc => fc.cityName.toLowerCase() === cityName.toLowerCase())
  );

export const selectYesterdayHourlyData = createSelector(
  weatherState,
  (state: WeatherState) => state.yesterdayHourlyData
);

export const selectLineChartIsLoading = createSelector(weatherState, (state: WeatherState) => state.lineChartLoading);

export const selectCurrentCityWeatherDetails = createSelector(
  weatherState,
  (state: WeatherState) => state.currentCityWeatherDetails
);
