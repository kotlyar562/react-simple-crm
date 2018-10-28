import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import OrderList from '../components/OrderList'
import {
  getOrders,
  editOrder,
  editOrderCancel,
  editOrderCompomplit,
} from '../redux/reducer'
import moment from 'moment'
import 'moment/locale/ru'

moment.locale('ru')

class OrdersPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      orders: props.orders,
    }
  }
  componentDidMount() {
    this.props.editOrderCancel()
    const now = moment()
    this.state.orders.forEach(order => {
      if (order.status === 'Confirm' && now.diff(moment(order.doneDate)) > 0) {
        this.props.editOrderCompomplit(order.id, {
          ...order,
          status: 'Expired',
        })
      }
    })
  }

  editOrderPossibility = order =>
    moment(order.doneDate).diff(moment(order.date), 'days') >= 2

  editOrder = id => () => {
    this.props.editOrder(id)
    this.props.history.push('/add_order')
  }

  sortFunc = field => {
    return (a, b) => {
      if (a[field] > b[field]) return 1
      if (a[field] < b[field]) return -1
      return 0
    }
  }

  sortedField = (field, rev = false) => () => {
    let orders = [...this.state.orders]
    orders.sort(this.sortFunc(field))
    if (rev) orders.reverse()
    this.setState({
      orders,
    })
  }

  render() {
    const { orders } = this.state
    return (
      <OrderList
        orders={orders}
        editOrderPossibility={this.editOrderPossibility}
        editOrder={this.editOrder}
        sortedField={this.sortedField}
      />
    )
  }
}

const mapStateToProps = state => ({
  orders: getOrders(state),
})

const mapDispatchToProps = dispatch => ({
  editOrder: id => dispatch(editOrder(id)),
  editOrderCancel: () => dispatch(editOrderCancel()),
  editOrderCompomplit: (id, data) => dispatch(editOrderCompomplit(id, data)),
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(OrdersPage)
)
