import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import _ from 'lodash'

import weather_fons from '../../config/weather_fons'

const Body = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background: url(/weather/${props => props.image ? props.image : 'default.jpg' }) no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
`

const Background = ({ 
  weather,
}) => {
  
  /**
   * File .../config/weather_fons.js contain array of image as background.
   * Choose one of them, if not found load default image
   */

  let weatherBackground;

  if(weather.data && _.find(weather_fons, { type: weather.data.icon }) ) {
    let fons = _.find(weather_fons, { type: weather.data.icon }).images;
    weatherBackground = fons[_.random(0, fons.length-1)]
  }

  return (
    <Body image={weatherBackground}/>
  )
}


const mapStateToProps = ({ weather }) => ({
  weather,
});

export default connect(mapStateToProps, null)(Background);
