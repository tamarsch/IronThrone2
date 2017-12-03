/**
 *
 * Post
 *
 */

import React from 'react';
import 'style.css';
import PropTypes from 'prop-types';
import Comment from '../../components/Comment';
import Button from '../../components/Button/index';


export default class Post extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  getTypeOfRequest() {
    if (this.props.postObj.type === 'help_request') {
      return 'Number of helpers';
    }
    return 'Number people for help';
  }
  getSrc() {
    switch (this.props.postObj.category.name) {
      case 'Style':
        return './images/diamond.png';
      case 'Apartment':
        return './images/home.png';
      case 'Travel':
        return './images/country.png';
      case 'Tech':
        return './images/wrench.png';
      case 'Skills':
        return './images/brush.png';
      case 'ironBuisness':
        return './images/is-logo.png';
      case 'Pets':
        return './images/page-1.png';
      case 'Physical':
        return './images/page-2.png';
      default:
        return './images/diamond.png';
    }
  }
  render() {
    return (
      <div className={`post ${this.props.postObj.type === 'help_request' ? 'helpReq' : 'helpSug'}`} style={{ position: 'relative' }}>
        <div className="post-icon">
          <img alt="" src={this.getSrc()} />
        </div>
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
        <br />
        <br />
        <div className="buttons" style={{ display: 'flex', flexWrap: 'wrap', position: 'absolute', bottom: '5px' }}>
          <Button
            className="in-button"
            text="I'm in!"
            buttonStyle={{ backgroundColor: this.props.postObj.type === 'help_request' ? '#9470fc' : '#13c7c8' }}
            outerStyle={{ display: 'inline-block', padding: '0 10px' }}
          />
          <Button
            className="comment-button"
            text="Comment"
            buttonStyle={{ backgroundColor: this.props.postObj.type === 'help_request' ? '#9470fc' : '#13c7c8' }}
            outerStyle={{ display: 'inline-block', padding: '0 10px' }}
          />
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
