/*
 * @Author: Yang 
 * @Date: 2018-03-07 15:01:53 
 * @Last Modified by: Yang
 * @Last Modified time: 2018-03-09 14:45:42
 */


import React from 'react'
import { Link } from 'react-router-dom'

class NavTop extends React.Component {
  constructor() {
    super()
  }
  onLogout() {

  }

  render() {
    return (
      <div className="navbar navbar-default top-navbar">
        <div className="navbar-header">
          <Link className="navbar-brand" to="/"><b>YOU</b>MALL</Link>
        </div>

        <ul className="nav navbar-top-links navbar-right">


          <li className="dropdown">
            <a className="dropdown-toggle" href="javascript:;" >
              <i className="fa fa-user fa-fw"></i>
              <span>Welcome, Admin</span>
              <i className="fa fa-caret-down"></i>
            </a>
            <ul className="dropdown-menu dropdown-user">
              <li>
                <a onClick={this.onLogout.bind(this)} href="#"><i className="fa fa-sign-out fa-fw"></i>
                  <span>Logout</span>
                </a>
              </li>
            </ul>
          </li>

        </ul>
      </div>
    )
  }
}

export default NavTop