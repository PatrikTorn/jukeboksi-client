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
    volume:50
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
  this.youtube.setVolume(Math.floor(volume));
  this.setState({volume});
}

  render() {
    //this.setState({playVideo:e.data == 2 ? false : true});
    const {playlist} = this.props.app;

    return (
      <div className="videoPlayerContainer">
        <YouTube
          className="videoPlayer"
          videoId={playlist[0].id}
          opts={{playerVars: {autoplay: 1, controls:0, showinfo:0}}}
          onEnd={() => this.props.onEnd(playlist[0].id)}
          onReady={e => {e.target.playVideo(); this.youtube = e.target;}}
          onStateChange={e => {(e.data === 2 || e.data === 3) && this.youtube.playVideo()}}
        />
        <div className="musicButtons">
          {this.state.playVideo
            ? <span className="playButton" onClick={() => this.toggleMusic()}><FontAwesome icon="pause" /></span>
            : <span className="playButton"  onClick={() => this.toggleMusic()}><FontAwesome icon="play" /></span>
          }
            <div className="forwardButton"  onClick={() => this.props.onEnd(playlist[0].id)}><FontAwesome icon="forward" /></div>
        </div>

        <div className="volumeButton">
          <VolumeSlider
            value={this.state.volume}
            onChange={volume => this.setVolume(volume)}
          />
        </div>
      </div>
    );
  }
}
export default Connect(VideoContainer);
