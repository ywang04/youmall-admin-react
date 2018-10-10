import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Layout from '../../components/layout';
import Home from 'pages/home';
import ItemRouter from 'pages/item/router.js';
import OrderList from 'pages/order';
import OrderDetail from 'pages/order/order-detail.js';
import UserList from 'pages/user';
import ErrorPage from 'pages/error';
import { connect } from 'react-redux';
import { mapDispatchToProps } from '../../actions';

class LayoutContainer extends Component {

  async componentDidMount() {
    this.props.populateStatisticData();
  }

  render() {
    return (
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
  }


}

export default connect(null, mapDispatchToProps)(LayoutContainer);

