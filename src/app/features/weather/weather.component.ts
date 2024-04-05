import { Component } from '@angular/core';
import { LeftSidePanelComponent } from '../left-side-panel/left-side-panel.component';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [LeftSidePanelComponent],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss'
})
export class WeatherComponent {

}
