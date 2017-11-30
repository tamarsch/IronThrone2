/**
 *
 * Post
 *
 */

import React from 'react';
import 'style.css';
import PropTypes from 'prop-types';
import Comment from '../../components/Comment';


export default class Post extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  getTypeOfRequest() {
    if (this.props.postObj.type === 'help_request') {
      return 'Number of helpers';
    }
    return 'Number people for help';
  }
  render() {
    return (
      <div className={`post ${this.props.postObj.type === 'help_request' ? 'helpReq' : 'helpSug'}`}>
        <div className="post-icon"></div>
        <div className="post-title">
          <h3>{this.props.postObj.title}</h3>
        </div>
        <div className="post-content">
          <p>{this.props.postObj.user.name}</p>
          <p>{this.props.postObj.type}</p>
          <p><b>Category:</b> {this.props.postObj.category.name}</p>
          <p><b>Posted at:</b> {this.props.postObj.open_date}</p>
          <p><b>Description:</b> {this.props.postObj.description}</p>
          <p><b>Difficulty level:</b> {this.props.postObj.difficulty}</p>
          <p><b>It will take</b> {this.props.postObj.duration} hours</p>
          <p><b>Location:</b> {this.props.postObj.location}</p>
          <p><b>{this.getTypeOfRequest()}</b> {this.props.postObj.number_of_helpers_needed}</p>
          <p>It will give {this.props.postObj.score} point!</p>
          <p><b>Status:</b> {this.props.postObj.status}</p>
        </div>
        <div className="buttons">
          <button className="in-button"></button>
          <button className="comment"></button>
        </div>
        {
          this.props.postObj.comments.map((comment, index) =>
            (
              <Comment key={index.toString()} commentObj={comment} />
            )
          )
        }
      </div>
    );
  }

}

Post.propTypes = {
  postObj: PropTypes.object,
};
