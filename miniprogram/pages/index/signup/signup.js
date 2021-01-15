// miniprogram/pages/index/signup/signup.js
const app = getApp()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    signuplist: []
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
    this.getsignuplist()
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
  getsignuplist() {
    if (app.userInfo._id) {
      var that = this
      db.collection('league_signup').where({
        userid: app.userInfo._id
      }).field({
        shetuanname: true,
        shetuantitle: true,
        photo: true,
        shetuanid: true
      }).get().then((res) => {
        console.log(res)
        that.setData({
          list_shetuan: res.data,
          list_length: res.data.length
        })

      });

    }
    else {
      wx.showToast({
        title: '请先登录',
        duration: 2000,
        icon: 'none',
        success: () => {
          setTimeout(() => {
            wx.switchTab({
              url: '/pages/user/user'
            })
          }, 2000);
        }
      })
    }

  },
  gotodetail(e) {
    console.log(e)
    var shetuanid = e.currentTarget.dataset.shetuanid
    console.log(shetuanid)
    db.collection('league_from').where({
      _id: shetuanid
    }).get().then((res) => {
      console.log(res)
      if (res.data[0].fenlei == '0') {
        let state = '报名中';
        var images_fileid = JSON.stringify(res.data[0].images_fileID);
        let fenlei = res.data[0].xueyuan + "、院级社团";
        wx.navigateTo({
          url: '/pages/index/detail_1/detail_signup/detail_signup?name=' + res.data[0].name + '&title=' + res.data[0].title + '&date=' + res.data[0].date + '&time=' + res.data[0].time + '&address=' + res.data[0].address + '&xueyuan=' + res.data[0].xueyuan + '&jianjie=' + res.data[0].jianjie + '&phoneNumber=' + res.data[0].phoneNumber + '&qqNumber=' + res.data[0].qqNumber + '&id=' + res.data[0].id + '&fenlei=' + fenlei + '&state=' + state + '&images_fileid=' + images_fileid + '&userph=' + res.data[0].userPhoto,
        })
      }
      else {
        let state = '报名中';
        var images_fileid = JSON.stringify(res.data[0].images_fileID);
        let fenlei = "天津城建大学" + "、校级社团";
        wx.navigateTo({
          url: '/pages/index/detail_1/detail_signup/detail_signup?name=' + res.data[0].name + '&title=' + res.data[0].title + '&date=' + res.data[0].date + '&time=' + res.data[0].time + '&address=' + res.data[0].address + '&xueyuan=' + res.data[0].xueyuan + '&jianjie=' + res.data[0].jianjie + '&phoneNumber=' + res.data[0].phoneNumber + '&qqNumber=' + res.data[0].qqNumber + '&id=' + res.data[0].id + '&fenlei=' + fenlei + '&state=' + state + '&images_fileid=' + images_fileid + '&userph=' + res.data[0].userPhoto,
        })
      }
    })
  }


})