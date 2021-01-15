// miniprogram/pages/user/stuNum/stuNum.js

const app = getApp()
const db = wx.cloud.database()


Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  studentIDInput: function (e) {
    this.setData({
      studentID: e.detail.value
    })
  },
  searchStudentID: function () {
    if (!this.data.studentID) {
      wx.showModal({
        content: '请输入学号，例如：1807070108',
        showCancel: false
      })
    } else {
      var that = this;
      db.collection('students').where({
        status: '0',
        stuNumber: this.data.studentID,
      }).get().then((res) => {
        if (res.data.length) {
          var stuNumber = res.data[0].stuNumber
          wx.showModal({
            title: '提示',
            content: '请仔细检查学号(' + stuNumber + '),一旦绑定将无法修改,是否确定？',
            success(res) {
              if (res.confirm) {
                that.updateStunum();
              }
            }
          })
        }
        else {
          wx.showModal({
            content: '抱歉，学号不存在或已被绑定',
            showCancel: false
          })
        }
      })
    }
  },
  updateStunum() {
    db.collection('students').where({
      status: '0',
      stuNumber: this.data.studentID,
    }).get().then((res) => {
      //console.log(res)
      if (res.data.length) {
        this.setData({
          nickName: res.data[0].stuName,
          stuCollege: res.data[0].stuCollege,
          stuZhuanye: res.data[0].stuZhuanye,
        })
        db.collection('users').doc(app.userInfo._id).update({
          data: {
            nickName: res.data[0].stuName,
            stuNumber: res.data[0].stuNumber,
            stuCollege: res.data[0].stuCollege,
            stuZhuanye: res.data[0].stuZhuanye,
          }
        }).then((res) => {
          //wx.hideLoading();
          var pages = getCurrentPages();
          if (pages.length > 1) {
            //上一个页面实例对象
            var prePage = pages[pages.length - 2];
            //关键在这里
            prePage.setData({
              nickName: this.data.nickName,
              stuCollege: this.data.stuCollege,
              stuZhuanye: this.data.stuZhuanye,
            })

            wx.cloud.callFunction({
              name: 'stuNum',
              data: {
                stuNumber: this.data.studentID
              }
            }).then((res) => {
            })

            app.userInfo.stuCollege = this.data.stuCollege;
            console.log(app.userInfo.stuCollege)
            wx.navigateBack({
              delta: 1
            })
            wx.showToast({
              title: '绑定成功'
            });
          }
        })
      }
      else {
        wx.showModal({
          content: '查询不到信息，请确保学号输入正确',
          showCancel: false
        })
      }
    })
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

  }
})