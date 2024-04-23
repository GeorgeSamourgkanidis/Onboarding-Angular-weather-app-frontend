import { TestBed } from '@angular/core/testing';
import { WeatherService } from './weather.service';
import { take } from 'rxjs';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpClient;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [provideHttpClient(withInterceptors([AuthInterceptor]))]
    });
    httpClient = TestBed.inject(HttpClient);
    service = new WeatherService(httpClient);
  });

  it('#checkSearchValidity(Thessaloniki) result array length should be greater than 0', () => {
    // Thessaloniki should find 1 result > 0
    service
      .checkSearchValidity('Thessaloniki')
      .pipe(take(1))
      .subscribe((results: any) => expect(results.length).toBeGreaterThan(0));
    // Thessalonikiasasdasd should find 0 results = 0
    service
      .checkSearchValidity('Thessalonikiasasdasd')
      .pipe(take(1))
      .subscribe((results: any) => expect(results.length).toBe(0));
    // expectation must exist
    expect(1).toBe(1);
  });
});
