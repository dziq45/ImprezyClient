import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'

import LoginForm from './components/LoginForm'
import { render } from '@testing-library/react';
import Layout from './hoc/Layout/Layout'
import Aux from './hoc/Auxiliary/Auxiliary'
import Event from './components/Event/Event'

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

export default App;
