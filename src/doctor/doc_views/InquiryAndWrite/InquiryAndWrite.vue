<template>
  <div>
    <div class="page-title">
      <div>
        <span id="homePage"><i class="fa fa-edit"></i>   问诊</span>
      </div>
      <div>
        <ul class="breadcrumb">
          <li><i class="fa fa-home fa-lg"></i></li>
          <li><a href="#">问诊</a></li>
        </ul>
      </div>
    </div>
    <div class="orderings card" :class="{opacity: isToEmpty || isNetworkError}">
      <!-- <button class="btn-primary get-orderings" @click="getOrderings">获取预约列表</button>      -->
      <p v-show="listIsNull" class="noDrugItem">暂无预约病人</p>
      <ul  class="show-orderings">
         <li v-show="isGet" class="card1" v-for="(item,index) in orderedOrderings" :key="index" :class="{chosenA: item.chosen}" @click="chooseParient(index)">
            <p>预约号码：{{item.orderId}}</p> 
            <p>学生学号：{{item.stu_id}} </p> 
            <p>学生姓名：{{item.stu_name}}</p>
        </li>
        <img v-show="isGeting" width="32px" src="../../../images/loading3.gif">
      </ul>
    </div>
    <div class="now card" :class="{opacity: isToEmpty || isNetworkError}">
      <h4 class="card-title"><legend>当前病人信息</legend></h4>
      <p class="nowInfo">
        <span class="span1">预约号码：{{nowParient.orderId}}</span>
        <span class="span1">学号：{{nowParient.stu_id}}</span>
        <span class="span1">姓名：{{nowParient.stu_name}}</span>
        <span class="span1">性别：{{nowParient.stu_sex}}</span>
        <span >预约时间：{{nowParient.time}}</span>
      </p> 
      <br>      
      <h4 class="card-title"><legend>诊断</legend></h4>
      <div class="row form-horizontal">
        <fieldset>
          <div class="form-group">
            <label class="col-lg-1 control-label" for="disease_name">疾病名称：</label>
            <div class="col-lg-10">
              <input class="form-control" v-model="nowParient.disease_name" id="disease_name" name="disease_name" type="text" placeholder="疾病名称">
            </div>
            
          </div>
          <div class="form-group">
            <label class="col-lg-1 control-label" for="disease_type">疾病类型：</label>
            <div class="col-lg-10">
              <input class="form-control" v-model="nowParient.disease_type" id="disease_type" name="disease_type" type="text" placeholder="疾病类型">
            </div>
          </div>
          <div class="form-group">
            <label class="col-lg-1 control-label" for="symptoms">症状：</label>
            <div class="col-lg-10">
              <textarea class="form-control" v-model="nowParient.symptoms" id="symptoms" name="symptoms" rows="4" placeholder="病人症状"></textarea><span class="help-block"></span>
            </div>
          </div>
          <div class="form-group">
            <div class="col-lg-10 col-lg-offset-1">
              <button class="btn1 btn-default" @click="clear" type="reset">清空</button>
              <button class="btn1 btn-primary" @click="prescribe">开药</button>
              <button class="btn1 btn-primary" @click="submit" type="submit">确认</button>
            </div>
          </div>
        </fieldset>
      </div>
    </div>
    <transition name="alertTip">
      <div class="toEmpty" v-show="isToEmpty">
        <p>确定要清空吗？</p>
        <input type="button" value="确定" @click="toEmpty" class="toEmptyBtn btn-primary ">
        <input type="button" value="取消" @click="cancelItem" class="cancelBtn btn-default ">
      </div>
    </transition>
    <transition name="alertTip">
      <div class="networkError" v-show="isNetworkError" @click="networkError">
        <p>获取信息失败，请检查您的网络!</p>
        <input type="button" value="确定" class="networkErrorBtn btn-primary ">
      </div>
    </transition>
  </div>
</template>

