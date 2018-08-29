import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Layout from 'components/layout';
import Home from 'pages/home';
import ItemRouter from 'pages/item/router.js';
import OrderList from 'pages/order';
import OrderDetail from 'pages/order/order-detail.js';
import UserList from 'pages/user';
import ErrorPage from 'pages/error';
import Login from 'pages/login';

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

