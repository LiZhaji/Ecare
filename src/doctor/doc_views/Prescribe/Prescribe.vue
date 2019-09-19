<template>
  <div>
    <div class="page-title">
      <div>
        <span id="homePage"><i class="fa fa-pie-chart"></i>   开药</span>
        <!-- <p></p> -->
      </div>
      <div>
        <ul class="breadcrumb">
          <li><i class="fa fa-home fa-lg"></i></li>
          <li><a href="#">开药</a></li>
        </ul>
      </div>
    </div>
    <div class="now card">
      <h4 class="card-title"><legend>当前病人信息</legend></h4>
      <p class="nowInfo">
        <span class="span1">预约号码：{{nowParient.orderId}}</span>
        <span >预约时间：{{nowParient.time}}</span>
        <br>
        <span class="span1">学号：{{nowParient.stu_id}}</span>
        <span class="span1">姓名：{{nowParient.stu_name}}</span>
        <span class="span1">性别：{{nowParient.stu_sex}}</span>
        <br>
        <span class="span2">疾病名称：{{nowParient.disease_name}}</span>
        <span class="span2">疾病类型：{{nowParient.disease_type}}</span>
        <span class="span2">症状：{{nowParient.symptoms}}</span>
      </p> 
      <br>      
      <h4 class="card-title"><legend>开药</legend></h4>
      <div class="card-body">
        <table class="table table-hover">
          <thead>
            <tr> 
              <th>药品名称</th>
              <th>规格</th> 
              <th>数量</th>
              <th>单位</th>
              <th>用法</th>
              <th></th>
            </tr>
          </thead> 
          <tbody>
            <tr v-for="(item ,index) in nowParient.needDrugs" :key="index">
              <td><el-select v-model="item.drug_name" filterable placeholder="请选择"  @change="chosenDrug(index)"><el-option v-for="(item, index) in drugs" :key="index" :label="item.drugName" :value="item.drugName"></el-option></el-select></td>
              <td><el-select v-model="item.drug_specifications" filterable placeholder="请选择"><el-option v-for="item in drugs" :key="item.drugId" :label="item.specifications" :value="item.specifications"></el-option></el-select></td>
              <td><el-select v-model="item.drug_num" filterable placeholder="请选择"><el-option size="medium" v-for="item in numbers" :key="item" :label="item" :value="item"></el-option></el-select></td>
              <td><el-select v-model="item.drug_unit" filterable placeholder="请选择"><el-option v-for="item in drugs" :key="item.drugId" :label="item.unit" :value="item.unit"></el-option></el-select></td>
              <td><input id="drugSpecifications" type="text" class="drugText5" v-model="item.drug_use"></td>
              <td><button class="btn2 btn-primary " @click="next" type="button">继续</button></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="row form-horizontal">
        <fieldset>
          <div class="form-group">
            <div class="col-lg-10">
              <button class="btn1 btn-default" @click="clear" type="reset">清空</button>
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
  </div>
</template>

