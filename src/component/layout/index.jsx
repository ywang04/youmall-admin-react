/*
 * @Author: Yang 
 * @Date: 2018-03-06 12:32:27 
 * @Last Modified by: Yang
 * @Last Modified time: 2018-03-07 15:04:42
 */

import React from 'react'
import NavTop from 'component/nav-top/index.jsx'
import NavSide from 'component/nav-side/index.jsx'

import './theme.css'

class Layout extends React.Component {
  constructor() {
    super()
  }

  render() {
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