import {connect} from 'react-redux';
import * as actions from '../actions';
import EarthquakesMap from './map';

const mapStateToProps = (state, ownProps) => {
  return {
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onInit: (map, markers) => dispatch(actions.iniMap(map, markers)),
    onMoveEnd: (bbox, zoom) => dispatch(actions.zoom(bbox, zoom)),
    onExpansion: (clusterid, center) => dispatch(actions.expansion(clusterid, center)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EarthquakesMap)
