import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';

import WaveForm from './WaveForm.jsx';
import Comment from './Comment.jsx';
import Search from './Search.jsx';

import styles from '../styles/MediaPlayer.css';
import reset from '../styles/reset.css';

import SampleData from '../sampledata.js';

var audio;

class MediaPlayer extends Component {
  constructor() {
    super()
    this.state = {
      time: 0,
      playing: false,
      button: "https://s3-us-west-1.amazonaws.com/yongsoobucket/play.png",
      duration: 0,
      interval: 1,
      data: SampleData,
      waveData: [],
    }
    this.findSong = this.findSong.bind(this);
    this.stopMusic = this.stopMusic.bind(this);
    this.buttonClicked = this.buttonClicked.bind(this);
    this.segmentClicked = this.segmentClicked.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  findSong(query) {
    if( this.state.playing ) {
      this.stopMusic();  
    }

    let id;
    if ( ( Number(query).toString() === query ) && Number(query) <= 100 && Number(query) > 0) {
      id = Number(query);
    } else {
      //takes a query string and hashes it to an integer from 0-100
      id = query.split('').reduce((a, v) => a + v.charCodeAt(0),0)%100 + 1;
    }
    console.log(`getting song data with id: ${id}`);

    axios.get('/api/songs', {params: { id }})
      .then(response => {
        console.log('response', response);
        audio = new Audio(response.data.audio);
        audio.addEventListener('loadedmetadata', () => {
          this.setState({ 
            data: response.data,
            duration: Math.floor(audio.duration)
          });
          this.updateWindowDimensions();
        });
      })
      .catch(error => console.error(error));
  }

  stopMusic() {
    clearInterval(this.timer);
    audio.pause();
    audio.currentTime = 0;
    this.setState({time: 0, playing: false, button: "https://s3-us-west-1.amazonaws.com/yongsoobucket/play.png"}); 
  }

  buttonClicked() {
    if ( !this.state.playing ) {
      audio.play();
      this.setState({
        playing: true, 
        button: "https://s3-us-west-1.amazonaws.com/yongsoobucket/pause.png",
      });
      this.timer = setInterval(() => {
        this.setState({time: this.state.time + 1});
        if ( this.state.time * this.state.interval > this.state.duration + 1) {
          this.stopMusic();
        }
      }, this.state.interval*1000);
    } else {
      clearInterval(this.timer);
      audio.pause();
      this.setState({playing: false, button: "https://s3-us-west-1.amazonaws.com/yongsoobucket/play.png"});
    }
  }

  segmentClicked(position) {
    //skips to a new position in audio file
    audio.currentTime = position * this.state.interval;
    this.setState({time: position});
  }

  updateWindowDimensions() {
    //calculate width of window and calculate number of waves to generate
    let waveCount = window.innerWidth;
    if ( waveCount > 1200 ) waveCount = 1200;
    if ( waveCount < 800 ) waveCount = 800;
    waveCount = Math.floor((waveCount - 355) / 3);
    
    //use waveData scaled with waveCount to create data of waves to be generated
    let arr = [];
    for ( let n = 0; n < waveCount; n++ ) {
      arr.push(this.state.data.waveData[Math.floor(n*this.state.data.waveData.length/waveCount)]);
    }
    console.log('width: ', window.innerWidth, 'wavecount: ', waveCount);
    
    this.setState({ 
      waveData: arr,
      interval: this.state.duration / waveCount,
      time: Math.floor(audio.currentTime * waveCount / this.state.duration)
    });
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateWindowDimensions);
    this.findSong('1'); // initialize with 1st song in database
  }

  render() {
    return (
      <div>
        <div style={{backgroundColor: '#333', height: '46px'}}>
          <Search search={this.findSong} />
        </div>
        
        <div className={ styles.MediaPlayer }>
          <div className={ styles.ButtonArea }>
            <img className={ styles.Button } src={this.state.button} alt="button" onClick={this.buttonClicked} />
            <div className={ styles.SongArea }>
              <span className={ styles.Artist }>{this.state.data.artist}</span>
              <span className={ styles.Title }>{this.state.data.title}</span>
            </div>
          </div>

          <div className={ styles.InfoArea }>
            <div className={ styles.Created }>{moment(this.state.data.created).fromNow()}</div>
            <div className={ styles.Category }>{`#${this.state.data.category}`}</div>
          </div>

          <div className={ styles.TimeArea }>
            <div className={ styles.Time }> 
              {Math.floor(this.state.time*this.state.interval/60)}:{Math.floor(this.state.time*this.state.interval%60).toString().padStart(2,'0')}
            </div>
            <div className={ styles.Duration }> 
              {Math.floor(this.state.duration/60)}:{(this.state.duration%60).toString().padStart(2,'0')}
            </div>
          </div>

          <div className={ styles.WaveForm }>
            <WaveForm 
              data={this.state.waveData}
              playing={this.state.playing} 
              time={this.state.time}
              interval={this.state.interval}
              clicked={this.segmentClicked}
            />
          </div>

          <div className={ styles.Comment }>
            <Comment
              data={this.state.data.comments}
              time={this.state.time}
              interval={this.state.interval}
              duration={this.state.duration}
            />
          </div>

          <img className={ styles.AlbumArt } src={this.state.data.albumArt} alt=""/>
        </div>
      </div>
    );
  }
}

export default MediaPlayer;