import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FavoriteCity } from '../../models/weather';

@Component({
  selector: 'app-weather-city-details',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './weather-city-details.component.html',
  styleUrl: './weather-city-details.component.scss'
})
export class WeatherCityDetailsComponent {
  @Input()
  cityDetails!: FavoriteCity;
  @Output()
  resetSelectedCity = new EventEmitter<void>();

  handleResetSelectedCity() {
    this.resetSelectedCity.emit();
  }
}
