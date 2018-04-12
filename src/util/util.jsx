class Util {
  // param is passing as an object
  // the return result of request function is a Promise object
  doLogin() {
    window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname)
  }

  errorTips(errMsg) {
    alert(errMsg || 'Wrong!')
  }

  getUrlParam(param) {
    let queryString = window.location.search.split('?')[1] || ''
    let reg = new RegExp('(^|&)' + param + '=([^&]*)(&|$)')
    let result = queryString.match(reg)
    return result ? decodeURIComponent(result[2]) : null
  }

  setStorage(name, data) {
    let dataType = typeof data
    // JSON type
    if (dataType === 'object') {
      window.localStorage.setItem(name, JSON.stringify(data))
    }
    else if (['number', 'sting', 'boolean'].indexOf(dataType) >= 0) {
      window.localStorage.setItem(name, data)
    }
    else {
      alert('This type is not suitable for LocalStorage')
    }
  }

  getStorage(name) {
    let data = window.localStorage.getItem(name)
    if (data) {
      return JSON.parse(data)
    } else {
      return ''
    }
  }

  removeStorage(name) {
    window.localStorage.removeItem(name)
  }

  request(param) {
    return new Promise((resolve, reject) => {
      $.ajax({
        method: param.method || 'get',
        url: param.url || '',
        dataType: param.dataType || 'json',
        data: param.data || null,
        success: (res) => {
          if (0 === res.status) {
            typeof resolve === 'function' && resolve(res.data, res.msg)
          } else if (10 === res.status) {
            this.doLogin()
          } else {
            typeof reject === 'function' && reject(res.msg || res.data)
          }
        },
        error: (err) => {
          typeof reject === 'function' && reject(err.statusText)
        }
      })
    })
  }
}

export default Util