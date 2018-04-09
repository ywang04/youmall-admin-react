import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Util from 'util/youmall.jsx'
import User from 'service/login-service.jsx'

const _util = new Util()
const _user = new User()

class NavTop extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: _util.getStorage('userInfo').username || ''
    }
    this.onLogout = this.onLogout.bind(this)
  }

  onLogout() {
    _user.logout().then(
      (res) => {
        _util.removeStorage('userInfo')
        window.location.href = '/login'
      },
      (err) => {
        _util.errorTips(err)
      })
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
              {this.state.username
                ? <span>Welcome, {this.state.username}</span>
                : <span>Welcome</span>
              }
              <i className="fa fa-caret-down"></i>
            </a>
            <ul className="dropdown-menu dropdown-user">
              <li>
                <a onClick={this.onLogout} href="#"><i className="fa fa-sign-out fa-fw"></i>
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