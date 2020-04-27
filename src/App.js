import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import {connect} from 'react-redux'

import { render } from '@testing-library/react';

import LoginForm from './components/LoginForm'
import Layout from './hoc/Layout/Layout'
import Aux from './hoc/Auxiliary/Auxiliary'

import Auth from './containers/Auth/Auth'
import Ads from './containers/Ads/Ads'



class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route path="/ads" component={Ads}/>
        <Route path="/auth" component={Auth}/>
      </Switch>
    )
    return (
      
      <div>
        {this.props.isAuthenticated? "siema" : "nie siema"}
        <Layout>
          {routes}
        </Layout>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    userType: state.auth.userType
  }
}

export default withRouter(connect(mapStateToProps)(App));
