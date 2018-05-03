import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PageTitle from 'components/page-title/index.jsx'
import SearchBar from './search-bar.jsx'
import TableList from 'util/table-list/index.jsx'
import Pagination from 'util/pagination/index.jsx'
import Item from 'service/item-service.jsx'
import Util from 'util/util.jsx'
import './index.scss'

const _item = new Item()
const _util = new Util()

class ItemList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      pageNum: 1,
      listType: 'load'
    }
  }

  componentDidMount() {
    this.loadItemList()
  }

  loadItemList() {
    let listParam = {}
    listParam.pageNum = this.state.pageNum
    listParam.listType = this.state.listType
    if (this.state.listType === 'search') {
      listParam.searchType = this.state.searchType
      listParam.searchKeyword = this.state.searchKeyword
    }
    _item.getItemList(listParam).then((res) => {
      this.setState(res)
    }, (errMsg) => {
      this.setState({ list: [] })
      _util.errorTips(errMsg)
    })
  }

  onButtonSearch(searchType, searchKeyword) {
    let listType = searchKeyword === '' ? 'load' : 'search'
    this.setState({
      listType: listType,
      pageNum: 1,
      searchType: searchType,
      searchKeyword: searchKeyword
    }, () => {
      this.loadItemList()
    })
  }

  onItemStatusChange(itemId, currStatus) {
    let confirmTips = currStatus === 1 ? 'Are you sure you want to remove this listing?' : 'Are you sure you want to list this item?'
    let newStatus = currStatus === 1 ? 2 : 1
    let itemInfo = {
      productId: itemId,
      status: newStatus
    }
    if (window.confirm(confirmTips)) {
      _item.changeItemStatus(itemInfo).then((res) => {
        this.loadItemList()
      }, (errMsg) => {
        _util.errorTips(errMsg)
      })
    }
  }

  onPageNumChange(pageNum) {
    this.setState({
      pageNum: pageNum
    }, () => {
      this.loadItemList()
    })
  }

  render() {
    let listBody = this.state.list.map((item, index) => {
      return (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.name}</td>
          <td>$ {item.price}</td>
          <td>
            <span id="id-span-status">{
              item.status === 1 ? 'Active' : 'Inactive'
            }</span>
            <button type="button" className="btn btn-xs btn-warning" onClick={() => {
              this.onItemStatusChange(item.id, item.status)
            }}>
              {
                item.status === 1 ? 'Inactive' : 'Active'
              }
            </button>
          </td>
          <td>
            <Link className="action" to={`/item/detail/${item.id}`}>View</Link>
            <Link className="action" to={`/item/save/${item.id}`}>Edit</Link>
          </td>
        </tr>
      )
    })

    let tableHeaders = [
      {
        name: 'ID',
        width: '10%'
      }, {
        name: 'Item Info',
        width: '50%'
      }, {
        name: 'Price',
        width: '10%'
      }, {
        name: 'Status',
        width: '15%'
      }, {
        name: 'Action',
        width: '15%'
      }
    ]

    return (
      <div id="page-wrapper">
        <PageTitle title="Item List">
          <div className="page-header-right">
            <Link to="/item/save" className="btn btn-primary">
              <i className="fa fa-plus"></i>
              <span className="span-add">Add Item</span>
            </Link>
          </div>
        </PageTitle>
        <SearchBar onButtonSearch={(searchType, searchKeyword) => {
          this.onButtonSearch(searchType, searchKeyword)
        }} />
        <TableList tableHeaders={tableHeaders}>
          {listBody}
        </TableList>
        <Pagination current={this.state.pageNum} total={this.state.total} onChange={(pageNum) => {
          this.onPageNumChange(pageNum)
        }} />
      </div >
    )
  }
}

export default ItemList
