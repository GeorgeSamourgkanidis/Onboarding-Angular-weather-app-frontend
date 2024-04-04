import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Route } from '../../models/routes';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, NgbModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  services: Route[] = [
    {
      label: 'Dummy 1',
      link: '#'
    },
    {
      label: 'Dummy 2',
      link: '#'
    },
    {
      label: 'Dummy 3',
      link: '#'
    }
  ];

  constructor(private router: Router) {}

  navigateTo(link: string) {
    this.router.navigateByUrl(link);
    window.scrollTo(0, 0);
  }
}
