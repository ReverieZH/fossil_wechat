// component/SpeciesGuide/SpeciesGuide.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    recieve_guideList:{
        type:Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
        guideList:[{
            id:7,
            speciesname:'三叶虫',
            speciescover:'https://wx-miniprogram-picture-1302593558.cos.ap-chengdu.myqcloud.com/%E4%B8%89%E5%8F%B6%E8%99%AB%E5%B0%81%E9%9D%A2.png',
    },
    {
        id:8,
        speciesname:'奇虾',
        speciescover:'https://wx-miniprogram-picture-1302593558.cos.ap-chengdu.myqcloud.com/%E5%A5%87%E8%99%BE%E5%B0%81%E9%9D%A2.png',
    },
    {
        id:9,
        speciesname:'曳鳃动物',
        speciescover:'https://wx-miniprogram-picture-1302593558.cos.ap-chengdu.myqcloud.com/%E6%9B%B3%E9%B3%83%E5%8A%A8%E7%89%A9%E5%B0%81%E9%9D%A2.png',
    },
    {
        id:10,
        speciesname:'异虫类',
        speciescover:'',
    },
    {
        id:11,
        speciesname:'真节肢动物',
        speciescover:'',
    }]
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },

})
