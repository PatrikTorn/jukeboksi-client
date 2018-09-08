import React, { Component } from 'react';
import {Connect} from '../actions';
import {FontAwesome} from '../components';
import {arraysEqual} from '../tools/commonTools';
import './RoomContainer.css';
import './App.css';
class RoomContainer extends Component {
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
    }
  }
  joinRoom(room){
    localStorage.setItem('room', room);
    this.props.setAppState({room});
    this.props.socket.emit('join room', room);
  }

  render() {

    this.props.socket.on('get room connections', (room, connections) => {
      console.log('get room connections');
      console.log(room);
      console.log(connections);
      const index = this.props.app.rooms.findIndex(r => r.room === room);
      if(index !== -1 && this.props.app.rooms[index].connections.length !== connections.length){
        this.props.setAppState({rooms:this.props.app.rooms.map(r => r.room === room ? {...r, connections} : r)});
      }
    });

    this.props.socket.on('get room playlist', (room, playlist) => {
      console.log('get room playlist');
      console.log(room);
      console.log(playlist);
      const index = this.props.app.rooms.findIndex(r => r.room === room);
      if(index !== -1 && this.props.app.rooms[index].playlist.length !== playlist.length){
        this.props.setAppState({rooms:this.props.app.rooms.map(r => r.room === room ? {...r, playlist} : r)});
      }
    });

    this.props.socket.on('get rooms', (rooms) => {
      console.log(rooms);
      console.log('getting rooms', rooms);
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
      if(!arraysEqual(rooms.map(r => r.room), this.props.app.rooms.map(r => r.room))) {
        // const connectionsEquals = rooms.map(r => r.connections.length !== this.props.app.rooms.find(ro => ro.room === r.room).connections.length).has(true);
        // if(!connectionsEquals)
          this.props.setAppState({rooms});
      }
      // }
    });

    // this.props.socket.on('join room', (room) => {
    //   console.log('joining room', room);
    //
    //   if(room !== this.props.app.room){
    //     localStorage.setItem('room', room);
    //     this.props.setAppState({room});
    //   }
    // });

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
