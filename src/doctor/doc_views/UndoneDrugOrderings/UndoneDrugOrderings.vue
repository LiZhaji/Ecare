<template>
  <div>
    <div class="page-title">
      <div>
        <span id="homePage"><i class="fa fa-th-list"></i>   未取订单</span>
      </div>
      <div>
        <ul class="breadcrumb">
          <li><i class="fa fa-home fa-lg"></i></li>
          <li><a href="#">未取订单</a></li>
        </ul>
      </div>
    </div>
    <div class="undone-orderings card" :class="{opacity: isdrugBox || isNetworkError}">
      <!-- <button class="btn-primary get-orderings" @click="getOrderings">获取未完成订单</button>      -->
      <p v-show="listIsNull" class="noDrugItem">暂无药品订单</p>
      <ul class="show-orderings"> 
        <li v-show="isGet" class="card1" v-for="(item,index) in undoneDrugOrderings" :key="index" :class="{chosenA: item.isNow}" @click="chooseParient(index)">
            <p>订单编号：{{item.id}}</p> 
            <p>学生学号：{{item.stu_id}} </p> 
            <p>学生姓名：{{item.stu_name}}</p>
        </li>
       <img v-show="isGeting" width="32px" src="../../../images/loading3.gif">
      </ul>
    </div>
    <div class="now card" :class="{opacity: isdrugBox || isNetworkError}">
      <h4 class="card-title"><legend>当前药品订单</legend></h4>
      <div class="col-md-12 drugs" >
        <div class="basic_info">
          <span>处方编号：{{nowOrder.id}}</span>
          <span>学号：{{nowOrder.stu_id}}</span>
          <span>姓名：{{nowOrder.stu_name}}</span>
          <span>性别：{{nowOrder.stu_sex}}</span>
          <br>
          <span>医生：{{nowOrder.id_doc}}</span>
          <span>开药日期：{{nowOrder.create_time}}</span>
          <span>取药方式：{{nowOrder.take_way}}</span>
          <span>处理标志：{{nowOrder.price}}</span>
        </div>
        <div class="card-body">
          <table class="table table-hover">
            <thead>
              <tr> 
                <th>药品名称</th>
                <th>规格</th>
                <th>数量</th>
                <th>单位</th>
                <th>用法</th>
              </tr>
            </thead> 
            <tbody>
              <tr v-for="(item ,index) in nowOrder.drug_list" :key="index">
                <td><span  >{{item.drug_name}}</span></td>
                <td><span  >{{item.drug_specifications}}</span></td>
                <td><span  >{{item.drug_num}}</span></td>
                <td><span  >{{item.drug_unit}}</span></td>
                <td><span  >{{item.drug_use}}</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="form-group">
        <div class="col-lg-10 ">
          <button class="btn1 btn-primary" @click="completeDispensation">完成配药</button>
        </div>
      </div>
    </div>
    <transition name="alertTip">
      <div class="drugBox" v-show="isdrugBox" >
        <p>请放入 <span class="emptyBox">{{emptyBox}}</span> 号柜</p>
        <button class="drugBoxBtn btn1 btn-primary" @click="putOk" type="submit">完成</button>
      </div>
    </transition>
    <transition name="alertTip">
      <div class="networkError" v-show="isNetworkError" >
        <p>获取药柜信息失败，请检查您的网络!</p>
        <input type="button" value="确定" @click="networkError" class="networkErrorBtn btn-primary ">
      </div>
    </transition>
  </div>
</template>

<script>
import { reqUndoneOrderings, reqPrescribe, reqEmptyBox } from "../../../api"
import {mapState} from 'vuex'

