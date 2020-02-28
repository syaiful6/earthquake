import {MESSAGE_TO_WORKER} from './actions';
import {fetchQuakes, searchQuakes} from './apis';
import Supercluster from 'supercluster'
import registerPromiseWorker from 'promise-worker/register';

// contains eartquake index
let index;

function onmessage(data) {
  switch (data.type) {
  case MESSAGE_TO_WORKER['FETCH']:
    return fetchQuakes(3).then(geojson => {
      index = new Supercluster({
        radius: 60,
        extent: 256,
        maxZoom: 17
      }).load(geojson.features);
      return {ready: true}
    })
  case MESSAGE_TO_WORKER['SEARCH']:
    return searchQuakes(data.query).then(geojson => {
      index = new Supercluster({
        radius: 60,
        extent: 256,
        maxZoom: 17
      }).load(geojson.features);

      return {results: index.getClusters(data.bbox, data.zoom)}
    });

  case MESSAGE_TO_WORKER['ZOOM']:
    return {results: index.getClusters(data.bbox, data.zoom)};

  case MESSAGE_TO_WORKER['EXPANSION']:
    return {expansion: index.getClusterExpansionZoom(data.expansion), center: data.center};

  default:
    return {type: 'failed'}
  }
}
registerPromiseWorker(onmessage);
