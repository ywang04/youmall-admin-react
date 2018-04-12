import React, { Component } from 'react'
import PageTitle from 'components/page-title/index.jsx'
import Util from 'util/util.jsx'
import Pagination from 'util/pagination/index.jsx'
import GetUserList from 'service/user-list-service.jsx'

const _util = new Util()

class UserList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      pageNum: 1,
      initLoading: true
    }
  }

  componentDidMount() {
    this.loadUserList()
  }

  loadUserList() {
    GetUserList(this.state.pageNum).then(
      (res) => {
        this.setState(res, () => { this.setState({ initLoading: false }) })
      },
      (errMsg) => {
        this.setState({
          list: []
        })
        _util.errorTips(errMsg)
      }
    )
  }

  onChangePageNum(pageNum) {
    this.setState({
      pageNum: pageNum
    }, () => {
      this.loadUserList()
    })
  }

  render() {
    let list = this.state.list.map((user, index) => {
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

    let listLoading = (
      <tr>
        <td colSpan="5" className="text-center">
          {this.state.initLoading ? 'Loading...' : 'No Results'}
        </td>
      </tr>
    )

    let userList = this.state.list.length > 0 ? list : listLoading

    return (
      <div id="page-wrapper">
        <PageTitle title="User List" />
        <div className="row">
          <div className="col-md-10">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Registration Date</th>
                </tr>
              </thead>

              <tbody>
                {userList}
              </tbody>
            </table>

          </div>
        </div>
        <Pagination
          current={this.state.pageNum}
          total={this.state.total}
          onChange={(pageNum) => { this.onChangePageNum(pageNum) }} />
      </div>)
  }
}

export default UserList
