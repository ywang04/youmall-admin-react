import React from 'react'
import Util from 'util/util.jsx'
const _util = new Util()

const GetUserList = (props) => {
  return _util.request({
    url: '/manage/user/list.do',
    method: 'post',
    data: {
      pageNum: props
    }
  })
}

export default GetUserList