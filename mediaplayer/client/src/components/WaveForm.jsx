import React from 'react';
import styles from '../styles/WaveForm.css';

export default class WaveForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
      position: 0,
    };
    this.hoverStart = this.hoverStart.bind(this);
    this.hoverEnd = this.hoverEnd.bind(this);
  }

  hoverStart(i) {
    this.setState({hover: true, position: i});
  }

  hoverEnd() {
    this.setState({hover: false});
  }

  render () {
    return (
      <div className={ styles.WaveGrid }>
        <div className={ styles.Wave }>
          {this.props.data.map((height,i) => {
            if ( this.state.hover && this.props.playing) {
              if ( this.props.time === i && this.state.position < i ) {
                return (
                  <div className={ styles.AnimatedLeft } 
                    style={{height: Math.floor(height/2), animationDuration: `${this.props.interval}s`}}
                    onClick={() => this.props.clicked(i)}
                    onMouseEnter={() => this.hoverStart(i)}
                    onMouseLeave={() => this.hoverEnd()}
                    key={i}>
                  </div> )
              } else if ( this.props.time === i && this.state.position > i ) {
                return (
                  <div className={ styles.AnimatedRight } 
                    style={{height: Math.floor(height/2), animationDuration: `${this.props.interval}s`}}
                    onClick={() => this.props.clicked(i)}
                    onMouseEnter={() => this.hoverStart(i)}
                    onMouseLeave={() => this.hoverEnd()}
                    key={i}>
                  </div> )
              } else if ( ( i >= this.state.position && i <= this.props.time ) 
                        || ( i <= this.state.position && i >= this.props.time ) ) {
                return (
                  <div className={ styles.Mirrored } 
                    style={{height: Math.floor(height/2), background: '#ffbf99'}}
                    onClick={() => this.props.clicked(i)}
                    onMouseEnter={() => this.hoverStart(i)}
                    onMouseLeave={() => this.hoverEnd()}
                    key={i}>
                  </div> )
              }
            }
            
            // not hovering
            if ( this.props.playing && this.props.time === i ) {
              return (
                <div className={ styles.Animated } // playing
                  style={{height: Math.floor(height/2), animationDuration: `${this.props.interval}s`}}
                  onClick={() => this.props.clicked(i)}
                  onMouseEnter={() => this.hoverStart(i)}
                  onMouseLeave={() => this.hoverEnd()}
                  key={i}>
                </div> )
              } else if ( this.props.time > i ) {
              return (
                <div className={ styles.Mirrored } // played
                  style={{height: Math.floor(height/2), background: 'linear-gradient(#ff6400, #ff3500)'}}
                  onClick={() => this.props.clicked(i)}
                  onMouseEnter={() => this.hoverStart(i)}
                  onMouseLeave={() => this.hoverEnd()}
                  key={i}>
                </div> )
            } else {
              return (
                <div className={ styles.Mirrored } // not played
                  style={{height: Math.floor(height/2), background: '#ffffff'}}
                  onClick={() => this.props.clicked(i)}
                  onMouseEnter={() => this.hoverStart(i)}
                  onMouseLeave={() => this.hoverEnd()}
                  key={i}>
               </div> )
            }
          })}
        </div>
        <div className={ styles.BottomWave }>
          {this.props.data.map((height,i) => { // bottom wave
            if ( this.props.playing && this.props.time === i ) {
              return (
                <div className={ styles.BottomAnimated } // playing
                  style={{height: Math.floor(height/6), animationDuration: `${this.props.interval}s`}}
                  key={i}>
                </div> )
            } else if ( this.props.time > i ) {
              return (
                <div className={ styles.Segment } // played
                  style={{height: Math.floor(height/6), background: '#ffbf99'}}
                  key={i}>
                </div> )
            } else {
              return (
                <div className={ styles.Segment } // not played
                  style={{height: Math.floor(height/6), background: '#e5e5e5'}}
                  key={i}>
                </div> )
            }
          })}
        </div>
      </div>
    );
  }
}