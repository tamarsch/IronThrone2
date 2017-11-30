/**
 *
 * Form
 *
 */

import React from 'react';
import 'style.css';
import PropTypes from 'prop-types';
import Input from '../../components/Input';
import Button from '../../components/Button';


// import PropTypes from 'prop-types';


export default class Form extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      date: '',
      category: '',
      location: '', // optional
      duration: '', // optional
      difficulty: '', // optional
      description: '', // optional
      limit: '', // assignees limit
      status: '', // open / assigned / closed -- the user needs to close it
      file: '', // upload attachment
      user: '',
    };
  }
  setTitle(value) {
    this.setState({
      title: value,
    });
  }
  setDescription(value) {
    this.setState({
      description: value,
    });
  }
  setNumberOfHelpers(value) {
    this.setState({
      limit: value,
    });
  }
  updateCategory(value) {
    this.setState({
      category: value,
    });
  }
  updateDifficulty(value) {
    this.setState({
      difficulty: value,
    });
  }
  submit() {
    fetch('http://iron-help.com/api/post', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: this.state.title,
        type: this.props.helpme ? 'help_request' : 'help_suggest',
        category_id: this.state.category,
        open_date: new Date(),
        duration: this.state.duration,
        open_user_id: this.props.userId,
        status: 'open',
        location: 'tel-aviv',
        description: this.state.description,
        difficulty: this.state.difficulty,
        number_of_helpers_needed: this.state.limit ? this.state.limit : null,
      }),
    }).then((res) => {
      res.json()
        .then((data) => {
          console.log('data', JSON.stringify(data));
          if (data.status === 'ok') {
            this.props.submit();
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
      <div className="form">
        <Button
          onClick={() => this.props.back()}
          text="Back"
          buttonStyle={{ backgroundColor: '#9c4b9e' }}
          outerStyle={{ display: 'inline-block', padding: '0 10px' }}
        />
        <div className="form-header">
          <Input hint="Please enter a title here" value={this.state.title} onChange={(event) => this.setTitle(event.target.value)} />
          {/* enter date tag here*/}
          <h4 className="user-name">{this.props.user}</h4>
          <div className="difficulty-level">
            <select value={this.state.difficulty} onChange={(event) => this.updateDifficulty(event.target.value)}>
              <option value="-1">Select difficulty level</option>
              <option value="2.5">Irrelevant</option>
              <option value="1">Super easy</option>
              <option value="2">Easy</option>
              <option value="3">Needs some effort</option>
              <option value="4">Complex</option>
              <option value="5">You are my goddess</option>
            </select>
          </div>
          <div className="category">
            <select value={this.state.category} onChange={(event) => this.updateCategory(event.target.value)}>
              <option value="-1">Select category</option>
              {
                this.props.categories.map((category, index) => (
                  <option key={index.toString()} value={category}>{category}</option>
                ))
              }
            </select>
          </div>
          {
            this.props.helpme ?
              (
                <Input
                  hint="How many helpers?"
                  value={this.state.limit}
                  onChange={(event) => this.setNumberOfHelpers(event.target.value)}
                />
              ) :
              null
          }
        </div>
        <div className="form-description">
          <Input hint="Please enter description here" value={this.state.description} onChange={(event) => this.setDescription(event.target.value)} />
        </div>
        <Button
          onClick={() => this.submit()}
          text={this.props.helpText}
          buttonStyle={{ backgroundColor: '#9c4b9e' }}
          outerStyle={{ display: 'inline-block', padding: '0 10px' }}
        />
      </div>
    );
  }
}

Form.propTypes = {
  user: PropTypes.string,
  userId: PropTypes.string,
  categories: PropTypes.array,
  submit: PropTypes.func,
  helpText: PropTypes.string,
  back: PropTypes.func,
  helpme: PropTypes.bool,
};
