import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherCityDetailsComponent } from './weather-city-details.component';

describe('WeatherCityDetailsComponent', () => {
  let component: WeatherCityDetailsComponent;
  let fixture: ComponentFixture<WeatherCityDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherCityDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WeatherCityDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
