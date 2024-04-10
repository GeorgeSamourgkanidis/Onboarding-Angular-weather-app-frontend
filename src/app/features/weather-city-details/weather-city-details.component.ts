import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';
import { EChartsOption } from 'echarts';
import { WeatherService } from '../../services/weather.service';
import { forkJoin, take } from 'rxjs';
import { CityMaxTemps, CurrentCityWeatherDetails } from '../../models/weather';
import { gaugeChartOptionData, lineChartOptionData, radarChartOptionData } from '../../data/charts';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-weather-city-details',
  standalone: true,
  imports: [NgClass, MatIconModule, MatButtonModule, NgxEchartsDirective],
  templateUrl: './weather-city-details.component.html',
  styleUrl: './weather-city-details.component.scss',
  providers: [provideEcharts()]
})
export class WeatherCityDetailsComponent implements OnChanges {
  @Input()
  selectedCity: string;
  @Output()
  resetSelectedCity = new EventEmitter<void>();

  lineChartLoading = false;
  gaugeChartLoading = false;
  radarChartLoading = false;
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
      this.setCurrentCityDetails(city);
      this.setLineChartData(city);
      this.setGaugeChartData(city);
    }
  }

  handleResetSelectedCity() {
    this.resetSelectedCity.emit();
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
                .filter((_: any, index: number) => index % 3 === 0)
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
          data: [this.cityMaxTemps[day]],
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
}
