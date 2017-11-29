/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import messages from './messages';
import Button from '../../components/Button';

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      categories: '',
    };
  }
  render() {
    return (
      <div>
        <h1>
          <FormattedMessage {...messages.header} />
        </h1>
        {this.state.categories.map((category) => (
          <Link to="/Category" onClick={this.props.setCategory}>
            <Button text={category} buttonStyle={{ backgroundColor: '#9c4b9e', height: '30px', width: '30px' }} outerStyle={{ display: 'inline-block', padding: '0 10px' }} />
          </Link>
        ))}
      </div>
    );
  }
}

HomePage.propTypes = {
  setCategory: PropTypes.func,
};
