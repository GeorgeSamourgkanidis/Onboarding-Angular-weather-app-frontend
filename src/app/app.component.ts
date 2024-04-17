import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { WeatherService } from './services/weather.service';
import { Store } from '@ngrx/store';
import { getFavoriteCities } from './store/weather.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  constructor(private weatherService: WeatherService) {}
  private store = inject(Store);

  ngOnInit(): void {
    this.store.dispatch(getFavoriteCities());
  }
}
