// 状态对象
export default {
  isDrugDoctor: true,
  nowPreDoctor: {
    id: '2018002',
    password: '111',
    name: '刚果果',
    position: '门诊医生/全科'
  }, 
  nowDrugDoctor: {
    id: '2018001',
    password: '111',
    name: '刚木木',
    position: '药房医生'
  },
  nowManager: {
    id: '2019001',
    password: '111',
    name: '刚子子',
    position: '管理员'
  },
  isNewDrug: false,
  isNetworkError: false,
  drugs: [
    {
      drugId: '001',
      drugName: '双黄连口服液',
      type: '非处方甲类', //类型
      specifications: '10ml*10支', //包装规格
      unit: '盒' ,
      licenseNumber: 'Z10920053', //批准文号
      birthDate: '2018-01-15',
      deathDate: '2年',
      stock: 157,
      describe: '中成药名。为解表剂，具有疏风解表、清热解毒之功效。用于外感风热所致的感冒，症见发热，咳嗽，咽痛。',
      ok: true
    },
    {
      drugId: '002',
      drugName: '泼尼松龙片',
      type: '处方类',
      specifications: '5mg*100s',
      unit: '瓶' ,
      licenseNumber: 'H33021098',
      birthDate: '2018-01-11',
      deathDate: '3年',
      stock: 50,
      describe: '适应症为主要用于过敏性与自身免疫性炎症性疾病，胶原性疾病，如风湿病、类风湿性关节炎、红斑狼疮、湿疹等。',
      ok: true
    },
    {
      drugId: '003',
      drugName: '苏适',
      type: '处方类',
      specifications: '0.15g*7s',
      unit: '盒' ,
      licenseNumber: 'H20000513',
      birthDate: '2018-04-25',
      deathDate: '3年',
      stock: 39,
      describe: '厄贝沙坦,有阻断肾素-血管紧张素-醛固酮系统的作用，可以降低肾小球内高压，减少蛋白尿，延缓肾损害的进展。',
      ok: true
    },
    {
      drugId: '004',
      drugName: '达力全',
      type: '处方类',
      specifications: '5mg*100s',
      unit: '瓶',
      licenseNumber: 'H33021098',
      birthDate: '2018-08-13',
      deathDate: '5年',
      stock: 47,
      describe: '达力全,患有哮喘、心动过缓或传导阻滞、低血压的患者禁用，在服用期间，注意监测心率、血压、血脂、血糖',
      ok: true
    },
    {
      drugId: '005',
      drugName: '络欣平',
      type: '处方类',
      specifications: '5mg*100s',
      unit: '瓶',
      licenseNumber: 'H33021098',
      birthDate: '2019-01-21',
      deathDate: '2年',
      stock: 26,
      describe: '络欣平,副作用：体位性低血压。注意事项：起始小剂量，睡前服用，慢坐慢立',
      ok: true
    },
    {
      drugId: '006',
      drugName: '胃康灵',
      type: '处方类',
      specifications: '5mg*100s',
      unit: '瓶',
      licenseNumber: 'H33021098',
      birthDate: '2018-10-27',
      deathDate: '3年',
      stock: 234,
      describe: '胃康灵，适用于急慢性胃炎、萎缩性胃炎、胃溃疡、十二指肠溃疡及胃出血等症引起的各种胃部不适，如胃酸、胃胀、呕吐、消化不良等症状',
      ok: true
    },
    {
      drugId: '007',
      drugName: '黑加白胶囊',
      type: '非处方甲类',
      specifications: '5mg*10s',
      unit: '盒',
      licenseNumber: 'Z336124596',
      birthDate: '2018-10-27',
      deathDate: '3年',
      stock: 50,
      describe: '黑加白胶囊，用于治疗感冒，对咳嗽、流鼻涕有缓解作用',
      ok: true
    }
  ],
  undoneDrugOrderings: [
    {
      id: '006',
      stu_id: '006',
      stu_name: '何大东',
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
    {
      id: '007',
      stu_name: '何大西',
      stu_id: '007',
      stu_sex: '男',
      id_doc: '008',
      create_time: '2019-01-13',
      drug_list: [
        {
          drug_name: '泼尼松龙片',
          drug_num: '1',
          drug_specifications: '5mg*100s/瓶', //包装规格 
          drug_unit: '瓶',
          drug_use: '口服。一次2片，一日3次'
        }
      ],
      take_way: '面取',
      price: '未处理',
      isNow: false
    },
    {
      id: '008',
      stu_id: '008',
      stu_name: '何大南',
      stu_sex: '男',
      id_doc: '/',
      create_time: '2019-01-13',
      drug_list: [
        { 
          drug_name: '双黄连口服液',
          drug_specifications: '10ml*10支/盒',//包装规格 
          drug_num: '2',
          drug_unit: '盒',
          drug_use: '口服。一次20毫升(2支)，一日3次'
        },
        {
          drug_name: '阿莫西林胶囊', 
          drug_num: '1',
          drug_specifications: '0.25g*50s/盒',//包装规格 
          drug_unit: '盒',
          drug_use: '口服。一次2片，一日3次'
        }
      ],
      take_way: '柜取',
      price: '未处理',
      isNow: false
    }
  ],
  drugOrderings: [
    {
      id: '001',
      stu_id: '001',
      stu_name: '何东',
      stu_sex: '男',
      create_time: '2019-01-12',
      id_doc: '刚果果',
      drug_list: [
        { 
          drug_name: '双黄连口服液', 
          drug_specifications: '10ml*10支/盒',//包装规格 
          drug_num: '1',
          drug_unit: '盒',
          drug_use: '口服。一次20毫升(2支)，一日3次'
        },
        {
          drug_name: '阿莫西林胶囊', 
          drug_num: '1',
          drug_specifications: '0.25g*50s/盒',//包装规格 
          drug_unit: '盒',
          drug_use: '口服。一次2片，一日3次'
        }
      ],
      take_way: '面取',
      price: '完成'
    },
    {
      id: '002',
      stu_name: '何西',
      stu_id: '002',
      stu_sex: '男',
      create_time: '2019-01-13',
      id_doc: '刚果果',
      drug_list: [
        {
          drug_name: '泼尼松龙片', 
          drug_specifications: '5mg*100s/瓶', // 包装规格
          drug_num: '1',
          drug_unit: '瓶',
          drug_use: '口服。一次2片，一日3次'
        }
      ],
      take_way: '面取',
      price: '完成'
    },
    {
      id: '003',
      stu_id: '003',
      stu_name: '何南',
      stu_sex: '男',
      id_doc: '/',
      create_time: '2019-01-13',
      drug_list: [{ 
        drug_name: '双黄连口服液',
        drug_specifications: '10ml*10支/盒', //包装规格 
        drug_num: '2',
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
      take_way: '柜取-13柜',
      price: '完成'
    }
  ],
  nowNum: 0,// 问诊和开药里面的当前显示对象序号  
  orderedOrderings:[
    {
      orderId: '1',
      stu_id: '101',
      time: '10:05 2019-01-26',
      stu_name: '王艳',
      stu_sex: '女',
      disease_name: '',
      disease_type: '',
      symptoms: '',
      needDrugs:[{
        drug_name: '', 
        drug_specifications: '',
        drug_num: '',
        drug_unit: '',
        drug_use: ''
      }],
      chosen: false
    },
    {
      orderId: '2',
      stu_id: '102',
      time: '14:18 2019-01-26',
      stu_name: '董凌',
      stu_sex: '男',
      disease_name: '',
      disease_type: '',
      symptoms: '',
      needDrugs:[{
        drug_name: '', 
        drug_specifications: '',
        drug_num: '',
        drug_unit: '',
        drug_use: ''
      }],
      chosen: false
    },
    {
      orderId: '3',
      stu_id: '103',
      time: '16:32 2019-01-26',
      stu_name: '王炊',
      stu_sex: '男',
      disease_name: '',
      disease_type: '',
      symptoms: '',
      needDrugs:[{
        drug_name: '', 
        drug_specifications: '',
        drug_num: '',
        drug_unit: '',
        drug_use: ''
      }],
      chosen: false
    },
    {
      orderId: '4',
      stu_id: '104',
      time: '17:15 2019-01-26',
      stu_name: '佳眸',
      stu_sex: '女',
      disease_name: '',
      disease_type: '',
      symptoms: '',
      needDrugs:[{
        drug_name: '', 
        drug_specifications: '',
        drug_num: '',
        drug_unit: '',
        drug_use: ''
      }],
      chosen: false
    }
  ],
  nowParient:{
    orderId: '',
    stu_id: '',
    time: '',
    stu_name: '',
    stu_sex: '',
    disease_name: '',
    disease_type: '',
    symptoms: '',
    needDrugs:[{
      drug_name: '', 
      drug_specifications: '',
      drug_num: '',
      drug_unit: '',
      drug_use: ''
    }],
  },
}
