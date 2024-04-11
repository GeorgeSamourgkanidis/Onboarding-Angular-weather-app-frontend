import { Component, Input, OnChanges, inject, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';
import { EChartsOption } from 'echarts';
import { WeatherService } from '../../services/weather.service';
import { Observable, take, forkJoin } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectCityIsSaved } from '../../store/weather.selector';
import { NgClass, AsyncPipe } from '@angular/common';
import { LetDirective } from '@ngrx/component';
import { saveFavoriteCitySuccess, setSelectedCity, unsaveFavoriteCitySuccess } from '../../store/weather.actions';
import { CityMaxTemps, CurrentCityWeatherDetails } from '../../models/weather';
import { gaugeChartOptionData, lineChartOptionData, radarChartOptionData } from '../../data/charts';

@Component({
  selector: 'app-weather-city-details',
  standalone: true,
  imports: [LetDirective, NgClass, AsyncPipe, MatIconModule, MatButtonModule, NgxEchartsDirective],
  templateUrl: './weather-city-details.component.html',
  styleUrl: './weather-city-details.component.scss',
  providers: [provideEcharts()]
})
export class WeatherCityDetailsComponent implements OnChanges {
  @Input()
  selectedCity: string;

  lineChartLoading = false;
  gaugeChartLoading = false;
  radarChartLoading = false;

  private store = inject(Store);
  selectedCityIsSaved$: Observable<boolean>;
  currentCityWeatherDetails: CurrentCityWeatherDetails = null;
  cityMaxTemps: CityMaxTemps = null;

  lineChartOption: EChartsOption = lineChartOptionData;
  gaugeChartOption: EChartsOption = gaugeChartOptionData;
  gaugeChartDay: string = 'yesterday';
  radarChartOption: EChartsOption = radarChartOptionData;

  constructor(private weatherService: WeatherService) {}

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
    this.lineChartLoading = true;
    this.weatherService
      .getYesterdayWeather(cityName)
      .pipe(take(1))
      .subscribe((res: any) => {
        this.lineChartOption = {
          ...this.lineChartOption,
          series: [
            {
              data: res.forecast.forecastday[0].hour
                .filter((_: any, index: number) => index % 3 === 0) // 0:00 -> 3:00 -> 6:00....
                .map((data: any) => data.temp_c),
              type: 'line'
            }
          ]
        };
        this.lineChartLoading = false;
      });
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

  setGaugeChartDay(day: 'yesterday' | 'today' | 'tomorrow') {
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

  refreshRadarChart() {}

  saveUnSaveFavoriteCity(isSaved: boolean) {
    //TODO dont dispatch success when I implement backend save/unsave
    if (isSaved) {
      this.store.dispatch(unsaveFavoriteCitySuccess({ cityToUnsave: this.selectedCity }));
    } else {
      this.store.dispatch(saveFavoriteCitySuccess({ cityToSave: this.selectedCity }));
    }
  }
}
