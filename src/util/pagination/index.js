import React, { Component } from 'react'
import RcPagination from 'rc-pagination'
import 'rc-pagination/dist/rc-pagination.min.css'

const Pagination = (props) => {
  return (
    <div className="row">
      <div className="col-md-12">
        <RcPagination {...props}
          hideOnSinglePage />
      </div>
    </div>
  )
}

export default Pagination

