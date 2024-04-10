import { isDevMode } from '@angular/core';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { weatherReducer } from '../store/weather.reducer';

export interface State {}

export const reducers: ActionReducerMap<State> = {
  weather: weatherReducer
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
