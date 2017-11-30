/**
 *
 * Post
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Comment from '../../components/Comment';


export default class Post extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <h3>{this.props.postObj.title}</h3>
        <p>{this.props.postObj.user.name}</p>
        <p>{this.props.postObj.type}</p>
        <p>{this.props.postObj.category.name}</p>
        <p>{this.props.postObj.open_date}</p>
        <p>{this.props.postObj.description}</p>
        <p>{this.props.postObj.difficulty}</p>
        <p>{this.props.postObj.duration}</p>
        <p>{this.props.postObj.help_date}</p>
        <p>{this.props.postObj.location}</p>
        <p>{this.props.postObj.number_of_helpers_needed}</p>
        <p>{this.props.postObj.score}</p>
        <p>{this.props.postObj.status}</p>
        {
          this.props.postObj.comments.map((comment) =>
            (
              <Comment key={comment.toString()} commentObj={comment} />
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
