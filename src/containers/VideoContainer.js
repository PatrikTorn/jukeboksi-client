import React, { Component } from 'react';
import {Connect} from '../actions';
import YouTube from 'react-youtube';
import './VideoStyles.css';
import CircularSlider from 'react-circular-slider-bar';
import Roundy from 'roundy';
import {VolumeSlider, FontAwesome} from '../components';



class VideoContainer extends Component {
  state = {
    playVideo:true,
    volume:50,
    fullScreen:false
  }

toggleMusic(){
  if(this.state.playVideo){
    this.youtube.pauseVideo();
    this.youtube.setVolume(0);
  }else{
    this.youtube.playVideo();
    this.youtube.setVolume(this.state.volume);
  }
    this.setState({playVideo:!this.state.playVideo});
}

setVolume(volume){
  const vol = Math.floor(volume);
  this.youtube.setVolume(vol);
  this.props.setVolume(vol);
}

  render() {
    //this.setState({playVideo:e.data == 2 ? false : true});
    const {playlist, connections} = this.props.app;
    const {fullScreen, volume} = this.props.video;

    return (
      <div className={fullScreen ? "videoPlayerFullScreen" : "videoPlayerContainer"}>
        <div className="roomTitle">
        </div>
        <YouTube
          className={fullScreen ? "videoPlayerFullScreen" : "videoPlayer"}
          videoId={playlist[0].id}
          opts={{playerVars: {autoplay: 1, controls:0, showinfo:0}}}
          onEnd={() => this.props.deleteSong(playlist[0].id)}
          onReady={e => {e.target.playVideo(); this.props.setVolume(e.target.getVolume()); this.youtube = e.target;}}
          onStateChange={e => {(e.data === 2 || e.data === 3 || e.data === 0) && this.youtube.playVideo(); console.warn(e)}}
        />
        <div className="musicButtons">
            <div className="playButton"  onClick={() => this.props.toggleFullScreen()}><FontAwesome icon="expand" /></div>
            <div className="forwardButton"  onClick={() => this.props.deleteSong(playlist[0].id)}><FontAwesome icon="forward" /></div>

        </div>

        <div className="volumeButton">
          <VolumeSlider
            value={volume}
            onChange={volume => this.setVolume(volume)}
          />
        </div>
      </div>
    );
  }
}
export default Connect(VideoContainer);
