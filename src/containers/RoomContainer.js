import React, { Component } from 'react';
import {Connect} from '../actions';
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
    joinRoomName:"",
    createRoomName:""
  }

  createRoom(){
    const name = this.state.createRoomName;
    if(name === ""){
      alert("Anna huoneelle nimi");
    }else if(this.props.app.rooms.map(r => r.room).includes(name)) {
      alert("Tämän niminen huone on jo olemassa");
    }else{
      this.props.setAppState({room:name});
      this.props.socket.emit('create room', name);
    }
  }
  joinRoom(room){
    this.props.socket.emit('join room', room);
    this.props.setAppState({room});
    localStorage.setItem('room', room);
  }

  render() {
    this.props.socket.on('get rooms', (rooms) => {
      console.log('getting rooms', rooms);
      let room = localStorage.getItem('room');
      rooms.map(r => {
        if(room === r.room){
          this.props.socket.emit('join room', room);
        }else{
          localStorage.getItem('room') && localStorage.removeItem('room');
        }
      });
      this.props.setAppState({rooms});
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
          {(rooms || []).map(({room}) => (
            <div className="songItem" onClick={() => this.joinRoom(room)} key={room}>{room}</div>
          ))}
        </div>
      </div>
    );
  }
}
export default Connect(RoomContainer);
