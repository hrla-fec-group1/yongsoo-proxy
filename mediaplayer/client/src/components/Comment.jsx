import React from "react";
import styles from "../styles/Comment.css";

export default class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div>
          {this.props.data.map((comment, i) => {
            return (
              <img
                src={comment.avatar}
                alt=""
                style={{
                  position: "absolute",
                  maxWidth: "20px",
                  left: `${Math.floor((comment.time * 3) / this.props.interval)}px`}}
                key={i}
              />
            );
          })}
        </div>

        <div>
          {this.props.data.map((comment, i) => {
            if ( comment.time === Math.floor(this.props.time * this.props.interval) ) {
              if ( comment.time < this.props.duration/2 ) {
                return (
                  <div
                    style={{
                      position: "absolute",
                      left: `${Math.floor((comment.time * 3) / this.props.interval)}px`,
                      top: "25px",
                      justifyItems: "start",
                      whiteSpace: "nowrap"
                    }}
                    key={i}
                  >
                    <div>
                      <span className={styles.CommentLine}>|</span>
                      <span className={styles.UserName}>{comment.username}</span>
                      <span className={styles.UserComment}>
                        {comment.comment}
                      </span>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div
                    style={{
                      position: "absolute",
                      right: `${Math.floor(((this.props.duration - comment.time) * 3) / this.props.interval)}px`,
                      top: "25px",
                      justifyItems: "end",
                      whiteSpace: "nowrap"
                    }}
                    key={i}
                  >
                    <div>
                      <span className={styles.UserComment}>
                        {comment.comment}
                      </span>
                      <span className={styles.UserName}>{comment.username}</span>
                      <span className={styles.RightLine}>|</span>
                    </div>
                  </div>
                );
              }
            } else {
              return <div key={i} />;
            }
          })}
        </div>
      </div>
    );
  }
}
