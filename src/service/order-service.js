import React, { Component } from 'react';
import Util from 'util/util.js';

const _util = new Util()

class Order extends Component {
  getOrderList({ loadType, pageNum, orderNo }) {
    let url = ''
    let data = {}
    if (loadType === 'list') {
      url = '/manage/order/list.do'
      data = { pageNum }
    }
    else if (loadType === 'search') {
      url = '/manage/order/search.do'
      data.pageNum = pageNum
      data.orderNo = orderNo
    }
    return _util.request({
      url: url,
      method: 'post',
      data: data
    })
  }

  getOrderDetail(orderNo) {
    return _util.request({
      url: '/manage/order/detail.do',
      method: 'post',
      data: {
        orderNo
      }
    })
  }

}

export default Order
