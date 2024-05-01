import { CurrentCityWeatherDetails, FavoriteCity } from '../models/weather';

export interface WeatherState {
  username: string;
  isLoggedIn: boolean;
  selectedCity: string;
  favoriteCitiesData: FavoriteCity[];
  yesterdayHourlyData: string[];
  lineChartLoading: boolean;
  currentCityWeatherDetails: CurrentCityWeatherDetails;
}

export const initialWeatherState: WeatherState = {
  username: null,
  isLoggedIn: false,
  selectedCity: null,
  favoriteCitiesData: [],
  yesterdayHourlyData: [],
  lineChartLoading: true,
  currentCityWeatherDetails: null
};
