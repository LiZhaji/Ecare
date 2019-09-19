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
    <ul class="helpCard2" :class="{opacity: isWaiting || isNetworkError }" v-show="isHelp" @mouseenter="help" @mouseleave="closeHelp">
      <li>
        <p>关键字可以是：</p>
        <p>1.药品编号，如 001</p>
        <p>2.通用名，如 双黄连口服液</p>
        <p>3.生产日期，如 2018-01-15</p>
        <p>4.保质期，如 3年</p>
        <p>5.描述中的有效字，如 咽痛</p>
      </li>
    </ul>
    <div class="col-md-12 drugs" :class="{opacity: isHelp || isWaiting }">
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
              </tr>
            </thead> 
            <tbody v-show="!isSearch">
              <tr v-for="(item,index) in nowDrugs" :key="index">
                <td><span v-show="item.ok">{{item.drugId}}</span></td>
                <td><span v-show="item.ok">{{item.drugName}}</span></td>
                <td><span v-show="item.ok">{{item.type}}</span></td>
                <td><span v-show="item.ok">{{item.specifications}}</span></td>
                <td><span v-show="item.ok">{{item.unit}}</span></td>
                <td><span v-show="item.ok">{{item.licenseNumber}}</span></td>
                <td><span v-show="item.ok">{{item.birthDate}}</span></td>
                <td><span v-show="item.ok">{{item.deathDate}}</span></td>
                <td><span v-show="item.ok">{{item.stock}}</span></td>
                <td class="describe"><span v-show="item.ok">{{item.describe}}</span>
                  <textarea v-show="!item.ok" class="showDescribe" type="text" v-model="item.describe"/>
                </td>
              </tr>
            </tbody>
            <tbody v-show="isSearch">
              <tr v-for="(item,index) in backups" :key="index">
                <td><span v-show="item.ok">{{item.drugId}}</span></td>
                <td><span v-show="item.ok">{{item.drugName}}</span></td>
                <td><span v-show="item.ok">{{item.type}}</span></td>
                <td><span v-show="item.ok">{{item.specifications}}</span></td>
                <td><span v-show="item.ok">{{item.unit}}</span></td>
                <td><span v-show="item.ok">{{item.licenseNumber}}</span></td>
                <td><span v-show="item.ok">{{item.birthDate}}</span></td>
                <td><span v-show="item.ok">{{item.deathDate}}</span></td>
                <td><span v-show="item.ok">{{item.stock}}</span></td>
                <td class="describe"><span v-show="item.ok">{{item.describe}}</span>
                  <textarea v-show="!item.ok" class="showDescribe" type="text" v-model="item.describe"/>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <img class="waiting" v-show="isWaiting" width="32px" src="../../../images/loading3.gif">
    <transition name="alertTip">
      <div class="networkError" v-show="isNetworkError" @click="networkError">
        <p>获取药品信息失败，请检查您的网络!</p>
        <input type="button" value="确定" class="networkErrorBtn btn-primary ">
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState} from "vuex";
  export default {
    data() {
      return {
        backups: [],
        isSearch: false,
        searchKey:'',
        isHelp: false,
        isWaiting: false,
        count: '',
        pages: [{id: '', chosen: false}],
        nowN: 5,
        nowDrugs: [], //显示当前页的n(nowN)个药品
        nowPage: '',//当前页数
        delIndex:'',
        delDrug:''//当前选择要出库的药品名称
      }
    },
    computed: {
      ...mapState(['drugs', 'isNetworkError']),
      networkError: {
        get () {
          return this.$store.state.networkError
        },
        set (val) {
          this.$store.state.networkError = val
        }
      }
    },
    mounted () {
      // 0.从后台获取drugs数据
      // this.$store.dispatch('get_drugs')

      this.count = this.drugs.length + 1
      // 1.自动计算页数
      let pageNum = Math.ceil(this.drugs.length / this.nowN)
      // 改变pages第一个空的
      this.pages.splice(0, 1, {id: 1, chosen: false})
      for (let i = 2; i <= pageNum; i++) {
        this.pages.push({id: i, chosen: false})
      }
      // 2.默认显示第一页，样式和药品
      this.nowPage = 0
      this.$set(this.pages[0], 'chosen', true)
      this.nowDrugs = this.drugs.slice(0, this.nowN) // 注意slice和splice的区别
    },
    methods: {
      networkError () {
        this.isnetworkError = false
      },
      previousPage() {
        // 1.判断是否是第一页,是则退出,不是则将当前页数-1
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
.drugText1:focus {
  outline: none;
  border-color: #009688;
}
.drugs .card .card-body span label{
  font-weight: 500;
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
  width: 265px;
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
