import React, { Component } from 'react'
import PageTitle from 'components/page-title/index.jsx'


class Home extends Component {
  render() {
    return (
      <div id="page-wrapper">
        <PageTitle title="Home" />

        <div className="row">
          <div className="col-md-12">
            body
          </div>
        </div>
      </div>
    )
  }
}

export default Home
