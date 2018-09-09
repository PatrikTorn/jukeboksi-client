import React, { Component } from 'react';
import {Connect} from '../actions';
import {FontAwesome} from '../components';
import {arraysEqual} from '../tools/commonTools';
import './RoomContainer.css';
import './App.css';

class RoomContainer extends Component {
  state = {
    createRoomName: ""
  }

  componentDidMount(){
    let room = localStorage.getItem('room');
    console.log('this room', room);
    console.log(this.props.room.rooms);
    this.props.room.rooms.map(r => {
      if(room === r.room){
        this.props.joinRoom(room);
      }
    })
  }

  render() {
    const {rooms} = this.props.room;
    const {createRoomName} = this.state;
    // const {setAppState} = this.props;
    return (
      <div className="container">

        <div className="roomForm">
          <input
            className="songInput"
            value={this.state.createRoomName}
            placeholder='Luo huone'
            onChange={e => this.setState({createRoomName:e.target.value})}
          />
          <button
            onClick={() => this.props.createRoom(createRoomName).catch(e => alert(e))}
            className="confirmIcon">
            &#10004;
          </button>
        </div>
        <div className="songList">
          {(rooms || []).map(({room, connections, playlist}) => (
            <div className="songItem" onClick={() => this.props.joinRoom(room)} key={room}>
              <div style={{float:'left'}}><FontAwesome icon='list'/> {playlist.length}</div>
              {room}
              <div style={{float:'right'}}><FontAwesome icon='users'/> {connections.length}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
export default Connect(RoomContainer);
