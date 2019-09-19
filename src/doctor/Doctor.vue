<template>
  <div id="doctor" class="sidebar-mini fixed">
    <div class="wrapper">
      <main-header/>
      <doctor-sidebar/>
      <div class="content-wrapper">
        <keep-alive>
          <router-view/>
        </keep-alive>
      </div>     
    </div>   
  </div>
</template>
        <div v-show="isDrugDoctor && newAppear" class="newUndoneItem" title="点击进入" @click="addNewDrugItem">
          <p class="newTitle">新药品订单!</p>
        </div>
<script>
import MainHeader from '../components/MainHeader/MainHeader.vue'
import DoctorSidebar from '../components/DoctorSide/DoctorSidebar.vue'
import { mapState } from "vuex";
export default {
  data () {
    return {
      newUndoneItem: {
        id: '009',
        stu_id: '009',
        stu_name: '何大北',
        stu_sex: '男',
        id_doc: '/',
        create_time: '2019-01-12',
        drug_list: [ 
          { 
            drug_name: '双黄连口服液',
            drug_specifications: '10ml*10支/盒', //包装规格 
            drug_num: '1',
            drug_unit: '盒',
            drug_use: '口服。一次20毫升(2支)，一日3次'
          },
          {
            drug_name: '阿莫西林胶囊',
            drug_num: '1',
            drug_specifications: '0.25g*50s/盒', //包装规格 
            drug_unit: '盒',
            drug_use: '口服。一次2片，一日3次'
          }
        ],
        take_way: '柜取',
        price: '未处理',
        isNow: false
      },
      newAppear: false
    }
  },
  components: {
    MainHeader,
    DoctorSidebar
  },
  computed: {
    ...mapState(['undoneDrugOrderings', 'isNewDrug', 'isDrugDoctor']),
    isNewDrug: {
      get () {
        return this.$store.state.isNewDrug
      },
      set (val) {
        this.$store.state.isNewDrug = val
      }
    }
  },
  mounted () {
    setTimeout(() => {
      this.newAppear = true
    }, 7000);
  },
  methods: {
    addNewDrugItem () {
      this.undoneDrugOrderings.push(this.newUndoneItem)
      if ( this.$route.path !== '/doctor/undoneDrugOrderings') {
        this.$router.replace('/doctor/undoneDrugOrderings')
      }
      this.newAppear = false
      this.isNewDrug = true
    }
  }
}
</script>

<style>
.newUndoneItem {
  position: absolute;
  background: #f2f2f2;
  border-radius: 3px;
  padding: 5px;
  width: 180px;
  top: 70px;
  left: 45%;
  border: 1px solid #ccc;
  z-index: 100;
  cursor: pointer;
  -webkit-box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
  margin: -10px 0 0 5px;
  -webkit-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}
.newUndoneItem:hover, .newUndoneItem:focus{
  border: 1px solid #cedddc;
  background-color: rgb(236, 236, 236);
}
.newUndoneItem .newTitle {
  margin: 5px 20px;
  color: #d72215;
  font-size: 20px;
}
</style>
