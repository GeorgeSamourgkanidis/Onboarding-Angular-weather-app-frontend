import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { WeatherService } from '../services/weather.service';
import { saveFavoriteCity, saveFavoriteCitySuccess } from './weather.actions';

@Injectable()
export class WeatherEffects {
  saveFavoriteCity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(saveFavoriteCity),
      exhaustMap(() =>
        this.weatherService.getCurrentWeather('test').pipe(
          map(movies => ({ type: saveFavoriteCitySuccess, payload: movies })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private weatherService: WeatherService
  ) {}
}
