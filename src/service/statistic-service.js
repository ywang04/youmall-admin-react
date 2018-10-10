import axios from 'axios';
import Util from '../util';
const _util = new Util();

export default async function statistic() {
  const result = {
    status: -1,
    userCount: '',
    productCount: '',
    orderCount: ''
  };
  try {
    const response = await axios.get('/manage/statistic/base_count.do');
    switch (response.status) {
      case 200:
        switch (response.data.status) {
          case 0:
            result.userCount = response.data.data.userCount;
            result.productCount = response.data.data.productCount;
            result.orderCount = response.data.data.orderCount;
            result.status = 1;
            break;
          case 10:
            result.status = 2;
            _util.doLogin();
            break;
          default:
            result.status = -1;
            break;
        }
        break;
    }
  } catch (error) {
    console.log(error);
    result.status = -1;
  }
  return result;
}

