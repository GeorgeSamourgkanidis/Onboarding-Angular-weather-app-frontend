export interface WeatherState {
  favoriteCities: string[];
  currentData: string;
}

export const initialWeatherState: WeatherState = {
  favoriteCities: ['Thessaloniki', 'Athens'],
  currentData: null
};
