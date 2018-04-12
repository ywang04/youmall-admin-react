import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PageTitle from 'components/page-title/index.jsx'
import Util from 'util/util.jsx'
import Count from 'service/count-service.jsx'

const _count = new Count()
const _util = new Util()

import './index.scss'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userCount: '-',
      itemCount: '-',
      orderCount: '-'
    }
  }

  componentDidMount() {
    this.fetchCount()
  }

  fetchCount() {
    _count.statistic().then(
      (res) => {
        this.setState({
          userCount: res.userCount,
          itemCount: res.productCount,
          orderCount: res.orderCount
        })
      },
      (errMsg) => {
        _util.errorTips(errMsg)
      }
    )
  }

  render() {
    return (
      <div id="page-wrapper">
        <PageTitle title="Home" />
        <div className="row">
          <div className="col-md-4">
            <Link className="box-color brown" to="/user">
              <p className="count">{this.state.userCount}</p>
              <p className="desc">
                <i className="fa fa-user-o"></i>
                <span>Total Users</span>
              </p>
            </Link>
          </div>

          <div className="col-md-4">
            <Link className="box-color green" to="/item">
              <p className="count">{this.state.itemCount}</p>
              <p className="desc">
                <i className="fa fa-list"></i>
                <span>Total Items</span>
              </p>
            </Link>
          </div>

          <div className="col-md-4">
            <Link className="box-color blue" to="/order">
              <p className="count">{this.state.orderCount}</p>
              <p className="desc">
                <i className="fa fa-check-square-o"></i>
                <span>Total Orders</span>
              </p>
            </Link>
          </div>

        </div>
      </div >
    )
  }
}

export default Home
