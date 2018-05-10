import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Home from 'pages/home/index.jsx'
import Layout from 'components/layout/index.jsx'
import Login from 'pages/login/index.jsx'
import ErrorPage from 'pages/error/index.jsx'
import UserList from 'pages/user/index.jsx'
import ItemRouter from 'pages/item/router.jsx'
import OrderList from 'pages/order/index.jsx'
import OrderDetail from 'pages/order/order-detail.jsx'

class App extends Component {
  render() {
    let LayoutRouter = (
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/item" component={ItemRouter} />
          <Route path="/item-category" component={ItemRouter} />
          <Route path="/order/index" component={OrderList} />
          <Route path="/order/detail/:orderNo" component={OrderDetail} />
          <Route path="/user/index" component={UserList} />
          <Redirect exact from="/order" to="/order/index" />
          <Redirect exact from="/user" to="/user/index" />
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

