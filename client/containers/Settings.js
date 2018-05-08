import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Col, Row, Container, ScreenClassRender, Visible, Hidden} from 'react-grid-system';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MuiGeoSuggest from 'material-ui-geosuggest';
import Toggle from 'material-ui/Toggle';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import styled from 'styled-components'
import { bindActionCreators } from 'redux';
import * as pageActions from '../redux/actions/PageActions'
import { connect } from 'react-redux'

import Page from '../components/Page'
import Weather from '../modules/Weather'
import update_frequency from '../../config/update_frequency.js'


const Section = styled.div`
  line-height: 50px;
  font-weight: 700;
`

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: this.props.weather.location,
      locationCoords: this.props.weather.locationCoords,
      extendedMode: this.props.weather.extendedMode,
      update: this.props.weather.frequencyUpdate
    };
  }

  handleChange = (event, index, value) => this.setState({value})

  handleLocationChange = (place) => {

    let location = place.name,
        locationCoords = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        }

    console.log(place)
    this.setState({ location, locationCoords })
  }

  saveChanges = () => {
    const { 
      location,
      locationCoords,
      extendedMode,
      update
    } = this.state;

    if(location) {
      this.props.pageActions.updateWeatherConfig(location, locationCoords, update, extendedMode)

      this.props.history.push('/')

    }
  }

  render() {

    const { 
      location,
      extendedMode,
      update
    } = this.state;    

    return (
      <Page title='Settings'>
        <Row>
          <Col xs={6}>
          	<Section>Location:</Section>
          </Col>
          <Col xs={6}>
            <MuiThemeProvider>
              <MuiGeoSuggest 
              	options={{
                    types: ['(cities)'],
              	}}
                defaultValue={location}
                onPlaceChange={this.handleLocationChange}
                hintText='Enter city'
              >
              </MuiGeoSuggest>
            </MuiThemeProvider>      		
          </Col>
      	</Row>
        <Row>
          <Col xs={6}>
            <Section>Update frequency:</Section>
          </Col>
          <Col xs={6}>
            <SelectField 
              value={update}
              onChange={(e,i,value) => this.setState({ update: value })}
            >
              {update_frequency.map(time =>
                <MenuItem value={time.value} primaryText={time.label}/>
              )}
            </SelectField>         
          </Col>
        </Row>
        <Row>
          <Col>
            <Toggle
              fullWidth
              label={extendedMode ? 'Extended mode' : 'Simple mode'}
              labelStyle={{ fontWeight: 700 }}
              defaultToggled={extendedMode}
              onToggle={(e, value) => this.setState({ extendedMode: value })}
            />
          </Col>
        </Row>
        <Row>
        	<Col>
              <RaisedButton
                fullWidth
                primary
                label='Save'
                onClick={this.saveChanges}
                style={{ marginTop: 25, marginBottom: 10 }}/>
        	</Col>
        </Row>
      </Page>
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

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
