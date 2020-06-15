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
import PublicEvent from './components/PublicEvent/PublicEvent'
import Messages from './components/Messages/Messages';
import ChangePassword from './containers/Auth/ChangePassword/ChangePassword';

class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route path="/ads" component={Ads}/>
        <Route path="/auth" component={Auth}/>
        <Route path="/logout" component={Logout}/>
        <Route path="/myEvents" component={MyEvents}></Route>
        <Route path="/Event/:id" component={EventBoard}></Route>
        <Route path="/PublicEvent/:eventId" component={PublicEvent}/>
        <Route path="/msg" component={Messages}/>
        <Route path="/changePassword" component = {ChangePassword}/>
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
