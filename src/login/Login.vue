<template >
  <div @keyup.enter="isNullOk">
    <section class="material-half-bg" :class="{opciaty:isNull || isInputWoring}">
      <div class="cover"></div>
    </section>
    <section class="login-content" :class="{opciaty:isNull || isInputWoring}">
      <div class="logo">
        <img src="../images/LOGO(web).png" alt="logo" width="40px"/>
        <span>Ecare</span>        
      </div>
      <div class="login-box">
        <!-- action="index.html" 下面这个的属性，导致路由跳转之后立刻又重新打开回到初始页面 -->
        <form class="login-form">
          <h3 class="login-head"><i class="fa fa-lg fa-fw fa-user"></i>登录</h3>
          <div class="form-group block">
            <label class="control-label">学校</label>
            <!-- <span class="demonstration">学校</span> -->
            <el-cascader class="form-control1"
              expand-trigger="hover"
              :options="schools"
              v-model="chosenSchool"
              >
            </el-cascader>
          </div>
          <div class="form-group">
            <label class="control-label">用户账号</label>
            <input class="form-control" v-model="id" type="text" placeholder="用户名" autofocus>
          </div>
          <div class="form-group">
            <label class="control-label">密码</label>
            <input class="form-control" v-model="psw" type="password" placeholder="密码">
          </div>
          <div class="form-group">
            <div class="utility">
              <div class="animated-checkbox">
                <label class="semibold-text">
                  <input type="radio" @click="getChar" name="choiceChar" value="doctor" checked="checked"><span class="label-text">医生</span>
                </label>
                <label class="semibold-text secondInput">
                  <input type="radio" @click="getChar" name="choiceChar" value="manager"><span class="label-text">管理员</span>
                </label>
              </div>
            </div>
          </div>
          <div class="form-group btn-container">
            <button type="submit" @click="signIn" class="btn btn-primary btn-block"><i class="fa fa-sign-in fa-lg fa-fw"></i>登录</button>
          </div>
        </form>
      </div>
      <!-- <alert-tip v-show="showAlert"/> -->
    </section>
    <transition name="isNulling">
      <div class="isNull" v-show="isNull" >
        <p>用户名或密码不能为空!</p>
        <input type="button" value="确定"   @click="isNullOk" class="isNullBtn btn-primary ">
      </div>
    </transition>
    <transition name="inputWoring">
      <div class="isInputWoring" v-show="isInputWoring" >
        <p>用户名或密码输入有误，请重新输入!</p>
        <input type="button" value="确定" @click="inputWoring" class="isInputWoringBtn btn-primary ">
      </div>
    </transition>
    
  </div>
</template>

<script>
import { reqSignIn } from '../api/index.js'
import Bus from '../bus.js'
import { mapState } from 'vuex'

