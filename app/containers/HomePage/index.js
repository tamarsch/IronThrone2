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
import Chip from 'material-ui/Chip';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Post from 'containers/Post/Loadable';
import Form from 'containers/Form/Loadable';
import LoginPage from 'containers/LoginPage/Loadable';
import InputSelect from '../../components/InputSelect';
import Button from '../../components/Button/index';

export default class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      filters: [],
      allPosts: [],
      filteredPosts: [],
      helpOutForm: false,
      helpMeForm: false,
      loggedIn: false,
      userId: '',
      err: '',
      username: '',
      selectValue: 1,
    };
  }
  init() {
    fetch('http://iron-help.com/api/category').then((res) => {
      res.json()
        .then((data) => {
          console.log('data', JSON.stringify(data));
          this.setState({
            categories: data,
          });
        });
    }).catch((err) => {
      this.setState({ err: err.message });
    });
    fetch('http://iron-help.com/api/post').then((res) => {
      res.json()
        .then((data) => {
          console.log('data', JSON.stringify(data));
          this.setState({
            allPosts: data,
            filteredPosts: data,
          });
        });
    }).catch((err) => {
      this.setState({ err: err.message });
    });
  }
  submit() {
    fetch('http://iron-help.com/api/post').then((res) => {
      res.json()
        .then((data) => {
          console.log('data', JSON.stringify(data));
          this.setState({
            allPosts: data,
            filteredPosts: data,
          });
          this.back();
          this.state.filters.forEach((filter) => this.filter(filter));
        });
    }).catch((err) => {
      this.setState({ err: err.message });
    });
  }
  back() {
    this.setState({
      helpMeForm: false,
      helpOutForm: false,
    });
  }
  openHelpMeForm() {
    this.setState({
      helpMeForm: true,
    });
  }
  openHelpOutForm() {
    this.setState({
      helpOutForm: true,
    });
  }
  filterByType(event, index, value) {
    console.log(index, event);
    const allPosts = this.state.allPosts;
    if (value === 1) {
      this.setState({
        filteredPosts: allPosts,
        selectValue: value,
        filters: [],
      });
    } else if (value === 2) {
      this.setState({
        filteredPosts: allPosts.filter((post) => post.type === 'help_request'),
        selectValue: value,
        filters: [],
      });
    } else {
      this.setState({
        filteredPosts: allPosts.filter((post) => post.type === 'help_suggest'),
        selectValue: value,
        filters: [],
      });
    }
  }
  deleteFilter(category) {
    console.log(this.state.filters);
    if (this.state.filters.indexOf(category) < 0) return;
    let filters = this.state.filters;
    filters = filters.filter((filter) => filter !== category);
    console.log(this.state.filters);
    let filteredPosts = this.state.allPosts;
    if (filters.length !== 0) {
      filteredPosts = filteredPosts.filter((post) => filters.indexOf(post.category.name) >= 0);
    }
    this.setState({
      filters,
      filteredPosts,
    });
  }
  filter(category) {
    console.log(category);
    if (this.state.filters.indexOf(category) >= 0) return;
    const filters = this.state.filters;
    filters.push(category);
    let filteredPosts = this.state.allPosts;
    filteredPosts = filteredPosts.filter((post) => filters.indexOf(post.category.name) >= 0);
    this.setState({
      filters,
      filteredPosts,
    });
  }
  login(userId, username) {
    this.setState({
      loggedIn: true,
      userId,
      username,
    });
    this.init();
  }
  render() {
    if (!this.state.loggedIn) {
      return (
        <LoginPage logIn={(userId, username) => this.login(userId, username)} />
      );
    }
    return (
      <div>
        {
          this.state.helpMeForm || this.state.helpOutForm ?
            (
              <Form
                categories={this.state.categories.map((category) => category.name)}
                user={this.state.username}
                userId={this.state.userId}
                helpText={this.state.helpMeForm ? 'Help me!' : 'Help out'}
                helpme={this.state.helpMeForm}
                submit={() => this.submit()}
                back={() => this.back()}
              />) :
            (
              <div>
                <Button
                  onClick={() => this.openHelpMeForm()}
                  text="Help Me!"
                  buttonStyle={{ backgroundColor: '#9c4b9e' }}
                  outerStyle={{ display: 'inline-block', padding: '0 10px' }}
                />
                <Button
                  onClick={() => this.openHelpOutForm()}
                  text="Help Out"
                  buttonStyle={{ backgroundColor: '#9c4b9e' }}
                  outerStyle={{ display: 'inline-block', padding: '0 10px' }}
                />
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                  <InputSelect
                    hint="Filter"
                    dataSource={this.state.categories.map((category) => category.name)}
                    onNewRequest={(category) => this.filter(category)}
                  />
                  <SelectField
                    floatingLabelText=""
                    value={this.state.selectValue}
                    onChange={(event, index, value) => this.filterByType(event, index, value)}
                  >
                    <MenuItem value={1} primaryText="Both" />
                    <MenuItem value={2} primaryText="Help Requests" />
                    <MenuItem value={3} primaryText="Help Suggestions" />
                  </SelectField>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                  {
                    this.state.filters.map((category, index) => (
                      <Chip
                        key={index.toString()}
                        onRequestDelete={() => this.deleteFilter(category)}
                      >
                        {category}
                      </Chip>
                    ))
                  }
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                  {
                    this.state.filteredPosts.map((post, index) => (
                      <Post
                        key={index.toString()}
                        postObj={post}
                      />
                    ))
                  }
                </div>
              </div>
            )
        }
      </div>
    );
  }
}
