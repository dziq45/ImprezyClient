import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import { render } from '@testing-library/react';
import Layout from './hoc/Layout/Layout'
import Aux from './hoc/Auxiliary/Auxiliary'
import Event from './components/Event/Event'
import {connect} from 'react-redux'
class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route path="/event" component={Event}/>
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
