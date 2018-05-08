import React from 'react'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper';
import styled from 'styled-components'
import moment from 'moment'

import Page from './Page'

const Time = styled.div`
  margin-bottom: 15px;
  font-size: 22px;
`
const HourMinute = styled.p`
  margin: 0px;
  font-size: 75px;
`

const Temperature = styled.span`
  margin: 15px 5px;
  font-size: 45px;
`
const Degree = styled.span`
  font-size: 40px;
`

const TemperatureComment = styled.span`
  padding: 10px;
  font-size: 18px;
`
const Updated = styled.span`
  float: right;
  margin-top: -30px;
  font-size: 18px;
`

const DoubleColumn = styled.ul`
  -moz-column-count: 2;
  -moz-column-gap: 0px;
  -moz-column-fill: auto;
  -webkit-column-count: 2;
  -webkit-column-gap: 0px;
  -webkit-column-fill: auto;
  column-count: 2;
  column-gap: 0px;
  column-fill: auto;
  list-style-position: inside;
  list-style-type: none;
`

const propTypes = {
  extended: PropTypes.bool.isRequired,
  date: PropTypes.object.isRequired,
  weather: PropTypes.object.isRequired,
}

function WeatherWidget ({
 extended,
 date,
 weather
}) {

  if(!weather.data) return null;
  
  const temperature = parseInt((weather.data.temperature - 32 )*5/9)
  const apparentTemperature = parseInt((weather.data.apparentTemperature - 32 )*5/9)
  
  return (
    <Page title={weather.location}>
      <Time>
        <HourMinute>{moment(date).format('hh:mm')}</HourMinute>
        <span>{moment(date).format('ddd, DD MMM')}</span>
      </Time>
      <Temperature>
        {temperature}<Degree>℃</Degree>
      </Temperature>  
      <TemperatureComment>
        {weather.data.summary}.
        Feels like: {apparentTemperature}℃
      </TemperatureComment>

      <Updated>
        Updated: {moment(weather.data.updated).format('hh:mm')}
      </Updated>
      
      {extended && 
        <div>
          <hr/>
          <DoubleColumn>
           <li><b>Cloud cover:</b> {weather.data.cloudCover}%</li>
           <li><b>Wind:</b> {weather.data.windSpeed}nph</li>
           <li><b>Pressure:</b> {weather.data.pressure}mb</li>
           <li><b>Humidity:</b> {weather.data.humidity*100}%</li>   
          </DoubleColumn>
        </div>}
      </Page>
  )
}

WeatherWidget.PropTypes = propTypes

export default WeatherWidget
