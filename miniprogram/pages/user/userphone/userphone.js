// miniprogram/pages/user/userphone/userphone.js
const db = wx.cloud.database()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneNumber: '请输入正确的手机号码',

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
    if (app.userInfo.phoneNumber) {
      this.setData({
        phoneNumber: app.userInfo.phoneNumber
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
    var phoneNumber = e.detail.value.phone;
    console.log(app.userInfo._id)
    db.collection('users').doc(app.userInfo._id).update({
      data: {
        phoneNumber: phoneNumber
      }
    }).then((res) => {
      app.userInfo.phoneNumber = phoneNumber;
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