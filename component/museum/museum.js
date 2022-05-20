// component/museum/museum.js
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
    fossil:[
      {
        id:1,
        picture:'https://666f-fossil-9g55uvhg105f7e70-1311524201.tcb.qcloud.la/141_.png?sign=35c52ba3ea3dce0b27b1c376e178fccb&t=1652865723',
        name:'异虫'
      },
      {
        id:2,
        picture:'https://666f-fossil-9g55uvhg105f7e70-1311524201.tcb.qcloud.la/188_.png?sign=78585e08d005bfd8f3cfb1db26c6fb39&t=1652865873',
        name:'曳鳃'
      },
      {
        id:3,
        picture:'https://666f-fossil-9g55uvhg105f7e70-1311524201.tcb.qcloud.la/271_.png?sign=80e9e8c3a6a114c93cf009aed13d0b1f&t=1652865909',
        name:'三叶虫'
      },
      {
        id:4,
        picture:'https://666f-fossil-9g55uvhg105f7e70-1311524201.tcb.qcloud.la/306_.png?sign=f7daf656be96924bb269ec1942db40fc&t=1652865941',
        name:'奇虾'
      },
      {
        id:5,
        picture:'https://666f-fossil-9g55uvhg105f7e70-1311524201.tcb.qcloud.la/306_.png?sign=f7daf656be96924bb269ec1942db40fc&t=1652865941',
        name:'奇虾'
      },
      {
        id:6,
        picture:'https://666f-fossil-9g55uvhg105f7e70-1311524201.tcb.qcloud.la/306_.png?sign=f7daf656be96924bb269ec1942db40fc&t=1652865941',
        name:'奇虾'
      },
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handlePrevewImage(e){
      let fossil=this.data.fossil
      const urls=[]
      fossil.forEach(img=>{
        urls.push(img.picture)
      })
      const current=e.currentTarget.dataset.url;
      wx.previewImage({
          current,
          urls,
      });
  },
  }
})
