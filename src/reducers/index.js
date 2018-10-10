import { combineReducers } from 'redux';
import statisticReducer from './StatisticReducer';
import categoryReducer from './CategoryReducer';

export default combineReducers({
  statistic: statisticReducer,
  category: categoryReducer,
})