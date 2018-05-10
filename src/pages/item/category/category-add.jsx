import React, { Component } from 'react'
import PageTitle from 'components/page-title/index.jsx'
import Util from 'util/util.jsx'
import Category from 'service/category-service.jsx'

const _util = new Util()
const _category = new Category()


class CategoryAdd extends Component {
  constructor(props) {
    super(props)
    this.state = {
      parentCategoryId: 0,
      list: [],
      categoryName: ''
    }
  }

  componentDidMount() {
    this.loadCategoryName()
  }

  loadCategoryName() {
    _category.getCategoryList(this.state).then(
      (res) => {
        this.setState({
          list: res
        })
      },
      (errMsg) => {
        _util.errorTips(errMsg)
      }
    )
  }

  onFormSubmit(event) {
    event.preventDefault()
  }

  onValueChange(event) {
    let name = event.target.name
    let selectedValue = event.target.value.trim()
    this.setState({
      [name]: selectedValue
    })
  }

  onButtonSubmit() {
    let formCheckValue = _category.checkFormValue(this.state.categoryName)
    if (formCheckValue.status) {
      _category.addCategory(this.state).then(
        (res) => {
          _util.successTips('Add category successfully.')
          this.props.history.push('/item-category/index')
          // window.location.href = '/item-category/index'
        },
        (errMsg) => {
          if (errMsg === '添加品类参数错误') {
            errMsg = 'Invalid parameters.'
            _util.errorTips(errMsg)
          }
        }
      )
    }
    else {
      _util.errorTips(formCheckValue.msg)
    }
  }

  render() {
    let categoryList = this.state.list.map((category, index) => {
      return (
        <option key={category.id} value={category.id}>ParentCategory/{category.name}</option>
      )
    })
    return (
      <div id="page-wrapper" >
        <PageTitle title="Category List" />
        <div className="row">
          <form className="form-horizontal" onSubmit={this.onFormSubmit}>

            <div className="form-group">
              <label htmlFor="id-category" className="col-md-2 control-label">Category</label>
              <div className="col-md-3">
                <select
                  id="id-category"
                  className="form-control"
                  name="parentCategoryId"
                  onChange={(event) => { this.onValueChange(event) }}>
                  <option value="0">ParentCategory/</option>
                  {categoryList}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="id-name" className="col-md-2 control-label">Name</label>
              <div className="col-md-3">
                <input
                  id="id-name"
                  name="categoryName"
                  type="text"
                  className="form-control"
                  onChange={(event) => this.onValueChange(event)}
                  placeholder="Please enter category name" />
              </div>
            </div>

            <div className="form-group">
              <div className="col-md-offset-2 col-md-10">
                <button type="submit" className="btn btn-primary"
                  onClick={() => { this.onButtonSubmit() }}>Submit</button>
              </div>
            </div>

          </form>

        </div>
      </div>
    )
  }

}

export default CategoryAdd