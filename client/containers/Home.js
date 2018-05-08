import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom'
import * as pageActions from '../redux/actions/PageActions'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import moment from 'moment'

import WeatherWidget from '../components/WeatherWidget'
import Weather from '../modules/Weather'


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: new Date(),
      dataLoaded: false,
    };
  }

  componentWillMount() {
    if(Weather.isEmptyData()) {
     this.updateWeather();
    } 
    else {
     const frequencyUpdate = Weather.getParams().frequencyUpdate,
           lastUpdated = moment(Weather.getData().updated),
           now = moment(new Date())

     // if weather is not actual do update
     if(now.diff(lastUpdated, 'seconds') > frequencyUpdate) 
      return this.updateWeather()
    }
  }

  componentDidMount() {
    this.clockID = setInterval( () => this.tick(), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.clockID);
  }

  tick() {
    this.setState({
      currentDate: new Date()
    });
  }

  updateWeather() {
    fetch(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/dd0113d437968850961e2ac1d005abfe/${this.props.weather.locationCoords.lat},${this.props.weather.locationCoords.lng}`)
      .then( res => res.json())
      .then( weatherObj => {

        this.props.pageActions.saveWeatherData(weatherObj.currently)
      })     
  }

	render() {
    const { currentDate } = this.state;
    const { weather } = this.props;

	  return (
			<WeatherWidget
        extended={weather.extendedMode}
        date={currentDate}
        weather={weather} />
		)
	}
}


const mapDispatchToProps = (dispatch) => {
  return {
    pageActions: bindActionCreators(pageActions, dispatch),
  }
}

const mapStateToProps = ({ weather }) => ({
  weather,
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);