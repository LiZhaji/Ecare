<template>
  <div>
    <div class="page-title">
      <div>
        <span id="homePage"><i class="fa fa-laptop"></i>   药品查询</span>
        <!-- <p>此页介绍xxx校医院基本信息</p> -->
      </div>
      <div>
        <ul class="breadcrumb">
          <li><i class="fa fa-home fa-lg"></i></li>
          <li><a href="#">药品查询</a></li>
        </ul>
      </div>
    </div>
  <ul class="helpCard4" v-show="isHelp" @mouseenter="help" @mouseleave="closeHelp">
      <li>
        <p>关键字可以是：</p>
          <p>1.药品编号，如 001</p>
          <p>2.生产日期，如 2018-01-15</p>
          <p>3.保质期，如 3年</p>
          <p>4.描述中的有效字，如 咽痛</p>
      </li>
    </ul> 
  <div class="col-md-12 seekDrugs" :class="{opacity: isHelp}">
      <div class="card">
        <div class="card-body">
          <div class="search">
            <legend>
              <span @mouseenter="help" @mouseleave="closeHelp"><i class="iconfont">&#xe75d;</i></span>
              <input type="search" class="drugText1" placeholder="关键字" v-model="searchKey" aria-controls="sampleTable">
              <input type="button" value="搜索" class="searchBtn btn-primary " @click="search">
            </legend>
          </div>
          <table class="table table-hover">
            <thead>
              <tr>
                <th class="td1">#药品编号</th>
                <th class="td2">生产日期</th>
                <th class="td3">保质期</th>
                <th class="td4">描述</th>
                <th class="td5">库存</th>
              </tr>
            </thead>
            <tbody v-show="isSearch">
              <tr v-for="(item,index) in backups" :key="index">
                <td>{{item.drugId}}</td>
                <td>{{item.birthDate}}</td>
                <td>{{item.deathDate}}</td>
                <td>{{item.describe}}</td>
                <td>{{item.drugLeft}}</td>
              </tr>
            </tbody>
            <tbody v-show="!isSearch">
              <tr v-for="(item,index) in drugs" :key="index">
                <td>{{item.drugId}}</td>
                <td>{{item.birthDate}}</td>
                <td>{{item.deathDate}}</td>
                <td>{{item.describe}}</td>
                <td>{{item.drugLeft}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      drugs: [
        {  
          drugId: '001',
          birthDate: '2018-01-15',
          deathDate: '3年',
          describe: '双黄连口服液，用于治疗风热感冒，咽痛。',
          drugLeft: 105
        },
        {  
          drugId: '002',
          birthDate: '2018-01-11',
          deathDate: '2年',
          describe: '松龙，适应于原发性肾病综合征、原发性身肖秀肾炎、急进性肾小球肾炎、部分继发性安静肾小球病、过敏性间质性肾炎。',
          drugLeft: 230
        },
        {  
          drugId: '003',
          birthDate: '2018-04-25',
          deathDate: '3年',
          describe: '厄贝沙坦,有阻断肾素-血管紧张素-醛固酮系统的作用，可以降低肾小球内高压，减少蛋白尿，延缓肾损害的进展。',
          drugLeft: 244
        },
        {
          drugId: '004',
          birthDate: '2018-08-13',
          deathDate: '5年',
          describe: '达力全,患有哮喘、心动过缓或传导阻滞、低血压的患者禁用，在服用期间，注意监测心率、血压、血脂、血糖',
          drugLeft: 198
        },
        {  
          drugId: '005',
          birthDate: '2019-01-21',
          deathDate: '2年',
          describe: '络欣平,副作用：体位性低血压。注意事项：起始小剂量，睡前服用，慢坐慢立',
          drugLeft: 47
        },
        {  
          drugId: '006',
          birthDate: '2018-10-27',
          deathDate: '3年',
          describe: '胃康灵，适用于急慢性胃炎、浅表性胃炎、萎缩性胃炎、胃溃疡、糜烂性胃炎、十二指肠溃疡及胃出血等症引起的各种胃部不适，如胃酸、胃胀、胃痛、烧心、恶心、呕吐、消化不良等症状',
          drugLeft: 89
        }
      ],
      backups: [],
      searchKey: '',
      isSearch: false,
      isHelp: false
    }
  },
  methods: {
    help () {
      this.isHelp = true
    },
    closeHelp () {
      this.isHelp = false
    },
    search () {
      const {searchKey, drugs} = this
      let arr = [...drugs]
      // 过滤数组
      if(searchKey.trim()) {
        arr = drugs.filter(p => (p.drugId.indexOf(searchKey)!==-1) || (p.birthDate.indexOf(searchKey)!==-1) || (p.deathDate.indexOf(searchKey)!==-1) || (p.describe.indexOf(searchKey)!==-1))
        // || (p.drugLeft.string().indexOf(searchKey)!==-1)
        console.log(arr)
        this.backups = arr
        this.isSearch = true
      }
    }
  },
  watch: {
    searchKey (val) {
      if(val === '') {
        this.isSearch = false
      }
    }
  },
}
</script>

<style>
.drugText1{
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
  -webkit-transition: border-color ease-in-out 0.15s;
  -o-transition: border-color ease-in-out 0.15s;
  transition: border-color ease-in-out 0.15s;
}
.searchBtn{
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
.seekDrugs .table > thead {
  vertical-align: bottom;
  border-bottom: 2px solid #ddd;
}
.seekDrugs .table tbody tr {
  border-bottom: 1px solid #ddd;
  
}
.seekDrugs table .td1 {
  width: 10%;
}
.seekDrugs table .td2 {
  width: 10%;
}
.seekDrugs table .td3 {
  width: 10%;
}
.seekDrugs table .td4 {
  width: 40%;
}
.seekDrugs table .td5 {
  width: 10%;
}
.opacity{
  opacity: .5;
}
.helpCard4{
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
  -webkit-box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
          box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
  /* margin: -10px 0 0 5px ; */
  -webkit-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
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
