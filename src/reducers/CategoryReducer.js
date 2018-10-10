import { Definitions } from '../actions';

export default function categoryReducer(state = {
  categoryList: [],
}, action) {
  switch (action.type) {
    case Definitions.PopulateCategoryList:
      state = {
        ...state,
        categoryList: action.payload
      }
      break;
  }

  return { ...state };

}