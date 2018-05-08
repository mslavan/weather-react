import cookies from 'browser-cookies';

class Weather {

  static updateParams(location, locationCoords, frequency, extendedMode) {
    localStorage.setItem('W-location', location);
    localStorage.setItem('W-location-coords', JSON.stringify(locationCoords));
    localStorage.setItem('W-frequency', JSON.stringify(frequency));
    localStorage.setItem('W-extendedMode', JSON.stringify(extendedMode));
  }

  static getParams() {
   let params = {};

   params.location = localStorage.getItem('W-location') || null;
   params.locationCoords = JSON.parse(localStorage.getItem('W-location-coords') || null);
   params.frequencyUpdate = parseInt(localStorage.getItem('W-frequency') || 0);
   params.extendedMode = Boolean(localStorage.getItem('W-extendedMode') || true);

   return params;
  }

  static getData() {
   return JSON.parse(cookies.get('weather-data')) || null
  }

  static removeLocation() {
    localStorage.removeItem('location');
  }

  static isEmptyData() {
    return cookies.get('weather-data') ? false : true;
  }

  

}

export default Weather;
