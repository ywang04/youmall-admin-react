import React, { Component } from 'react';
import Order from 'service/order-service.js';
import Util from 'util/util.js';

const _order = new Order()
const _util = new Util()

class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      orderNo: ''
    }
  }
  onFormSubmit(event) {
    event.preventDefault()
  }

  onValueChange(event) {
    let newValue = event.target.value.trim()
    this.setState({
      orderNo: newValue
    })
  }

  onButtonSearch() {
    this.props.searchOrder(this.state.orderNo)
  }

  render() {
    return (
      <div className="row search-wrap">
        <div className="col-md-12">
          <form className="form-inline" onSubmit={this.onFormSubmit}>
            <div className="form-group">
              <select className="form-control">
                <option value="productId">By Order</option>
              </select>
            </div>

            <div className="form-group">
              <input type="text" className="form-control" placeholder="Order Number" onChange={(event) => {
                this.onValueChange(event)
              }} />
            </div>

            <button className="btn btn-default" onClick={() => {
              this.onButtonSearch()
            }}>Search</button>
          </form>

        </div>
      </div>
    )
  }

}

export default SearchBar