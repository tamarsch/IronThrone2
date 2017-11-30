/**
 *
 * LoginPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';


export default class LoginPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      err: '',
    };
  }
  handleClick() {
    fetch('http://iron-help.com/api/user/login', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pass: this.state.password,
        user: this.state.username,
      }),
    }).then((res) => {
      res.json()
        .then((data) => {
          console.log('data', JSON.stringify(data));
          if (data.status === 'ok') {
            this.props.logIn(data.user_id, data.name);
          } else {
            this.setState({ err: data.msg });
          }
        });
    }).catch((err) => {
      this.setState({ err: err.message });
    });
  }
  render() {
    return (
      <div>
        <AppBar
          title="Login"
          showMenuIconButton={false}
        />
        {
          this.state.err ? (<p style={{ color: 'red' }}></p>) : (<p></p>)
         }
        <TextField
          hintText="Enter your Username"
          floatingLabelText="Username"
          onChange={(event, newValue) => this.setState({ username: newValue })}
        />
        <br />
        <TextField
          type="password"
          hintText="Enter your Password"
          floatingLabelText="Password"
          onChange={(event, newValue) => this.setState({ password: newValue })}
        />
        <br />
        <RaisedButton label="Submit" primary style={style} onClick={(event) => this.handleClick(event)} />
      </div>
    );
  }
}
const style = {
  margin: 15,
};

LoginPage.propTypes = {
  logIn: PropTypes.func,
};

