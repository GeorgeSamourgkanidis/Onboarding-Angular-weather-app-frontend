export interface WeatherState {
  selectedCity: string;
  favoriteCities: string[];
  yesterdayHourlyData: string[];
  lineChartLoading: boolean;
}

export const initialWeatherState: WeatherState = {
  selectedCity: null,
  favoriteCities: [],
  yesterdayHourlyData: [],
  lineChartLoading: true
};
