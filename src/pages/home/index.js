import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PageTitle from 'components/page-title';
import './index.scss';

class Home extends Component {
  render() {
    const { statistic } = this.props;
    return (
      <div id="page-wrapper">
        <PageTitle title="Home" />
        <div className="row">
          <div className="col-md-4">
            <Link className="box-color brown" to="/user">
              <p className="count">{statistic.userCount}</p>
              <p className="desc">
                <i className="fa fa-user-o"></i>
                <span>Total Users</span>
              </p>
            </Link>
          </div>

          <div className="col-md-4">
            <Link className="box-color green" to="/item">
              <p className="count">{statistic.productCount}</p>
              <p className="desc">
                <i className="fa fa-list"></i>
                <span>Total Items</span>
              </p>
            </Link>
          </div>

          <div className="col-md-4">
            <Link className="box-color blue" to="/order">
              <p className="count">{statistic.orderCount}</p>
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

const mapStateToProps = state => {
  return {
    statistic: state.statistic
  }
}


export default connect(mapStateToProps)(Home);
