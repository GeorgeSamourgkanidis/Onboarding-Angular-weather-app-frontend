import { createReducer, on } from '@ngrx/store';
import { weatherState } from './weather.state';
import { getCurrentWeather } from './weather.actions';

export const weatherReducer = createReducer(
  weatherState,
  on(getCurrentWeather, state => ({
    ...state,
    currentData: "test",
  }))
);
