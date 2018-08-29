import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PageTitle from 'components/page-title';
import Category from 'service/category-service.js';
import TableList from 'util/table-list';
import Util from 'util/util.js';

const _category = new Category()
const _util = new Util()

class CategoryList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      parentCategoryId: this.props.match.params.id || 0
    }
  }

  componentDidMount() {
    this.loadCategoryList()
  }

  componentDidUpdate(prevProps, prevState) {
    let preId = prevProps.match.params.id
    let curId = this.props.match.params.id
    if (preId !== curId) {
      this.setState({
        parentCategoryId: curId || 0
      }, () => { this.loadCategoryList() })
    }
  }

  loadCategoryList() {
    _category.getCategoryList(this.state).then(
      (res) => {
        this.setState({
          list: res
        })
      },
      (errMsg) => {
        this.setState({
          list: []
        })
        _util.errorTips(errMsg)
      })
  }

  onUpdateCategoryName(categoryId, categoryName) {
    let inputValue = window.prompt('Please input category name.', categoryName)
    if (inputValue) {
      _category.setCategoryName(categoryId, inputValue).then(
        (res) => {
          _util.successTips('Update category successfully.')
          this.loadCategoryList()
        },
        (errMsg) => {
          _util.errorTips(errMsg)
        }
      )
    }
  }

  render() {
    let tableHeaders = ['ID', 'Category', 'Action']
    let tableBody = this.state.list.map((category, index) => {
      return (
        <tr key={category.id}>
          <td>{category.id}</td>
          <td>{category.name}</td>
          <td>
            <a className="action" onClick={() => { this.onUpdateCategoryName(category.id, category.name) }}>Edit</a>
            {
              category.parentId === 0
                ? <Link to={`/item-category/index/${category.id}`}>View</Link>
                : null
            }
          </td>
        </tr >
      )
    })
    return (
      <div id="page-wrapper" >
        <PageTitle title="Category List">
          <div className="page-header-right">
            <Link to="/item-category/add" className="btn btn-primary">
              <i className="fa fa-plus"></i>
              <span className="span-add">Add Category</span>
            </Link>
          </div>
        </PageTitle>
        <div className="row">
          <div className="col-md-12">
            <p>ParentCategoryID: {this.state.parentCategoryId}</p>
          </div>
        </div>
        <TableList tableHeaders={tableHeaders}>
          {tableBody}
        </TableList>
      </div >
    )
  }
}

export default CategoryList