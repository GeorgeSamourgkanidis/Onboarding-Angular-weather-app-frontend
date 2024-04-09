import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FavoriteCity } from '../../models/weather';
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-weather-city-details',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, NgxEchartsDirective],
  templateUrl: './weather-city-details.component.html',
  styleUrl: './weather-city-details.component.scss',
  providers: [provideEcharts()]
})
export class WeatherCityDetailsComponent {
  @Input()
  cityDetails!: FavoriteCity;
  @Output()
  resetSelectedCity = new EventEmitter<void>();

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

  handleResetSelectedCity() {
    this.resetSelectedCity.emit();
  }

  refreshData() { //implement when I will add ngrx

  }
}
