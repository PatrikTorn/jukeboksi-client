import React, { Component } from 'react';
import {Connect} from '../actions';
import {FontAwesome} from '../components';
import {arraysEqual} from '../tools/commonTools';
import './RoomContainer.css';
import './App.css';

class RoomContainer extends Component {
  constructor(props){
    super(props);
    this.props.socket.on('get room connections', (room, connections) => this.getRoomConnections(room, connections))
    this.props.socket.on('get room playlist', (room, playlist) => this.getRoomPlaylist(room, playlist))
    this.props.socket.on('get rooms', (rooms) => this.getRooms(rooms))
    this.i = 0;
  }
  componentDidMount(){
    let room = localStorage.getItem('room');
    this.props.app.rooms.map(r => {
      if(room === r.room){
        this.joinRoom(room);
      }else{
        //localStorage.removeItem('room');
      }
    })
  }

  state = {
    createRoomName:""
  }

  createRoom(){
    const name = this.state.createRoomName;
    if(name === ""){
      alert("Anna huoneelle nimi");
    }else if(this.props.app.rooms.map(r => r.room).includes(name)) {
      alert("Tämän niminen huone on jo olemassa");
    }else{
      this.props.setAppState({room:name, connections:['me'], playlist:[]});
      this.props.socket.emit('create room', name);
      // socket.createRoom(name);
    }
  }
  joinRoom(room){
    localStorage.setItem('room', room);
    this.props.setAppState({room});
    this.props.socket.emit('join room', room);
    // socket.joinRoom(room);
  }

  getRoomConnections(room, connections){
    console.log('getRoomConnections', {room, connections})
    const index = this.props.app.rooms.findIndex(r => r.room === room);
    if(index !== -1 && this.props.app.rooms[index].connections.length !== connections.length){
      this.props.setAppState({rooms:this.props.app.rooms.map(r => r.room === room ? {...r, connections} : r)});
    }
  }

  getRoomPlaylist(room, playlist){
    console.log('getRoomPlaylist', {room, playlist});
    const index = this.props.app.rooms.findIndex(r => r.room === room);
    if(index !== -1 && this.props.app.rooms[index].playlist.length !== playlist.length){
      this.props.setAppState({rooms:this.props.app.rooms.map(r => r.room === room ? {...r, playlist} : r)});
    }
  }

  getRooms(rooms){
    if(!this.props.app.room){
      let room = localStorage.getItem('room');
      rooms.map(r => {
        if(room === r.room){
          this.joinRoom(room);
          localStorage.setItem('room', room);
        }
      });
    }
    const roomsEquals = rooms.length === this.props.app.rooms.length;
    if(!arraysEqual(rooms.map(r => r.room), this.props.app.rooms.map(r => r.room))){
        this.props.setAppState({rooms});
    }
  }

  render() {
    const {rooms} = this.props.app;
    const {setAppState} = this.props;
    return (
      <div className="container">

        <div className="roomForm">
          <input
            className="songInput"
            value={this.state.createRoomName}
            placeholder='Luo huone'
            onChange={e => this.setState({createRoomName:e.target.value})}
          />
          <button onClick={() => this.createRoom()} className="confirmIcon">&#10004;</button>
        </div>
        <div className="songList">
          {(rooms || []).map(({room, connections, playlist}) => (
            <div className="songItem" onClick={() => this.joinRoom(room)} key={room}>
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
