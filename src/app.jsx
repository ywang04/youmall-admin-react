/*
 * @Author: Yang 
 * @Date: 2018-02-23 20:50:15 
 * @Last Modified by: Yang
 * @Last Modified time: 2018-03-08 11:26:43
 */

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom'

import Home from 'page/home/index.jsx'
import Layout from 'component/layout/index.jsx'

class App extends React.Component {
  render() {
    return (
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/" component={Home} />
            <Redirect from="*" to="/" />
          </Switch>
        </Layout>
      </Router>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))

