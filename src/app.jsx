import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Home from 'pages/home/index.jsx'
import Layout from 'components/layout/index.jsx'
import Login from 'pages/login/index.jsx'
import ErrorPage from 'pages/error/index.jsx'
import UserList from 'pages/user/index.jsx'

class App extends Component {
  render() {
    let LayoutRouter = (
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/user" component={UserList} />
          <Route path="/item" component={Home} />
          <Route path="/item-category" component={Home} />
          <Route path="/order" component={Home} />
          <Route component={ErrorPage} />
        </Switch>
      </Layout>
    )
    return (
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/" render={() => LayoutRouter} />
        </Switch>
      </Router >
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))

