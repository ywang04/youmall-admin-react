import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PageTitle from 'components/page-title/index.jsx'
import Order from 'service/order-service.jsx'
import SearchBar from 'pages/order/search-bar.jsx'
import TableList from 'util/table-list/index.jsx'
import Pagination from 'util/pagination/index.jsx'
import Util from 'util/util.jsx'

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

  loadOrderList() {
    _order.getOrderList(this.state).then(
      (res) => {
        this.setState(res)
      },
      (errMsg) => {
        this.setState({
          list: []
        })
        if (errMsg === '订单不存在') {
          errMsg = 'Order does not exist.'
        }
        _util.errorTips(errMsg)
      })
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

  // componentWillUnmount() {

  //   const makeCancelable = (promise) => {
  //     let hasCanceled_ = false

  //     const wrappedPromise = new Promise((resolve, reject) => {
  //       promise.then((val) =>
  //         hasCanceled_ ? reject({ isCanceled: true }) : resolve(val)
  //       )
  //       promise.catch((error) =>
  //         hasCanceled_ ? reject({ isCanceled: true }) : reject(error)
  //       )
  //     })

  //     return {
  //       promise: wrappedPromise,
  //       cancel() {
  //         hasCanceled_ = true
  //       },
  //     }
  //   }

  //   const cancelablePromise = makeCancelable(_order.getOrderList(this.state))

  //   cancelablePromise
  //     .promise
  //     .then(() => console.log('resolved'))
  //     .catch((reason) => console.log('isCanceled', reason.isCanceled))

  //   cancelablePromise.cancel() // Cancel the promise
  // }

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