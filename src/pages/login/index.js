import React, { Component } from 'react';
import './index.scss';
import Util from 'util';
import { Auth } from '../../service';

const _util = new Util();
const _auth = new Auth();

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
    document.title = 'Login | YOU MALL';
  }

  onInputChange = (event) => {
    let inputName = event.target.name;
    this.setState({
      [inputName]: event.target.value
    })
  }

  onFormSubmit = (event) => {
    event.preventDefault();
  }

  onButtonSubmit = () => {
    const loginInfo = {
      username: this.state.username,
      password: this.state.password
    }
    const checkResult = _auth.checkLoginInfo(loginInfo);
    if (checkResult.status) {
      _auth.login(loginInfo).then(serviceResult => {
        if (serviceResult.status === 1) {
          _util.setStorage('userInfo', serviceResult.data);
          this.props.history.push(this.state.redirect);
        } else {
          if (serviceResult.msg === '用户名不存在' || '密码错误') {
            const errMsg = 'Invalid  Username or Password.';
            _util.errorTips(errMsg);
          }
        }
      })
    } else {
      _util.errorTips(checkResult.msg);
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
                onClick={() => { this.onButtonSubmit() }}>
                Sign In
              </button>

            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login;
