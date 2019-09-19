/*
包含n个接口请求函数的模块 ，即向外暴露n个函数
返回值：promise
 */
import ajax from './ajax'
// const BASE_URL = 'http://172.20.10.2:8000'
const BASE_URL = '/api'

// 1.用户ID和密码登录
// 返回值：id和密码是否匹配的状态，医生是门诊还是药房，医生名字    BASE_URL + '/login/doc/'
export const reqSignIn = (data) => ajax(BASE_URL + '/ums/user/login', data, 'POST')
// ajax.setRequestHeader('Content-Type', 'application/json')
// 2.药品查询，返回药品信息和库存-忽略

// 药房医生
// 3.药品未取订单,请求未完成药品订单列表
export const reqUndoneOrderings = () => ajax(BASE_URL + '')

// 4.历史药品订单，请求已完成药品订单列表
export const reqHistoryDrugOrderings = () => ajax(BASE_URL + '')

// 5.请求药品信息-忽略
export const reqDrugs = () => ajax(BASE_URL + '')

// 6.更新药品库存
export const reqPrescribe = (drugName, num) => ajax(BASE_URL + '', {drugName, num})

// 7.获得一个当前可用空柜号
export const reqEmptyBox = () => ajax(BASE_URL + '')

// 管理员
// 8.请求历史公告-忽略，发布公告
export const publishNotice = () => ajax(BASE_URL + '')

// 9.请求看病预约列表，要求管理员操作完成之后向后台返回列表 reqOrderings
export const reqOrderings = () => ajax(BASE_URL + '/appointment/getall/')

// 10.请求体检预约列表，要求管理员操作完成之后向后台返回列表
export const reqCheckHealthOrderings = () => ajax(BASE_URL + '')

// 11.历史就医订单
export const reqHistoryOrderings = () => ajax(BASE_URL + '')
