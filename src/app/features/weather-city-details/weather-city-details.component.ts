import { Component, Input, OnChanges, inject, SimpleChanges, OnInit, OnDestroy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';
import { EChartsOption } from 'echarts';
import { WeatherService } from '../../services/weather.service';
import { Observable, forkJoin, takeUntil, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  selectCityIsSaved,
  selectCurrentCityWeatherDetails,
  selectIsLoggedIn,
  selectLineChartIsLoading,
  selectYesterdayHourlyData
} from '../../store/weather.selector';
import { NgClass, AsyncPipe, TitleCasePipe, NgIf } from '@angular/common';
import { LetDirective } from '@ngrx/component';
import {
  getAndSaveYesterdayHourlyWeatherData,
  getCurrentCityWeatherDetails,
  saveFavoriteCity,
  setSelectedCity,
  unsaveFavoriteCity
} from '../../store/weather.actions';
import { CityMaxTemps, CurrentCityWeatherDetails, maxTempDay } from '../../models/weather';
import { gaugeChartOptionData, lineChartOptionData, radarChartOptionData } from '../../data/charts';

@Component({
  selector: 'app-weather-city-details',
  standalone: true,
  imports: [TitleCasePipe, LetDirective, NgClass, NgIf, AsyncPipe, MatIconModule, MatButtonModule, NgxEchartsDirective],
  templateUrl: './weather-city-details.component.html',
  styleUrl: './weather-city-details.component.scss',
  providers: [provideEcharts()]
})
export class WeatherCityDetailsComponent implements OnChanges, OnInit, OnDestroy {
  @Input()
  selectedCity: string;

  private store = inject(Store);
  private ngUnsubscribe = new Subject<void>();

  isLoggedIn$: Observable<boolean>;
  selectedCityIsSaved$: Observable<boolean>;
  currentCityWeatherDetails$: Observable<CurrentCityWeatherDetails>;
  cityMaxTemps: CityMaxTemps = null;

  lineChartOption: EChartsOption = lineChartOptionData;
  lineChartLoading$: Observable<boolean>;
  gaugeChartOption: EChartsOption = gaugeChartOptionData;
  gaugeChartLoading = false;
  gaugeChartDay: string = 'yesterday';
  radarChartOption: EChartsOption = radarChartOptionData;
  radarChartLoading = false;

  chartDay: maxTempDay[] = ['yesterday', 'today', 'tomorrow'];

  constructor(private weatherService: WeatherService) {}

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnInit(): void {
    this.isLoggedIn$ = this.store.select(selectIsLoggedIn);
    // Get lineChart loading and details
    this.lineChartLoading$ = this.store.select(selectLineChartIsLoading);
    this.store
      .select(selectYesterdayHourlyData)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((hourlyData: string[]) => {
        this.lineChartOption = {
          ...this.lineChartOption,
          series: [
            {
              data: hourlyData,
              type: 'line'
            }
          ]
        };
      });
    this.currentCityWeatherDetails$ = this.store.select(selectCurrentCityWeatherDetails);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedCity'].currentValue) {
      const city = changes['selectedCity'].currentValue;
      this.selectedCityIsSaved$ = this.store.select(selectCityIsSaved(city));
      this.store.dispatch(getCurrentCityWeatherDetails({ cityName: city }));
      this.setLineChartData(city);
      this.setGaugeChartData(city);
      this.setRadarChartData(city);
    }
  }

  handleResetSelectedCity() {
    this.store.dispatch(setSelectedCity(null));
  }

  setLineChartData(cityName: string) {
    this.store.dispatch(getAndSaveYesterdayHourlyWeatherData({ cityName: cityName }));
  }

  setGaugeChartData(cityName: string) {
    this.gaugeChartLoading = true;
    forkJoin(
      this.weatherService.getYesterdayWeather(cityName),
      this.weatherService.getTodayAndTomorrowForecast(cityName)
    ).subscribe((res: any) => {
      this.cityMaxTemps = {
        yesterday: res[0].forecast.forecastday[0].day.maxtemp_c,
        today: res[1].forecast.forecastday[0].day.maxtemp_c,
        tomorrow: res[1].forecast.forecastday[1].day.maxtemp_c
      };
      this.setGaugeChartDay('yesterday');
      this.gaugeChartLoading = false;
    });
  }

  setGaugeChartDay(day: maxTempDay) {
    this.gaugeChartDay = day;
    this.gaugeChartOption = {
      ...this.gaugeChartOption,
      series: [
        {
          data: [this.cityMaxTemps[day]], //cityMaxTemps has the temps of 'yesterday' | 'today' | 'tomorrow'
          type: 'gauge',
          itemStyle: {
            color: '#5470c6'
          },
          progress: {
            itemStyle: {
              color: 'red'
            }
          }
        }
      ]
    };
  }

  setRadarChartData(cityName: string) {
    this.radarChartLoading = true;
    this.weatherService.getTodayAndTomorrowForecast(cityName).subscribe((res: any) => {
      const airQuality = res.current.air_quality;
      this.radarChartOption = {
        ...this.radarChartOption,
        series: [
          {
            type: 'radar',
            data: [
              {
                value: [
                  airQuality.co,
                  airQuality.no2,
                  airQuality.o3,
                  airQuality.so2,
                  airQuality.pm2_5,
                  airQuality.pm10,
                  airQuality.usepaindex,
                  airQuality.gbdefraindex
                ]
              }
            ]
          }
        ]
      };
      this.radarChartLoading = false;
    });
  }

  refreshLineChart() {
    this.setLineChartData(this.selectedCity);
  }

  refreshGaugeChart() {
    this.setGaugeChartData(this.selectedCity);
  }

  refreshRadarChart() {
    this.setRadarChartData(this.selectedCity);
  }

  saveUnSaveFavoriteCity(isSaved: boolean, cityName: string) {
    //I'm not using this.selectedCity because I want to save case sensitive text
    if (isSaved) {
      this.store.dispatch(unsaveFavoriteCity({ cityToUnsave: cityName }));
    } else {
      this.store.dispatch(saveFavoriteCity({ cityToSave: cityName }));
    }
  }
}
