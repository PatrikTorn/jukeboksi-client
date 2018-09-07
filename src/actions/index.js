import * as appActions from './appActions';

import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

export const mapDispatchToProps = (dispatch) => (
  bindActionCreators({
    ...appActions
  }, dispatch
));

export const mapStateToProps = (state, props) => state
export const Connect = connect(mapStateToProps, mapDispatchToProps);
