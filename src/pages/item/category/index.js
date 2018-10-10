import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PageTitle from 'components/page-title';
import Category from 'service/category-service.js';
import TableList from 'util/table-list';
import { mapDispatchToProps } from '../../../actions';
import Util from 'util';

const _category = new Category();
const _util = new Util();

class CategoryList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      parentCategoryId: this.props.match.params.id || 0
    }
  }

  async componentDidMount() {
    this.props.populateCategoryList(this.state);
  }

  componentDidUpdate(prevProps, prevState) {
    let preId = prevProps.match.params.id
    let curId = this.props.match.params.id
    if (preId !== curId) {
      this.setState({
        parentCategoryId: curId || 0
      }, () => { this.props.populateCategoryList(this.state) })
    }
  }

  // loadCategoryList = () => {
  //   _category.getCategoryList(this.state).then(
  //     (res) => {
  //       this.setState({
  //         list: res
  //       })
  //     },
  //     (errMsg) => {
  //       this.setState({
  //         list: []
  //       })
  //       _util.errorTips(errMsg)
  //     })
  // }

  onUpdateCategoryName = (categoryId, categoryName) => {
    let inputValue = window.prompt('Please input category name.', categoryName)
    if (inputValue) {
      _category.setCategoryName(categoryId, inputValue).then(
        (res) => {
          _util.successTips('Update category successfully.');
          this.props.populateCategoryList(this.state);
        },
        (errMsg) => {
          _util.errorTips(errMsg)
        }
      )
    }
  }

  renderTableBody = () => {
    const { category } = this.props;
    return category.categoryList.map((element) => {
      return (
        <tr key={element.id}>
          <td>{element.id}</td>
          <td>{element.name}</td>
          <td>
            <a className="action" onClick={() => { this.onUpdateCategoryName(element.id, element.name) }}>Edit</a>
            {
              element.parentId === 0
                ? <Link to={`/item-category/index/${element.id}`}>View</Link>
                : null
            }
          </td>
        </tr >
      )
    })
  }

  render() {
    const tableHeaders = ['ID', 'Category', 'Action'],
      tableBody = this.renderTableBody();
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

const mapStateToProps = state => {
  return {
    category: state.category
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);