import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  getCurrentWeather(cityName: string) {
    const url = `${environment.baseUrl}/current.json?key=${environment.apiKey}&q=${cityName}&aqi=yes`;
    return this.http.get(url);
  }

  getTodayForecast(cityName: string) {
    const url = `${environment.baseUrl}/forecast.json?key=${environment.apiKey}&q=${cityName}&days=1&aqi=yes&alerts=no`;
    return this.http.get(url);
  }

  getYesterdayWeatherHourly(cityName: string) {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate() - 1;
    const yesterdayDate = `${year}/${month}/${day}`;
    const url = `${environment.baseUrl}/history.json?key=${environment.apiKey}&q=${cityName}&dt=${yesterdayDate}`;
    return this.http.get(url);
  }
}
