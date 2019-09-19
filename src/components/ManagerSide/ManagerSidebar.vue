<template>
  <div class="main-sidebar hidden-print">
      <section class="sidebar">
        <div class="user-panel">
          <div class="pull-left image"><img class="img-circle" src="../../images/manager.png" alt="Manager Image"></div>
          <div class="pull-left info">
            <p>{{nowManager.name}}</p>
            <p class="designation">{{nowManager.position}}</p>
          </div>
        </div>
        <!-- Sidebar Menu-->
        <ul class="sidebar-menu">
          <li class="" :class="{active:'/manager/homePage2' === $route.path}"><router-link to="/manager/homePage2"><i class="fa fa-dashboard"></i><span>首页</span><i class="fa fa-angle-right"></i></router-link></li>      
          <li class="" :class="{active:'/manager/notice' === $route.path}"><router-link to="/manager/notice" ><i class="fa fa-edit"></i><span>公告管理</span><i class="fa fa-angle-right"></i></router-link>
          </li>
          <li class="" :class="{active:'/manager/orderings' === $route.path}"><router-link to="/manager/orderings"><i class="fa fa-laptop"></i><span>预约管理</span><i class="fa fa-angle-right"></i></router-link></li>
          <li :class="{active:'/manager/drugOperation' === $route.path}"><router-link to="/manager/drugOperation"><i class="fa fa-pie-chart"></i><span>药品管理</span><i class="fa fa-angle-right"></i></router-link></li>
          <li class="" :class="{active:'/manager/historyOrderings' === $route.path}"><router-link to="/manager/historyOrderings"><i class="fa fa-file-text"></i><span>就诊历史</span><i class="fa fa-angle-right"></i></router-link></li>
          <li class="" :class="{active:'/manager/doctorInfos' === $route.path}"><router-link to="/manager/doctorInfos"><i class="fa fa-users"></i><span>在职医生</span><i class="fa fa-angle-right"></i></router-link></li>
        </ul>
      </section>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapState(['nowManager'])
  },
  methods: {
  }
}
</script>

<style>

</style>
