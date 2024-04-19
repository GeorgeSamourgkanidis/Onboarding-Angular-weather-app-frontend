import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { FavoriteCity } from '../../models/weather';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WeatherService } from '../../services/weather.service';
import { Observable, Subject, take, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectFavoriteCities, selectIsLoggedIn, selectSelectedCity } from '../../store/weather.selector';
import { getFavoriteCities, setFavoriteCities, setSelectedCity } from '../../store/weather.actions';

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
export class LeftSidePanelComponent implements OnInit, OnDestroy {
  searchInput: string = '';
  searchError: boolean = false;
  selectedCity$: Observable<string>;
  showLoading: boolean = false;

  private store = inject(Store);
  private ngUnsubscribe = new Subject<void>();
  isLoggedIn$: Observable<boolean>;
  favoriteCitiesData: FavoriteCity[] = [];

  constructor(private weatherService: WeatherService) {}

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnInit(): void {
    this.isLoggedIn$ = this.store.select(selectIsLoggedIn);
    this.isLoggedIn$.pipe(takeUntil(this.ngUnsubscribe)).subscribe((logged: boolean) => {
      if (logged) {
        this.store.dispatch(getFavoriteCities());
      } else {
        // on logout delete favoriteCities
        this.store.dispatch(setFavoriteCities({ favoriteCities: [] }));
      }
    });
    this.selectedCity$ = this.store.select(selectSelectedCity);
    this.store
      .select(selectFavoriteCities)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(favoriteCities => {
        this.favoriteCitiesData = [];
        favoriteCities.forEach(favoriteCity => {
          this.weatherService
            .getTodayForecast(favoriteCity)
            .pipe(take(1))
            .subscribe((res: any) =>
              this.favoriteCitiesData.push({
                min: res.forecast.forecastday[0].day.mintemp_c,
                max: res.forecast.forecastday[0].day.maxtemp_c,
                cityName: favoriteCity,
                currentWeatherIcon: res.forecast.forecastday[0].day.condition.icon
              })
            );
        });
      });
  }

  clearSearch() {
    this.searchInput = '';
    this.searchError = false;
  }

  handleFavoriteCityClicked(cityDetails: FavoriteCity) {
    this.store.dispatch(setSelectedCity({ cityName: cityDetails.cityName }));
    this.searchInput = '';
  }

  searchCity() {
    this.showLoading = true;
    this.weatherService
      .checkSearchValidity(this.searchInput)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.store.dispatch(setSelectedCity({ cityName: this.searchInput }));
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
