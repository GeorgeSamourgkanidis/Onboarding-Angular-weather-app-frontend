import { Routes } from '@angular/router';
import { WeatherComponent } from './features/weather/weather.component';

export const routes: Routes = [
  { path: 'weather', component: WeatherComponent },
  { path: '', redirectTo: '/weather', pathMatch: 'full' }
];
