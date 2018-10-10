import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import ItemList from 'pages/item/product';
import ItemAdd from 'pages/item/product/item-add.js';
import ItemDetail from 'pages/item/product/item-detail.js';
import CategoryList from 'pages/item/category';
import CategoryAdd from 'pages/item/category/category-add.js';

class ItemRouter extends Component {
  render() {
    return (
      <Switch>
        <Route path="/item/index" component={ItemList} />
        <Route path="/item/save/:id?" component={ItemAdd} />
        <Route path="/item/detail/:id" component={ItemDetail} />
        <Route path="/item-category/index/:id?" component={CategoryList} />
        <Route path="/item-category/add" component={CategoryAdd} />
        <Redirect exact from="/item" to="/item/index" />
        <Redirect exact from="/item-category" to="/item-category/index" />
      </Switch>
    )
  }
}

export default ItemRouter;