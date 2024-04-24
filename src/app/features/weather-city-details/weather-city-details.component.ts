import { Component, Input, OnChanges, inject, SimpleChanges, OnInit, OnDestroy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';
import { EChartsOption } from 'echarts';
import { WeatherService } from '../../services/weather.service';
import { Observable, take, forkJoin, takeUntil, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  selectCityIsSaved,
  selectIsLoggedIn,
  selectLineChartIsLoading,
  selectYesterdayHourlyData
} from '../../store/weather.selector';
import { NgClass, AsyncPipe, TitleCasePipe } from '@angular/common';
import { LetDirective } from '@ngrx/component';
import {
  getAndSaveYesterdayHourlyWeatherData,
  saveFavoriteCity,
  setSelectedCity,
  unsaveFavoriteCity
} from '../../store/weather.actions';
import { CityMaxTemps, CurrentCityWeatherDetails, maxTempDay } from '../../models/weather';
import { gaugeChartOptionData, lineChartOptionData, radarChartOptionData } from '../../data/charts';

@Component({
  selector: 'app-weather-city-details',
  standalone: true,
  imports: [TitleCasePipe, LetDirective, NgClass, AsyncPipe, MatIconModule, MatButtonModule, NgxEchartsDirective],
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
  currentCityWeatherDetails: CurrentCityWeatherDetails = null;
  cityMaxTemps: CityMaxTemps = null;

  lineChartOption: EChartsOption = lineChartOptionData;
  lineChartLoading$: Observable<boolean>;
  gaugeChartOption: EChartsOption = gaugeChartOptionData;
  gaugeChartLoading = false;
  gaugeChartDay: string = 'yesterday';
  radarChartDay: string = 'yesterday';
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
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedCity'].currentValue) {
      const city = changes['selectedCity'].currentValue;
      this.selectedCityIsSaved$ = this.store.select(selectCityIsSaved(city));
      this.setCurrentCityDetails(city);
      this.setLineChartData(city);
      this.setGaugeChartData(city);
    }
  }

  handleResetSelectedCity() {
    this.store.dispatch(setSelectedCity(null));
  }

  setCurrentCityDetails(cityName: string) {
    this.weatherService
      .getTodayForecast(cityName)
      .pipe(take(1))
      .subscribe((res: any) => {
        this.currentCityWeatherDetails = {
          min: res.forecast.forecastday[0].day.mintemp_c,
          max: res.forecast.forecastday[0].day.maxtemp_c,
          current: res.current.temp_c,
          name: res.location.name,
          region: res.location.region,
          country: res.location.country,
          currentWeatherIcon: res.forecast.forecastday[0].day.condition.icon
        };
      });
  }

  setLineChartData(cityName: string) {
    this.store.dispatch(getAndSaveYesterdayHourlyWeatherData({ cityName: cityName }));
  }

  setGaugeChartData(cityName: string) {
    this.gaugeChartLoading = true;
    forkJoin(
      this.weatherService.getYesterdayWeather(cityName),
      this.weatherService.getTodayAndTomorrowForecast(cityName)
    )
      .pipe(take(1))
      .subscribe((res: any) => {
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

  refreshLineChart() {
    this.setLineChartData(this.selectedCity);
  }

  refreshGaugeChart() {
    this.setGaugeChartData(this.selectedCity);
  }

  setRadarChartDay(day: maxTempDay) {
    this.radarChartDay = day;
  }

  refreshRadarChart() {}

  saveUnSaveFavoriteCity(isSaved: boolean, cityName: string) {
    //I'm not using this.selectedCity because I want to save case sensitive text
    if (isSaved) {
      this.store.dispatch(unsaveFavoriteCity({ cityToUnsave: cityName }));
    } else {
      this.store.dispatch(saveFavoriteCity({ cityToSave: cityName }));
    }
  }
}
