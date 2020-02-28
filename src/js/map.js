import React from 'react';
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux'

import EarthquakesMap from './components/map-container';
import EarthQuakeFilter from './components/filter-eartquake-container';
import {reducer} from './reducer';
import * as actions from './actions';
import {getBboxZoom} from './utils';

import "react-datepicker/dist/react-datepicker.css";
import '../scss/app.scss';

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore)

export function configureStore(initialState) {
  const store = createStoreWithMiddleware(reducer, initialState)

  return store
}

const store = configureStore()
store.dispatch(actions.fetch)
let initialized = false;

let unsubscribe = store.subscribe(() => {
  if (initialized) return;
  const state = store.getState();
  if (state.ready && state.map) {
    const params = getBboxZoom(state.map);
    const bounds = state.map.getBounds();
    store.dispatch(actions.zoom(
      params.bbox,
      params.zoom
     )
    );
    unsubscribe();
  }
})

function App() {
  return (
    <div className="application">
      <EarthQuakeFilter />
      <EarthquakesMap />
    </div>
  )
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
