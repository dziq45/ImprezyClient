import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import {connect} from 'react-redux'

import { render } from '@testing-library/react';

import LoginForm from './components/LoginForm'
import Layout from './hoc/Layout/Layout'
import Aux from './hoc/Auxiliary/Auxiliary'
import Event from './components/Event/Event'
import Auth from './containers/Auth/Auth'



class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route path="/event" component={Event}/>
        <Route path="/auth" component={Auth}/>
      </Switch>
    )
    return (
      <div>
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
