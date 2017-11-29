/**
*
* Comment
*
*/

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';


function Comment(props) {
  return (
    <div style={props.style} >
      <h3>{props.user}</h3>
      <p>{props.text}</p>
      <p>{props.date}</p>
    </div>
  );
}

Comment.propTypes = {
  text: PropTypes.string,
  user: PropTypes.string,
  date: PropTypes.object,
  style: PropTypes.object,
};

export default Comment;
