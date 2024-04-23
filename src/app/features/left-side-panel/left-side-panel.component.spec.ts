import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LeftSidePanelComponent } from './left-side-panel.component';
import { WeatherService } from '../../services/weather.service';
import { provideStore } from '@ngrx/store';
import { weatherReducer } from '../../store/weather.reducer';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('LeftSidePanelComponent', () => {
  let component: LeftSidePanelComponent;
  let fixture: ComponentFixture<LeftSidePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeftSidePanelComponent, HttpClientTestingModule, BrowserAnimationsModule],
      providers: [WeatherService, provideStore({ weather: weatherReducer })]
    }).compileComponents();

    fixture = TestBed.createComponent(LeftSidePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('#clearSearch() should set #searchInput to ""', () => {
    const input = fixture.debugElement.query(By.css('#searchInput')).nativeElement;
    input.value = 'someValue';
    input.dispatchEvent(new Event('input'));
    expect(component.searchInput).toBe('someValue');
    component.clearSearch();
    expect(component.searchInput).toBe('');
  });
});