export default {
  data () {
    return {
      nowOrder: {},
      nowNum: 0,
      isGet: false,
      isGeting: false,
      listIsNull: false,
      isdrugBox: false,
      emptyBox: '', // 用于标准显示空柜号码
      forBoxCount: 1, // 用于计数空柜
      isNetworkError: false
    }
  },
  mounted () {
    // 给actions发送命令：异步获取undoneDrugOrderings数据并显示
    this.isGeting = true
    setTimeout(() => {
      this.isGeting = false
      this.isGet = true
      this.nowOrder = this.undoneDrugOrderings[this.nowNum] 
      this.$set(this.undoneDrugOrderings[this.nowNum], 'isNow', true)
    }, 1500);
  },
  watch: {
    undoneDrugOrderings (val) {
      this.undoneDrugOrderings = val
      if (val.length === 0) {
        this.listIsNull = true
      }else{
        this.listIsNull = false
      }
    },
    nowNum (val) {
      this.changes()
    },
    isNewDrug (val) {
      if (val === true) {
        this.nowNum = this.undoneDrugOrderings.length - 1
        this.changes()
        this.isNewDrug = false
      }
    }
  },
  computed: {
    ...mapState(['undoneDrugOrderings', 'drugOrderings', 'isNewDrug']),
    undoneDrugOrderings: {
      get () {
        return this.$store.state.undoneDrugOrderings
      },
      set (val) {
        this.$store.state.undoneDrugOrderings = val
      }
    },
    isNewDrug: {
      get () {
        return this.$store.state.isNewDrug
      },
      set (val) {
        this.$store.state.isNewDrug = val
      }
    },
  },
  methods: {
    networkError () {
      this.isnetworkError = false
    },
    changes () {
      this.nowOrder = this.undoneDrugOrderings[this.nowNum]
      this.undoneDrugOrderings.forEach(element => {
        element.isNow = false
      });
      this.$set(this.undoneDrugOrderings[this.nowNum], 'isNow', true)
    },
    chooseParient (index) {
      this.nowNum = index
      this.changes()
      // 1.修改当前选中样式 ,还有问题-别的不会还原.解决:先清空之前的样式
      // 2.当前订单信息相应改变
    },
    completeDispensation () {
      // 根据id_doc判断是柜取还是面取，是柜取时，跳出alerttip;否则自动显示下一个
      if (this.nowOrder.id_doc === '/') {
        // 从后台获得分配到的空柜号
        // const result = reqEmptyBox()
        // if (result.code === 200) {
        //   this.emptyBox = JSON.stringify(result.data)
        // } else if (result.code === 500){
        //   this.isdrugBox = false
        //   this.isNetworkError = true
        // }
        if ( parseInt(this.forBoxCount / 10) == 0 ) {
          this.emptyBox = '0' + this.forBoxCount
        } else {
          this.emptyBox = this.forBoxCount
        }
        this.$set(this.nowOrder, 'take_way', '柜取-' + this.emptyBox + '柜')
        this.forBoxCount += 1
        this.isdrugBox = true
        // 其余交给alerttip的按钮
      } else {
        this.$set(this.nowOrder,'price','完成')
        this.drugOrderings.push(this.nowOrder)
        // 操作对象是最后一个时，判断是否是数组的最后一个；否则自动显示下一个
        if(this.nowNum === this.undoneDrugOrderings.length-1) {
          this.undoneDrugOrderings.splice(this.nowNum, 1)
          //完成之后数组为空时，清空当前页面，其余由listIsNull的监视完成；否则自动跳转到第一个
          if (this.undoneDrugOrderings.length === 0) {
            this.nowOrder = {}
          }else{
            this.nowNum = 0
          }
        }else{
          this.undoneDrugOrderings.splice(this.nowNum, 1)
          this.changes()
        }
      }
    },
    putOk () {
      this.$set(this.nowOrder, 'price', '完成')
      this.drugOrderings.push(this.nowOrder)
      //操作对象是最后一个时，否则自动显示下一个
      if(this.nowNum === this.undoneDrugOrderings.length-1) {
        this.undoneDrugOrderings.splice(this.nowNum, 1)
        //完成之后数组为空时，清空当前页面；否则自动跳转到第一个
        if (this.undoneDrugOrderings.length === 0) {
          this.nowOrder = {}
        }else{
          this.nowNum = 0
        }
      }else{
        this.undoneDrugOrderings.splice(this.nowNum, 1)
        this.changes()
      }
      this.isdrugBox = false
    }
    // async submit () {
    //   let fileData = JSON.stringify(this.nowOrder.drug_list)
    //   // 1.修改当前订单状态码，0到1
    //   this.nowOrder.price = 1
    //   // 2.从未完成列表中删除
    //   this.hadUndones.splice(this.nowNum, 1)
    //   if (this.hadUndones.length === 0) {
    //     this.hadUndones = [ { id: '',  stu_id: '', drug_list: [{drug_name: '', drug_num: ''},], price:'', isNow: false}]
    //     this.nowOrder = this.hadUndones[this.nowNum]
    //     alert('当前最后一笔订单提交成功，请重新获取订单')
    //     return
    //   }
    //   // 3.显示下一个
    //   this.nowOrder = this.hadUndones[this.nowNum]
    //   // 4.提交到后台
    //   const result2 = await reqPrescribe(fileData) 
    //   if (result2 === 200) {
        
    //   } else {
    //     alert('药品提交失败!')
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
.networkError {
  z-index: 100;
  /* float: left; */
  width: 20%;
  position: fixed;
  top: 300px;
  left: 668px;
  background: #ffffff;
  border-radius: 3px;
  padding: 12px 15px;
  box-shadow: -1px 1px 12px black;
}

.networkError p {
  margin: 5px 0 5px;
  font-size: 13px;
}

.networkError .networkErrorBtn {
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
.opacity {
  opacity: .5;
}
.drugBox{
  z-index: 100;
  /* float: left; */
  width: 20%;
  position: fixed;
  top: 300px;
  left: 668px;
  background: #ffffff;
  border-radius: 3px;
  padding: 12px 15px;
  box-shadow: -1px 1px 12px black;
}

.drugBox p{
  margin: 5px 0 5px;
  font-size: 13px;
}
.drugBox p .emptyBox{
  font-size: 18px;
}
.drugBox .drugBoxBtn{
  display: inline-block;
  margin-top: 10px;
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
.noDrugItem {
  position: relative;
  left: 43%;
  top: 25px;
}
.undone-orderings .show-orderings .card1 p {
  font-size: 14px;
  margin: 0 0 6px;
  color: black;
}
.btn1 { 
  margin-right: 180px; 
  margin-top:30px; 
} 
 .now .drugs .basic_info span {
   display: inline-block;
   width: 280px;
   height: 30px;
   font-size: medium;
 }

.undone-orderings img {
  margin-left: 23px;
  margin-top: 9px;
}
.undone-orderings{
  height: 100px;
  padding: 15px;
}
.show-orderings{
  padding: 2px;
  list-style: none;
}
.show-orderings a{
  padding: 1px;
  display: inline-block;
}
.show-orderings a:hover{
  /* border:1px solid lightgray; */
  font-size: 16.5px;
  background-color: rgb(236, 236, 236);
}
.card1 {
  width: 125px;
  cursor: pointer;
}
.chosenA{
  border: 1px solid #cedddc;
  /* font-size: 16.5px; */
  width: 140px;
  height: 91px;
  background-color: rgb(236, 236, 236);
}
.now .col-lg-10{
  padding-left: 0px;
  float: none;
}
.now .drugList {
  margin-right: 15px;
  font-size: 17px;
}
</style>
