import React, { Component } from 'react';
import './search-bar.scss';

class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchType: 'productId',
      searchKeyword: ''
    }
  }

  onFormSubmit(event) {
    event.preventDefault()
  }

  onValueChange(event) {
    let name = event.target.name
    let value = event.target.value.trim()
    this.setState({ [name]: value })
  }

  onButtonSearch() {
    this.props.onButtonSearch(this.state.searchType, this.state.searchKeyword)
  }

  render() {
    return (
      <div className="row search-wrap">
        <div className="col-md-12">
          <form className="form-inline" onSubmit={this.onFormSubmit}>
            <div className="form-group">
              <select className="form-control" name="searchType" onChange={(event) => {
                this.onValueChange(event)
              }}>
                <option value="productId">By ID</option>
                <option value="productName">By Name</option>
              </select>
            </div>

            <div className="form-group">
              <input type="text" className="form-control" name="searchKeyword" placeholder="Keyword" onChange={(event) => {
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
