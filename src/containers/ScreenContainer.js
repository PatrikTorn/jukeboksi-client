import React, { Component } from 'react';
import {Connect} from '../actions';
import RoomContainer from './RoomContainer';
import PlaylistContainer from './PlaylistContainer';

class ScreenContainer extends Component {
  constructor(props){
    super(props);
    const socket = this.props.socket;
    socket.on('get room connections', (room, connections) => this.props.getRoomConnections(room, connections))
    socket.on('get room playlist', (room, playlist) => this.props.getRoomPlaylist(room, playlist))
    socket.on('get rooms', (rooms) => this.props.getRooms(rooms))
    socket.on('get playlist', (list) => this.props.getPlaylist(list))
    socket.on('get connections', (conns) => this.props.getConnections(conns))
  }
  render() {
    return !this.props.room.room ? <RoomContainer /> : <PlaylistContainer />
  }
}
export default Connect(ScreenContainer);
