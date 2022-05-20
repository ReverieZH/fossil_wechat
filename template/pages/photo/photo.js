import {request} from "../../../request/index.js"
// pages/photo/photo.js
var myurl = getApp().globalData.url;
var COS = require('../../utils/cos-wx-sdk-v5.js')

Page({

    /**
     * 页面的初始数据
     */
  
    data: {
        imageList: '',
        devicePosition:'back',
        authCamera: false,//用户是否运行授权拍照
      },
      handleCameraError:function() {
        var _this=this
        wx.getSetting({
            success(res) {
              if (!res.authSetting['scope.camera']) {
                wx.authorize({
                  scope: 'scope.camera',
                  success () {
                    // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
                    // wx.startRecord()
                    _this.setData({
                        authCamera:true
                    })
                  },
                  fail(err){
                    wx.showModal({
                        content: '检测到您没打开相机功能权限，是否去设置打开？',
                        confirmText: "确认",
                        cancelText: "取消",
                        success: function(res) {
                          console.log(res);
                          //点击“确认”时打开设置页面
                          if (res.confirm) {
                            wx.openSetting({
                              success: (res) => {},
                              complete(){
                                // wx.createCameraContext()
                                that.onShow()
                                // wx.navigateTo({
                                //   url: '/template/pages/photo/photo',
                                // })
                                //   wx.switchTab({
                                //     url: '/pages/index/index',
                                //   })
                              }
                            })
                          } else {
                            console.log('用户点击取消')
                          }
                        }
                      });
                  }
                })
              }
            }
          })
      },
      onShow() {
		let that = this
		wx.getSetting({
		      success(res) {
		        if (!res.authSetting['scope.camera']){
		          that.authCamera = false
		        }else{
					that.authCamera = true
				}
		      }
		    })

	},
    /**
     * 生命周期函数--监听页面加载
     */
    /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const _this = this
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.camera']) {
          // 用户已经授权
          _this.setData({
            authCamera: true
          })
        } else {
          // 用户还没有授权，向用户发起授权请求
          wx.authorize({
            scope: 'scope.camera',
            success() { // 用户同意授权
              _this.setData({
                authCamera: true
              })
            },
            fail() { // 用户不同意授权
              _this.openSetting().then(res => {
                _this.setData({
                    authCamera: true
                })
              })
            }
          })
        }
      },
      fail: res => {
        console.log('获取用户授权信息失败')
      }
    })
  },
  // 打开授权设置界面
  openSetting() {
    const _this = this
    let promise = new Promise((resolve, reject) => {
      wx.showModal({
        title: '授权',
        content: '请先授权获取摄像头权限',
        success(res) {
          if (res.confirm) {
            wx.openSetting({
              success(res) {
                if (res.authSetting['scope.camera']) { // 用户打开了授权开关
                  resolve(true)
                } else { // 用户没有打开授权开关， 继续打开设置页面
              
                }
              },
              fail(res) {
                console.log(res)
              }
            })
          } else if (res.cancel) { //用户取消了。继续提示弹出dialog，让用户授权。会死循环
           
          }
        }
      })
    })
    return promise;
  },
      // 拍摄按钮按下, 执行record 触发拍摄
    record: function(){
        var that = this;
        this.data.cameraContext = wx.createCameraContext()
        this.data.cameraContext.takePhoto({
            quality:"high", //高质量的图片
            success: res => {
                //res.tempImagePath照片文件在手机内的的临时路径
                let tempImagePath = res.tempImagePath
                wx.saveFile({
                    tempFilePath: tempImagePath,
                    success: function (res) {
                        //返回保存时的临时路径 res.savedFilePath
                        const savedFilePath = res.savedFilePath
                        // 保存到本地相册
                        // 云储存
                        var cos = new COS({
                          SecretId: 'AKIDqRmroiy1HBozve6pBJBDzVpysX0DQy0r',
                          SecretKey: 'rmS6oHThgWBZhusa03C8NuBLFsMjrqys',
                        });
                        var filePath = savedFilePath
                        var username = getApp().globalData.userInfo.nickName
                        cos.postObject({
                          Bucket: 'wx-miniprogram-picture-1302593558',
                          Region: 'ap-chengdu',
                          Key: username + filePath.substring(filePath.length-10,filePath.length-5) +'.png',
                          FilePath: filePath,
                          onProgress: function (info) {
                              console.log(JSON.stringify(info));
                          }
                        }, function (err, data) {
                          var photopath = data.Location
                          that.setData({
                            imageList: photopath
                          })
                          // 发送路径到后台
                        //   wx.request({
                        //     url: myurl + 'setphoto',
                        //     data: {image: that.data.imageList},
                        //     method: 'POST',
                        //     success: (res) => {
                        //       if(res.data.status == true){
                        //         console.log('search successed')
                        //         wx.navigateTo({
                        //           url: '../sortresult/sortresult?picturepath=' + that.data.imageList
                        //         })
                        //       }
                        //     }
                        //   })
                          request({
                                url: '/setphoto',
                                dataType: "json",
                                method: 'POST',
                                data: {image: that.data.imageList},
                            })
                            .then(result=> {
                                if(result.data.status == true){
                                    console.log('search successed')
                                    wx.navigateTo({
                                      url: '../sortresult/sortresult?picturepath=' + that.data.imageList
                                    })
                                  }
                                }
                            ) 
                          });
                
                    },
                    //保存失败回调（比如内存不足）
                    fail: console.log
                })
            }
        })
        
    },

    uploadImage: function() {
        var that = this ;
        wx.chooseImage({
            count: 9,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: (res) => {
                // 默认图片 + 新选择图片
                that.setData({
                    imageList: res.tempFilePaths[0]
                })
                var cos = new COS({
                  SecretId: 'AKIDqRmroiy1HBozve6pBJBDzVpysX0DQy0r',
                  SecretKey: 'rmS6oHThgWBZhusa03C8NuBLFsMjrqys',
                });
                var filePath = that.data.imageList
                var username = getApp().globalData.userInfo.nickName
                cos.postObject({
                  Bucket: 'wx-miniprogram-picture-1302593558',
                  Region: 'ap-chengdu',
                  Key: username + filePath.substring(filePath.length-10,filePath.length-5) +'.png',
                  FilePath: filePath,
                  onProgress: function (info) {
                      console.log(JSON.stringify(info));
                  }
                }, function (err, data) {
                  var photopath = data.Location
                  that.setData({
                    imageList: photopath
                  })
                  // 发送路径到后台
                  // wx.request({
                  //   url: myurl + 'setphoto',
                  //   data: {image: that.data.imageList},
                  //   method: 'POST',
                  //   success: (res) => {
                  //     if(res.data.status == true){
                  //       console.log('successed')
                  //       wx.navigateTo({
                  //         url: '../sortresult/sortresult?picturepath=' + that.data.imageList
                  //       })
                  //     }
                  //   }
                  // })
                  request({
                    url: '/setphoto',
                    dataType: "json",
                    method: 'POST',
                    data: {image: that.data.imageList},
                    })
                    .then(result=> {
                        if(result.data.status == true){
                            console.log('search successed')
                            wx.navigateTo({
                            url: '../sortresult/sortresult?picturepath=' + that.data.imageList
                            })
                        }
                        }
                    ) 
                  wx.navigateTo({
                    url: '../sortresult/sortresult?picturepath=' + that.data.imageList
                  })
                });

            },
            fail: (res) => {
                console.log('fail', res);
            }
        })
        
        
    },
    back:function(){
      wx.navigateBack({
        delta: 1
      })
    }
})