export interface FavoriteCity {
  min: number;
  max: number;
  cityName: string;
  currentWeatherIcon: string;
}

export interface CurrentCityWeatherDetails {
  min: number;
  max: number;
  current: number;
  name: string;
  region: string;
  country: string;
  currentWeatherIcon: string;
}

export interface CityMaxTemps {
  yesterday: number;
  today: number;
  tomorrow: number;
}
export type maxTempDay = 'yesterday' | 'today' | 'tomorrow';
