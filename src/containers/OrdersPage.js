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
  componentDidMount() {
    this.props.editOrderCancel()
    const now = moment()
    this.props.orders.forEach(order => {
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

  render() {
    const { orders } = this.props
    return (
      <OrderList
        orders={orders}
        editOrderPossibility={this.editOrderPossibility}
        editOrder={this.editOrder}
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
