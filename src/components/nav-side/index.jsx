import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'

class NavSide extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="navbar-default navbar-side">
        <div className="sidebar-collapse">
          <ul className="nav">
            <li>
              <NavLink exact activeClassName="active-menu" to="/">
                <i className="fa fa-bar-chart-o"></i>
                <span>Home</span>
              </NavLink>
            </li>

            <li className="active">
              <Link to="/item">
                <i className="fa fa-list"></i>
                <span>Items</span>
                <span className="fa arrow"></span>
              </Link>
              <ul className="nav nav-second-level collapse in">
                <li>
                  <NavLink activeClassName="active-menu" to="/item">Items</NavLink>
                </li>
                <li>
                  <NavLink activeClassName="active-menu" to="/item-category" >Categories</NavLink>
                </li>
              </ul>
            </li>


            <li className="active">
              <Link to="/order">
                <i className="fa fa-check-square-o"></i>
                <span>Orders</span>
                <span className="fa arrow"></span>
              </Link>
              <ul className="nav nav-second-level collapse in">
                <li>
                  <NavLink activeClassName="active-menu" to="/order">Orders</NavLink>
                </li>
              </ul>
            </li>


            <li className="active">
              <Link to="/user">
                <i className="fa fa-user-o"></i>
                <span>Users</span>
                <span className="fa arrow"></span>
              </Link>
              <ul className="nav nav-second-level collapse in">
                <li>
                  <NavLink activeClassName="active-menu" to="/user">Users</NavLink>
                </li>
              </ul>
            </li>

          </ul>
        </div>
      </div>
    )
  }
}

export default NavSide