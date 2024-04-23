import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherComponent } from './weather.component';
import { Store, StoreModule, provideStore } from '@ngrx/store';
import { weatherReducer } from '../../store/weather.reducer';
import { selectSelectedCity } from '../../store/weather.selector';
import { take } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { WeatherService } from '../../services/weather.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { setSelectedCity } from '../../store/weather.actions';

describe('WeatherComponent', () => {
  let fixture: ComponentFixture<WeatherComponent>;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherComponent, StoreModule, HttpClientTestingModule, BrowserAnimationsModule],
      providers: [WeatherService, provideStore({ weather: weatherReducer })]
    }).compileComponents();

    fixture = TestBed.createComponent(WeatherComponent);
    store = TestBed.inject(Store);
    fixture.detectChanges();
  });

  it('selectedCity should be Thessaloniki', () => {
    store.dispatch(setSelectedCity({ cityName: 'Thessaloniki' }));
    store
      .select(selectSelectedCity)
      .pipe(take(1))
      .subscribe(city => {
        expect(city).toBe('Thessaloniki');
      });
  });
});
