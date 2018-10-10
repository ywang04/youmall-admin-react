import React, { Component } from 'react';
import Item from 'service/item-service.js';
import Util from 'util';
const _item = new Item();
const _util = new Util();
import './category-selector.scss';

class CategorySelector extends Component {
  constructor(props) {
    super(props)
    this.state = {
      primaryId: '',
      secondaryId: '',
      primaryCategoryList: [],
      secondaryCategoryList: []
    }
  }

  componentDidMount() {
    this.loadPrimaryCategoryList()
  }

  componentWillReceiveProps(nextProps) {
    let categoryIdChange = this.props.categoryId !== nextProps.categoryId
    let parentCategoryIdChange = this.props.parentCategoryId !== nextProps.parentCategoryId
    if (!categoryIdChange && !parentCategoryIdChange) {
      return
    }
    if (nextProps.parentCategoryId === 0) {
      this.setState({
        primaryId: nextProps.categoryId,
        secondaryId: ''
      })
    }
    else {
      this.setState({
        primaryId: nextProps.parentCategoryId,
        secondaryId: nextProps.categoryId
      },
        () => {
          parentCategoryIdChange && this.loadSecondaryCategoryList()
        }
      )
    }
  }

  loadPrimaryCategoryList() {
    _item.getCategoryList().then(
      (res) => {
        this.setState({
          primaryCategoryList: res
        })
      },
      (errMsg) => {
        _util.errorTips(errMsg)
      }
    )
  }

  loadSecondaryCategoryList() {
    _item.getCategoryList(this.state.primaryId).then(
      (res) => {
        this.setState({
          secondaryCategoryList: res
        })
      },
      (errMsg) => {
        _util.errorTips(errMsg)
      }
    )
  }

  onPrimaryCategoryChange(event) {
    if (this.props.readOnly) {
      return
    }
    let newValue = event.target.value
    this.setState({
      primaryId: newValue,
      secondaryId: '',
      secondaryCategoryList: []
    }, () => {
      this.loadSecondaryCategoryList()
      this.onPropsCategoryChange()
    })
  }

  onSecondaryCategoryChange(event) {
    if (this.props.readOnly) {
      return
    }
    let newValue = event.target.value
    this.setState({
      secondaryId: newValue
    }, () => { this.onPropsCategoryChange() })
  }

  onPropsCategoryChange() {
    let isExecuted = typeof this.props.onCategoryChange === 'function'
    if (this.state.secondaryId) {
      isExecuted && this.props.onCategoryChange(this.state.secondaryId, this.state.primaryId)
    }
    else {
      isExecuted && this.props.onCategoryChange(this.state.primaryId, 0)
    }
  }

  render() {
    let primaryList = this.state.primaryCategoryList.map((category, index) => {
      return (
        <option key={category.id} value={category.id}>{category.name}</option >
      )
    })

    let secondaryList = this.state.secondaryCategoryList.map((category, index) => {
      return (
        <option key={category.id} value={category.id}>{category.name}</option >
      )
    })

    return (
      <div className="col-md-10">
        <select
          id="id-category"
          className="form-control category-selector"
          readOnly={this.props.readOnly}
          value={this.state.primaryId}
          onChange={(event) => { this.onPrimaryCategoryChange(event) }}>
          <option value="">Choose Primary Category</option>
          {primaryList}
        </select>

        {this.state.primaryId ?
          <select
            id="id-category"
            className="form-control category-selector"
            readOnly={this.props.readOnly}
            value={this.state.secondaryId}
            onChange={(event) => { this.onSecondaryCategoryChange(event) }}>
            <option value="">Choose Secondary Category</option>
            {secondaryList}
          </select> : null}

      </div>
    )
  }
}

export default CategorySelector