import {request} from "../../../request/index.js"
// pages/reconstruct/reconstruct.js
import { createScopedThreejs } from 'threejs-miniprogram'
import ResourceTracker from "../../utils/track";
const { renderModel } = require('../../test-cases/model')
const app = getApp()
var myurl = getApp().globalData.url;
var scene, renderer
var three
Page({
    /**
     * 页面的初始数据
     */
    data: {
      fossilmodelpath: 'yghjk',
      render:true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (e) {
        console.log(e.fossilId)
        var that = this
        this.setData({
          render:true
        })
        request({
            url: '/getreconstruct',
            data: {fossilId: e.fossilId},
            dataType: 'json',
            method: 'GET',
        })
        .then(result=> {
            if(result.data[0].modelpath!=null){
              that.setData({
                  fossilmodelpath: result.data[0].modelpath
              })
              wx.createSelectorQuery()
              .select('#webgl')
              .node()
              .exec((result) => {
                const canvas = result[0].node
                this.canvas = canvas
                const THREE = createScopedThreejs(canvas)
                let [this_scene, this_renderer]=renderModel(canvas, THREE, this.data.fossilmodelpath)
                scene = this_scene
                renderer = this_renderer
                three = THREE
                console.log("scene",scene, "renderer", renderer)
              })
            }
            else{
              wx.showToast({
                  title: '可视化失败',
                  duration: 1500,
                  icon: "none"
                })
            }
          }
        ).catch(function(err){ //状态为rejected时执行
            wx.showToast({
                title: '检索失败',
                duration: 1500,
                icon: "none"
              })
        });

    },
    touchStart(e) {
        this.canvas.dispatchTouchEvent({...e, type:'touchstart'})
    },

    touchMove(e) {
        this.canvas.dispatchTouchEvent({...e, type:'touchmove'})
    },

    touchEnd(e) {
        this.canvas.dispatchTouchEvent({...e, type:'touchend'})
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
      this.clear(scene)
      renderer.clear();
      renderer.renderLists.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement = null
      three.Cache.clear()
    },
    clear(obj){
      let arr = obj.children.filter(x => x);
      arr.forEach(item => {
        if (item.children.length) {
          this.removeObj(item);
        } else {
          this.clearCache(item);
          item.clear();
        }
      });
      obj.clear();
      arr = null;
    },
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
        console.log("onUnload")
        renderer.clear();
        renderer.dispose();
        renderer.forceContextLoss();
      console.log(renderer.info)
    },
})