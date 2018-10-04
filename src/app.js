import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './pages/Store';
import LayoutContainer from './components/layoutContainer';
import Login from 'pages/login';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/" component={LayoutContainer} />
          </Switch>
        </Router >
      </Provider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))

