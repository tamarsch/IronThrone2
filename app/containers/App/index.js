/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

export default class App extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      category: '',
    };
  }
  setCategory(category) {
    this.setCategory({
      category,
    });
  }
  render() {
    return (
      <div>
        <Switch>
          <Route
            exact
            path="/"
            component={() => (
              <HomePage setCategory={(category) => this.setCategory(category)} />
            )}
          />
          {/* <Route */}
          {/* exact */}
          {/* path="/Category" */}
          {/* component={() => ( */}
          {/* <CategoryPage category={this.state.category}/> */}
          {/* )} */}
          {/* /> */}
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    );
  }
}
