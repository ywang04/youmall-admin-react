import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PageTitle from 'components/page-title';
import Order from 'service/order-service.js';
import SearchBar from 'pages/order/search-bar.js';
import TableList from 'util/table-list';
import Pagination from 'util/pagination';
import Util from 'util/util.js';

const _util = new Util()
const _order = new Order()

class OrderList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pageNum: 1,
      list: [],
      loadType: 'list'  //list or search
    }
  }

  componentDidMount() {
    this.loadOrderList()
  }

  componentWillUnmount() {
    if (this.loadingData) {
      this.loadingData.cancel()
    }
  }

  loadOrderList() {
    this.loadingDate = _util.makeCancelablePromise(
      _order.getOrderList(this.state)
    )
    this.loadingDate.promise.then(
      (res) => {
        this.setState(res)
      },
      (err) => {
        if (err.isCanceled) {
          return
        } else {
          this.setState({
            list: []
          })
          if (err === '订单不存在') {
            err = 'Order does not exist.'
          }
          _util.errorTips(err)
        }
      }
    )
  }

  onButtonSearch(orderNo) {
    let loadType = orderNo === '' ? 'list' : 'search'
    this.setState({
      loadType: loadType,
      pageNum: 1,
      orderNo: orderNo
    }, () => this.loadOrderList())
  }

  onPageNumChange(current) {
    this.setState({
      pageNum: current
    }, () => { this.loadOrderList() })
  }

  render() {
    let tableHeaders = ['Order', 'Recipient', 'Status', 'Amount', 'Date', 'Action']
    let tableBody = this.state.list.map((order, index) => {
      return (
        <tr key={order.orderNo}>
          <td>
            <Link to={`/order/detail/${order.orderNo}`}>{order.orderNo}</Link>
          </td>
          <td>{order.receiverName}</td>
          <td>{order.statusDesc}</td>
          <td>$ {order.payment}</td>
          <td>{order.createTime}</td>
          <td>
            <Link to={`/order/detail/${order.orderNo}`}>View</Link>
          </td>
        </tr>
      )
    })
    return (
      <div id="page-wrapper">
        <PageTitle title="Order List" />
        <SearchBar searchOrder={(orderNo) => { this.onButtonSearch(orderNo) }} />
        <TableList tableHeaders={tableHeaders}>
          {tableBody}
        </TableList>
        <Pagination
          current={this.state.pageNum}
          total={this.state.total}
          onChange={(current) => { this.onPageNumChange(current) }} />
      </div>
    )
  }
}

export default OrderList