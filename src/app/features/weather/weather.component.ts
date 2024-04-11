import { Component, OnInit, inject } from '@angular/core';
import { LeftSidePanelComponent } from '../left-side-panel/left-side-panel.component';
import { WeatherCityDetailsComponent } from '../weather-city-details/weather-city-details.component';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectSelectedCity } from '../../store/weather.selector';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule, LeftSidePanelComponent, WeatherCityDetailsComponent],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss'
})
export class WeatherComponent implements OnInit {
  selectedCity$: Observable<string>;
  private store = inject(Store);

  ngOnInit(): void {
    this.selectedCity$ = this.store.select(selectSelectedCity);
  }
}
