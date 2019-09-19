<template>
  <div @keyup.enter="addOk">
    <div class="page-title">
      <div>
        <span id="homePage"><i class="fa fa-pie-chart"></i>   药品管理</span>
        <!-- <p>此页介绍xxx校医院基本信息</p> -->
      </div>
      <div>
        <ul class="breadcrumb">
          <li><i class="fa fa-home fa-lg"></i></li>
          <li><a href="#">药品管理</a></li>
        </ul>
      </div>
    </div>
    <ul class="helpCard2" :class="{opacity: isWaiting }" v-show="isHelp" @mouseenter="help" @mouseleave="closeHelp">
      <li>
        <p>关键字可以是：</p>
        <p>1.药品编号，如 001</p>
        <p>2.通用名，如 双黄连口服液</p>
        <p>3.生产日期，如 2018-01-15</p>
        <p>4.保质期，如 3年</p>
        <p>5.描述中的有效字，如 咽痛</p>
      </li>
    </ul>
    <div class="col-md-12 drugs" :class="{opacity: isHelp || isWaiting || isAddOk || isdelItem || isdelOk || isupdateOk || isinputNull}">
      <div class="card">
        <div class="card-body">
          <div class="search">
            <legend> 
              <span @mouseenter="help" @mouseleave="closeHelp"><i class="iconfont">&#xe75d;</i></span>
              <input type="search" class="drugText1" placeholder="关键字" v-model="searchKey" aria-controls="sampleTable">
              <input type="button" value="搜索" class="searchBtn btn-primary " @click="search">
            </legend>
            <ul class="pagination">
              <li class="paginate_button previous " @click="previousPage" :class="{disabled:pages[0].chosen}"
                  id="sampleTable_previous"><a href="#" aria-controls="sampleTable" data-dt-idx="0" tabindex="0">上一页</a>
              </li>
              <li class="paginate_button " v-for="(item, index) in pages" :key="index" :class="{active: item.chosen}"
                  @click="choosePage(index)"><a href="#" aria-controls="sampleTable" data-dt-idx="1" tabindex="0">{{item.id}}</a>
              </li>
              <li class="paginate_button next" @click="nextPage" :class="{disabled:pages[pages.length-1].chosen}"
                  id="sampleTable_next"><a href="#" aria-controls="sampleTable" data-dt-idx="7" tabindex="0">下一页</a>
              </li>
            </ul>
          </div> 
          <table class="table table-hover">
            <thead>
              <tr> 
                <th>#药品编号</th>
                <th>通用名</th>
                <th>类型</th>
                <th>规格</th>
                <th>单位</th>
                <th>批准文号</th>
                <th>生产日期</th>
                <th>保质期</th>
                <th>库存</th>
                <th>描述</th>
                <th id="lastTr">操作</th>
              </tr>
            </thead> 
            <tbody v-show="!isSearch">
              <tr v-for="(item,index) in nowDrugs" :key="index">
                <td><span v-show="item.ok">{{item.drugId}}</span><input v-show="!item.ok" type="text" v-model="item.drugId"></td>
                <td><span v-show="item.ok">{{item.drugName}}</span><input v-show="!item.ok" type="text" v-model="item.drugName"></td>
                <td><span v-show="item.ok">{{item.type}}</span><input v-show="!item.ok" type="text" v-model="item.type"></td>
                <td><span v-show="item.ok">{{item.specifications}}</span><input v-show="!item.ok" type="text" v-model="item.specifications"></td>
                <td><span v-show="item.ok">{{item.unit}}</span><input v-show="!item.ok" type="text" v-model="item.unit"></td>
                <td><span v-show="item.ok">{{item.licenseNumber}}</span><input v-show="!item.ok" type="text" v-model="item.licenseNumber"></td>
                <td><span v-show="item.ok">{{item.birthDate}}</span><input v-show="!item.ok" type="text" v-model="item.birthDate"></td>
                <td><span v-show="item.ok">{{item.deathDate}}</span><input v-show="!item.ok" type="text" v-model="item.deathDate"></td>
                <td><span v-show="item.ok">{{item.stock}}</span><input v-show="!item.ok" type="text" v-model="item.stock"></td>
                <td class="describe"><span v-show="item.ok">{{item.describe}}</span>
                  <textarea v-show="!item.ok" class="showDescribe" type="text" v-model="item.describe"/>
                </td>
                <td class="btn3"><input type="button" value="更新" class="btn3 btn-info" @click="update(index)"></td>
                <td v-show="!item.ok" class="btn3"><input type="button" value="完成" class="btn3 btn-success" @click="complete(index)"></td>
                <td class="btn3"><input type="button" value="出库" class="btn3 btn-danger" @click="del(index)"></td>
              </tr>
            </tbody>
            <tbody v-show="isSearch">
            <tr v-for="(item,index) in backups" :key="index">
              <td><span v-show="item.ok">{{item.drugId}}</span><input v-show="!item.ok" type="text" v-model="item.drugId"></td>
              <td><span v-show="item.ok">{{item.drugName}}</span><input v-show="!item.ok" type="text" v-model="item.drugName"></td>
              <td><span v-show="item.ok">{{item.type}}</span><input v-show="!item.ok" type="text" v-model="item.type"></td>
              <td><span v-show="item.ok">{{item.specifications}}</span><input v-show="!item.ok" type="text" v-model="item.specifications"></td>
              <td><span v-show="item.ok">{{item.unit}}</span><input v-show="!item.ok" type="text" v-model="item.unit"></td>
              <td><span v-show="item.ok">{{item.licenseNumber}}</span><input v-show="!item.ok" type="text" v-model="item.licenseNumber"></td>
              <td><span v-show="item.ok">{{item.birthDate}}</span><input v-show="!item.ok" type="text" v-model="item.birthDate"></td>
              <td><span v-show="item.ok">{{item.deathDate}}</span><input v-show="!item.ok" type="text" v-model="item.deathDate"></td>
              <td><span v-show="item.ok">{{item.stock}}</span><input v-show="!item.ok" type="text" v-model="item.stock"></td>
              <td class="describe"><span v-show="item.ok">{{item.describe}}</span>
                <textarea v-show="!item.ok" class="showDescribe" type="text" v-model="item.describe"/>
              </td>
              <td class="btn3"><input type="button" value="更新" class="btn3 btn-info" @click="update(index)"></td>
              <td v-show="!item.ok" class="btn3"><input type="button" value="完成" class="btn3 btn-success" @click="complete(index)"></td>
              <td class="btn3"><input type="button" value="出库" class="btn3 btn-danger" @click="del(index)"></td>
            </tr>
            </tbody>
          </table>
          <span><label for="drugName">通用名:</label></span><input id="drugName" type="text" class="drugText2" v-model="newDrug.drugName">
          <span><label for="el-select1">类型:</label></span>
            <el-select id="el-select1" style="display: inline-block;" v-model="newDrug.type" clearable  filterable allow-create placeholder="请选择">
              <el-option-group 
                v-for="group in drugTypes"
                :key="group.label"
                :label="group.label">
                <el-option
                  v-for="item in group.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-option-group>
            </el-select>
          <span><label for="drugSpecifications">规格:</label></span><input id="drugSpecifications" type="text" class="drugText2" v-model="newDrug.specifications">
          <span><label for="licenseNumber">批准文号:</label></span><input id="licenseNumber" type="text" class="drugText2" v-model="newDrug.licenseNumber">
          <span><label for="birthDate">生产日期:</label></span>
            <el-date-picker id="birthDate" style="display: inline-block;"
                v-model="newDrug.birthDate"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd">
            </el-date-picker>
          
          <br>
          <span><label for="el-select">保质期:</label></span>
            <el-select id="el-select" style="display: inline-block;" v-model="newDrug.deathDate" clearable  filterable allow-create placeholder="请选择">
              <el-option-group 
                v-for="group in birthDates"
                :key="group.label"
                :label="group.label">
                <el-option
                  v-for="item in group.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-option-group>
            </el-select>
          <span><label for="stock">库存:</label></span><input id="stock" type="text" class="drugText2" v-model="newDrug.stock">
          <span><label for="describe">描述:</label></span><input id="describe" type="text" class="drugText3" v-model="newDrug.describe">
          <input type="button" value="入库" class="add btn-primary " @click="add">
        </div>
      </div>
    </div>
    <img class="waiting" v-show="isWaiting" width="32px" src="../../../images/loading3.gif">
    <transition name="alertTip">
      <div class="addOk" v-show="isAddOk" >
        <p>入库成功!</p>
        <input type="button" value="确定" @click="addOk" class="addOkBtn btn-primary ">
      </div>
    </transition>
    <transition name="alertTip">
      <div class="delItem" v-show="isdelItem">
        <p>确定出库"{{delDrug}}"吗？</p>
        <input type="button" value="确定" @click="delItem(delIndex)" class="delItemBtn btn-primary ">
        <input type="button" value="取消" @click="cancelItem" class="cancelBtn btn-default ">
      </div>
    </transition>
    <transition name="alertTip">
      <div class="delOk" v-show="isdelOk">
        <p>出库成功!</p>
        <input type="button" value="确定" @click="delOk" class="delOkBtn btn-primary ">
      </div>
    </transition>
    <transition name="alertTip">
      <div class="updateOk" v-show="isupdateOk">
        <p>更新成功!</p>
        <input type="button" value="确定" @click="updateOk" class="updateOkBtn btn-primary ">
      </div>
    </transition>
    <transition name="alertTip">
      <div class="inputNull" v-show="isinputNull">
        <p>输入项不能为空!</p>
        <input type="button" value="确定" @click="inputNull" class="inputNullBtn btn-primary ">
      </div>
    </transition>
  </div>
