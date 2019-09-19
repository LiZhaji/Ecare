<template>
  <!-- Navbar-->
      <div class="main-header hidden-print">
        <a class="logo" href="#"><img src="../../images/LOGO(web).png" alt="logo" width="30px"/> Ecare</a>
        <nav class="navbar navbar-static-top">
          <!-- Sidebar toggle button-->
          <!-- <a class="sidebar-toggle" href="#" data-toggle="offcanvas"></a> -->
          <!-- Navbar Right Menu-->
          <div class="navbar-custom-menu">
            <ul class="top-nav">
              <!--Notification Menu  -->
              <li class="dropdown notification-menu" :class="{open: isNote}">
                <a @click="clickNote" class="dropdown-toggle " href="#" data-toggle="dropdown" aria-expanded="false"><i class=" fa fa-bell-o fa-lg"></i></a>
                <ul class="dropdown-menu">
                  <li><a class="media" href="javascript:;"><span class="media-left media-icon"><span class="fa-stack fa-lg"><i class=" fa fa-circle fa-stack-2x text-primary"></i><i class="fa fa-envelope fa-stack-1x fa-inverse"></i></span></span>
                      <div class="media-body"><span class="block">收到一个通知</span><span class="text-muted block">2分钟前</span></div></a></li>
                  <li><a class="media" href="javascript:;"><span class="media-left media-icon"><span class="fa-stack fa-lg"><i class=" fa fa-circle fa-stack-2x text-danger"></i><i class="fa fa-hdd-o fa-stack-1x fa-inverse"></i></span></span>
                      <div class="media-body"><span class="block">收到一个通知</span><span class="text-muted block">10分钟前</span></div></a></li>
                  <li class="not-footer"><a href="#">查看所有消息</a></li>
                </ul>
              </li>
              <!-- User Menu  -->
              <li class="dropdown userMenu" :class="{open: isUser}">
                <a class="dropdown-toggle " @click="clickUser" href="#" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><i class=" fa fa-user fa-lg"></i></a>
                <ul class="dropdown-menu settings-menu" v-show="isUser">
                  <li><a href="#"><i class="fa fa-cog fa-lg"></i> 设置</a></li>
                  <li><a href="#"><i class="fa fa-user fa-lg"></i> 个人中心</a></li>
                  <li><a href="#" @click="exit"><i class="fa fa-sign-out fa-lg"></i> 安全退出</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>
      </div>
</template>

<script>
export default {
  data () {
    return {
      isUser: false,
      isNote: false,
    }
  },
  methods: {
    clickUser () {
      this.isUser = !this.isUser
      this.isNote = false
      console.log('isUser:' + this.isUser + ';isNote:' + this.isNote)
    },
    clickNote () {
      this.isNote = !this.isNote
      this.isUser = false
      console.log('isUser:' + this.isUser + ';isNote:' + this.isNote)
    },
    exit () {
      this.$router.replace('/login')
    }
  },
  mounted () {
    document.addEventListener("click", (event) => {
      // console.log(event.target.nodeName)
      if (event.target.nodeName != 'I' && event.target.nodeName != 'A') {
        this.isUser = false;
        this.isNote = false;
      }
    })
  }
}
</script>

<style>
.main-header .logo img{
  padding-bottom:6px;
  /* line-height: 100%; */
}
</style>
