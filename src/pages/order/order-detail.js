import React, { Component } from 'react';
import PageTitle from 'components/page-title';
import Order from 'service/order-service.js';
import TableList from 'util/table-list';
import Util from 'util/util.js';
import './order-detail.scss';

const _util = new Util()
const _order = new Order()

class OrderDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      orderNo: this.props.match.params.orderNo,
      orderInfo: {}
    }
  }
  componentDidMount() {
    this.loadOrderDetail()
  }

  loadOrderDetail() {
    _order.getOrderDetail(this.state.orderNo).then(
      (res) => {
        this.setState({
          orderInfo: res
        })
      },
      (errMsg) => {
        _util.errorTips(errMsg)
      }
    )
  }

  render() {
    let { orderItemVoList, shippingVo, orderNo, createTime, statusDesc, paymentTypeDesc, payment, imageHost } = this.state.orderInfo
    let orderList = orderItemVoList || []
    let shippingInfo = shippingVo || {}
    let tableHeaders = [
      { name: 'Picture', width: '10%' },
      { name: 'Info', width: '45%' },
      { name: 'Price', width: '15%' },
      { name: 'Quantity', width: '15%' },
      { name: 'Amount', width: '15%' }
    ]
    let tableBody = orderList.map((item, index) => {
      return (
        <tr key={index}>
          <td><img alt={item.productName} className="img-item" src={`${imageHost}${item.productImage}`} /></td>
          <td>{item.productName}</td>
          <td>$ {item.currentUnitPrice}</td>
          <td>{item.quantity}</td>
          <td>$ {item.totalPrice}</td>
        </tr>
      )
    })
    return (
      < div id="page-wrapper" >
        <PageTitle title='View Order' />
        <div className="row">
          <div className="form-horizontal">

            <div className="form-group">
              <label className="col-md-2 control-label">Order</label>
              <div className="col-md-5">
                <input type="text" className="form-control" value={orderNo || ''} readOnly />
              </div>
            </div>

            <div className="form-group">
              <label className="col-md-2 control-label">Date</label>
              <div className="col-md-5">
                <input type="text" className="form-control" value={createTime || ''} readOnly />
              </div>
            </div>

            <div className="form-group">
              <label className="col-md-2 control-label">Recipient</label>
              <div className="col-md-3">
                <input type="text" className="form-control" value={shippingInfo.receiverName || ''} readOnly />
              </div>
            </div>

            <div className="form-group">
              <label className="col-md-2 control-label">Status</label>
              <div className="col-md-3">
                <input type="text" className="form-control" value={statusDesc || ''} readOnly />
              </div>
            </div>

            <div className="form-group">
              <label className="col-md-2 control-label">Method</label>
              <div className="col-md-3">

                <input type="text" className="form-control" value={paymentTypeDesc || ''} readOnly />
              </div>
            </div>

            <div className="form-group">
              <label className="col-md-2 control-label">Amount</label>
              <div className="col-md-3">
                <div className="input-group">
                  <span className="input-group-addon">$</span>
                  <input type="text" className="form-control" value={payment || ''} readOnly />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="col-md-2 control-label">Item List</label>
              <div className="col-md-10">
                <TableList tableHeaders={tableHeaders}>
                  {tableBody}
                </TableList>
              </div>
            </div>
          </div>
        </div>
      </div >
    )
  }
}

export default OrderDetail