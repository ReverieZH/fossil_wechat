import {request} from "../../../request/index.js"
// pages/sortresult.js
var myurl = getApp().globalData.url;

Page({

    /**
     * 页面的初始数据
     */
    data: {
      isShowRecesive: false,
      change: "",
      changeid: 0,
      fossilid: 0,
      picture: "../../static/sortresult.jpg",
      context: "",
      name: "",
      location: "",
      epoch: "",
      position: "",
      specieID: 0,
    },


    getchange:function(e){
      this.setData({
        change: this.data.context
      })
      this.setData({
        isShowRecesive: true,
        changeid: e.currentTarget.dataset.id
      })
    },
  
    close:function(){
      this.setData({
        isShowRecesive: false,
        change: ""
      })
    },
  
    changeinput:function(e){
      var changeinput = e.detail.value
      this.setData({
        change: changeinput
      })
    },

    insertchange:function(){
      this.setData({
        context: this.data.change,
        isShowRecesive: false,
      })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // console.log(options.picturepath)
        this.setData({
          picture: 'https://' + options.picturepath
        })
        wx.showToast({
          title: '正在识别请稍后。。。。',
          duration: 1000,
          icon: "none"
        })
        //后台取数据with（photo带的index）
        request({
            url: '/getresult',
            data: {picture: this.data.picture},
            dataType: 'json',
            method: 'GET',
            })
        .then(result=> {
            this.setData({
                specieID: result.data[0].id,
                name: result.data[0].speciesname,
                location: result.data[0].specieslocation,
                epoch: result.data[0].epoch,
                context: result.data[0].describe,
              })
            }
        ).catch(function(err){ //状态为rejected时执行
            wx.showToast({
                title: '检索失败',
                duration: 1500,
                icon: "none"
              })
        });
    },
    // 双向绑定修改
    bindtxt: function(e) {
        this.setData({
            context: e.detail.value
        })
    },

    //打开规则提示
    edit: function () {
        this.setData({
            isRuleTrue: true
        })
    },
    //关闭规则提示
    exit: function () {
        this.setData({
            isRuleTrue: false
        })
    },

    submit: function(e) {
        // var texted = e.detail.value ;
        // this.setData({
        //   context: e.detail.value
        // })
        this.setData({
            isRuleTrue: false
        })
    },
    // 跳转到三维重建结果
    reconstruct: function() {
        wx.navigateTo({
          url: '/template/pages/reconstruct/reconstruct?fossilId=' + this.data.specieID,
        })
    },

    //定位方法
    getUserLocation: function () {
    var _this = this;
    wx.getSetting({
        success: (res) => {
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
            //未授权
            wx.showModal({
            title: '请求授权当前位置',
            content: '需要获取您的地理位置，请确认授权',
            success: function (res) {
                if (res.cancel) {
                //取消授权
                wx.showToast({
                    title: '拒绝授权',
                    icon: 'none',
                    duration: 1000
                })
                } else if (res.confirm) {
                //确定授权，通过wx.openSetting发起授权请求
                wx.openSetting({
                    success: function (res) {
                    if (res.authSetting["scope.userLocation"] == true) {
                        wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000
                        })
                        //再次授权，调用wx.getLocation的API
                        _this.geo();
                    } else {
                        wx.showToast({
                        title: '授权失败',
                        icon: 'none',
                        duration: 1000
                        })
                    }
                    }
                })
                }
            }
            })
        } else if (res.authSetting['scope.userLocation'] == undefined) {
        //用户首次进入页面,调用wx.getLocation的API
            _this.geo();
        }
        else {
            console.log('授权成功')
            //调用wx.getLocation的API
            _this.geo();
        }
        }
    })
    },        

    // 获取定位城市
    geo: function () {
    var _this = this;
    wx.getLocation({
        type: 'wgs84',
        success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        _this.setData({
            position: res.latitude + ',' + res.longitude + ',' +res.accuracy + ',' +res.speed
        })
        console.log(_this.data.position)
        }
    })
    },


    // 保存至我的化石
    preserve: function() {
      var _this = this;
      //调用定位方法
      _this.getUserLocation();
      console.log(_this.data.position)
      var username = getApp().globalData.userInfo.nickName
   
      request({
        url: '/setresult',
        data: {
            context: this.data.context,
            name: this.data.name,
            location: this.data.location,
            epoch: this.data.epoch,
            user: username,
            pictureposition: this.data.position,
            picture: this.data.picture,
            specieID: this.data.specieID
            },
        method: 'POST',
        })
       .then(result=> {
            wx.showToast({
                title: '保存成功',
                icon: 'success',
                duration: 2000
            })
            wx.switchTab({
                url: '/pages/myfossil/myfossil',
            })
        }
    ).catch(function(err){ //状态为rejected时执行
        wx.showToast({
            title: '保存失败',
            duration: 1500,
            icon: "none"
        })
    });  
    },
    // 删除分类记录不保留
    delete: function() {
        wx.switchTab({
          url: '../index/index',
        })
    }
})