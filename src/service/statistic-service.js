import axios from 'axios';

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
        result.status = 1;
        result.userCount = response.data.data.userCount;
        result.productCount = response.data.data.productCount;
        result.orderCount = response.data.data.orderCount;
        break;
      default:
        result.status = -1;
    }
  } catch (error) {
    console.log(error);
    result.status = -1;
  }
  return result;
}

