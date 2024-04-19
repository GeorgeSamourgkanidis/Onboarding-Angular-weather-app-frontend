export interface WeatherState {
  username: string;
  isLoggedIn: boolean;
  selectedCity: string;
  favoriteCities: string[];
  yesterdayHourlyData: string[];
  lineChartLoading: boolean;
}

export const initialWeatherState: WeatherState = {
  username: null,
  isLoggedIn: false,
  selectedCity: null,
  favoriteCities: [],
  yesterdayHourlyData: [],
  lineChartLoading: true
};
