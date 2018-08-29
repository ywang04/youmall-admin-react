import React, { Component } from 'react';
import Util from 'util/util.js';

const _util = new Util()

class Item extends Component {
  getItemList({ loadType, pageNum, searchType, searchKeyword }) {
    let url
    let data = {}
    if (loadType === 'list') {
      url = '/manage/product/list.do'
      data = { pageNum }
    }
    else if (loadType === 'search') {
      url = '/manage/product/search.do'
      data.pageNum = pageNum
      data[searchType] = searchKeyword
    }
    return _util.request({
      url: url,
      method: 'post',
      data: data
    })
  }

  changeItemStatus(itemInfo) {
    return _util.request({
      url: '/manage/product/set_sale_status.do',
      method: 'post',
      data: itemInfo
    })
  }

  getCategoryList(primaryId) {
    return _util.request({
      url: '/manage/category/get_category.do',
      method: 'post',
      data: {
        categoryId: primaryId || 0
      }
    })
  }

  checkFormValue({ name, subtitle, price, stock, categoryId, subImages }) {
    if (typeof name !== 'string' || name.length === 0) {
      return {
        status: false,
        msg: 'Name required.'
      }
    }

    if (typeof subtitle !== 'string' || subtitle.length === 0) {
      return {
        status: false,
        msg: 'Description required.'
      }
    }

    if (typeof categoryId !== 'number' || !(categoryId > 0)) {
      return {
        status: false,
        msg: 'Please select category.'
      }
    }

    if (typeof price !== 'number' || !(price >= 0)) {
      return {
        status: false,
        msg: 'Please enter valid price.'
      }
    }

    if (typeof stock !== 'number' || !(stock >= 0)) {
      return {
        status: false,
        msg: 'Please enter valid stock.'
      }
    }

    return {
      status: true,
      msg: 'Pass'
    }

  }

  submitItemForm(item) {
    return _util.request(
      {
        url: '/manage/product/save.do',
        method: 'post',
        data: item
      }
    )
  }

  getDetailInfo(productId) {
    return _util.request({
      url: '/manage/product/detail.do',
      method: 'post',
      data: {
        productId
      }
    })
  }
}

export default Item