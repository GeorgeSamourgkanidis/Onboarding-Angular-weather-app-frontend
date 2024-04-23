import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideConfig } from '../../app.config';

import { provideMockStore } from '@ngrx/store/testing';

describe('HeaderComponent', () => {
  let fixture: ComponentFixture<HeaderComponent>;
  const initialState = { isLoggedIn: true };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent, HttpClientTestingModule],
      providers: [
        SocialAuthService,
        provideMockStore({ initialState }),
        {
          provide: 'SocialAuthServiceConfig',
          useValue: provideConfig()
        }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();
  });

  it('should render Υπηρεσιες', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#offcanvasNavbarDropdown')?.textContent).toContain('Υπηρεσίες');
  });
});
