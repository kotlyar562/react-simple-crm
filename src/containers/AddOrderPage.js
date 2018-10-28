import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import moment from 'moment'
import 'moment/locale/ru'
import AddOrderForm from './AddOrderForm'
import {
  addOrder,
  getOrders,
  getProviders,
  editOrderCompomplit,
  getEditableOrderId,
} from '../redux/reducer'

moment.locale('ru')

class AddOrderPage extends Component {
  constructor(props) {
    super(props)
    const { changeOrderId, orders } = props

    const data = changeOrderId
      ? orders.filter(item => item.id === changeOrderId)[0]
      : null

    this.state = {
      errors: null,
      data,
    }
  }

  getOrderId = (date, type) => {
    const { changeOrderId } = this.props
    const ordersInMonth = this.props.orders.filter(item => {
      const year = moment(item.date).year()
      const month = moment(item.date).month()
      return moment(date).year() === year && moment(date).month() === month
    })
    const typeOrder = type[0].toLowerCase()
    const dateOrder = moment(date).format('YYMMDD')
    const lengthOrders = changeOrderId
      ? changeOrderId.slice(8)
      : ordersInMonth.length + 1
    return `${typeOrder}-${dateOrder}${lengthOrders}`
  }

  checkFields = data => {
    let errors = {
      date: [],
      customer: [],
      provider: [],
      doneDate: [],
    }
    let findError = false
    for (let field in data) {
      if (!data[field]) {
        errors[field].push('Это обязательное поле!')
        findError = true
      }
    }
    if (!moment(data['date']).isValid()) {
      errors['date'].push('Некорректные данные. Выберите дату.')
      findError = true
    }
    if (!moment(data['doneDate']).isValid()) {
      errors['doneDate'].push('Некорректные данные. Выберите дату.')
      findError = true
    }
    if (findError) {
      this.setState({ errors })
      return true
    } else {
      this.setState({ errors: null })
      return false
    }
  }

  submitForm = data => {
    const { changeOrderId, addOrder, editOrderCompomplit } = this.props
    const findError = this.checkFields(data)
    if (!findError) {
      if (changeOrderId) {
        editOrderCompomplit(changeOrderId, data)
      } else {
        addOrder(data)
      }
      this.props.history.push('/orders')
    }
  }

  render() {
    const { providers } = this.props
    return (
      <AddOrderForm
        providers={providers}
        getOrderId={this.getOrderId}
        submitForm={this.submitForm}
        errors={this.state.errors}
        data={this.state.data}
      />
    )
  }
}

const mapStateToProps = state => ({
  providers: getProviders(state),
  orders: getOrders(state),
  changeOrderId: getEditableOrderId(state),
})

const mapDispatchToProps = dispatch => ({
  addOrder: data => dispatch(addOrder(data)),
  editOrderCompomplit: (id, data) => dispatch(editOrderCompomplit(id, data)),
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AddOrderPage)
)
