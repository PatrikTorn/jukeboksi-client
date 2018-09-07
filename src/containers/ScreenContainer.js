import React, { Component } from 'react';
import {Connect} from '../actions';
import RoomContainer from './RoomContainer';
import PlaylistContainer from './PlaylistContainer';

class ScreenContainer extends Component {

  render() {
    return !this.props.app.room ? <RoomContainer /> : <PlaylistContainer />
  }
}
export default Connect(ScreenContainer);
