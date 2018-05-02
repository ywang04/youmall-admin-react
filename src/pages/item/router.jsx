import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import ItemList from 'pages/item/product/index.jsx'
import ItemAdd from 'pages/item/product/item-add.jsx'
import ItemDetail from 'pages/item/product/item-detail.jsx'

class ItemRouter extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/item" component={ItemList} />
        <Route path="/item/save/:id?" component={ItemAdd} />
        <Route path="/item/detail/:id" component={ItemDetail} />
      </Switch>
    )
  }
}

export default ItemRouter