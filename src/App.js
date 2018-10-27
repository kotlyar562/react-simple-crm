import React, { Component } from 'react'
import { BrowserRouter as Router, Route, NavLink, Link } from 'react-router-dom'

const HomePage = () => (
  <div>
    <div className="start-block">Lorem ipsum...</div>
  </div>
)
const OrdersPage = () => (
  <div>
    <div className="start-block">Orders</div>
  </div>
)
const AddOrderPage = () => (
  <div>
    <div className="start-block">Add Order</div>
  </div>
)

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <header>
            <ul className="navigation">
              <li>
                <NavLink exact to="/" activeClassName="active">
                  Start
                </NavLink>
              </li>
              <li>
                <NavLink to="/orders" activeClassName="active">
                  Orders
                </NavLink>
              </li>
              <NavLink to="/add_order" activeClassName="active">
                Add Order
              </NavLink>
            </ul>
            <Link to="/" className="login">
              Login
            </Link>
            <div className="clearfix" />
          </header>
          <div className="content">
            <Route exact path="/" component={HomePage} />
            <Route path="/orders" component={OrdersPage} />
            <Route path="/add_order" component={AddOrderPage} />
          </div>
        </div>
      </Router>
    )
  }
}

export default App
