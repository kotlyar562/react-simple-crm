import React, { Component } from 'react'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import 'moment/locale/ru'
import 'react-datepicker/dist/react-datepicker.css'

moment.locale('ru')

export default class AddOrderForm extends Component {
  constructor(props) {
    super(props)
    const data = props.data
    const ininitialState = {
      date: moment(),
      type: 'Опт',
      customer: '',
      provider: '',
      doneDate: moment().add(7, 'days'),
      status: 'Confirm',
      id: props.getOrderId(moment(), 'Опт'),
    }
    this.state = { ...ininitialState, ...data }
  }

  setOrderId = () => {
    this.setState({
      id: this.props.getOrderId(this.state.date, this.state.type),
    })
  }

  formChange = field => e => {
    if (field === 'date' || field === 'doneDate') {
      this.setState(
        {
          [field]: e,
        },
        this.setOrderId
      )
    } else {
      this.setState(
        {
          [field]: e.target.value,
        },
        this.setOrderId
      )
    }
  }

  submitForm = e => {
    this.props.submitForm(this.state)
    e.preventDefault()
  }

  render() {
    const { providers, errors } = this.props
    return (
      <div>
        Заказ {this.state.id}
        <div className="form-container">
          <form onSubmit={this.submitForm}>
            <label>
              Дата заказа:
              <DatePicker
                selected={this.state.date}
                onChange={this.formChange('date')}
                todayButton="Сегодня"
                dateFormat="DD.MM.YYYY"
                disabled={!!this.props.data}
              />
            </label>
            {errors &&
              errors['date'].length > 0 && (
                <div className="form-error-container">
                  {errors['date'].map((error, index) => (
                    <div key={`dateError-${index}`}>{error}</div>
                  ))}
                </div>
              )}
            <label>
              Тип заказа:
              <select
                value={this.state.type}
                onChange={this.formChange('type')}
              >
                <option value="Опт">Опт</option>
                <option value="Розница">Розница</option>
              </select>
            </label>

            <label>
              ID заказа
              <input value={this.state.id} disabled />
            </label>

            <label>
              Заказчик:
              <input
                type="text"
                value={this.state.customer}
                onChange={this.formChange('customer')}
              />
            </label>
            {errors &&
              errors['customer'].length > 0 && (
                <div className="form-error-container">
                  {errors['customer'].map((error, index) => (
                    <div key={`customerError-${index}`}>{error}</div>
                  ))}
                </div>
              )}

            <label>
              Поставщик:
              <input
                type="text"
                value={this.state.provider}
                list="providersList"
                onChange={this.formChange('provider')}
              />
            </label>
            {errors &&
              errors['provider'].length > 0 && (
                <div className="form-error-container">
                  {errors['provider'].map((error, index) => (
                    <div key={`providerError-${index}`}>{error}</div>
                  ))}
                </div>
              )}
            <datalist id="providersList">
              {providers.map((item, index) => (
                <option value={item} key={`provider-${index}`} />
              ))}
            </datalist>

            <label>
              Дата выполнения заказа:
              <DatePicker
                selected={this.state.doneDate}
                onChange={this.formChange('doneDate')}
                dateFormat="DD.MM.YYYY"
              />
            </label>
            {errors &&
              errors['doneDate'].length > 0 && (
                <div className="form-error-container">
                  {errors['doneDate'].map((error, index) => (
                    <div key={`doneDateError-${index}`}>{error}</div>
                  ))}
                </div>
              )}
            <label>
              Статус:
              <select
                value={this.state.status}
                onChange={this.formChange('status')}
              >
                <option value="Confirm">Подтвержден</option>
                <option value="Done">Выполнен</option>
                <option value="Fail">Провален</option>
                <option value="Expired">Просрочен</option>
              </select>
            </label>
            <input type="submit" className="submit-button" value="СОХРАНИТЬ" />
          </form>
        </div>
      </div>
    )
  }
}
