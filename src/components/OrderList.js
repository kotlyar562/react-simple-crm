import React from 'react'
import moment from 'moment'
import 'moment/locale/ru'

moment.locale('ru')

const StatusLabel = ({ status }) => {
  const cl =
    status === 'Done'
      ? 'label label-done'
      : status === 'Confirm'
        ? 'label label-confirm'
        : status === 'Expired'
          ? 'label label-expired'
          : 'label label-failed'
  return <div className={cl}>{status}</div>
}

const OrderList = ({ orders, editOrderPossibility, editOrder }) => (
  <div className="table-container">
    <div className="table-header">Простая таблица</div>
    <table className="table">
      <thead>
        <tr>
          <th>Дата</th>
          <th>ID заказа</th>
          <th>Тип заказа</th>
          <th>Заказчик</th>
          <th>Поставщик</th>
          <th>Выполнен</th>
          <th>Статус</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {orders.map((order, index) => (
          <tr key={`order${index}-${order.id}`}>
            <td>{moment(order.date).format('DD.MM.YYYY')}</td>
            <td>{order.id}</td>
            <td>{order.type}</td>
            <td>{order.customer}</td>
            <td>{order.provider}</td>
            <td>{moment(order.doneDate).format('DD.MM.YYYY')}</td>
            <td>
              <StatusLabel status={order.status} />
            </td>
            <td>
              {editOrderPossibility(order) && (
                <div className="edit-button" onClick={editOrder(order.id)}>
                  &#9998;
                </div>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

export default OrderList
