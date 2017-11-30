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
import Chip from 'material-ui/Chip';
import Post from 'containers/Post/Loadable';
import LoginPage from 'containers/LoginPage/Loadable';
import messages from './messages';
import InputSelect from '../../components/InputSelect';
import Button from '../../components/Button/index';

export default class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      categories: '',
      filters: {},
      allPosts: [],
      filteredPosts: [],
      helpOutForm: false,
      helpMeForm: false,
      loggedIn: false,
    };
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
  filter(category) {
    if (this.state.filters[category]) return;
    const filters = this.state.filters;
    filters[category] = 1;
    const filteredPosts = this.state.filteredPosts;
    filteredPosts.filter((post) => post.category !== category);
    this.setState({
      filters,
      filteredPosts,
    });
  }
  deleteFilter(category) {
    if (!this.state.filters[category]) return;
    const filters = this.state.filters;
    delete filters[category];
    const unfilteredPosts = this.state.allPosts;
    unfilteredPosts.filter((post) => post.category === category);
    const filteredPosts = this.state.filteredPosts;
    filteredPosts.concat(unfilteredPosts);
    this.setState({
      filters,
      filteredPosts,
    });
  }
  login() {
    this.setState({
      loggedIn: true,
    });
  }
  render() {
    if (!this.state.loggedIn) {
      return (
        <LoginPage logIn={() => this.login()} />
      );
    }
    return (
      <div>
        <h1>
          <FormattedMessage {...messages.header} />
        </h1>
        {
          this.state.helpMeForm || this.state.helpOutForm ?
            // (<Form />) :
            (<h1>tamar</h1>) :
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
                <InputSelect
                  hint="#Pets #Travel #Apartment #Kids #Fasion #Sports"
                  dataSource={this.state.categories}
                  onNewRequest={(category) => this.filter(category)}
                />
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
                {
                  this.state.filteredPosts.map((post, index) => (
                    <Post
                      key={index.toString()}
                    />
                  ))
                }
              </div>
            )
        }
      </div>
    );
  }
}

HomePage.propTypes = {
};
