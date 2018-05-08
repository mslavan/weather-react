import React from 'react';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'

const Header = ({
  weather, 
}) => {
  
  console.log(weather)

  return (
    <Toolbar>
      <ToolbarGroup firstChild={true}>
        <ToolbarTitle 
          text={
            <span>Current location: <Link to='/settings'>{weather.location}</Link></span>
          } 
          style={{ marginLeft: 15 }}/>
      </ToolbarGroup>
      <ToolbarGroup>
        <RaisedButton 
          primary
          label="Weather"
          containerElement={<Link to='/' />} />
        <ToolbarSeparator />
        <FlatButton
          default
          label="Settings"
          containerElement={<Link to='/settings' />} />
      </ToolbarGroup>
    </Toolbar>
  )
}


const mapStateToProps = ({ weather }) => ({
  weather,
});

export default connect(mapStateToProps, null)(Header);
