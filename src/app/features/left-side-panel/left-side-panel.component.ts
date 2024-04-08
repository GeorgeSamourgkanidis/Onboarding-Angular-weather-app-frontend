import { Component, EventEmitter, Output } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FavoriteCity } from '../../models/weather';

@Component({
  selector: 'app-left-side-panel',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule],
  templateUrl: './left-side-panel.component.html',
  styleUrl: './left-side-panel.component.scss'
})
export class LeftSidePanelComponent {
  searchInput: string = '';
  @Output()
  showCityDetails = new EventEmitter<FavoriteCity>();

  favoriteCities: FavoriteCity[] = [
    //dummy data
    {
      min: 12,
      max: 25,
      cityName: 'Thessaloniki',
      currentWeatherIcon: 'sunny'
    },
    {
      min: 14,
      max: 28,
      cityName: 'Athens',
      currentWeatherIcon: 'cloud'
    }
  ];

  handleFavoriteCityClicked(cityDetails: FavoriteCity) {
    this.showCityDetails.emit(cityDetails);
  }
}
