// component/search/searchInput.js
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
    search: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    searchinput:function(){
      this.setData({search: e.detail.value});
    },
    Search:function(){
      wx.request({
        url: myurl+"setsearch",
        data: {search: this.data.search},
        method: 'POST',
        success: (res) => {
          if(res.data.length !=0){  
            wx.navigateTo({
              url: '/pages/speciesdetail/speciesdetail?fossilId=' + res.data[0].id,
            })
          }
          else{
            wx.showToast({
              title: '搜索失败',
              duration: 1500,
              icon: "none"
            })
          } 
        },
      })
    }
  }
})
