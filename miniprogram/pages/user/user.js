// pages/user/user.js

const db = wx.cloud.database()
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userPhoto:"/images/user/user-unlogin.png",
    nickName:"未登录",
    logged : false,
    stuCollege :'',
    stuZhuanye :'',
    disabled : true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.cloud.callFunction({
      name : 'login',
      data:{}
    }).then((res)=>{
  
      db.collection('users').where({
        _openid : res.result.openid
      }).get().then((res)=>{
        if(res.data.length){
          wx.hideLoading();
          wx.showToast({
            title: '登录成功',
          })
          app.userInfo = Object.assign( app.userInfo , res.data[0]);
          //console.log(app.userInfo)
          this.setData({
          userPhoto : app.userInfo.userPhoto,
          nickName : app.userInfo.nickName,
          stuCollege:app.userInfo.stuCollege,
          stuZhuanye:app.userInfo.stuZhuanye,
          logged : true  
        })
        }
        else{
          this.setData({
            disabled : false
          })
        }
        
      })
    })
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

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '程序名字',
      desc: '为社团提供了一个整合之地',
      path: '/pages/index/index',
      imageUrl:'../../images/home/1.jpg'
    }
  },

  gotoStuNumber(){
    if(app.userInfo._id){
      wx.navigateTo({
        url: '/pages/user/stuNum/stuNum',
    })
    }
    else{
      wx.showToast({
        title: '请先登录',
        icon: 'none',
      })
    }
  },

  bindGetUserInfo(ev){
      let userInfo = ev.detail.userInfo;
      if(!this.data.logged && userInfo){
        wx.showLoading({
          title: '登陆中',
        })
        db.collection('users').add({
          data : {
            userPhoto : userInfo.avatarUrl,
            nickName : userInfo.nickName,
            phoneNumber : '',
            stuCollege :'',
            stuZhuanye :'',
            stuNumber : '',
            time : new Date()    //注册时间
          }
        }).then((res)=>{
          wx.hideLoading();
          wx.showToast({
            title: '登录成功',
          })
          db.collection('users').doc(res._id).get().then((res)=>{
            
            //console.log(res.data);
            app.userInfo = Object.assign(app.userInfo,res.data);
            this.setData({
              userPhoto : app.userInfo.userPhoto,
              nickName : app.userInfo.nickName,
              logged : true
            })
          })
        });
      }
  }
})