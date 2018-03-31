import React, { Component } from 'react'
import NavTop from 'components/nav-top/index.jsx'
import NavSide from 'components/nav-side/index.jsx'

import './theme.css'

class Layout extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    console.log(this.props.children)
    return (
      <div id="wrapper">
        <NavTop />
        <NavSide />
        {this.props.children}
      </div>
    )
  }
}

export default Layout