/**
 *
 * Form
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Input from '../../components/Input';
// import PropTypes from 'prop-types';


export default class Form extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      type: '', // help suggest or help request
      title: '',
      date: '',
      category: '',
      location: '', // optional
      duration: '', // optional
      difficulty: '', // optional
      description: '', // optional
      score: '', // need to be calculate
      limit: '', // assignees limit
      status: '', // open / assigned / closed
      file: '', // upload attachment
      user: '', // enter user name
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
  setScore(value) {
    this.setState({
      score: value,
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
  render() {
    return (
      <div className="form">
        <div className="form-header">
          <Input hint="Please enter a title here" value={this.state.title} onChange={(value) => this.setTitle(value)} />
          {/* enter date tag here*/}
          <div className="difficulty-level">
            <select value={this.state.difficulty} onChange={(value) => this.updateDifficulty(value)}>
              <option value="-1">Select difficulty level</option>
              <option value="2.5">Irrelevent</option>
              <option value="1">Super easy</option>
              <option value="2">Easy</option>
              <option value="3">Needs some effort</option>
              <option value="4">Complex</option>
              <option value="5">You are my goddess</option>
            </select>
          </div>
          <div className="category">
            <select value={this.state.category} onChange={(value) => this.updateCategory(value)}>
              <option value="-1">Select category</option>
              <option value="0">Pets</option>
              <option value="1">Languages</option>
              <option value="2">Travel</option>
              <option value="3">Apartment</option>
              <option value="4">Kids</option>
              <option value="5">Cooking</option>
              <option value="6">Style</option>
              <option value="7">Tech</option>
              <option value="8">Skills</option>
              <option value="9">Rides</option>
              <option value="10">ironBusiness</option>
              <option value="11">Sport</option>
              <option value="12">Other</option>
            </select>

          </div>
          <Input hint="Please enter score" value={this.state.score} onChange={(value) => this.setScore(value)} />

        </div>
        <div className="form-description">
          <Input hint="Please enter description here" value={this.state.description} onChange={(value) => this.setDescription(value)} />
        </div>
      </div>
    );
  }


}

Form.propTypes = {
  user: PropTypes.style,
};
