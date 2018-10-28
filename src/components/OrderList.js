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

const SortedButtons = ({ field, sortedField }) => (
  <>
    <div className="sorted-button" onClick={sortedField(field, true)}>
      ▼
    </div>
    <div className="sorted-button" onClick={sortedField(field)}>
      ▲
    </div>
  </>
)

const OrderList = ({
  orders,
  editOrderPossibility,
  editOrder,
  sortedField,
}) => (
  <div className="table-container">
    <div className="table-header">Простая таблица</div>
    <table className="table">
      <thead>
        <tr>
          <th>
            Дата <SortedButtons field="date" sortedField={sortedField} />
          </th>
          <th>
            ID заказа <SortedButtons field="id" sortedField={sortedField} />
          </th>
          <th>
            Тип заказа <SortedButtons field="type" sortedField={sortedField} />
          </th>
          <th>
            Заказчик{' '}
            <SortedButtons field="customer" sortedField={sortedField} />
          </th>
          <th>
            Поставщик{' '}
            <SortedButtons field="provider" sortedField={sortedField} />
          </th>
          <th>
            Выполнен{' '}
            <SortedButtons field="doneDate" sortedField={sortedField} />
          </th>
          <th>
            Статус <SortedButtons field="status" sortedField={sortedField} />
          </th>
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
