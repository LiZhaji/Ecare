<template>
  <div>
    <div class="page-title">
      <div>
        <span id="homePage"><i class="fa fa-laptop"></i>   预约管理</span>
        <!-- <p>此页介绍xxx校医院基本信息</p> -->
      </div>
      <div>
        <ul class="breadcrumb">
          <li><i class="fa fa-home fa-lg"></i></li>
          <li><a href="#">预约管理</a></li>
        </ul>
      </div>
    </div>
    <ul class="helpCard1" v-show="isHelp"  @mouseenter="help" @mouseleave="closeHelp">
      <li>
        <p>关键字可以是：</p> 
          <p>1.预约编号，如 1</p>
          <p>2.预约时间或其部分，如 10:05</p>
          <p>3.学号，如 001</p>
          <p>4.姓名，如 大宝丽</p>
          <p>5.性别，如 女</p>
      </li>
    </ul> 
    <div class="col-md-12 orderings" :class="{opacity: isHelp || isreqWoring || isdelItem || isWaiting || isdelOk}">
      <div class="card">
        <div class="card-body">
          <legend> 
            <span class="notchoosen" v-show="!isDesease" @click="chooseSpan1">看病预约</span>
            <span class="choosen" v-show="isDesease" @click="chooseSpan1">•  看病预约</span>
            <span class="notchoosen" v-show="isDesease" @click="chooseSpan2">体检预约</span>
            <span class="choosen" v-show="!isDesease" @click="chooseSpan2">•  体检预约</span>
            <p @mouseenter="help" @mouseleave="closeHelp"><i class="iconfont">&#xe75d;</i></p>
            <input type="search" class="noticeText1" placeholder="关键字" v-model="searchKey" aria-controls="sampleTable">
            <input v-show="isDesease" type="button" value="搜索" class="searchBtn btn-primary " @click="search1" >
            <input v-show="!isDesease" type="button" value="搜索" class="searchBtn btn-primary " @click="search2" >
          </legend>
          <table class="table table-hover">
            <thead>
              <tr>
                <th>#预约号</th>
                <th>预约时间</th>
                <th>学号</th>
                <th>姓名</th>
                <th>性别</th>
                <th>操作</th>
              </tr>
            </thead>
            <!-- 显示看病预约 -->
            <tbody v-show="isDesease && !isSearch">
              <tr v-for="(item,index) in orderings" :key="index">
                <td><span v-show="item.ok">{{item.orderId}}</span><input v-show="!item.ok" type="text" v-model="item.orderId"></td>
                <td><span v-show="item.ok">{{item.time}}</span><input v-show="!item.ok" type="text" v-model="item.time"></td>
                <td><span v-show="item.ok">{{item.id_stu}}</span><input v-show="!item.ok" type="text" v-model="item.id_stu"></td>
                <td><span v-show="item.ok">{{item.name}}</span><input v-show="!item.ok" type="text" v-model="item.name"></td>
                <td><span v-show="item.ok">{{item.sex}}</span><input v-show="!item.ok" type="text" v-model="item.sex"></td>
                <!-- <td class="btn3"><input type="button" value="更新" class="btn3 btn-info" @click="update1(index)"></td> -->
                <!-- <td v-show="!item.ok" class="btn3"><input type="button" value="完成" class="btn3 btn-info" @click="complete1(index)"></td> -->
                <td class="btn3"><input type="button" value="删除" class="btn3 btn-danger" @click="del1(index)"></td>
              </tr>
            </tbody>
            <tbody v-show="isDesease && isSearch">
              <tr v-for="(item,index) in backups1" :key="index">
                <td><span v-show="item.ok">{{item.orderId}}</span><input v-show="!item.ok" type="text" v-model="item.orderId"></td>
                 <td><span v-show="item.ok">{{item.time}}</span><input v-show="!item.ok" type="text" v-model="item.time"></td>
                <td><span v-show="item.ok">{{item.id_stu}}</span><input v-show="!item.ok" type="text" v-model="item.id_stu"></td>
                <td><span v-show="item.ok">{{item.name}}</span><input v-show="!item.ok" type="text" v-model="item.name"></td>
                <td><span v-show="item.ok">{{item.sex}}</span><input v-show="!item.ok" type="text" v-model="item.sex"></td>
                <!-- <td class="btn3"><input type="button" value="更新" class="btn3 btn-info" @click="update1(index)"></td> -->
                <!-- <td v-show="!item.ok" class="btn3"><input type="button" value="完成" class="btn3 btn-info" @click="complete1(index)"></td> -->
                <td class="btn3"><input type="button" value="删除" class="btn3 btn-danger" @click="del1(index)"></td>
              </tr>
            </tbody>
            <!-- 显示体检预约 -->
            <tbody v-show="!isDesease && !isSearch">
              <tr v-for="(item,index) in checkHealthOrderings" :key="index">
                <td><span v-show="item.ok">{{item.orderId}}</span><input v-show="!item.ok" type="text" v-model="item.orderId"></td>
                 <td><span v-show="item.ok">{{item.time}}</span><input v-show="!item.ok" type="text" v-model="item.time"></td>
                <td><span v-show="item.ok">{{item.id_stu}}</span><input v-show="!item.ok" type="text" v-model="item.id_stu"></td>
                <td><span v-show="item.ok">{{item.name}}</span><input v-show="!item.ok" type="text" v-model="item.name"></td>
                <td><span v-show="item.ok">{{item.sex}}</span><input v-show="!item.ok" type="text" v-model="item.sex"></td>
                <!-- <td class="btn3"><input type="button" value="更新" class="btn3 btn-info" @click="update2(index)"></td> -->
                <!-- <td v-show="!item.ok" class="btn3"><input type="button" value="完成" class="btn3 btn-info" @click="complete2(index)"></td> -->
                <td class="btn3"><input type="button" value="删除" class="btn3 btn-danger" @click="del2(index)"></td>
              </tr>
            </tbody>
            <tbody v-show="!isDesease && isSearch">
              <tr v-for="(item,index) in backups2" :key="index">
                <td><span v-show="item.ok">{{item.orderId}}</span><input v-show="!item.ok" type="text" v-model="item.orderId"></td>
                 <td><span v-show="item.ok">{{item.time}}</span><input v-show="!item.ok" type="text" v-model="item.time"></td>
                <td><span v-show="item.ok">{{item.id_stu}}</span><input v-show="!item.ok" type="text" v-model="item.id_stu"></td>
                <td><span v-show="item.ok">{{item.name}}</span><input v-show="!item.ok" type="text" v-model="item.name"></td>
                <td><span v-show="item.ok">{{item.sex}}</span><input v-show="!item.ok" type="text" v-model="item.sex"></td>
                <!-- <td class="btn3"><input type="button" value="更新" class="btn3 btn-info" @click="update2(index)"></td> -->
                <!-- <td v-show="!item.ok" class="btn3"><input type="button" value="完成" class="btn3 btn-info" @click="complete2(index)"></td> -->
                <td class="btn3"><input type="button" value="删除" class="btn3 btn-danger" @click="del2(index)"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <img class="waiting" v-show="isWaiting" width="32px" src="../../../images/loading3.gif">
    <transition name="alertTip">
      <div class="reqWoring" v-show="isreqWoring" >
        <p>请求失败，请检查网络!</p>
        <input type="button" value="确定" @click="reqWoring" class="reqWoringBtn btn-primary ">
      </div>
    </transition>
    <transition name="alertTip">
      <div class="delItem" v-show="isdelItem">
        <p>确定要删除吗？</p>
        <input type="button" v-show="isDesease" value="确定" @click="delItem1(delIndex)" class="delItemBtn btn-primary ">
        <input type="button" v-show="!isDesease" value="确定" @click="delItem2(delIndex)" class="delItemBtn btn-primary ">      
        <input type="button" value="取消" @click="cancelItem" class="cancelBtn btn-default ">
      </div>
    </transition>
    <transition name="alertTip">
      <div class="delOk" v-show="isdelOk">
        <p>删除成功!</p>
        <input type="button" value="确定" @click="delOk" class="delOkBtn btn-primary ">
      </div>
    </transition>
    <transition name="alertTip">
      <div class="delError" v-show="isdelError">
        <p>删除失败，请检查您的网络!</p>
        <input type="button" value="确定" @click="delError" class="delErrorBtn btn-primary ">
      </div>
    </transition>
  </div>
