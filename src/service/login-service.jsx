import Util from 'util/youmall.jsx'
const _util = new Util()

class User {
  login(loginInfo) {
    return _util.request({
      method: 'post',
      url: '/manage/user/login.do',
      data: loginInfo
    })
  }

  logout() {
    return _util.request({
      method: 'post',
      url: '/user/logout.do'
    })
  }

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
}

export default User