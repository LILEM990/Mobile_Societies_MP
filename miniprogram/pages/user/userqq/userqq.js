// miniprogram/pages/user/userphone/userphone.js
const db = wx.cloud.database()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    qqNumber: '请输入你的QQ号码',

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
    if (app.userInfo.qqNumber) {
      this.setData({
        qqNumber: app.userInfo.qqNumber
      });
    }

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

  },
  formSubmit: function (e) {
    wx.showLoading({
      title: '更改中'
    });
    var qqNumber = e.detail.value.qq;
    console.log(app.userInfo._id)
    db.collection('users').doc(app.userInfo._id).update({
      data: {
        qqNumber: qqNumber
      }
    }).then((res) => {
      app.userInfo.qqNumber = qqNumber;
      wx.hideLoading();
      wx.navigateBack({
        delta: 1
      })
      wx.showToast({
        title: '更改成功'
      });
    })
  }
})