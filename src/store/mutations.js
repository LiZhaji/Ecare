// 包含多个有 action 触发直接更新state的方法的对象
import { GET_DRUGS, GET_ORDERINGS, GET_DRUG_ORDERINGS } from './mutation-types'

export default {
  // 保存获得的药品信息数据drugs
  [GET_DRUGS] (state, drugs) {
    state.drugs = drugs
  },
  // 保存获得的未取药品订单数据undoneDrugOrderings
  [GET_ORDERINGS] (state, undoneDrugOrderings) {
    state.undoneDrugOrderings = undoneDrugOrderings
  },
  // 保存获得的历史药品订单信息drugOrderings
  [GET_DRUG_ORDERINGS] (state, drugOrderings) {
    state.drugOrderings = drugOrderings
  }
}
