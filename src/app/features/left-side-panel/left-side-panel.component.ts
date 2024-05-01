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
import { Observable, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectFavoriteCitiesData, selectIsLoggedIn, selectSelectedCity } from '../../store/weather.selector';
import { setSelectedCity } from '../../store/weather.actions';
import { LetDirective } from '@ngrx/component';

@Component({
  selector: 'app-left-side-panel',
  standalone: true,
  imports: [
    LetDirective,
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
  favoriteCitiesData$: Observable<FavoriteCity[]>;

  constructor(private weatherService: WeatherService) {}

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnInit(): void {
    this.isLoggedIn$ = this.store.select(selectIsLoggedIn);
    this.selectedCity$ = this.store.select(selectSelectedCity);
    this.favoriteCitiesData$ = this.store.select(selectFavoriteCitiesData);
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
    this.weatherService.checkSearchValidity(this.searchInput).subscribe({
      next: (results: any) => {
        if (results.length > 0) {
          this.store.dispatch(setSelectedCity({ cityName: this.searchInput }));
          this.searchError = false;
        } else {
          this.searchError = true;
        }
        this.showLoading = false;
      },
      error: () => {
        this.searchError = true;
        this.showLoading = false;
      }
    });
  }
}
