import { Component } from '@angular/core';
import { LeftSidePanelComponent } from '../left-side-panel/left-side-panel.component';
import { WeatherCityDetailsComponent } from '../weather-city-details/weather-city-details.component';
import { FavoriteCity } from '../../models/weather';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule, LeftSidePanelComponent, WeatherCityDetailsComponent],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss'
})
export class WeatherComponent {
  selectedCityDetails: FavoriteCity = null;

  onShowCityDetails(cityDetails: FavoriteCity) {
    console.log(cityDetails);

    this.selectedCityDetails = cityDetails;
  }

  onResetSelectedCity() {
    this.selectedCityDetails = null;
  }
}
