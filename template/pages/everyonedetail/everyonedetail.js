// template/pages/everyonedetail/everyonedetail.js
import { wantReplay } from "../../../data/comment_data"
import {request} from "../../../request/index.js"
var wantReplay_json=require("../../../data/comment_data")
const everyfossilLis_json= require("../../../data/everyfossil_data")
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      imageList:[],
      scrollLast:null,
      wantID: 0,  //回复的文章id
      userID: 0, //文章发布人的userID
      replyUserID: 0, //回复哪个人的userID 默认等于楼主id
      replyName: "",
      count: 0,
      content: "",
      imgUrl: "",
      time: "",
      title: "",
      userName: "",
      userImg: "",
      limit: 5,
      wantReplay: [],
      contentInp: "",
      replyInp: "",
      focus: false,
      check: true, //默认显示我来评论input
      edit:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if(options.edit=='1'){
      this.setData({
        edit:true
      })
    }
    var index=options.id
    request({
      url: '/OnePublish/'+options.id,
      dataType: 'json',
      method: 'GET',
    })
    .then(result=> {
      // console.log(result.data)
      this.setData({
        wantID:result.data[0].id,
        imageList:result.data[0].picture,
        wantReplay:result.data[0].comment,
        userName:result.data[0].user.username,
        userImg:result.data[0].user.usericon,
        content:result.data[0].content,
        replyUserID:result.data[0].user.userid,
        userID:result.data[0].user.userid
      })
      }
    ).catch(function(err){ //状态为rejected时执行
      
    });
    // var everyfossilList=everyfossilLis_json.everyfossilList
    
  },
  swichNav(e) {
      var current = e.target.dataset.index
      if (this.data.currentTab != current) {
        this.setData({ currentTab: current })
      }
    },
    handlePrevewImage(e){
        const urls=this.data.imageList
        const current=e.currentTarget.dataset.url;
        wx.previewImage({
            current,
            urls,
        });
    },
    onSlideChangeEnd: function (e) {
        var current=e.detail.current 
        this.setData({
            currentTab: e.detail.current 
        })
        this.setData({
            scrollLast: 'item' + current
        })
        
    },
    getWantDetail() {
        let params = {
          wantID: this.data.wantID,
          offset: 0,
          limit: this.data.limit
        }
        app.getWantDetail(params).then(res => {
          let wantDetail = [];
          for (var i = 0; i < res.data.wantDetail.length; i++) {
            if (res.data.wantDetail[i].pid === 0) {
              wantDetail = res.data.wantDetail[i]
              res.data.wantDetail.splice(i, 1)
            }
          }
          this.setData({
            wantReplay: res.data.wantDetail,
            count: wantDetail.count,
            content: wantDetail.content,
            imgUrl: wantDetail.imgUrl,
            time: wantDetail.time,
            title: wantDetail.title,
            userName: wantDetail.userName,
            userImg: wantDetail.userImg,
            userID: wantDetail.userID,
            replyUserID: wantDetail.userID,
          })
        })
      },
     
      onReachBottom: function() {
        this.data.limit = this.data.limit + 4
      },
      //触摸事件切换到回复楼主
      touchstar: function() {
        this.setData({
          check: true,
          focus: false,
          contentInp: "",
          replyInp: "",
        })
      },
      /**评论输入框 */
      bindContentInp(e) {
        this.setData({
          contentInp: e.detail.value
        })
      },
      /**答复输入框 */
      bindReplyInp(e) {
        this.setData({
          replyInp: e.detail.value
        })
      },
     
      /**消息图片点击 */
      addWantImg() {
        this.setData({
          focus: true,
        })
      },
      addWant() {
        if (this.data.contentInp.length > 100) {
          wx.showToast({
            title: '请将字数控制在100字以内哦',
            icon: "none",
            duration: 1000,
            mask: true,
          })
        } else {
          if (this.data.replyUserID === this.data.userID && this.data.check === true) {
            console.log("发表评论")
            this.addComment();
          } else {
            this.addReply();
          }
        }
      },
     
      /**发表评论 */
      addComment() {
        let params = {
          publish_id: this.data.wantID,
          user_id: app.globalData.userId,  //发布评论人的id
          content: this.data.contentInp,
          replyUser_id: this.data.userID,    //发布文章人的id
        }
        console.log(params)
        request({
          url: '/Comment/',
          dataType: 'json',
          method: 'POST',
          data:params
        })
        .then(result=> {
          if(result.data.status==200){
            let wantReplay=this.data.wantReplay
            wantReplay.push(result.data.data)
            this.setData({
              wantReplay
            })
           }
          }
        ).catch(function(err){ //状态为rejected时执行
          
        });
      },
      /**点击评论获取要回复的人的id */
      getReplyUserID(e) {
        let replyID = e.currentTarget.dataset.replyuserid;
        if (replyID === app.globalData.userID) {
          wx.showToast({
            title: '请不要回复自己哦',
            icon: "none",
            duration: 1000,
            mask: true,
          })
        } else {
          this.setData({
            replyUserID: replyID,
            replyName: e.currentTarget.dataset.replyname,
            focus: true,
            check: false
          })
        }
      },
      /**回复 */
      addReply() {
        let params = {
          publish_id: this.data.wantID,
          user_id: app.globalData.userId,  //发布回复人的id
          content: this.data.replyInp,
          replyUser_id: this.data.replyUserID,    //要回复的评论的人的id
        }
        console.log(params)
        request({
          url: '/Comment/',
          dataType: 'json',
          method: 'POST',
          data:params
        })
        .then(result=> {
          console.log(result.data)
          if(result.data.status==200){
            let wantReplay=this.data.wantReplay
            wantReplay.push(result.data.data)
            this.setData({
              wantReplay
            })
          }
          }
        ).catch(function(err){ //状态为rejected时执行
          
        });
      },
      editPublish(e){
        let id = e.currentTarget.dataset.id
        wx.navigateTo({
          url:'../publish/publish?id='+id
        })
      }
})