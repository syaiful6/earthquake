import {MESSAGE_TO_WORKER} from './worker/actions';
import PromiseWorker from 'promise-worker';

import {getBboxZoom} from './utils';

export const INIT_MAP = 1;
export const SEARCH_RESULTS = 2;
export const ZOOM = 3;
export const EXPANSION = 4;
export const READY = 5;
export const SET_FILTER = 6;

const worker = new PromiseWorker(new Worker('./assets/worker.js'));

export function iniMap(map, markers) {
  return {
    type: INIT_MAP,
    map,
    markers
  }
}


export function setFilter(field, value) {
  return {
    type: SET_FILTER,
    field,
    value,
  }
}

export function search(dispatch, getState) {
  const {map, ready, filters} = getState();
  if (!ready) return;
  const params = getBboxZoom(map)
  return worker.postMessage({
    ...params,
    query: {
      magnitude: filters.magnitude,
      mindate: filters.mindate.toDateString(),
      maxdate: filters.maxdate.toDateString(),
    },
    type: MESSAGE_TO_WORKER['SEARCH'],
  }).then(results => {
    dispatch({type: SEARCH_RESULTS, results: {type: 'FeatureCollection', features: results.results} })
  })
}

export function fetch(dispatch, state) {
  return worker.postMessage({type: MESSAGE_TO_WORKER['FETCH']}).then(results => {
    dispatch({type: READY })
  })
}

export function zoom(bbox, zoom) {
  return (dispatch, getState) => {
    const {ready} = getState();
    if (!ready) return;
    return worker.postMessage({
      type: MESSAGE_TO_WORKER['ZOOM'],
      bbox,
      zoom
    }).then(results => {
      dispatch({type: ZOOM, results: {type: 'FeatureCollection', features: results.results} })
    })
  }
}

export function expansion(expansion, center) {
  return (dispatch, getState) => {
    const {ready} = getState();
    if (!ready) return;
    return worker.postMessage({
      type: MESSAGE_TO_WORKER['EXPANSION'],
      expansion,
      center,
    }).then(results => {
      dispatch({...results, type: EXPANSION})
    })
  }
}
