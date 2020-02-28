import {connect} from 'react-redux';

import {EarthQuakeFilter} from './filter-eartquake';
import * as actions from '../actions';

const mapStateToProps = (state, ownProps) => {
  return state.filters;
}

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: () => {
      dispatch(actions.search)
    },
    onMaxDateChange: (date) => {
      dispatch(actions.setFilter('maxdate', date))
    },
    onMinDateChange: (date) => {
      dispatch(actions.setFilter('mindate', date))
    },
    onMagnitudeChange: (magnitude) => {
      dispatch(actions.setFilter('magnitude', magnitude))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EarthQuakeFilter)
