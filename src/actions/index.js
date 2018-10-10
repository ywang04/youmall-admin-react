import { statistic, Category } from '../service';
import Util from '../util';
const _util = new Util();

export const Definitions = {
  PopulateStatisticData: 'populate_statistic_data',
  PopulateCategoryList: 'populate_category_List',
}

export function mapDispatchToProps(dispatch) {
  return {
    populateStatisticData: () => {

      statistic().then(serviceResult => {
        console.log(serviceResult);
        if (serviceResult.status === 1) {
          dispatch({
            type: Definitions.PopulateStatisticData,
            payload: serviceResult
          })
        } else {
          _util.showServerError(serviceResult.data.data || serviceResult.data.msg);
        }
      })
    },

    populateCategoryList: (parentCategoryId) => {
      _category.loadCategoryList({ parentCategoryId })
        .then(serviceResult => {
          if (serviceResult.status === 1) {
            dispatch({
              type: Definitions.PopulateCategoryList,
              payload: serviceResult.categoryList
            })
          }
        })
    }
  }
}