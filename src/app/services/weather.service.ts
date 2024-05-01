import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  getFavoriteCities() {
    const url = `${environment.baseBackendUrl}/Weather/favoriteCities`;
    return this.http.get<string[]>(url);
  }

  saveFavoriteCity(cityName: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const url = `${environment.baseBackendUrl}/Weather/saveFavoriteCity`;
    //[FromBody] in backend is weird and it doesnt accept simple text
    return this.http.post(url, JSON.stringify(cityName), { headers: headers });
  }

  unsaveFavoriteCity(cityName: string) {
    const url = `${environment.baseBackendUrl}/Weather/unsaveFavoriteCity/${cityName}`;
    return this.http.delete(url);
  }

  checkSearchValidity(cityName: string) {
    const url = `${environment.baseBackendUrl}/Weather/checkSearchValidity/${cityName}`;
    return this.http.get(url);
  }

  getTodayAndTomorrowForecast(cityName: string) {
    const url = `${environment.baseBackendUrl}/Weather/getTodayTomorrowMaxTemps/${cityName}`;
    return this.http.get(url);
  }

  getTodayForecast(cityName: string) {
    const url = `${environment.baseBackendUrl}/Weather/getTodayForecast/${cityName}`;
    return this.http.get(url);
  }

  getYesterdayWeather(cityName: string) {
    const url = `${environment.baseBackendUrl}/Weather/getYesterdayMaxTemps/${cityName}`;
    return this.http.get(url);
  }
}
