import Weather from '../../modules/Weather'

const weatherParams = Weather.getParams()
const weatherData = Weather.getData()

const initialState = {
  location: weatherParams.location,
  locationCoords: weatherParams.locationCoords,
  frequencyUpdate: weatherParams.frequencyUpdate,
  extendedMode: weatherParams.extendedMode,
  data: weatherData
}

export default function weather(state = initialState , action ) {
  switch (action.type) {
    
    case 'UPDATE_WEATHER_PARAMS': 
        return { 
          ...state, 
          location: action.location, 
          locationCoords: action.locationCoords,
          frequencyUpdate: action.frequencyUpdate, 
          extendedMode: action.extendedMode 
        };    

    case 'UPDATE_WEATHER_DATA': 
        return { 
          ...state, 
          data: action.weatherData 
        };

    default:
    return state;
  }

  return state
}