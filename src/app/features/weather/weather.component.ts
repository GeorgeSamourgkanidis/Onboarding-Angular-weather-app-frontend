import { Component } from '@angular/core';
import { LeftSidePanelComponent } from '../left-side-panel/left-side-panel.component';
import { WeatherCityDetailsComponent } from '../weather-city-details/weather-city-details.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule, LeftSidePanelComponent, WeatherCityDetailsComponent],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss'
})
export class WeatherComponent {
  selectedCity: string = null;

  onShowCityDetails(selectedCity: string) {
    this.selectedCity = selectedCity;
  }

  onResetSelectedCity() {
    this.selectedCity = null;
  }
}
