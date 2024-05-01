import { APP_INITIALIZER, ApplicationConfig, inject, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { WeatherEffects } from './store/weather.effects';
import { weatherReducer } from './store/weather.reducer';
import { AuthInterceptor } from './services/auth.interceptor';
import { SocialAuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider } from '@abacritt/angularx-social-login';
import { environment } from '../environments/environment';
import { InitializerService } from './services/initializer.service';

const socialAuthServiceConfig = {
  autoLogin: false,
  providers: [
    {
      id: GoogleLoginProvider.PROVIDER_ID,
      provider: new GoogleLoginProvider(environment.googleClientId, {
        oneTapEnabled: false
      })
    },
    {
      id: FacebookLoginProvider.PROVIDER_ID,
      provider: new FacebookLoginProvider(environment.facebookClientId, {
        oneTapEnabled: false
      })
    }
  ],
  onError: err => {
    console.error(err);
  }
} as SocialAuthServiceConfig;

export function provideConfig() {
  return socialAuthServiceConfig;
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([AuthInterceptor])),
    provideStore({ weather: weatherReducer }),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideEffects([WeatherEffects]),
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: () => {
        const initializerService = inject(InitializerService);
        return () => initializerService.checkIfAuthorized();
      }
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: provideConfig()
    }
  ]
};
