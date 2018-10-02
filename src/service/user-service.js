import React from 'react';
import Util from 'util/util.js';

const _util = new Util()

const GetUserList = (pageNum) => {
  return _util.request({
    url: '/manage/user/list.do',
    method: 'post',
    data: {
      pageNum: pageNum
    }
  })
}

export default GetUserList;