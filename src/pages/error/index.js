import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PageTitle from 'components/page-title';

const Error = () => {
  return (
    <div id="page-wrapper">
      <PageTitle title="Error!" />
      <div className="row">
        <div className="col-md-12">
          <span>Path Not Found, </span>
          <Link to="/">Go Back to Home page</Link>
        </div>
      </div>
    </div>
  )
}

export default Error

