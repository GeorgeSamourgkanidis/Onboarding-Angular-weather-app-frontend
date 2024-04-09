import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { FavoriteCity } from '../../models/weather';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WeatherService } from '../../services/weather.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-left-side-panel',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './left-side-panel.component.html',
  styleUrl: './left-side-panel.component.scss'
})
export class LeftSidePanelComponent implements OnInit {
  searchInput: string = '';
  selectedCity: string;
  showLoading: boolean = false;
  searchError: boolean = false;

  @Output()
  showCityDetails = new EventEmitter<FavoriteCity>();

  favoriteCitiesNames: string[] = ['Thessaloniki', 'Athens'];
  favoriteCitiesData: FavoriteCity[] = [];

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.favoriteCitiesNames.forEach(city => {
      this.weatherService
        .getTodayForecast(city)
        .pipe(take(1))
        .subscribe((res: any) =>
          this.favoriteCitiesData.push({
            min: res.forecast.forecastday[0].day.mintemp_c,
            max: res.forecast.forecastday[0].day.maxtemp_c,
            cityName: city,
            currentWeatherIcon: res.forecast.forecastday[0].day.condition.icon
          })
        );
    });
  }

  clearSearch() {
    this.searchInput = '';
    this.searchError = false;
  }

  handleFavoriteCityClicked(cityDetails: FavoriteCity) {
    this.showCityDetails.emit(cityDetails);
    this.selectedCity = cityDetails.cityName;
  }

  searchCity() {
    this.showLoading = true;
    this.weatherService
      .getYesterdayWeatherHourly(this.searchInput)
      .pipe(take(1))
      .subscribe({
        next: (res: any) => {
          console.log(res);
          this.showCityDetails.emit({
            min: res.forecast.forecastday[0].day.mintemp_c,
            max: res.forecast.forecastday[0].day.maxtemp_c,
            cityName: this.searchInput,
            currentWeatherIcon: res.forecast.forecastday[0].day.condition.icon
          })
          this.selectedCity = this.searchInput;
          this.searchError = false;
          this.showLoading = false;
        },
        error: () => {
          this.searchError = true;
          this.showLoading = false;
        }
      });
  }
}
