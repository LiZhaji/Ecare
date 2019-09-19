<template>
  <div >
    <div class="page-title needMarginBottom">
      <div>
        <span id="homePage"><i class="fa fa-file-text"></i>   就诊历史</span>
        <!-- <p>此页介绍xxx校医院基本信息</p> -->
      </div>
      <div>
        <ul class="breadcrumb">
          <li><i class="fa fa-home fa-lg"></i></li>
          <li><a href="#">就诊历史</a></li>
        </ul>
      </div>
    </div>
    <ul class="helpCard4" v-show="isHelp" @mouseenter="help" @mouseleave="closeHelp">
      <li>
        <p>关键字可以是：</p> 
          <p>1.编号，如 001</p>
          <p>2.学生信息关键字，如 001，女</p>
          <p>3.开药日期，如 2019-01-13</p>
          <p>4.药品清单中的关键字，如 双黄连口服液</p>
      </li>
    </ul> 
    <div class="history " :class="{opacity: isHelp}">
      <ul class=" card5" v-show="showDetail">
        <li>
          <span class="itemDetail">记录编号：<span class="underline">{{nowOrder.id}}</span></span> 
          <span class="itemDetail">时间：<span class="underline">{{nowOrder.create_time}}</span></span>
          <span class="itemDetail">医生：<span class="underline">{{nowOrder.id_doc}}</span></span>
          <br>
          <span class="itemDetail" >学号：<span class="underline">{{nowOrder.stu_id}}</span></span>
          <span class="itemDetail">姓名：<span class="underline">{{nowOrder.stu_name}}</span></span>
          <span class="itemDetail">性别：<span class="underline">{{nowOrder.stu_sex}}</span></span>
          <br>
          <p >药品清单：
            <p class="underline" v-for="(smallItem, index) in nowOrder.drug_list" :key="'historyItem' + index">
              {{smallItem.drug_name}}：{{smallItem.drug_specifications}} {{smallItem.drug_num}}{{smallItem.drug_unit}}，{{smallItem.drug_use}}；
            </p>
          </p>
          <p >取药方式：<span class="underline">{{nowOrder.take_way}}</span></p>
          <p >处理标志： <span class="underline">{{nowOrder.price}}</span></p> 
          <span class="offDetail" @click="closeDetail">关闭</span>
        </li>
      </ul>    
      <div class="card4" :class="{opacity:showDetail}">
        <legend>
          <!-- <h3 class="card-title">医院就诊记录</h3> -->
          <span class="search">
              <span @mouseenter="help" @mouseleave="closeHelp"><i class="iconfont">&#xe75d;</i></span>
              <input type="search" class="orderingsText1" placeholder="关键字" v-model="searchKey" aria-controls="sampleTable">
              <input type="button" value="搜索" class="searchBtn btn-primary " @click="search" >
          </span> 
        </legend>
        <ul class="pagination">
          <!-- <p>aaa</p> -->
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
        <table class="table">
          <thead>
            <tr> 
              <th>#编号</th>
              <th>学号</th>
              <th>姓名</th>
              <th>性别</th>
              <th>药品清单</th>
              <th>开药日期</th>
              <th>取药方式</th>
              <th>处理标志</th>
          </tr>
          </thead>
          <tbody> 
            <tr v-show="!isSearch" v-for="(item, index) in drugOrderings" :key="index" @click="chooseParient(index)" title="点击查看详情">
              <td >{{item.id}}</td>
              <td >{{item.stu_id}}</td>
              <td >{{item.stu_name}}</td>
              <td >{{item.stu_sex}}</td>
              <td >
                <span v-for="(smallItem, index) in item.drug_list" :key="index">
                  {{smallItem.drug_name}}：{{smallItem.drug_num}}{{smallItem.drug_unit}}；
                </span>
              </td>
              <td >{{item.create_time}}</td>
              <td >{{item.take_way}}</td>
              <td >{{item.price}}</td>
            </tr>
            <tr v-show="isSearch" v-for="(item, index) in drugOrderings" :key="'searching' + index" @click="chooseParient(index)" title="点击查看详情">
              <td >{{item.id}}</td>
              <td >{{item.stu_id}}</td>
              <td >{{item.stu_name}}</td>
              <td >{{item.stu_sex}}</td>
              <td >
                <span v-for="(smallItem, index) in item.drug_list" :key="'searching' + index">
                  {{smallItem.drug_name}}：{{smallItem.drug_num}}{{smallItem.drug_unit}}，{{smallItem.drug_use}}；
                </span>
              </td>
              <td >{{item.create_time}}</td>
              <td >{{item.price}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <transition name="alertTip">
      <div class="networkError" v-show="isNetworkError" @click="networkError">
        <p>获取药品信息失败，请检查您的网络!</p>
        <input type="button" value="确定" class="networkErrorBtn btn-primary ">
      </div>
    </transition>
  </div>
</template>

<script>
import { reqHistoryDrugOrderings } from "../../../api"
import { mapState } from "vuex";
export default {
  data () {
    return {
      showDetail: false,
      nowOrder: {},
      searchKey: '',
      backups: [],  // 用来显示搜索结果
      isSearch: false,
      isHelp: false,
      pages: [{id: '', chosen: false}],
      nowOrderings: [], //显示当前页的六条记录
      nowPage: '',//当前页数
    }
  },
  computed: {
    // ...mapState(['drugOrderings'])
    ...mapState(['drugOrderings', 'isNetworkError']),
    drugOrderings: {
      get () {
        return this.$store.state.drugOrderings
      },
      set (val) {
        this.$store.state.drugOrderings = val
      }
    },
    isNetworkError: {
      get () {
        return this.$store.state.isNetworkError
      },
      set (val) {
        this.$store.state.isNetworkError = val
      }
    }
  },
  mounted () {
    // 0.从后台获取历史药品订单
    // this.$store.dispatch('get_drug_orderings')
    
    //1.自动计算页数
    let pageNum = Math.ceil(this.drugOrderings.length / 6)
    //改变pages第一个空的
    this.pages.splice(0, 1, {id: 1, chosen: false})
    for (let i = 2; i <= pageNum; i++) {
      this.pages.push({id: i, chosen: false})
    }
    //2.默认显示第一页
    this.nowPage = 0
    this.$set(this.pages[0], 'chosen', true)
    this.nowOrderings = this.drugOrderings.slice(0, 6) //注意slice和splice的区别
  },
  methods: {
    networkError () {
      this.isNetworkError = false
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
    help () {
      this.isHelp = true
    },
    closeHelp () {
      this.isHelp = false
    },
    search () {
      const {drugOrderings, searchKey} = this
      let arr = [...drugOrderings]
      if(searchKey.trim()) { 
        arr = drugOrderings.filter(p => (p.id.indexOf(searchKey)!==-1) || (p.time.indexOf(searchKey)!==-1) || (p.disease_name.indexOf(searchKey)!==-1) || (p.disease_type.indexOf(searchKey)!==-1) || (p.id_doc.indexOf(searchKey)!==-1) || (p.recipe.indexOf(searchKey)!==-1) || (p.drug_list.indexOf(searchKey)!==-1))
        this.backups = arr
        this.isSearch = true
      }
    },
    chooseParient (index) {
      this.nowOrder = this.backups[index] || this.drugOrderings[index]
      this.showDetail = true
    },
    closeDetail () {
      this.showDetail = false
    }
  },
  watch: {
    searchKey (val) {
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
        this.nowOrderings = this.drugOrderings.slice(6 * val, 6 * (val + 1))
      },
      drugOrderings(val) {
        let pageNum = Math.ceil(this.drugOrderings.length / 6)
        if (pageNum > this.pages.length) {
          this.pages.push({id: pageNum, chosen: true})
          this.nowPage = pageNum
          this.nowOrderings = this.drugOrderings.slice(6 * this.nowPage, 6 * (this.nowPage + 1))
        }
        if (pageNum < this.pages.length) {
          this.pages.pop()
          if (pageNum === this.pages.length) {
            this.nowPage = pageNum
            this.nowOrderings = this.drugOrderings.slice(6 * this.nowPage, 6 * (this.nowPage + 1))
          }
        }
      }
  }
}
</script>

<style>
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
.history .card5 .itemDetail {
  display: inline-block;
  margin-right: 20px;
  margin-bottom: 10px;
}
.underline {
  text-decoration: underline;
}
.history .orderingsText1:focus {
  outline: none;
  border-color: #009688;
}
.card5 {
  list-style: none;
  z-index: 100;
  /* float: left; */
  width: 30%;
  position: fixed;
  top: 170px;
  left: 600px;
  background: #ffffff;
  border-radius: 3px;
  padding: 20px 25px;
  -webkit-box-shadow: -1px 1px 12px black;
  box-shadow: -1px 1px 12px black;
}
.history {
  /* 为了和别的兄弟页面保持宽度一致 */
  width: 1224.2px;
  margin: 0 auto;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
}
.history .pagination {
  position: absolute;
  right: 23px;
  top: -4px;
}
.opacity{
  opacity: .5;
  overflow: hidden;
}
.needMarginBottom {
  margin-bottom: 25px;
}
.history h3 {
  font-size: 24px;
  display: inline-block;
}
.history .orderingsText1 {
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
}
.history .searchBtn{
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
.history .card4 .table tbody tr{
  cursor: pointer;
}
.history .card .table tr:hover{
  background-color: lightgray;
}
.history .card5 .offDetail{
  color: red;
  cursor: pointer;
  margin-left: 175px;
}
.history .card4 {
  position: relative;
  background: #ffffff;
  border-radius: 3px;
  padding: 20px;

}
.opacity{
  opacity: .5;
  overflow: hidden;
}
.history tr {
  height: 40px;
}
.history .td1 {
  width: 10%;
}
.history .td2 {
  width: 10%;
}
.history .td3 {
  width: 10%;
}
.history .td4 {
  width: 10%;
}
.history .td5 {
  width: 10%;
}
.needHide {
  width: 30%;
}
.history .td6 {
  width: 20%;
}
.history .search span {
  /* margin-left: 64%; */
  margin-right: 10px; 
  cursor: pointer;
}

.helpCard4{
  list-style: none;
  z-index: 100;
  width: 16%;
  position: fixed;
  top: 159px;
  left: 314px;
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