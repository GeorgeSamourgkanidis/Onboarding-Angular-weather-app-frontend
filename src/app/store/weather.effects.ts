import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, exhaustMap, catchError, mergeMap } from 'rxjs/operators';
import { WeatherService } from '../services/weather.service';
import {
  getAndSaveYesterdayHourlyWeatherData,
  getAndSaveYesterdayHourlyWeatherDataSuccess,
  getCurrentCityWeatherDetails,
  getCurrentCityWeatherDetailsSuccess,
  getNewSavedFavoriteCityData,
  getNewSavedFavoriteCityDataSuccess,
  saveFavoriteCity,
  setLoggedIn,
  unsaveFavoriteCity,
  unsaveFavoriteCitySuccess
} from './weather.actions';
import { Store } from '@ngrx/store';

@Injectable()
export class WeatherEffects {
  private store = inject(Store);

  constructor(
    private actions$: Actions,
    private weatherService: WeatherService
  ) {}

  getFavoriteCities$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(setLoggedIn),
        exhaustMap(() =>
          this.weatherService.getFavoriteCities().pipe(
            map((favoriteCities: string[]) => {
              //for each favoriteCity get favoriteCityData
              favoriteCities.forEach(cityName => {
                this.store.dispatch(getNewSavedFavoriteCityData({ cityName }));
              });
              return of(true);
            }),
            catchError(() => EMPTY)
          )
        )
      ),
    { dispatch: false }
  );

  saveFavoriteCities$ = createEffect(() =>
    this.actions$.pipe(
      ofType(saveFavoriteCity),
      exhaustMap(action =>
        this.weatherService.saveFavoriteCity(action.cityToSave).pipe(
          map(() =>
            getNewSavedFavoriteCityData({
              cityName: action.cityToSave
            })
          ),
          catchError(() => EMPTY)
        )
      )
    )
  );

  getNewSavedFavoriteCityData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getNewSavedFavoriteCityData),
      mergeMap(action =>
        this.weatherService.getTodayForecast(action.cityName).pipe(
          map((res: any) =>
            getNewSavedFavoriteCityDataSuccess({
              cityData: {
                min: res.forecast.forecastday[0].day.mintemp_c,
                max: res.forecast.forecastday[0].day.maxtemp_c,
                cityName: action.cityName,
                currentWeatherIcon: res.forecast.forecastday[0].day.condition.icon
              }
            })
          ),
          catchError(() => EMPTY)
        )
      )
    )
  );

  unsaveFavoriteCities$ = createEffect(() =>
    this.actions$.pipe(
      ofType(unsaveFavoriteCity),
      exhaustMap(action =>
        this.weatherService.unsaveFavoriteCity(action.cityToUnsave).pipe(
          map(() =>
            unsaveFavoriteCitySuccess({
              cityToUnsave: action.cityToUnsave
            })
          ),
          catchError(() => EMPTY)
        )
      )
    )
  );

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

  getCurrentCityWeatherDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCurrentCityWeatherDetails),
      exhaustMap(action =>
        this.weatherService.getTodayForecast(action.cityName).pipe(
          map((res: any) =>
            getCurrentCityWeatherDetailsSuccess({
              weatherDetails: {
                min: res.forecast.forecastday[0].day.mintemp_c,
                max: res.forecast.forecastday[0].day.maxtemp_c,
                current: res.current.temp_c,
                name: res.location.name,
                region: res.location.region,
                country: res.location.country,
                currentWeatherIcon: res.forecast.forecastday[0].day.condition.icon
              }
            })
          ),
          catchError(() => EMPTY)
        )
      )
    )
  );
}
