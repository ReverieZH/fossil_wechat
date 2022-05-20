import * as echarts from '../../ec-canvas/echarts';
// import {GetProvinceStatsData} from '../../api/index'

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    
  },
  /**
   * 组件的初始数据
   */
  data: {
      longitude:"",   // 中心经度
        latitude:"",    // 中心纬度
        markers:[{
          id:1, 
          latitude: 32.7396,
          longitude: 108.5996,
          iconPath:'/static/marker_brown.png',
          width:10,
          height:10,
          callout:{
            content:"三叶虫化石",
            borderRadius:2,
            padding:2,
            display:"BYCLICK",
            textAlign:"center",
            bgColor:"#808080",
            color:"#ffffff",
          }
        },
        {
          id:2, 
          latitude: 30.7396,
          longitude: 110.5996,
          iconPath:'/static/marker_green.png',
          width:10,
          height:10,
          callout:{
            content:"奇虾化石",
            borderRadius:2,
            padding:2,
            display:"BYCLICK",
            textAlign:"center",
            bgColor:"#808080",
            color:"#ffffff",
          }
        },
        {
          id:3, 
          latitude: 25.7396,
          longitude: 108.5996,
          iconPath:'/static/marker_yellow.png',
          width:10,
          height:10,
          callout:{
            content:"曳鳃化石",
            borderRadius:2,
            padding:2,
            display:"BYCLICK",
            textAlign:"center",
            bgColor:"#808080",
            color:"#ffffff",
          }
        }],
        scale:10,        // 缩放级别，取值范围为3-20
        key:"FOABZ-MUPYU-OZCVT-22DWA-FZE25-VMFBP"
  },
  /**
   * 组件的方法列表
   */
  methods: {
   
  },
  
  lifetimes:{

  }
})
