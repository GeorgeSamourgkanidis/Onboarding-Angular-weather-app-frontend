export interface WeatherState {
  selectedCity: string;
  favoriteCities: string[];
  currentData: string;
}

export const initialWeatherState: WeatherState = {
  selectedCity: null,
  favoriteCities: ['Thessaloniki', 'Athens'],
  currentData: null
};