<script>
import { reqNowPatientOk, reqPrescribe } from "../../../api"
import Bus from '../../../bus.js'
import { mapState } from "vuex";
export default {
  data () {
    return {
      nowOk: false,
      isToEmpty: false,
      numbers: [1,2,3,4,5,6,7]
    }
  },
  computed: {
    ...mapState(['drugs', 'nowParient', 'nowNum', 'orderedOrderings', 'undoneDrugOrderings']),
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
    },
    undoneDrugOrderings: {
      get () {
        return this.$store.state.undoneDrugOrderings
      },
      set (val) {
        this.$store.state.undoneDrugOrderings = val
      }
    }
  },
  watch: {
    nowParient(val)  {
      this.nowParient = val
    }
  },
  mounted () {
    // Bus.$on('getNowParient',(nowParient) =>{
    //   this.nowParient = nowParient
    // })
  },
  methods: {
    chosenDrug (index) {
      this.nowParient.needDrugs[index].drug_specifications = this.drugs[6].specifications
      this.nowParient.needDrugs[index].drug_unit = this.drugs[6].unit
    },
    clear () {
      this.isToEmpty = true
    },
    toEmpty () {
      this.nowParient.needDrugs.splice(1, this.nowParient.needDrugs.length - 1)
      this.nowParient.needDrugs.forEach(element => {
        element.drug_name = '',
        element.drug_specifications = '',
        element.drug_num = '',
        element.drug_unit = '',
        element.drug_use = ''
      });
      this.isToEmpty = false
    },
    cancelItem () {
      this.isToEmpty = false
    },
    next () {
      // 新增2个输入框
      // this.newInput = '<input class="form-control prescribeText input1" v-model="drug_name" id="drug_name" name="drug_name" type="text" placeholder="药品名称"><span>*</span><input class="form-control prescribeText input2" v-model="drug_num" id="drug_num" name="drug_num" type="text" placeholder="数量">'
      this.nowParient.needDrugs.push({drug_name: '', drug_specifications: '',drug_num: '', drug_unit: '',drug_use: ''})
    },
    // async submit () {
    //   // 1.把药品属性加到当前病人对象中
    //   this.$set(this.nowParient, 'needDrugs', this.needDrugs)

    //   // 2.把当前病人信息提交到后台
    //   let fileData = JSON.stringify(this.nowParient)
    //   const result = await reqNowPatientOk(fileData)
    //   if (result.code === 200){
    //     // 成功，显示提交成功，确认之后跳到问诊页面
    //     if (window.confirm('提交成功')) {
    //       this.$router.push('/doctor/inquiryAndWrite')
    //       this.nowOk = true
    //    }  
    //   }else {
    //     alert('提交失败！')
    //   }
    // }
    submit () {
      // this.$set(this.nowParient, 'needDrugs', this.needDrugs)
      // this.nowOk = true 
      // Bus.$emit('getNowOk',this.nowOk)
      this.orderedOrderings.splice(this.nowNum, 1)
      this.nowParient = this.orderedOrderings[this.nowNum]
      this.undoneDrugOrderings.push(this.nowParient)
      this.$router.push('/doctor/inquiryAndWrite')
    }
  },
  // destroyed () {
  //   Bus.$off('getNowParient')
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
    width: 230px;
}
.now .nowInfo .span2 {
    width: 230px;
}
.el-range-editor.is-active, .el-range-editor.is-active:hover, .el-select .el-input.is-focus .el-input__inner {
  border-color: #009688 !important;
}
.el-date-table td.available:hover {
  color: #009688 !important;
}
.el-date-table td.today span {
  color: #009688 !important;
}
.el-date-table td.current:not(.disabled) span {
    background-color: #009688 !important;
}
.el-cascader-menu__item.is-active {
    color: #009688 !important;
}
.el-select-dropdown__item.selected{
    color: #009688 ;
}
.el-input__inner {
  border: 2px solid #ccc;
}
.form-group1 span {
  position: static;
  left: 1px;
  font-size: 25px;
}
input:focus {
  border-color:#009688 !important;
  /* border-color:#409EFF !important; */
  outline: 0;
}
 /* 过度样式 */
.alertTip-enter-active,.alertTip-leave-active{
  transition: opacity .5s
}
/* 隐藏样式  */
.alertTip-enter,.alertTip-leave-to{
  opacity: 0;
}
.drugText5 {
  display: inline-block;
  width: 280px;
  padding: 8px 12px;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.44;
  color: #555555;
  background-color: #fff;
  background-image: none;
  border: 2px solid #ccc;
  border-radius: 3px;
}
.toEmpty {
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

.toEmpty p {
  margin: 5px 0 5px;
  font-size: 13px;
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
.prescribeText{
  display: block;
  width: 100px;
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
.form-group1 span{
  position: relative;
  left: 23px;
  font-size: 25px;
}
.drugNum{
  position: relative;
  left: 88px;
}
.drugName{
  position: relative;
  /* margin-left: -193px; */
}
.form-group1{
  display: inline-block;
}
.now fieldset{
  margin-left: 20px;
}
.now .row label{
  display: inline;
  /* margin-left: 16px; */
}
.now ul {
  padding-left: 0px;
}
.now ul li {
  list-style: none;
}
.input1, .input2 {
  display: inline;
}
/* .input1{
  float: left;
  margin: 10px 30px 10px 0px;
} */
.input2{
  /* float: left; */
  margin-left: 45px;
}
.now .btn1 {
  display: inline-block;
  margin-bottom: 0;
  margin-right: 115px;
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
.btn2{
  /* display: inline-block; */
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
.now .form-group{
  margin-top: 30px;
  
}
</style>
