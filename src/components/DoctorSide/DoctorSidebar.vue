<template>
  <div class="main-sidebar hidden-print">
      <section class="sidebar">
        <div class="user-panel">
          <div class="pull-left image"><img class="img-circle" src="../../images/doctor.jpg" alt="Doctor Image"></div>
          <div v-show="isDrugDoctor" class="pull-left info">
            <p>{{nowDrugDoctor.name}}</p>
            <p class="designation">{{nowDrugDoctor.position}}</p>
          </div>
          <div v-show="!isDrugDoctor" class="pull-left info">
            <p>{{nowPreDoctor.name}}</p>
            <p class="designation">{{nowPreDoctor.position}}</p>
          </div>
        </div>
        <!-- Sidebar Menu-->
        <ul class="sidebar-menu">      
          <li :class="{active:'/doctor/homePage1' === $route.path}"><router-link to="/doctor/homePage1" ><i class="fa fa-dashboard"></i><span>首页</span><i class="fa fa-angle-right"></i></router-link></li>
          <li :class="{active: '/doctor/drugOperation1' === $route.path}"><router-link to="/doctor/drugOperation1"><i class="fa fa-laptop"></i><span>药品查询</span><i class="fa fa-angle-right"></i></router-link></li>
          <!-- <li class="" :class="{active: '/doctor/seekDrugs' === $route.path}"><router-link to="/doctor/seekDrugs"><i class="fa fa-laptop"></i><span>药品查询</span><i class="fa fa-angle-right"></i></router-link></li> -->

          <li :class="{active: '/doctor/inquiryAndWrite' === $route.path }" v-show="!isDrugDoctor"><router-link to="/doctor/inquiryAndWrite"><i class="fa fa-edit"></i><span>问诊</span><i class="fa fa-angle-right"></i></router-link></li>
          <li :class="{active: '/doctor/prescribe' === $route.path}" v-show="!isDrugDoctor"><router-link to="/doctor/prescribe"><i class="fa fa-pie-chart"></i><span>开药</span><i class="fa fa-angle-right"></i></router-link></li>

          <li :class="{active: '/doctor/undoneDrugOrderings' === $route.path}" v-show="isDrugDoctor"><router-link to="/doctor/undoneDrugOrderings"><i class="fa fa-th-list"></i><span>未取订单</span><i class="fa fa-angle-right"></i></router-link></li>
          <li :class="{active: '/doctor/historyDrugOrderings' === $route.path}" v-show="isDrugDoctor"><router-link to="/doctor/historyDrugOrderings"><i class="fa fa-file-text"></i><span>历史订单</span><i class="fa fa-angle-right"></i></router-link></li>
        </ul>
      </section>
    </div>
</template>

<script>
import Bus from '../../bus.js'
import { mapState } from 'vuex'

export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapState(['nowDrugDoctor', 'isDrugDoctor', 'nowPreDoctor'])
  }
}
</script>

<style>

</style>
