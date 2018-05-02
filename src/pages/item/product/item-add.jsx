import React, { Component } from 'react'
import PageTitle from 'components/page-title/index.jsx'
import CategorySelector from './category-selector.jsx'
import FileUploader from 'util/file-upload/index.jsx'
import Editor from 'util/editor/index.jsx'
import Util from 'util/util.jsx'
import Item from 'service/item-service.jsx'
import './item-add.scss'

const _util = new Util()
const _item = new Item()


class ItemAdd extends Component {
  constructor(props) {
    super(props)
    this.state = {
      productId: this.props.match.params.id,
      categoryId: '',
      parentCategoryId: '',
      name: '',
      subtitle: '',
      subImages: [],
      price: '',
      stock: '',
      detail: '',
      status: 1
    }
  }

  componentDidMount() {
    this.loadDetailInfo()
  }

  loadDetailInfo() {
    console.log('loadDetailInfo')
    if (this.state.productId) {
      _item.getDetailInfo(this.state.productId).then(
        (res) => {
          console.log('res is:', res)
          console.log(typeof res.subImages)
          console.log('subImages is:', res.subImages)
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
  }

  onFormSubmit(event) {
    event.preventDefault()
  }

  onInputChange(event) {
    let name = event.target.name,
      value = event.target.value.trim()
    this.setState({
      [name]: value
    })
  }

  onCategoryChange(categoryId, parentCategoryId) {
    this.setState({
      categoryId: categoryId,
      parentCategoryId: parentCategoryId
    })
  }

  onSuccessUpload(res) {
    let imgList = this.state.subImages
    imgList.push(res)
    this.setState({
      subImages: imgList
    })
  }

  onFailUpload(errMsg) {
    _util.errorTips(errMsg)
  }

  onImageDelete(event) {
    let index = parseInt(event.target.getAttribute('index'))
    let imgList = this.state.subImages
    imgList.splice(index, 1)
    this.setState({
      subImages: imgList
    })
  }

  onEditorValueChange(value) {
    console.log('onEditorValueChange')
    this.setState({
      detail: value
    })
  }

  getSubImagesString(subImages) {
    return subImages.map((subImage) => subImage.uri).toString()
  }

  onButtonSubmit() {
    let item = {
      name: this.state.name,
      subtitle: this.state.subtitle,
      categoryId: parseInt(this.state.categoryId),
      price: parseFloat(this.state.price),
      stock: parseInt(this.state.stock),
      subImages: this.getSubImagesString(this.state.subImages),
      detail: this.state.detail,
      status: this.state.status
    }
    if (this.state.productId) {
      item.id = this.state.productId
    }
    let formCheckValue = _item.checkFormValue(item)

    if (formCheckValue.status) {
      _item.submitItemForm(item).then((res) => {
        if (res === '更新产品成功') {
          _util.successTips('Item has been updated.')
        }
        else {
          _util.successTips('Item has been added.')
        }
        this.props.history.push('/item')
      }, (errMsg) => { _util.errorTips(errMsg) })
    }
    else {
      _util.errorTips(formCheckValue.msg)
    }
  }

  render() {
    return (
      <div id="page-wrapper">
        <PageTitle title={this.state.productId ? 'Edit Item' : 'Add Item'} />
        <div className="row">
          <form className="form-horizontal" onSubmit={this.onFormSubmit}>

            <div className="form-group">
              <label htmlFor="" className="col-md-2 control-label">Name</label>
              <div className="col-md-5">
                <input type="text" className="form-control" id="" placeholder="Please enter item name"
                  name="name"
                  value={this.state.name}
                  onChange={(event) => { this.onInputChange(event) }} />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="" className="col-md-2 control-label">Description</label>
              <div className="col-md-5">
                <input type="text" className="form-control" id="" placeholder="Please enter item description"
                  name="subtitle"
                  value={this.state.subtitle}
                  onChange={(event) => { this.onInputChange(event) }} />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="" className="col-md-2 control-label">Category</label>
              <CategorySelector
                categoryId={this.state.categoryId}
                parentCategoryId={this.state.parentCategoryId}
                onCategoryChange={
                  (categoryId, parentCategoryId) => { this.onCategoryChange(categoryId, parentCategoryId) }
                } />
            </div>

            <div className="form-group">
              <label htmlFor="" className="col-md-2 control-label">Price</label>
              <div className="col-md-3">
                <div className="input-group">
                  <span className="input-group-addon">$</span>
                  <input type="number" className="form-control" id="" placeholder="Price"
                    name="price"
                    value={this.state.price}
                    onChange={(event) => { this.onInputChange(event) }} />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="" className="col-md-2 control-label">Stock</label>
              <div className="col-md-3">
                <input type="number" className="form-control" id="" placeholder="Stock"
                  name="stock"
                  value={this.state.stock}
                  onChange={(event) => { this.onInputChange(event) }} />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="" className="col-md-2 control-label">Images</label>
              <div className="col-md-10">
                {
                  this.state.subImages.length ? this.state.subImages.map((subImg, index) => {
                    return (
                      <div className="img-container" key={subImg.uri} >
                        <img className="img" src={subImg.url} />
                        <i className="fa fa-close" index={index} onClick={(event) => { this.onImageDelete(event) }}></i>
                      </div>
                    )
                  }) : (<div>Upload Images</div>)
                }
              </div>

              <div className="col-md-offset-2 col-md-10">
                <FileUploader
                  onSuccessUpload={(res) => this.onSuccessUpload(res)}
                  onFailUpload={(errMsg) => this.onFailUpload(errMsg)} />
              </div>

            </div>

            <div className="form-group">
              <label htmlFor="" className="col-md-2 control-label">Details</label>
              <div className="col-md-10">
                <Editor
                  detail={this.state.detail}
                  defaultDetail={this.state.defaultDetail}
                  onEditorValueChange={(value) => { this.onEditorValueChange(value) }} />
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
      </div >
    )
  }
}


export default ItemAdd
