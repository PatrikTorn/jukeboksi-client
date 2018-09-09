import React, { Component } from 'react';
import {Connect} from '../actions';
import './App.css';
import './HeaderStyles.css';
import {getEventCoords} from '../tools/commonTools';
import {SortableList, GridList, FontAwesome} from '../components';
import RoomContainer from './RoomContainer';
import VideoContainer from './VideoContainer';

class PlaylistContainer extends Component {

  addSong({snippet, id}){
    const songDetails = {
      id:id.videoId,
      title:snippet.title,
      image:snippet.thumbnails.medium.url,
      added:new Date(),
      room:this.props.room.room
    }
    this.props.addSong(songDetails);
  }

  onSwipeDelete(event, details){
    const {x,y} = getEventCoords(event);
    const xDiff = Math.abs(this.state.sortStart.x - x);
    const yDiff = Math.abs(this.state.sortStart.y - y);
    if(xDiff > 100 && yDiff < 20)
      this.props.deleteSong(this.props.app.playlist[details.oldIndex].id);
  }


  render() {
    const {connections, playlist, song, showSearch, search} = this.props.app;
    const {room} = this.props.room;
    const displaySearch = showSearch || search !== "";
    return (
      <div className="App">
        {displaySearch ?  <div className="closeIcon" onClick={() => this.props.hideSearch()}><FontAwesome icon="times" /></div>
        : <div className="leaveIcon" onClick={() =>  this.props.exitRoom()}><FontAwesome icon="arrow-left" /> <span className="roomTitle">{room}</span> </div>
        }
        <div className="peopleIcon"><FontAwesome icon="users" /> {connections.length}</div>
        <input
          type="text"
          value={search}
          onChange={(e) => this.props.searchSong(e.target.value)}
          placeholder="Etsi biisi"
          className="songInput"
        />
          <div style={{display:displaySearch ? 'none' : 'block'}}>
            <SortableList
              pushBottom={this.props.video.fullScreen}
              pressDelay={150}
              songs={playlist}
              onSortEnd={(details, event) => {this.props.sortPlaylist(details); this.onSwipeDelete(event, details);}}
              onDelete={(id) => this.props.deleteSong(id)}
              onSortStart={(details, event) => this.setState({sortStart:getEventCoords(event)})}
              searchRelatedVideos={(id) => this.props.searchRelatedVideos(id)}
             />

            {playlist.length > 0 && <VideoContainer/>}
          </div>
          {displaySearch  && <GridList songs={song} onClick={(props) => this.addSong(props)}/>}
      </div>
    );
  }
}
export default Connect(PlaylistContainer);
