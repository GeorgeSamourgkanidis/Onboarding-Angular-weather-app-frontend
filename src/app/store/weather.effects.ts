import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { WeatherService } from '../services/weather.service';
import { getAndSaveYesterdayHourlyWeatherData, getAndSaveYesterdayHourlyWeatherDataSuccess } from './weather.actions';

@Injectable()
export class WeatherEffects {
  constructor(
    private actions$: Actions,
    private weatherService: WeatherService
  ) {}

  getYesterdayWeatherData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAndSaveYesterdayHourlyWeatherData),
      exhaustMap(action =>
        this.weatherService.getYesterdayWeather(action.cityName).pipe(
          map((res: any) =>
            getAndSaveYesterdayHourlyWeatherDataSuccess({
              hourlyData: res.forecast.forecastday[0].hour
                .filter((_: any, index: number) => index % 3 === 0)
                .map((data: any) => data.temp_c) // 0:00 -> 3:00 -> 6:00....
            })
          ),
          catchError(() => EMPTY)
        )
      )
    )
  );
}
