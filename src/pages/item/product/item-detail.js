import React, { Component } from 'react';
import PageTitle from 'components/page-title';
import CategorySelector from './category-selector';
import Util from 'util/util.js';
import Item from 'service/item-service.js';

import './item-add.scss'

const _util = new Util()
const _item = new Item()


class ItemDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      productId: this.props.match.params.id,
      name: '',
      subtitle: '',
      categoryId: '',
      parentCategoryId: '',
      price: '',
      stock: '',
      subImages: [],
      detail: '',
      status: '',
    }
  }

  componentDidMount() {
    this.loadDetailInfo()
  }

  loadDetailInfo() {
    _item.getDetailInfo(this.state.productId).then(
      (res) => {
        res.defaultDetail = res.detail
        if (res.subImages) {
          let imgList = res.subImages.split(',')
          res.subImages = imgList.map((img) => {
            return {
              uri: img,
              url: res.imageHost + img
            }
          })
          this.setState(res)
        }
        else {
          res.subImages = res.subImages.split('')
          this.setState(res)
        }
      },
      (errMsg) => {
        _util.errorTips(errMsg)
      })
  }

  render() {
    return (
      <div id="page-wrapper">
        <PageTitle title="View Item" />
        <div className="row">
          <div className="form-horizontal">

            <div className="form-group">
              <label className="col-md-2 control-label">Name</label>
              <div className="col-md-5">
                <input type="text" className="form-control" value={this.state.name} readOnly />
              </div>
            </div>

            <div className="form-group">
              <label className="col-md-2 control-label">Description</label>
              <div className="col-md-5">
                <input type="text" className="form-control" value={this.state.subtitle} readOnly />
              </div>
            </div>

            <div className="form-group">
              <label className="col-md-2 control-label">Status</label>
              <div className="col-md-3">
                <input type="text" className="form-control" value={this.state.status === 1 ? 'Active' : 'Inactive'} readOnly />
              </div>
            </div>

            <div className="form-group">
              <label className="col-md-2 control-label">Category</label>
              <CategorySelector
                categoryId={this.state.categoryId}
                parentCategoryId={this.state.parentCategoryId}
                readOnly />
            </div>

            <div className="form-group">
              <label className="col-md-2 control-label">Price</label>
              <div className="col-md-3">
                <div className="input-group">
                  <span className="input-group-addon">$</span>
                  <input type="text" className="form-control" value={this.state.price} readOnly />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="col-md-2 control-label">Stock</label>
              <div className="col-md-3">
                <input type="text" className="form-control" value={this.state.stock} readOnly />
              </div>
            </div>

            <div className="form-group">
              <label className="col-md-2 control-label">Images</label>
              <div className="col-md-10">
                {
                  this.state.subImages.length ? this.state.subImages.map((subImg, index) => {
                    return (
                      <div className="img-container" key={subImg.uri} >
                        <img className="img" src={subImg.url} />
                      </div>
                    )
                  }) : (<div>No Pictures!</div>)
                }
              </div>
            </div>

            <div className="form-group">
              <label className="col-md-2 control-label">Details</label>
              <div className="col-md-10" dangerouslySetInnerHTML={{ __html: this.state.detail }}>
              </div>
            </div>

          </div>

        </div>
      </div >
    )
  }

}

export default ItemDetail