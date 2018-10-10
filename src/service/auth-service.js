import Util from 'util';
import axios from 'axios';
import Qs from 'qs';
const _util = new Util();

class Auth {
  checkLoginInfo(loginInfo) {
    let username = $.trim(loginInfo.username)
    let password = $.trim(loginInfo.password)
    if (typeof username !== 'string' || username.length === 0) {
      return {
        status: false,
        msg: 'Username required.'
      }
    }
    if (typeof password !== 'string' || password.length === 0) {
      return {
        status: false,
        msg: 'Password required.'
      }
    }
    return {
      status: true,
      msg: 'Login Successfully'
    }
  }

  async login(loginInfo) {
    const result = {
      status: -1,
      data: '',
      msg: ''
    }
    try {
      const response = await axios({
        method: 'post',
        url: '/manage/user/login.do',
        data: Qs.stringify(loginInfo)
      })
      switch (response.status) {
        case 200:
          switch (response.data.status) {
            case 0:
              result.data = response.data;
              result.status = 1;
              break;
            case 1:
              result.msg = response.data.msg;
              result.status = -1;
              break;
            default:
              result.status = -1;
              break;
          }
          break;
      }
    } catch (error) {
      console.log(error);
      response.status = -1;
    }
    return result;
  }

  logout() {
    return _util.request({
      method: 'post',
      url: '/user/logout.do'
    })
  }
}

export default Auth;