export default {
  data () {
    return {
      schools: [
        {
          value: 'ZJDX',
          label: 'A省',
          children: [{
            value: 'ZhejiangSchool',
            label: 'A1大学',
          },{
            value: 'ZJLGDX',
            label: 'A2大学',
          },{
            value: 'HZDZKJDX',
            label: 'A3大学',
          },{
            value: 'ZJGYDX',
            label: 'A5大学',
          },{
            value: 'ZJGSDX',
            label: 'A6大学',
          }]
        },{
          value: 'shanghai',
          label: 'B省',
          children: [{
            value: 'SHJTDX',
            label: 'B1大学',
          },{
            value: 'FDDX',
            label: 'B2大学',
          },{
            value: 'TJDX',
            label: 'B3大学',
          },{
            value: 'HDSFDX',
            label: 'B4大学',
          }]
        }
      ],
      chosenSchool: [],
      id:'',
      psw:'',
      radioVal: 'doctor',
      isNull: false,
      isInputWoring: false
    }
  },
  computed: {
    ...mapState(['nowDrugDoctor', 'nowManager', 'nowPreDoctor', "isDrugDoctor"]),
    nowDrugDoctor: {
      get () {
        return this.$store.state.nowDrugDoctor
      },
      set (val) {
        this.$store.state.nowDrugDoctor = val
      }
    },
    nowManager: {
      get () {
        return this.$store.state.nowManager
      },
      set (val) {
        this.$store.state.nowManager = val
      }
    },
    nowPreDoctor: {
      get () {
        return this.$store.state.nowPreDoctor
      },
      set (val) {
        this.$store.state.nowPreDoctor = val
      }
    },
    isDrugDoctor: {
      get () {
        return this.$store.state.isDrugDoctor
      },
      set (val) {
        this.$store.state.isDrugDoctor = val
      }
    }
  },
  methods: {
    isNullOk () {
      this.isNull = false
    },
    inputWoring () {
      this.isInputWoring = false
    },
    getChar(event){
      this.radioVal = event.target.value;
    },
    signIn(){
      // 前台表单验证
      if (!this.id) {
        this.isNull = true
        return
      } else if (!this.psw) {
        this.isNull = true
        return
      } else if (!this.chosenSchool) {
        this.isNull = true
        return
      }
      //根据医生和管理员的选择跳转相应的页面
      if (this.radioVal === 'doctor'){
        // 是门诊医生
        if (this.id === 'doc2') {
          this.isDrugDoctor = false
        }
        this.$router.replace('/doctor')
      }
      else if (this.radioVal === 'manager') {
        this.$router.replace('/manager')
      }
    }
    // async signIn(){
    //   // 1.前台表单验证
    //   if (!this.id) {
    //     this.isNull = true
    //     return
    //   } else if (!this.psw) {
    //     this.isNull = true
    //     return
    //   } else if (!this.chosenSchool) {
    //     this.isNull = true
    //     return
    //   }
    //   // 2.接收两个input的值  id  psw ,封装成json对象
    //   let obj= {
    //     name: this.id,
    //     password: this.psw
    //   } 
    //   let fileData = JSON.parse(obj)
    //   //第二种方法，在传入的时候直接加引号-{"name":this.id, "password":this.psw}

    //   // 3.发送ajax请求密码登录
    //   const result = await reqSignIn(fileData)
    //   if (result.code === 200){
    //     // 根据医生和管理员的选择跳转相应的页面
    //     if(this.radioVal === 'doctor') {
    //       this.nowDrugDoctor = result.data
    //       this.$router.replace('/doctor')
    //     }   
    //     else if (this.radioVal === 'manager') {
    //       this.nowManager = result.data
    //       this.$router.replace('/manager')
    //     }
    //   }else if (result.code === 500 ) {
    //     this.isInputWoring = true
    //   }
    // }
  }
}
</script>

<style>

input::-webkit-input-placeholder,textarea::-webkit-input-placeholder{ 
  color:#606266 !important;
  padding-left: 3px; 
}
 
input:-moz-placeholder,textarea:-moz-placeholder{ 
  color:#606266 !important;
  padding-left: 3px; 
}
 
input::-moz-placeholder,textarea::-moz-placeholder{ 
  color:#606266 !important;
  padding-left: 3px; 
} 
input:-ms-input-placeholder,textarea:-ms-input-placeholder{ 
  color:#606266 !important;
  padding-left: 3px; 
}
.el-cascader-menu__item.is-active {
    color: #009688 !important;
}
.el-cascader__label {
    top: 10px !important;
    left: 0px !important;
}
.el-cascader .el-input.is-focus .el-input__inner {
  border-color: #009688;
}
.el-input.is-active .el-input__inner, .el-input__inner:focus {
  border-color: #009688;
  outline: 0;
} 
.el-input--suffix .el-input__inner {
    margin: 0px;
    padding-right: 30px;
    border: 2px solid #ccc;
    -webkit-appearance: none;
    background-color: #FFF;
    border-radius: 2px;
    /* border: 1px solid #DCDFE6; */
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: 0;
    padding: 0 15px;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 100%;
}
.form-control1 {
    display: block;
    width: 100%;
    padding: 0px;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.44;
    color: #555555;
    background-color: #fff;
    background-image: none;
    border-radius: 3px;
    /* border: 2px solid #ccc; */
    -webkit-transition: border-color ease-in-out 0.15s;
    transition: border-color ease-in-out 0.15s;
}
.form-control1:hover {
  border-color: #009688;
}
 /* 过度样式 */
.isNulling-enter-active,.isNulling-leave-active,.inputWoring-enter-active,.inputWoring-leave-active{
      transition: opacity .8s
}
/* 隐藏样式  */
.isNulling-enter,.isNulling-leave-to,.inputWoring-enter,.inputWoring-leave-to{
    opacity: 0;
}
.opciaty {
  opacity: .7;
}
.isNull, .isInputWoring {
  z-index: 100;
  /* float: left; */
  width: 20%;
  position: fixed;
  top: 290px;
  left: 615px;
  background: #ffffff;
  border-radius: 3px;
  padding: 12px 15px;
  box-shadow: -1px 1px 12px black;
}

.isNull p, .isInputWoring p {
  margin: 5px 0 5px;
  font-size: 13px;
}
.isNull .isNullBtn, .isInputWoring .isInputWoringBtn  {
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
.secondInput {
  margin-left: 50px;
}
</style>
