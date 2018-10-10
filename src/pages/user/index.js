import React, { Component } from 'react';
import PageTitle from 'components/page-title';
import TableList from 'util/table-list';
import Pagination from 'util/pagination';
import Util from 'util';
import GetUserList from 'service/user-service.js';

const _util = new Util()

class UserList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      pageNum: 1
    }
  }

  componentDidMount() {
    this.loadUserList()
  }

  loadUserList() {
    GetUserList(this.state.pageNum).then(
      (res) => {
        this.setState(res)
      },
      (errMsg) => {
        this.setState({
          list: []
        })
        _util.errorTips(errMsg)
      })
  }

  onPageNumChange(pageNum) {
    this.setState({
      pageNum: pageNum
    }, () => {
      this.loadUserList()
    })
  }

  render() {
    let listBody = this.state.list.map((user, index) => {
      return (
        <tr key={user.id}>
          <td>{user.id}</td>
          <td>{user.username}</td>
          <td>{user.email}</td>
          <td>{user.phone}</td>
          <td>{new Date(user.createTime).toLocaleString()}</td>
        </tr>
      )
    })

    let tableHeaders = [
      { name: 'ID', width: '10%' },
      { name: 'Username', width: '20%' },
      { name: 'Email', width: '20%' },
      { name: 'Phone', width: '20%' },
      { name: 'Registration Date', width: '20%' }
    ]

    return (
      <div id="page-wrapper">
        <PageTitle title="User List" />
        <TableList tableHeaders={tableHeaders}>
          {listBody}
        </TableList>
        <Pagination
          current={this.state.pageNum}
          total={this.state.total}
          onChange={(pageNum) => { this.onPageNumChange(pageNum) }} />
      </div>)
  }
}

export default UserList
