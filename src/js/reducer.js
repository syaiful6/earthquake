import * as actions from './actions';

let currentDay = new Date();
let previousMonth = new Date();
previousMonth.setMonth(previousMonth.getMonth() - 1)

export function reducer(state={
  ready: false,
  map: null,
  marker: null,
  filters: {
    magnitude: '3',
    mindate: previousMonth,
    maxdate: currentDay,
  }
}, action) {
  switch (action.type) {
  case actions.INIT_MAP:
    return {...state, map: action.map, markers: action.markers}

  case actions.SET_FILTER:
    return {...state, filters: {...state.filters, [action.field]: action.value}}

  case actions.READY:
    return {...state, ready: true}
  case actions.SEARCH_RESULTS:
  case actions.ZOOM:
    state.markers.clearLayers();
    state.markers.addData(action.results);
    return state;

  case actions.EXPANSION:
    state.map.flyTo(action.center, action.expansion);
    return state

  default:
    return state;
  }
}
