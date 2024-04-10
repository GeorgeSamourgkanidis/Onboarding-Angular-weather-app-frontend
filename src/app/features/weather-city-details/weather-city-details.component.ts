import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FavoriteCity } from '../../models/weather';
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';
import { EChartsOption } from 'echarts';
import { WeatherService } from '../../services/weather.service';
import { Observable, Subject, take, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectCityIsSaved, selectSelectedCity } from '../../store/weather.selector';
import { NgClass, AsyncPipe } from '@angular/common';
import { LetDirective } from '@ngrx/component';
import { saveFavoriteCitySuccess, unsaveFavoriteCitySuccess } from '../../store/weather.actions';

@Component({
  selector: 'app-weather-city-details',
  standalone: true,
  imports: [LetDirective, NgClass, AsyncPipe, MatIconModule, MatButtonModule, NgxEchartsDirective],
  templateUrl: './weather-city-details.component.html',
  styleUrl: './weather-city-details.component.scss',
  providers: [provideEcharts()]
})
export class WeatherCityDetailsComponent implements OnInit, OnDestroy {
  @Input()
  cityDetails!: FavoriteCity;
  @Output()
  resetSelectedCity = new EventEmitter<void>();
  lineChartLoading = false;
  gaugeChartLoading = false;
  radarChartLoading = false;
  private store = inject(Store);
  private ngUnsubscribe = new Subject<void>();
  selectedCityIsSaved$: Observable<boolean>;

  lineChartOption: EChartsOption = {
    tooltip: {},
    xAxis: {
      type: 'category',
      data: ['0:00', '3:00', '6:00', '9:00', '12:00', '15:00', '18:00', '21:00']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [20, 21, 22, 23, 24, 25, 26],
        type: 'line'
      }
    ]
  };

  gaugeChartOption: EChartsOption = {
    tooltip: {},
    series: [
      {
        data: [20],
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

  radarChartOption: EChartsOption = {
    color: ['blue', 'green'],
    tooltip: {},
    legend: {
      data: ['Allocated Budget', 'Actual Spending'],
      textStyle: {
        color: 'black'
      }
    },
    radar: {
      indicator: [
        { name: 'Sales', max: 6500 },
        { name: 'Administration', max: 16000 },
        { name: 'Information Techology', max: 30000 },
        { name: 'Customer Support', max: 38000 },
        { name: 'Development', max: 52000 },
        { name: 'Marketing', max: 25000 }
      ]
    },
    series: [
      {
        type: 'radar',
        data: [
          {
            value: [4300, 10000, 28000, 35000, 50000, 19000],
            name: 'Allocated Budget'
          },
          {
            value: [5000, 14000, 28000, 31000, 42000, 21000],
            name: 'Actual Spending'
          }
        ]
      }
    ]
  };

  constructor(private weatherService: WeatherService) {}

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnInit(): void {
    this.store
      .select(selectSelectedCity)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(cityName => {
        this.selectedCityIsSaved$ = this.store.select(selectCityIsSaved(cityName));
      });
  }

  handleResetSelectedCity() {
    this.resetSelectedCity.emit();
  }

  refreshLineChart() {
    this.lineChartLoading = true;
    this.weatherService
      .getYesterdayWeatherHourly(this.cityDetails.cityName)
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

  refreshGaugeChart() {}

  refreshRadarChart() {}

  saveUnSaveFavoriteCity(isSaved: boolean) {
    //TODO dont dispatch success when I implement backend save/unsave
    if (isSaved) {
      this.store.dispatch(unsaveFavoriteCitySuccess({ cityToUnsave: this.cityDetails.cityName }));
    } else {
      this.store.dispatch(saveFavoriteCitySuccess({ cityToSave: this.cityDetails.cityName }));
    }
  }
}
