export interface WeatherState {
  selectedCity: string;
  favoriteCities: string[];
  yesterdayHourlyData: string[];
  lineChartLoading: boolean;
}

export const initialWeatherState: WeatherState = {
  selectedCity: null,
  favoriteCities: ['Thessaloniki', 'Athens'],
  yesterdayHourlyData: [],
  lineChartLoading: true
};
