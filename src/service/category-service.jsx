import React, { Component } from 'react'
import Util from 'util/util.jsx'

const _util = new Util()

class Category extends Component {
  getCategoryList({ parentCategoryId }) {
    return _util.request({
      url: '/manage/category/get_category.do',
      method: 'post',
      data: {
        categoryId: parentCategoryId
      }
    })
  }

  addCategory({ parentCategoryId, categoryName }) {
    return _util.request({
      url: '/manage/category/add_category.do',
      method: 'post',
      data: {
        parentId: parentCategoryId,
        categoryName: categoryName
      }
    })
  }

  setCategoryName(categoryId, categoryName) {
    return _util.request({
      url: '/manage/category/set_category_name.do',
      method: 'post',
      data: {
        categoryId,
        categoryName
      }
    })
  }

  checkFormValue(categoryName) {
    if (typeof categoryName !== 'string' || categoryName.length == 0) {
      return {
        statue: false,
        msg: 'Please enter category name.'
      }
    }
    return {
      status: true,
      msg: 'pass'
    }
  }
}

export default Category