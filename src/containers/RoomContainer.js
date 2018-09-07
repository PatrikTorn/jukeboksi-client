import React, { Component } from 'react';
import {Connect} from '../actions';
import {FontAwesome} from '../components';
import {arraysEqual} from '../tools/commonTools';
import './RoomContainer.css';
import './App.css';
class RoomContainer extends Component {
  componentDidMount(){
    // this.props.socket.emit('get rooms');
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
    this.props.socket.on('get rooms', (rooms) => {
      console.log(rooms);
      console.log('getting rooms', rooms);
      let room = localStorage.getItem('room');
      // const arr1 = this.props.app.rooms.map(r => r.connections);
      // const arr2 = rooms.map(r => r.connections);
      // if(arraysEqual(rooms.map(r => r.room), this.props.app.rooms.map(r => r.room))) {
      rooms.map(r => {
        if(room === r.room){
          this.joinRoom(room);
          localStorage.setItem('room', room);
        }
      });
      this.props.setAppState({rooms});
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
