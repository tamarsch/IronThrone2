/**
*
* Input
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
// import styled from 'styled-components';


function Input(props) {
  return (
    <TextField
      hintText={props.hint}
      value={props.value}
      onChange={props.onChange}
      style={props.style}
    />
  );
}

Input.propTypes = {
  hint: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  style: PropTypes.object,
};

export default Input;
