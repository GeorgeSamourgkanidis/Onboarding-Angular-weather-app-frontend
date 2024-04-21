import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Route } from '../../models/routes';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectIsLoggedIn } from '../../store/weather.selector';
import { AsyncPipe } from '@angular/common';
import { setIsLoggedIn } from '../../store/weather.actions';
import { SocialAuthService } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, NgbModule, AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
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
  isLoggedIn$: Observable<boolean>;
  private store = inject(Store);

  constructor(
    private router: Router,
    private socialAuthService: SocialAuthService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.store.select(selectIsLoggedIn);
  }

  navigateTo(link: string) {
    this.router.navigateByUrl(link);
    window.scrollTo(0, 0);
  }

  logoClicked() {
    // since there is no homepage it will redirect to /weathers
    this.router.navigate(['']);
  }

  logout() {
    this.socialAuthService.signOut();
    sessionStorage.removeItem('authToken');
    this.store.dispatch(setIsLoggedIn({ isLoggedIn: false }));
  }

  login() {
    this.router.navigate(['/login']);
  }
}
