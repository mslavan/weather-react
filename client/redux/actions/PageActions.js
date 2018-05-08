import cookies from 'browser-cookies';
import Weather from '../../modules/Weather'

const UPDATE_WEATHER_PARAMS = 'UPDATE_WEATHER_PARAMS',
      UPDATE_WEATHER_DATA = 'UPDATE_WEATHER_DATA'

export function updateWeatherConfig(location, locationCoords, frequencyUpdate, extendedMode){

  Weather.updateParams(location, locationCoords, frequencyUpdate, extendedMode);

  return {
    type: UPDATE_WEATHER_PARAMS ,
    location,
    locationCoords,
    frequencyUpdate,
    extendedMode,
  }

}

export function saveWeatherData(weather){

  /**
   * Save in cookies new weather data.
   * Field `updated` renew 
   * Expires can be as much as you want, it doesn`t matter
   */

  weather.updated = new Date()

  const expires = { expires: 9999 }

  cookies.set('weather-data', JSON.stringify(weather), expires)

  return {
    type: UPDATE_WEATHER_DATA ,
    weatherData: weather
  }

}
