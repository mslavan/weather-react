
import { combineReducers } from 'redux'
import weather from './weather'

const quotesApp = combineReducers({
    weather,
});

export default quotesApp