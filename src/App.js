import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import {connect} from 'react-redux'
import { render } from '@testing-library/react';
import EventBoard from './components/Event/EventBoard'
import Layout from './hoc/Layout/Layout'
import Aux from './hoc/Auxiliary/Auxiliary'
import Logout from './containers/Auth/Logout/Logout'
import Auth from './containers/Auth/Auth'
import Ads from './containers/Ads/Ads'
import MyEvents from './components/Event/MyEvents'


class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route path="/ads" component={Ads}/>
        <Route path="/auth" component={Auth}/>
        <Redirect to="/ads" />
      </Switch>
    )
    {if(this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/ads" component={Ads}/>
          <Route path="/logout" component={Logout}/>
          <Route path="/myEvents" component={MyEvents}></Route>
          <Route path="/Event/:id" component={EventBoard}></Route>
          <Redirect to="/ads" />
        </Switch>
      )
    }}
    console.log('uzytkownik: ' + this.props.isAuthenticated)
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
