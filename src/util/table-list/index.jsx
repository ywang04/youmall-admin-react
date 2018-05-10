import React, { Component } from 'react'

class TableList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      initLoading: true
    }
  }

  componentWillReceiveProps() {
    this.setState({
      initLoading: false
    })
  }

  render() {
    let tableHeaders = this.props.tableHeaders.map((tableHeader, index) => {
      if (typeof tableHeader === 'object') {
        return (
          <th key={index} width={tableHeader.width}>
            {tableHeader.name}
          </th >
        )
      } else if (typeof tableHeader === 'string') {
        return (
          <th key={index}>
            {tableHeader}
          </th >
        )
      }
    })

    let listBody = this.props.children

    let listInfo = (
      <tr>
        <td colSpan={this.props.tableHeaders.length} className="text-center">
          {this.state.initLoading ? 'Loading...' : 'No Records...'}
        </td>
      </tr>
    )

    let tableBody = listBody.length > 0 ? listBody : listInfo

    return (
      <div className="row" >
        <div className="col-md-12">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                {tableHeaders}
              </tr>
            </thead>

            <tbody>
              {tableBody}
            </tbody>

          </table>
        </div>
      </div>
    )
  }
}

export default TableList