import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import styled from 'styled-components'

import Header from '../components/Header'
import Background from '../components/Background'

import Home from './Home'
import Settings from './Settings'
import NotFound from './NotFound'

const Main = styled.div`
  margin: auto;
  text-align: center;
`


export default class App extends Component {
  
  render(){

    return( 
      <div>
        <Header/>
        <Background/>
        <Main>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/settings' component={Settings} />
            <Route path='/*' component={NotFound}/>
          </Switch>
        </Main>
      </div>
    )    
  }

}
