import React, { Component } from 'react'
import './index.scss'
import Util from 'util/util.jsx'
import User from 'service/login-service.jsx'

const _util = new Util()
const _user = new User()

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      redirect: _util.getUrlParam('redirect') || '/'
    }
  }

  componentWillMount() {
    document.title = 'Login | YOU MALL'
  }

  onInputChange(event) {
    let inputName = event.target.name
    this.setState({
      [inputName]: event.target.value
    })
  }

  onFormSubmit(event) {
    event.preventDefault()
  }

  onHandleSubmit() {
    let loginInfo = {
      username: this.state.username,
      password: this.state.password
    }
    let checkResult = _user.checkLoginInfo(loginInfo)
    if (checkResult.status) {
      _user.login(loginInfo).then(
        (res) => {
          _util.setStorage('userInfo', res)
          this.props.history.push(this.state.redirect)
        },
        (errMsg) => {
          _util.errorTips(errMsg)
        }
      )
    } else {
      _util.errorTips(checkResult.msg)
    }
  }

  render() {
    return (
      <div className="col-md-4 col-md-offset-4">
        <div className="panel panel-default panel-login">
          <div className="panel-heading">YOU MALL - Management System</div>
          <div className="panel-body">
            <form onSubmit={this.onFormSubmit}>
              <div className="form-group">
                <input
                  value={this.state.username}
                  name="username"
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  onChange={(event) => { this.onInputChange(event) }} />
              </div>

              <div className="form-group">
                <input
                  value={this.state.password}
                  name="password"
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  onChange={(event) => { this.onInputChange(event) }} />
              </div>

              <button
                type="submit"
                className="btn btn-lg btn-primary btn-block"
                onClick={() => { this.onHandleSubmit() }}>
                Sign In
              </button>

            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
