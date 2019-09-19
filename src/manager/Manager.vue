<template>
  <div id="doctor" class="sidebar-mini fixed">
    <div class="wrapper">
      <main-header/>
      <manager-sidebar/>
      <div class="content-wrapper">
        <keep-alive>
          <router-view/>
        </keep-alive>
      </div>     
    </div>   
  </div>
</template>

<script>
  import MainHeader from '../components/MainHeader/MainHeader.vue'
  import ManagerSidebar from '../components/ManagerSide/ManagerSidebar.vue'
export default {
  components: {
    MainHeader,
    ManagerSidebar
  },
  data () {
    return {
      
    }
  }
}
</script>

<style>
  
</style>