</template>

<script>
  import { mapState } from "vuex";
  export default {
    data() {
      return {
        birthDates: [{
          label: '液体制剂',
          options: [{
            value: '6个月',
            label: '6个月'
          }, {
            value: '12个月',
            label: '12个月'
          }]
        }, {
          label: '固体制剂',
          options: [{
            value: '18个月',
            label: '18个月'
          }, {
            value: '2年',
            label: '2年'
          }, {
            value: '3年',
            label: '3年'
          }]
        }, {
          label: '其他',
          options: [{
            value: '5年',
            label: '5年'
          }, {
            value: '其他',
            label: '手动输入'
          }]
        }],
        drugTypes: [{
          label: '处方药',
          options:[{
            value: '处方类',
            label: '处方类'
          }]
        },{
          label: '非处方药',
          options:[{
            value: '非处方甲类',
            label: '非处方甲类'
          },{
            value: '非处方乙类',
            label: '非处方乙类'
          }]
        }],
        backups: [],
        isSearch: false,
        searchKey:'',
        newDrug: {
          drugId: '',
          birthDate: '',
          deathDate: '',
          describe: '',
          ok: true
        },
        isHelp: false,
        isWaiting: false,
        count: '',
        pages: [{id: '', chosen: false}],
        nowN: 5,
        nowDrugs: [], //显示当前页的n(nowN)个药品
        nowPage: '',//当前页数
        isAddOk: false,
        isdelItem: false,
        delIndex:'',
        isdelOk: false,
        isupdateOk: false,
        isinputNull: false,
        delDrug:''//当前选择要出库的药品名称
      }
    },
    computed: {
      ...mapState(['drugs'])
    },
    mounted () {
      this.count = this.drugs.length + 1
      //1.自动计算页数
      let pageNum = Math.ceil(this.drugs.length / this.nowN)
      //改变pages第一个空的
      this.pages.splice(0, 1, {id: 1, chosen: false})
      for (let i = 2; i <= pageNum; i++) {
        this.pages.push({id: i, chosen: false})
      }
      //2.默认显示第一页，样式和药品
      this.nowPage = 0
      this.$set(this.pages[0], 'chosen', true)
      this.nowDrugs = this.drugs.slice(0, this.nowN) //注意slice和splice的区别
    },
    methods: {
      inputNull () {
        this.isinputNull = false;
      },
      updateOk () {
        this.isupdateOk = false
      },
      delOk () {
        this.isdelOk = false
      },
      addOk() {
        this.isAddOk = false
      },
      previousPage() {
        //1.判断是否是第一页,是则退出,不是则将当前页数-1
        if (this.nowPage <= 0) {
          return
        } else {
          this.nowPage = this.nowPage - 1
        }
      },
      choosePage(index) {
        this.nowPage = index
      },
      nextPage() {
        if (this.nowPage >= this.pages.length - 1) {
          return
        } else {
          this.nowPage = this.nowPage + 1
        }
      },
      help() {
        this.isHelp = true
      },
      closeHelp() {
        this.isHelp = false
      },
      search() {
        const {searchKey, drugs} = this
        let arr = [...drugs]
        if (searchKey.trim()) {
          arr = drugs.filter(p => (p.drugId.indexOf(searchKey) !== -1) || (p.birthDate.indexOf(searchKey) !== -1) || (p.deathDate.indexOf(searchKey) !== -1) || (p.describe.indexOf(searchKey) !== -1))
          this.backups = arr
          this.isSearch = true
        }
      },
      update(index) {
        this.nowDrugs[index].ok = false
      },
      complete(index) {
        this.isWaiting = true
        setTimeout(() => {
          this.isWaiting = false
          this.isupdateOk = true
          this.nowDrugs[index].ok = true
        }, 500);
      },
      del (index) {
        this.delDrug = this.nowDrugs[index].drugName
        this.delIndex = index
        this.isdelItem = true
      },
      delItem (index) {
        this.drugs.splice(index, 1)
        this.nowDrugs = this.drugs.slice(this.nowN * this.nowPage, this.nowN * (this.nowPage + 1))
        this.isdelItem = false
        this.isWaiting = true
        setTimeout(() => {
          this.isWaiting = false
          this.isdelOk = true
        }, 500);
      },
      cancelItem () {
        this.isdelItem = false
      },
      add() {
        if (!this.newDrug.drugName || !this.newDrug.birthDate || !this.newDrug.deathDate || !this.newDrug.describe) {
          this.isinputNull = true
          return
        }
        this.isWaiting = true
        this.newDrug.drugId = this.count
        if (parseInt(this.newDrug.drugId / 10) == 0) {
          this.newDrug.drugId = '00' + this.count
        } else if (parseInt(this.newDrug.drugId / 10) == 1) {
          this.newDrug.drugId = '0' + this.count
        }
        setTimeout(() => {
          this.isWaiting = false
          this.drugs.push(this.newDrug)
          this.nowPage = this.pages.length - 1
          this.nowDrugs = this.drugs.slice(this.nowN * this.nowPage, this.nowN * (this.nowPage + 1))
          this.count = this.count + 1
          this.newDrug = {drugId: '', drugName: '', birthDate: '', deathDate: '', describe: '', ok: true}
        }, 800);
        setTimeout(() => {
          this.isAddOk = true
        }, 850);
        // this.drugs.splice(this.drugs.length,0,this.newDrug)

        // console.log(this.drugs)
      }
    },
    watch: {
      searchKey(val) {
        if (val === '') {
          this.isSearch = false
        }
      },
      nowPage(val) {
        //2.清空所有被选中样式
        this.pages.forEach(element => {
          element.chosen = false
        })
        //3.修改当前选中按钮样式
        this.$set(this.pages[val], 'chosen', true)
        //4.显示相应的页面内容
        this.nowDrugs = this.drugs.slice(this.nowN * val, this.nowN * (val + 1))
      },
      drugs(val) {
        let pageNum = Math.ceil(this.drugs.length / this.nowN)
        if (pageNum > this.pages.length) {
          this.pages.push({id: pageNum, chosen: true})
          this.nowPage = pageNum
          this.nowDrugs = this.drugs.slice(this.nowN * this.nowPage, this.nowN * (this.nowPage + 1))
        }
        if (pageNum < this.pages.length) {
          this.pages.pop()
          if (pageNum === this.pages.length) {
            this.nowPage = pageNum
            this.nowDrugs = this.drugs.slice(this.nowN * this.nowPage, this.nowN * (this.nowPage + 1))
          }
        }
      }
    }
  }
