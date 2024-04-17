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
    const url = `${environment.baseWeatherUrl}/search.json?key=${environment.apiKey}&q=${cityName}`;
    return this.http.get(url);
  }

  getCurrentWeather(cityName: string) {
    const url = `${environment.baseWeatherUrl}/current.json?key=${environment.apiKey}&q=${cityName}&aqi=yes`;
    return this.http.get(url);
  }

  getTodayAndTomorrowForecast(cityName: string) {
    const url = `${environment.baseWeatherUrl}/forecast.json?key=${environment.apiKey}&q=${cityName}&days=2&aqi=yes&alerts=no`;
    return this.http.get(url);
  }

  getTodayForecast(cityName: string) {
    const url = `${environment.baseWeatherUrl}/forecast.json?key=${environment.apiKey}&q=${cityName}&days=1&aqi=yes&alerts=no`;
    return this.http.get(url);
  }

  getYesterdayWeather(cityName: string) {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate() - 1;
    const yesterdayDate = `${year}/${month}/${day}`;
    const url = `${environment.baseWeatherUrl}/history.json?key=${environment.apiKey}&q=${cityName}&dt=${yesterdayDate}`;
    return this.http.get(url);
  }
}
