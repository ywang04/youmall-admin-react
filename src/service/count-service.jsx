import Util from 'util/util.jsx'
const _util = new Util()

class Count {
  statistic() {
    return _util.request({
      url: '/manage/statistic/base_count.do'
    })
  }
}

export default Count