// 包含多个通过 commit 间接更新state方法的对象
import { GET_DRUGS, GET_ORDERINGS, GET_DRUG_ORDERINGS } from './mutation-types'
import { reqDrugs, reqUndoneOrderings, reqHistoryDrugOrderings } from '../api/index'

export default {
  // 异步获取药品信息drugs
  async get_drugs ({commit, state}) {
    const result = await reqDrugs()
    if (result.code === 200) {
      const drugs = JSON.stringify(result.data)
      commit(GET_DRUGS, {drugs})
    } else {
      state.isNetworkError = true
    }
  },
  // 异步获取undoneDrugOrderings
  async get_orderings ({commit}) {
    const result = await reqUndoneOrderings()
    if (result.code === 200) {
      // 成功则保存数据
      const undoneDrugOrderings = JSON.stringify(result.data)
      commit(GET_ORDERINGS, {undoneDrugOrderings})
    } else {
      alert('获取未完成订单失败！')
    }
  },
  // 异步获取drugOrderings
  async get_drug_orderings ({commit, state}) {
    const result = await reqHistoryDrugOrderings()
    if (result.code === 200) {
      const drugOrderings = JSON.stringify(result.data)
      commit(GET_DRUG_ORDERINGS, {drugOrderings})
    } else {
      state.isNetworkError = true
    }
  }

}
