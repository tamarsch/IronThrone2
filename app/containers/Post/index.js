/**
 *
 * Post
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';


export default class Post extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      date: '',
      category: '',
      location: '',
      duration: '',
      difficulty: '',
      description: '',
      status: '',
      helpers: '',
      comments: '',
    };
  }
  render() {
    return (
      <div>
        <h3>{this.state.title}</h3>
        <p>{this.state.description}</p>
        <p>{this.state.location}</p>
        <p>{this.state.duration}</p>
        <p>{this.state.difficulty}</p>
        <p>{this.state.title}</p>
        <p>{this.state.title}</p>
        <p>{this.state.title}</p>
        <p>{this.state.title}</p>
        <p>{this.state.title}</p>
        <p>{this.state.title}</p>
        <p>{this.state.title}</p>
        <p>{this.state.title}</p>
      </div>
    );
  }
}

Post.propTypes = {

};
