import React, { Component } from 'react';
import axios from 'axios';
import Util from 'util';

const _util = new Util();

class Category extends Component {
  // getCategoryList({ parentCategoryId }) {
  //   return _util.request({
  //     url: '/manage/category/get_category.do',
  //     method: 'post',
  //     data: {
  //       categoryId: parentCategoryId
  //     }
  //   })
  // }

  async loadCategoryList({ parentCategoryId }) {
    const result = {
      status: -1,
      categoryList: []
    }
    try {
      const response = await axios({
        method: 'post',
        url: '/manage/category/get_category.do',
        data: {
          categoryId: parentCategoryId
        }
      })
      switch (response.status) {
        case 200:
          console.log('response', response);
          if (response.data.status === 10) {
            // _util.errorTips(response.data.msg);
            console.log(response.data.msg);
            result.status = -1;
          } else {
            result.status = 1;
            result.categoryList = response.data.data;
          }
          break;
        default:
          result.status = -1;
          break;
      }
    } catch (error) {
      console.log(error);
      result.categoryList = [];
      result.status = -1;
      _util.errorTips(errMsg)
    }
    return result;
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

export default Category;