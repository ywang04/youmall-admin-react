import { Definitions } from '../actions';

export default function statisticReducer(state = {
  userCount: '-',
  itemCount: '-',
  orderCount: '-'
}, action) {
  switch (action.type) {
    case Definitions.PopulateStatisticData:
      state = {
        ...state,
        userCount: action.payload.userCount,
        productCount: action.payload.productCount,
        orderCount: action.payload.orderCount
      }
      break;
  }
  return { ...state };
}