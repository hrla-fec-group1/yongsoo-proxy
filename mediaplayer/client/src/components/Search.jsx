import React from 'react';
import styles from '../styles/Search.css';

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.search(this.state.value);
  }

  render() {
    return (
      <div className={ styles.Nav }>
        <div className={ styles.Left }>
          <span>
            <img src="https://s3-us-west-1.amazonaws.com/yongsoobucket/soundcloud.png" alt="" style={{maxHeight: '46px'}}/>
          </span>
          <span className={ styles.Charts }>Charts</span>
        </div>
        <div className={ styles.Center }>
          <form onSubmit={this.handleSubmit} className={ styles.Search }>
            <input 
              className={ styles.Input }
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
              placeholder="Search for random">
            </input>
            <button className={ styles.Button } onClick={this.handleSubmit}>&#x1F50D;</button>
          </form>
        </div>
        <div className={ styles.Right }>
          <span className={ styles.SignIn }>Sign in</span>
          <span className={ styles.Create }>Create account</span>
          <span>Upload</span>
          <span className={ styles.More }>&#8226;&#8226;&#8226;</span>
        </div>
      </div>

    )
  }
}