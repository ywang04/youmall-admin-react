import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Home from 'pages/home/index.jsx'
import Layout from 'components/layout/index.jsx'

class App extends React.Component {
  render() {
    return (
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/product" component={Home} />
            <Route path="/product-category" component={Home} />
            <Route path="/orders" component={Home} />
            <Route path="/buyers" component={Home} />
          </Switch>
        </Layout>
      </Router>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))

