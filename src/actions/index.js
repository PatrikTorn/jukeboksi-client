import * as appActions from './appActions';
import * as roomActions from './roomActions';
import * as videoActions from './videoActions';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

export const mapDispatchToProps = (dispatch) => (
  bindActionCreators({
    ...appActions,
    ...roomActions,
    ...videoActions
  }, dispatch
));

export const mapStateToProps = (state, props) => state
export const Connect = connect(mapStateToProps, mapDispatchToProps);
