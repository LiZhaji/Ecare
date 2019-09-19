/*
路由器对象模块
 */
import Vue from 'vue'
import Router from 'vue-router'

// 登录页面
import Login from '../login/Login.vue'
// 医生页面
import Doctor from '../doctor/Doctor.vue'
// 管理员页面
import Manager from '../manager/Manager.vue'

import HomePage1 from '../doctor/doc_views/HomePage/HomePage.vue'
// import SeekDrugs from '../doctor/doc_views/SeekDrugs/SeekDrugs.vue'
// 门诊doctor路由组件
import InquiryAndWrite from '../doctor/doc_views/InquiryAndWrite/InquiryAndWrite.vue'
import Prescribe from '../doctor/doc_views/Prescribe/Prescribe.vue'
// 药房doctor路由组件
import HistoryDrugOrderings from '../doctor/doc_views/HistoryDrugOrderings/HistoryDrugOrderings.vue'
import UndoneDrugOrderings from '../doctor/doc_views/UndoneDrugOrderings/UndoneDrugOrderings.vue'
import DrugOperation1 from '../doctor/doc_views/DrugOperation1/DrugOperation1.vue'

// manager路由组件
import DrugOperation from '../manager/mng_views/DrugOperation/DrugOperation.vue'
import HistoryOrderings from '../manager/mng_views/HistoryOrderings/HistoryOrderings.vue'
import Notice from '../manager/mng_views/Notice/Notice.vue'
import Orderings from '../manager/mng_views/Orderings/Orderings.vue'
import HomePage2 from '../manager/mng_views/HomePage/HomePage.vue'
import DoctorInfos from '../manager/mng_views/DoctorInfos/DoctorInfos.vue'


// 声明使用
Vue.use(Router)

// 创建路由器 路由配置
export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/doctor',
      component: Doctor,
      children: [
        {
          path: '/doctor',
          redirect: '/doctor/homePage1'
        },
        {
          path: '/doctor/homePage1',
          component: HomePage1
        },
        // {
        //   path: '/doctor/seekDrugs',
        //   component: SeekDrugs
        // },
        {
          path: '/doctor/inquiryAndWrite',
          component: InquiryAndWrite
        },
        {
          path: '/doctor/prescribe',
          component: Prescribe
        },
        {
          path: '/doctor/historyDrugOrderings',
          component: HistoryDrugOrderings
        },
        {
          path: '/doctor/undoneDrugOrderings',
          component: UndoneDrugOrderings
        },
        {
          path: '/doctor/drugOperation1',
          component: DrugOperation1
        }
      ],
    },
    {
      path: '/manager',
      component: Manager,
      children: [
        {
          path: '/manager',
          redirect: '/manager/homePage2'
        },
        {
          path: '/manager/homePage2',
          component: HomePage2
        },
        {
          path: '/manager/drugOperation',
          component: DrugOperation
        },
        {
          path: '/manager/historyOrderings',
          component: HistoryOrderings
        },
        {
          path: '/manager/notice',
          component: Notice
        },
        {
          path: '/manager/orderings',
          component: Orderings
        },
        {
          path: '/manager/doctorInfos',
          component: DoctorInfos
        }
      ]
    }
  ]
})
