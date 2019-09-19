<template>
  <div>
    <div class="page-title">
      <div>
        <span id="homePage"><i class="fa fa-edit"></i>   公告管理</span>
        <!-- <p>此页介绍xxx校医院基本信息</p> -->
      </div>
      <div>
        <ul class="breadcrumb">
          <li><i class="fa fa-home fa-lg"></i></li>
          <li><a href="#">公告管理</a></li>
        </ul>
      </div>
    </div>
    <div class="col-md-12 notice" :class="{opacity: isPublishing || isPublishOk || isPublishWoring}">
      <div class="card">
        <div class="card-body">
          <table class="table table-hover">
            <thead>
              <tr>
                <th class="noticeId">#编号</th>
                <th class="noticeAuthor">发布人</th>
                <th class="noticeDate">发布日期</th>
                <th class="noticeContent">内容</th>
              </tr>
            </thead>
            <tbody >
              <tr v-for="(item,index) in notices" :key="index">
                <td>{{item.id}}</td>
                <td>{{item.author}}</td>
                <td>{{item.date}}</td>
                <td>{{item.content}}</td>
              </tr>
            </tbody>
          </table>
          <!-- <span>编号：</span><input type="text" class="noticeText2" v-model="newNotice.id">
          <span>发布人：</span><input type="text" class="noticeText2" v-model="newNotice.author">
          <span>发布日期：</span><input type="text" class="noticeText2" v-model="newNotice.date"> -->
          <span>内容：</span><input type="text" class="noticeText3" v-model="newNotice.content">
          <input type="button" value="发布" class="add btn-primary " @click="add">
        </div>
      </div>
    </div>
    <img class="publishing" v-show="isPublishing" width="32px" src="../../../images/loading3.gif">
    <transition name="alertTip">
      <div class="publishOk" v-show="isPublishOk" @click="publishOk">
        <p>发布成功!</p>
        <input type="button" value="确定" class="publishOkBtn btn-primary ">
      </div>
    </transition>
    <transition name="alertTip">
      <div class="publishWoring" v-show="isPublishWoring" @click="publishWoring">
        <p>发布失败，请检查您的网络!</p>
        <input type="button" value="确定" class="publishWoringBtn btn-primary ">
      </div>
    </transition>
  </div>
</template>

<script>
import { publishNotice } from "../../../api";
import { mapState } from "vuex";
export default {
  data () {
    return {
      notices: [
        {
          id: '003',
          author: '刚子子',
          date: '2019-01-04',
          content: '尊敬的患者朋友：由于兵检工作需要，我院体检中心于1月11日（周五）上午停诊半天，如为你带来不便，敬请见谅！'
        },
        {
          id: '002',
          author: '刚子子',
          date: '2019-01-02',
          content: '此项目要求投标人报名完成后尽快进行现场实地勘察，必须在中标后48小时内完成淘汰物品清理工作。'
        },
        {
          id: '001',
          author: '刚子子',
          date: '2019-01-01',
          content: '医院办公用品招标项目于2019年1月14日在《地区医院官网》及《招标采购综合网》发布了招标公告。因招标项目需要，现对开标时间进行如下变更。原开标时间为：2019年1月25日下午现变更为：2019年2月15日上午9:00分。其它内容不变。'
        }
      ],
      newNotice: [
        {
          id: '',
          author: '',
          date: '',
          content: ''
        }
      ],
      count: 4,
      isPublishing: false,
      isPublishOk: false,
      isPublishWoring: false
    }
  },
  computed: {
    ...mapState(['nowManager'])
  },
  mounted () {
    this.count = this.notices.length + 1
    // 获得历史公告
  },
  methods: {
    publishOk () {
      this.isPublishOk = false
    },
    publishWoring () {
      this.isPublishWoring = false
    },
    add () {
      this.isPublishing = true
      this.newNotice.id = this.count
      if (parseInt(this.newNotice.id / 10) == 0) {
        this.newNotice.id = '00' + this.count
      } else if (parseInt(this.newNotice.id / 10) == 1) {
        this.newNotice.id = '0' + this.count
      }
      let year = new Date(new Date()).getFullYear();      
      let month =new Date(new Date()).getMonth() + 1 < 10? "0" + (new Date(new Date()).getMonth() + 1): new Date(new Date()).getMonth() + 1;      
      let date =new Date(new Date()).getDate() < 10? "0" + new Date(new Date()).getDate(): new Date(new Date()).getDate();
      let nowTime = year + '-' + month + '-' + date
      this.newNotice.author = this.nowManager.name
      this.newNotice.date = nowTime
      
      setTimeout(() => {
        this.isPublishing = false
        this.notices.splice(0, 0, this.newNotice)
        this.count = this.count + 1
        this.newNotice = { id: '', author: '', date: '' , content: ''}
      }, 800);
      // 弹出消息--发布成功
      setTimeout(() => {
        this.isPublishOk = true
      }, 850);
    }
    // async add () {
    //   // 0.页面改为等候状态
    //   this.isPublishing = true
    //   //1.获得带0的编号
    //   if (parseInt(this.newNotice.id / 10) == 0) {
    //     this.newNotice.id = '00' + this.count
    //   } else if (parseInt(this.newNotice.id / 10) == 1) {
    //     this.newNotice.id = '0' + this.count
    //   }
    //   //2.获得当前时间 xxxx-xx-xx
    //   let year = new Date(new Date()).getFullYear();      
    //   let month =new Date(new Date()).getMonth() + 1 < 10? "0" + (new Date(new Date()).getMonth() + 1): new Date(new Date()).getMonth() + 1;      
    //   let date =new Date(new Date()).getDate() < 10? "0" + new Date(new Date()).getDate(): new Date(new Date()).getDate();
    //   let nowTime = year + '-' + month + '-' + date
        // this.newNotice.author = this.nowManager.name
        // this.newNotice.date = nowTime
    //   // 3.把公告内容封装成json对象
    //   let fileData = JSON.parse(this.newNotice)
      
    //   // 4.发送到后台
    //   const result = await publishNotice(fileData)
    //   if (result.code === 200) {
    //     // 4.1成功，在本地页面添加，改变页面状态弹出发布成功消息
    //     this.notices.splice(0, 0, this.newNotice)
    //     this.count = this.count + 1
    //     this.newNotice = { id: '', author: '', date: '' , content: ''}
    //     this.isPublishing = false      
    //     this.isPublishOk = true
    //   } else {
    //     // 4.2失败，弹出消息--发布失败
    //     this.isPublishWoring = true
    //   }
        
    // }
  }
}
</script>

