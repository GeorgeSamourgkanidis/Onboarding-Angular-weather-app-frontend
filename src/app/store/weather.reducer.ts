import { createReducer, on } from '@ngrx/store';
import { initialWeatherState } from './weather.state';
import { getCurrentWeather } from './weather.actions';

export const weatherReducer = createReducer(
  initialWeatherState,
  on(getCurrentWeather, state => ({
    ...state,
    currentData: 'test'
  }))
);