</script>

<style>
#lastTr {
  width: 30px;
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

input:focus {
  border-color:#009688 !important;
  /* border-color:#409EFF !important; */
  outline: 0;
}
.drugs .card .card-body span label{
  font-weight: 500;
}
 /* 过度样式 */
.alertTip-enter-active,.alertTip-leave-active{
      transition: opacity .5s
}
/* 隐藏样式  */
.alertTip-enter,.alertTip-leave-to{
    opacity: 0;
}
.delItem{
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
.delItem p{
  margin: 5px 0 5px;
  font-size: 13px;
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
.addOk,.delOk,.updateOk, .inputNull {
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

.addOk p,.delOk p,.updateOk p, .inputNull p{
  margin: 5px 0 5px;
  font-size: 13px;
}

.addOk .addOkBtn,.delOk .delOkBtn,.updateOk .updateOkBtn, .inputNull .inputNullBtn{
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

.waiting {
  position: fixed;
  left: 55%;
  top: 50%;
}

.drugs .card .search .pagination {
  position: absolute;
  right: 20px;
  top: -3px;
}
.helpCard2 {
  list-style: none;
  z-index: 100;
  /* float: left; */
  width: 16%;
  position: fixed;
  top: 159px;
  left: 317px;
  background: #ffffff;
  border-radius: 3px;
  padding: 20px 25px;
  /* margin: -10px 0 0 5px ; */
  transition: all 0.3s ease-in-out;
}
.opacity {
  opacity: .5;
  overflow: hidden;
}
.drugs .search i {
  width: 25px;
}
.drugs .btn3 {
  display: inline-block;
  margin: 0 5px 0 -4px;
  font-weight: 600;
  text-align: center;
  vertical-align: middle;
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
}
.table > thead {
  vertical-align: bottom;
  border-bottom: 2px solid #ddd;
}
.table tbody tr {
  border-bottom: 1px solid #ddd;
  table-layout: unset;
  height: 30px;
}
.showDescribe {
  display: inline-block;
  width: 100%;
  height: 100%;
  text-align: justify;
}
.describe {
  width: 200px;
  /* height: 34.2px; */
  overflow: hidden;
}
.drugs .card table input {
  width: 85px;
}
.drugText1 {
  display: inline-block;
  width: 150px;
  height: 35px;
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
}

.drugText2 {
  margin-bottom: 20px;
  display: inline-block;
  width: 133px;
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
}
.el-input__suffix {
  right: 15px;
  transition: all .3s;
}
#el-select, #el-select1 {
  width: 130px;
  margin-right: 10px;
  margin-left: 5px;
}
.el-input__inner {
  display: inline-block;
  width: 208px;
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
}
.drugText3 {
  display: inline-block;
  width: 533px;
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
}

.drugs .add, .searchBtn {
  display: inline-block;
  margin-left: 30px;
  font-weight: 600;
  text-align: center;
  vertical-align: middle;
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

.iconfont {
  font-family: "iconfont" !important;
  font-size: 20px;
  font-style: normal;
  color: #979696;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}
</style>
