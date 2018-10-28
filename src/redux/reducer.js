import { createSelector } from 'reselect'

export const ADD_ORDER = 'ADD_ORDER'
export const EDIT_ORDER = 'EDIT_ORDER'
export const EDIT_ORDER_CANCEL = 'EDIT_ORDER_CANCEL'
export const EDIT_ORDER_COMPLIT = 'EDIT_ORDER_COMPLIT'

// const orders = [
//   {
//     date: '01.12.15',
//     id: 'о-15100416',
//     type: 'Опт',
//     customer: 'Белоус Татьяна Васильевна',
//     provider: 'Мясосало',
//     doneDate: '03.12.15',
//     status: 'Done',
//   },
//   {
//     date: '01.12.15',
//     id: 'р-15100454',
//     type: 'Розница',
//     customer: 'Равена Елена Викторовна',
//     provider: 'Мясосало',
//     doneDate: '05.12.15',
//     status: 'Confirm',
//   },
//   {
//     date: '01.12.15',
//     id: 'о-15100234',
//     type: 'Опт',
//     customer: 'Белоус Татьяна Васильевна',
//     provider: 'Чикаладкэ',
//     doneDate: '11.12.15',
//     status: 'Expired',
//   },
//   {
//     date: '01.12.15',
//     id: 'р-15100416',
//     type: 'Розница',
//     customer: 'Белоус Татьяна Васильевна',
//     provider: 'Чикаладкэ',
//     doneDate: '15.12.15',
//     status: 'Failed',
//   },
// ]

const initialState = {
  orders: [],
  changeOrderId: null,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER:
      return { ...state, orders: state.orders.concat(action.payload) }
    case EDIT_ORDER:
      return { ...state, changeOrderId: action.id }
    case EDIT_ORDER_CANCEL:
      return { ...state, changeOrderId: null }
    case EDIT_ORDER_COMPLIT:
      const items = state.orders.map(order => {
        if (order.id === action.id) {
          return { ...order, ...action.payload }
        }
        return order
      })
      return { ...state, orders: items, changeOrderId: null }
    default:
      return state
  }
}

export const addOrder = data => ({
  type: ADD_ORDER,
  payload: data,
})

export const editOrder = id => ({
  type: EDIT_ORDER,
  id,
})

export const editOrderCompomplit = (id, payload) => ({
  type: EDIT_ORDER_COMPLIT,
  id,
  payload,
})

export const editOrderCancel = () => ({
  type: EDIT_ORDER_CANCEL,
})

export const getOrders = state => state.orders
export const getEditableOrderId = state => state.changeOrderId
export const getProviders = createSelector(getOrders, items =>
  items.reduce((resArray, item) => {
    if (resArray.indexOf(item.provider) < 0) {
      resArray.push(item.provider)
    }
    return resArray
  }, [])
)

export default reducer
