import React, { Component } from 'react'
import Item from 'service/item-service.jsx'
import './category-selector.scss'

const _item = new Item()

class CategorySelector extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedPrimaryId: '',
      selectedSecondaryId: '',
      primaryCategoryList: [],
      secondaryCategoryList: []
    }
  }

  componentDidMount() {
    this.loadPrimaryCategoryList()
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
    _item.getCategoryList(this.state.selectedPrimaryId).then(
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
    this.setState({
      selectedPrimaryId: event.target.value,
      selectedSecondaryId: '',
      secondaryCategoryList: []
    }, () => {
      this.loadSecondaryCategoryList()
      this.onPropsCategoryChange()
    })
  }

  onSecondaryCategoryChange(event) {
    this.setState({
      selectedSecondaryId: event.target.value
    }, () => { this.onPropsCategoryChange() })
  }

  onPropsCategoryChange() {
    let isExecuted = typeof this.props.onCategoryChange === 'function'
    if (this.state.selectedSecondaryId) {
      isExecuted && this.props.onCategoryChange(this.state.selectedSecondaryId, this.state.selectedPrimaryId, )
    }
    else {
      isExecuted && this.props.onCategoryChange(this.state.selectedPrimaryId, 0)
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
        <select className="form-control category-selector"
          onChange={(event) => { this.onPrimaryCategoryChange(event) }}>
          <option value="">Choose Primary Category</option>
          {primaryList}
        </select>

        {this.state.selectedPrimaryId ? (<select className="form-control category-selector"
          onChange={(event) => { this.onSecondaryCategoryChange(event) }}>
          <option value="">Choose Secondary Category</option>
          {secondaryList}
        </select>) : null}

      </div>
    )
  }
}

export default CategorySelector