</template>

<script>
import { reqOrderings, reqCheckHealthOrderings } from "../../../api";
export default {
  data () {
    return {
      orderings: [
        {
          orderId: '001',
          time: '10：00 2019-01-26',
          id_stu: '001',
          name: '大宝丽',
          sex: '女',
          ok: true
        },
        {
          orderId: '002',
          time: '12：25 2019-01-26',
          id_stu: '002',
          name: '栋凌',
          sex: '男',
          ok: true
        }
      ],
      backups1: [],
      checkHealthOrderings: [
        {
          orderId: '001',
          time: '14：05 2019-01-26',
          id_stu: '006',
          name: '河西',
          sex: '女',
          ok: true
        },
        {
          orderId: '002',
          time: '16：10 2019-01-26',
          id_stu: '007',
          name: '河东',
          sex: '男',
          ok: true
        },
        {
          orderId: '003',
          time: '18：12 2019-01-26',
          id_stu: '008',
          name: '河男',
          sex: '男',
          ok: true
        }
      ],
      backups2: [],
      searchKey: '',
      isSearch: false,
      isDesease: true,
      isHelp: false,
      isreqWoring: false,
      isdelItem: false,
      delIndex: '',
      isdelOk: false,
      isdelError: false,
      isWaiting: false
    }
  },
  methods: {
    delError () {
      this.isdelError = false
    },
    delOk () {
      this.isdelOk = false
    },
    reqWoring () {
      this.isreqWoring = false
    },
    help () {
      this.isHelp = true
    },
    closeHelp () {
      this.isHelp = false
    },
    chooseSpan1 (event) {
      this.isDesease = true
      // 点击一下就重新接收一下
      // const result1 = reqOrderings()
      // if (result1.code === 200 ) {
      //   this.orderings = JSON.stringify(result1.data)
      // } else{
      //   this.isreqWoring = true
      // }
    },
    chooseSpan2 () {
      this.isDesease = false
      // const result2 = reqCheckHealthOrderings()
      // if (result2.code === 200 ) {
      //   this.checkHealthOrderings = JSON.stringify(result2.data)
      // } else{
      //   this.isreqWoring = true
      // }
    },
    search1 () {
      const {searchKey, orderings} = this
      let arr = [...orderings]
      if(searchKey.trim()) {
        arr = orderings.filter(p => (p.orderId.indexOf(searchKey)!==-1) || (p.time.indexOf(searchKey)!==-1) || (p.id_stu.indexOf(searchKey)!==-1) || (p.name.indexOf(searchKey)!==-1) || (p.sex.indexOf(searchKey)!==-1))
        this.backups1 = arr
        this.isSearch = true
      }
    },
    search2 () {
      const {searchKey, checkHealthOrderings} = this
      let arr = [...checkHealthOrderings]
      if(searchKey.trim()) {
        arr = checkHealthOrderings.filter(p => (p.orderId.indexOf(searchKey)!==-1) || (p.time.indexOf(searchKey)!==-1) || (p.id_stu.indexOf(searchKey)!==-1) || (p.name.indexOf(searchKey)!==-1) || (p.sex.indexOf(searchKey)!==-1))
        console.log(arr)
        this.backups2 = arr
        this.isSearch = true
      }
    },
    del1 (index) {
      this.delIndex = index
      this.isdelItem = true     
    },
    delItem1 (index) {
      this.orderings.splice(index,1)
      this.isdelItem = false
      this.isWaiting = true
      setTimeout(() => {
        this.isWaiting = false
        this.isdelOk = true
      }, 500);
    },
    del2 (index) {
      this.delIndex = index
      this.isdelItem = true
    },
    delItem2 (index) {
      this.checkHealthOrderings.splice(index,1)
      this.isdelItem = false
      this.isWaiting = true
      setTimeout(() => {
        this.isWaiting = false
        this.isdelOk = true
      }, 500);
    },
    
    cancelItem () {
      this.isdelItem = false
    }
    // update1 (index) {
    //   this.orderings[index].ok = false
    // },
    // update2 (index) {
    //   this.checkHealthOrderings[index].ok = false
    // },
    // complete1 (index) {
    //   this.orderings[index].ok = true
    // },
    // complete2 (index) {
    //   this.checkHealthOrderings[index].ok = true
    // },
  },
  watch: {
    searchKey (val) {
      if (val === '') {
        this.isSearch = false
      }
    },
    orderings (val) {
      let fileData = JSON.parse(val)
      const result1 = reqOrderings(fileData)
      if (result1.code === 200 ) {
        // 表示删除成功
        this.isWaiting = false
        this.isdelOk = true
      } else{
        // 删除失败
        this.isWaiting = false
        this.isdelError = true
      }
    },
    checkHealthOrderings (val) {
      let fileData = JSON.parse(val)
      const result1 = reqCheckHealthOrderings(fileData)
      if (result1.code === 200 ) {
        // 表示删除成功
        this.isWaiting = false
        this.isdelOk = true
      } else{
        // 删除失败
        this.isWaiting = false
        this.isdelError = true
      }
    }
  },
  // async mounted () {
  //   const result1 = await reqOrderings()
  //   if (result1.code === 200 ) {
  //     // 成功，显示看病预约订单
  //     this.orderings = JSON.stringify(result1.data)
  //   } else{
  //     this.isreqWoring = true
  //   }

  //   const result2 = await reqCheckHealthOrderings()
  //   if (result2.code === 200 ) {
  //     // 成功，显示看病预约订单
  //     this.checkHealthOrderings = JSON.stringify(result2.data)
  //   } else{
  //     this.isreqWoring = true
  //   }
  // }
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
.waiting {
  position: fixed;
  left: 55%;
  top: 50%;
}
.reqWoring,.delItem,.delOk, .delError{
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
.reqWoring p,.delItem p,.delOk p, .delError p{
  margin: 5px 0 5px;
  font-size: 13px;
}
.reqWoring .reqWoringBtn,.delOk .delOkBtn, .delError .delErrorBtn{
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
.delItem .delItemBtn{
  display: inline-block;
  margin-left: 48%;
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
.delItem .cancelBtn{
  display: inline-block;
  margin-left: 10px;
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
.orderings legend p {
  display: inline;
  margin-left: 600px;
  margin-right: 10px;
}
.orderings legend .notchoosen {
  background-color:#009688;
  padding: 8px 15px;
  margin-right: 30px;
  font-size: 13px;
  line-height: 1.428571429;
  border-radius: 3px;
  color: white;
  display: inline-block;
  font-weight: 600;
  text-align: center;
  vertical-align: middle;
  touch-action: manipulation;
  cursor: pointer;
}
.orderings legend .choosen {
  width: 120px;
  background-color:#007d71;
  padding: 8px 15px;
  margin-right: 30px;
  font-size: 13px;
  line-height: 1.428571429;
  border-radius: 3px;
  color: white;
  display: inline-block;
  font-weight: 600;
  text-align: center;
  vertical-align: middle;
  touch-action: manipulation;
  cursor: pointer;
}
.orderings legend span:hover{
  background-color: #007d71;
}
.orderings .searchBtn{
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
    padding: 8px 15px;
    font-size: 13px;
    line-height: 1.428571429;
    border-radius: 3px;
}
.noticeText1 {
    display: inline-block;
    width: 150px;
    height: 35px;
    margin-right: 10px;
    padding: 8px 12px;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.44;
    color: #555555;
    background-color: #fff;
    background-image: none;
    border: 2px solid #ccc;
    border-radius: 3px;
    transition: border-color ease-in-out 0.15s;
}
.orderings .btn3 {
  display: inline-block;
  margin: 0 5px 0 -4px;
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
}
.opacity {
  opacity: .5;
}
.helpCard1{
  list-style: none;
  z-index: 100;
  width: 20%;
  position: fixed;
  top: 159px;
  left: 1190px;
  background: #ffffff;
  border-radius: 3px;
  padding: 20px 25px;
}
@font-face {
  font-family: 'iconfont';  /* project id 1032664 */
  src: url('//at.alicdn.com/t/font_1032664_g6fnshtjsol.eot');
  src: url('//at.alicdn.com/t/font_1032664_g6fnshtjsol.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_1032664_g6fnshtjsol.woff2') format('woff2'),
  url('//at.alicdn.com/t/font_1032664_g6fnshtjsol.woff') format('woff'),
  url('//at.alicdn.com/t/font_1032664_g6fnshtjsol.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_1032664_g6fnshtjsol.svg#iconfont') format('svg');
}
.iconfont{
  font-family:"iconfont" !important;
  font-size: 20px;
  font-style: normal;
  color: #979696;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}
</style>
