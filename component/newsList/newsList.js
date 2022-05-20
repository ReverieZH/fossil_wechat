// component/newsList/newsList.js
import {request} from "../../request/index.js"
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
    newsList:[
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  lifetimes:{
    created: function() {
      // 在组件实例刚刚被创建时执行
      request({
        url: '/getNewsReport',
        dataType: "json",
        method: 'GET',
      })
      .then(result=> {
          this.setData({
              newsList: result.data,
            })
          }
      ) 
    },
  }
})
