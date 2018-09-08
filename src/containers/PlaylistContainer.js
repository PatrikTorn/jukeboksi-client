import React, { Component } from 'react';
import {Connect} from '../actions';
import './App.css';
import './HeaderStyles.css';
import { arrayMove} from 'react-sortable-hoc';
import {arraysEqual, getEventCoords} from '../tools/commonTools';
import {SortableList, GridList, FontAwesome} from '../components';
import RoomContainer from './RoomContainer';
import VideoContainer from './VideoContainer';

class PlaylistContainer extends Component {
  constructor(props){
    super(props);
    this.props.socket.on('get playlist', (list) => this.getPlaylist(list))
    this.props.socket.on('get connections', (conns) => this.getConnections(conns))
  }
  state = {
    search:null
  }

  onSortEnd = ({oldIndex, newIndex}) => {
    this.props.setAppState({
      playlist: arrayMove(this.props.app.playlist, oldIndex, newIndex)
    });
    this.props.socket.emit('sort songs', this.props.app.playlist);
  };

  addToPlaylist({snippet, id}){
    this.props.setAppState({showSearch:false});
    this.setState({search:""});
    const room = this.props.app.room;
    const songDetails = {
      id:id.videoId,
      title:snippet.title,
      image:snippet.thumbnails.medium.url,
      added:new Date(),
      room:this.props.app.room
    }
    this.props.socket.emit('add song', songDetails)
  }

  deleteFromPlaylist(id){
    this.props.socket.emit('delete song', id);
  }

  onSwipeDelete(event, details){
    const {x,y} = getEventCoords(event);
    const xDiff = Math.abs(this.state.sortStart.x - x);
    const yDiff = Math.abs(this.state.sortStart.y - y);
    if(xDiff > 100 && yDiff < 20)
      this.deleteFromPlaylist(this.props.app.playlist[details.oldIndex].id);
  }

searchSong(name){
  const {app:{showSearch}, setAppState} = this.props;
  this.props.searchSong(name);
  if(name === ""){
    setAppState({showSearch:false})
  }else{
    if(!showSearch){
       setAppState({showSearch:true});
    }
  }
  this.setState({search:name});
}

exitRoom(){
   localStorage.removeItem('room');
   this.props.socket.emit('exit room', this.props.app.room)
   this.props.setAppState({room:null, playlist:[]});
}

getPlaylist(list){
  console.log('getting playlist', {arr1, arr2});
  const arr1 = list.map(pl => pl.id);
  const arr2 = this.props.app.playlist.map(pl => pl.id);
  if(!arraysEqual(arr1, arr2)){
    this.props.updatePlaylist(list);
  }
}

getConnections(conns){
  if(conns.length !== this.props.app.connections.length){
      this.props.setAppState({connections:conns})
  }
}

  render() {
    const {connections, playlist, song, showSearch, rooms} = this.props.app;
    const {setAppState} = this.props;
    const {search} = this.state;
    return (
      <div className="App">
        {showSearch ?  <div className="closeIcon" onClick={() => {setAppState({showSearch:false}); this.setState({search:""})}}><FontAwesome icon="times" /></div>
        : <div className="leaveIcon" onClick={() =>  this.exitRoom()}><FontAwesome icon="arrow-left" /> <span className="roomTitle">{this.props.app.room}</span> </div>
        }
        <div className="peopleIcon"><FontAwesome icon="users" /> {connections.length}</div>
        <input
          type="text"
          value={search}
          onChange={(e) => this.searchSong(e.target.value)}
          placeholder="Etsi biisi"
          className="songInput"
        />
          <div style={{display:showSearch ? 'none' : 'block'}}>
            <SortableList
              pressDelay={150}
              songs={playlist}
              onSortEnd={(details, event) => {this.onSortEnd(details); this.onSwipeDelete(event, details);}}
              onDelete={(id) => this.deleteFromPlaylist(id)}
              onSortStart={(details, event) => this.setState({sortStart:getEventCoords(event)})}
              searchRelatedVideos={(id) => this.props.searchRelatedVideos(id)}
             />

            {playlist.length > 0 && <VideoContainer onEnd={(id) => this.deleteFromPlaylist(id)} />}
          </div>
          {showSearch && <GridList songs={song} onClick={(props) => this.addToPlaylist(props)}/>}
      </div>
    );
  }
}
export default Connect(PlaylistContainer);
