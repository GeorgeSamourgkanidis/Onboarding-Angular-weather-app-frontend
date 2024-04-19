import { Routes } from '@angular/router';
import { WeatherComponent } from './features/weather/weather.component';
import { LoginComponent } from './core/login/login.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'weather', component: WeatherComponent },
  { path: '', redirectTo: '/weather', pathMatch: 'full' }
];