<script>
import { reqOrderings } from "../../../api"
import Bus from '../../../bus.js'
import axios from 'axios'
import { mapState } from "vuex";
export default {
  data () {
    return {
      type: '',
      nowOk: false,
      isGet: false,
      isGeting: true,
      isNetworkError: false,
      listIsNull: false,
      isToEmpty: false
    }
  },
  computed: {
    ...mapState(['orderedOrderings', 'nowParient', 'nowNum']),
    orderedOrderings: {
      get () {
        return this.$store.state.orderedOrderings
      },
      set (val) {
        this.$store.state.orderedOrderings = val
      }
    },
    nowParient: {
      get () {
        return this.$store.state.nowParient
      },
      set (val) {
        this.$store.state.nowParient = val
      }
    },
    nowNum: {
      get () {
        return this.$store.state.nowNum
      },
      set (val) {
        this.$store.state.nowNum = val
      }
    }
  },
  methods: {   
    // async getOrderings(){
    //   const result = await reqOrderings()
    //   if (result.code === 200) {
    //     // 成功 1.显示到后面列表中
    //     this.orderedOrderings = JSON.stringify(result.data)
    //     // 2.下面自动显示第一个病人的信息
    //     this.nowParient = this.orderedOrderings[this.nowNum]
    //   }else {
    //     // 失败，返回信息
    //     this.isNetworkError = true
    //   }
    // },

    // async submit () {
    //   // 1.把nowParient病历提交到后台
    //   let fileData = JSON.parse(this.nowParient)
    //   const result = await reqNowPatientOk(fileData)
    //   if (result.code === 200){
    //     if (window.confirm('提交成功')) {
    //       // 1.1将预约列表中当前的删除
    //       this.orderedOrderings.splice(this.nowNum, 1)
    //       // 1.2显示下一个
    //       // this.nowNum += 1
    //       this.nowParient = this.orderedOrderings[this.nowNum]
    //     }
    //   }else {
    //     alert('提交失败！')
    //   }   
    // },
    networkError () {
      this.isnetworkError = false
    },
    submit () {
      //操作对象是最后一个时，清空当前页面;否则自动显示下一个
      if(this.nowNum === this.orderedOrderings.length-1) {
        this.orderedOrderings.splice(this.nowNum, 1)
        this.nowOrder = {}
      }else{
        this.orderedOrderings.splice(this.nowNum, 1)
        this.nowParient = this.orderedOrderings[this.nowNum]
      }
    },
    chooseParient(index){
      // 1.修改当前选中样式 ,还有问题-别的不会还原.解决:先清空之前的样式
      this.orderedOrderings.forEach(element => {
        element.chosen = false
      });
      this.$set(this.orderedOrderings[index], 'chosen', true)
      
      // 2.下面显示信息相应改变
      this.nowNum = index
      this.nowParient = this.orderedOrderings[index]
    },
    clear(){
      this.isToEmpty = true   
    }, 
    toEmpty () {
      this.nowParient.disease_name = ''
      this.nowParient.disease_type = ''
      this.nowParient.symptoms = ''
      this.isToEmpty = false
    },
    cancelItem () {
      this.isToEmpty = false
    },
    prescribe(){
      // 1.将当前病人信息传到开药页面中
      // Bus.$emit('getNowParient',this.nowParient)
      this.nowParient = this.orderedOrderings[this.nowNum]
      // 2.去开药页面
      this.$router.push('/doctor/prescribe')
    },
    delWithDrugsParient () {
      if (this.nowOk === true) {
        this.orderedOrderings.splice(this.nowNum, 1)
        this.nowParient = this.orderedOrderings[this.nowNum]
      }
    }
  },
  watch: {
    orderedOrderings (val) {
      this.orderedOrderings = val
      if (val.length === 0) {
        this.listIsNull = true
      }else{
        this.listIsNull = false
      }
    },
    nowParient (val) {
      this.orderedOrderings.forEach(element => {
        element.chosen = false
      });
      this.$set(this.orderedOrderings[this.nowNum], 'chosen', true)
    }
  },
  mounted () {
    // 异步获取列表
    this.isGeting = true
    setTimeout(() => {
      this.isGeting = false
      this.isGet = true
      this.orderedOrderings = this.orderedOrderings
      this.nowParient = this.orderedOrderings[this.nowNum]
      this.$set(this.orderedOrderings[this.nowNum], 'chosen', true)
    }, 1500);
    // Bus.$on('getNowOk',(nowOk) =>{
    //   this.nowOk = nowOk 
    //   this.delWithDrugsParient()
    // })
  },
  // destroyed () {
  //   Bus.$off('getNowOk')
  // }
}

</script>

<style>
.now .nowInfo span {
    display: inline-block;
    height: 30px;
    font-size: medium;
}
.now .nowInfo .span1 {
    width: 150px;
}
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
}
.networkError, .toEmpty {
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

.networkError p, .toEmpty p {
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
.toEmpty .toEmptyBtn{
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
.toEmpty .cancelBtn{
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
.noDrugItem {
  position: relative;
  left: 43%;
  top: 25px;
}
.orderings img {
  margin-left: 23px;
  margin-top: 9px;
}
.orderings{
  /* display: inline-block;
  width: 800px;*/
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
  /* border:2px solid rgb(91, 94, 90); */
  font-size: 16.5px;
  background-color: rgb(236, 236, 236);
}
.chosenA{
  border: 1px solid #cedddc;
  /* font-size: 16.5px; */
  width: 140px;
  height: 91px;
  background-color: rgb(236, 236, 236);
}
.card1 {
  width: 125px;
  cursor: pointer;
}
.orderings .show-orderings .card1 p {
  font-size: 14px;
  margin: 0 0 6px;
  color: black;
}
.card1 a{
  color: black;
}
</style>
