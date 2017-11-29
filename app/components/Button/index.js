/**
*
* Button
*
*/

import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import PropTypes from 'prop-types';
// import styled from 'styled-components';


function Button(props) {
  return (
    <div style={{ ...{ padding: '10px 0' }, ...props.outerStyle }} >
      <RaisedButton
        label={props.text}
        primary
        onClick={props.onClick}
        buttonStyle={props.buttonStyle}
      />
    </div>
  );
}

Button.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string,
  buttonStyle: PropTypes.object,
  outerStyle: PropTypes.object,
};

export default Button;