<style>
 /* 过度样式 */
.alertTip-enter-active,.alertTip-leave-active{
      transition: opacity .5s
}
/* 隐藏样式  */
.alertTip-enter,.alertTip-leave-to{
    opacity: 0;
}
.opacity {
  opacity: .5;
  overflow: hidden;
}
input:focus {
  border-color:#009688 !important;
  /* border-color:#409EFF !important; */
  outline: 0;
}
.publishOk,.publishWoring{
  z-index: 100;
  /* float: left; */
  width:20%;
  position: fixed;
  top: 300px;
  left: 668px;
  background: #ffffff;
  border-radius: 3px;
  padding: 12px 15px;
  box-shadow: -1px 1px 12px black;
}
.publishOk p,.publishWoring p{
  margin: 5px 0 5px;
  font-size: 13px;
}
.publishOk .publishOkBtn,.publishWoring .publishWoringBtn{
  display: inline-block;
  margin-left: 77%;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  background-image: none;
  border: 0;
  white-space: nowrap;
  letter-spacing: 1px;
  text-transform: uppercase;
  padding: 8px 18px;
  font-size: 13px;
  line-height: 1.428571429;
  border-radius: 3px;
}
.publishing {
  position: fixed;
  left: 55%;
  top: 50%;
}
.noticeId {
  width: 20%;

}
.noticeAuthor {
  width: 20%;
}
.noticeDate {
  width: 20%;
}
.noticeContent {
  width: 40%;
  /* overflow: hidden; */
}
.notice .table > tbody > tr > td, {
  padding: 8px;
  line-height: 1.428571429;
   vertical-align: middle;
  border-top: 1px solid #ddd;
}
.noticeText2{
  display: inline-block;
  width: 100px;
  margin-right: 10px;
  margin-left: 5px;
  padding: 8px 12px;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.44;
  color: #555555;
  background-color: #fff;
  background-image: none;
  border: 2px solid #ccc;
  border-radius: 3px;
  -webkit-transition: border-color ease-in-out 0.15s;
  -o-transition: border-color ease-in-out 0.15s;
  transition: border-color ease-in-out 0.15s;
}
.noticeText3{
  display: inline-block;
  width: 80%;
  margin-right: 10px;
  margin-left: 5px;
  padding: 8px 12px;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.44;
  color: #555555;
  background-color: #fff;
  background-image: none;
  border: 2px solid #ccc;
  border-radius: 3px;
  -webkit-transition: border-color ease-in-out 0.15s;
  -o-transition: border-color ease-in-out 0.15s;
  transition: border-color ease-in-out 0.15s;
}
.notice .add{
  display: inline-block;
  margin-left: 30px;
  font-weight: 600;
  text-align: center;
  vertical-align: middle;
  -ms-touch-action: manipulation;
      touch-action: manipulation;
  cursor: pointer;
  background-image: none;
  border: 0;
  white-space: nowrap;
  letter-spacing: 1px;
  text-transform: uppercase;
  padding: 8px 15px;
  font-size: 13px;
  line-height: 1.428571429;
  border-radius: 3px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-transition: background-color 0.3s ease-in-out, -webkit-box-shadow 0.3s cubic-bezier(0.35, 0, 0.25, 1), -webkit-transform 0.2s cubic-bezier(0.35, 0, 0.25, 1);
  transition: background-color 0.3s ease-in-out, -webkit-box-shadow 0.3s cubic-bezier(0.35, 0, 0.25, 1), -webkit-transform 0.2s cubic-bezier(0.35, 0, 0.25, 1);
  -o-transition: box-shadow 0.3s cubic-bezier(0.35, 0, 0.25, 1), transform 0.2s cubic-bezier(0.35, 0, 0.25, 1), background-color 0.3s ease-in-out;
  transition: box-shadow 0.3s cubic-bezier(0.35, 0, 0.25, 1), transform 0.2s cubic-bezier(0.35, 0, 0.25, 1), background-color 0.3s ease-in-out;
  transition: box-shadow 0.3s cubic-bezier(0.35, 0, 0.25, 1), transform 0.2s cubic-bezier(0.35, 0, 0.25, 1), background-color 0.3s ease-in-out, -webkit-box-shadow 0.3s cubic-bezier(0.35, 0, 0.25, 1), -webkit-transform 0.2s cubic-bezier(0.35, 0, 0.25, 1);
}
</style>
