import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import './assets/main.css'
import App from './App';
import authReducer from './store/reducers/auth'
import { BrowserRouter } from 'react-router-dom';

import './index.css'

const rootReducer = combineReducers({
  auth: authReducer
})

const logger = store => {
  return next => {
      return action => {
          console.log('[Middleware] Dispatching', action)
          const result = next(action)
          console.log('[Middleware] next state', store.getState())
          return result
      }
  }
}

const store = createStore(rootReducer, applyMiddleware(logger, thunk))

const app = (
  <Provider store = {store}>
      <BrowserRouter>
          <App/>
      </BrowserRouter>
  </Provider>
)
ReactDOM.render(
  app,
  document.getElementById('root')
);
