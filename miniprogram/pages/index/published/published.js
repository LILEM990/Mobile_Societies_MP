// miniprogram/pages/index/published/published.js

wx.cloud.init()
const app = getApp()
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollLeft: 0,
    current: 'yuan',
    logged: false,
    topNum: 0,
    list_message: [],
    isLink: []
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
    if (app.userInfo._id) {
      this.setData({
        logged: true
      })
    }

    this.getlist_message()
    this.getlist_activity()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getlist_message()
    this.getlist_activity()
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
  getlist_message() {
    if (app.userInfo._id) {
      var that = this
      db.collection('league_from').where({
        userid: app.userInfo._id
      }).orderBy('writetime', 'desc').get().then((res) => {
        //console.log(res.data)
        this.setData({
          list_message: res.data,
        })
        console.log(res)
        if (this.data.list_message.length) {
          for (var i = 0; i < this.data.list_message.length; i++) {
            // if (this.data.list_message.list_link[i]) {
            //   that.setData({
            //     [isLink[i]]: true,
            //   })
            // }
            // else {
            //   that.setData({
            //     [isLink[i]]: false,
            //   })
            // }
            // console.log(that.data.isLink)
            var time_write = this.data.list_message[i].writetime;
            //that.timeFn(time_write)
            var time_new = that.timePanduan(time_write)
            var param = {};
            var string = "list_message[" + i + "].writetime"
            param[string] = time_new;
            this.setData(param)
          }
        }
      })

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

  getlist_activity() {
    if (app.userInfo._id) {
      var that = this
      db.collection('activity_form').where({
        userid: app.userInfo._id
      }).orderBy('writetime', 'desc').get().then((res) => {
        //console.log(res.data)
        this.setData({
          list_activity: res.data,
        })
        //console.log(res)
        if (this.data.list_activity.length) {
          for (var i = 0; i < this.data.list_activity.length; i++) {
            // if (this.data.list_message.list_link[i]) {
            //   that.setData({
            //     [isLink[i]]: true,
            //   })
            // }
            // else {
            //   that.setData({
            //     [isLink[i]]: false,
            //   })
            // }
            // console.log(that.data.isLink)
            var time_write = this.data.list_activity[i].writetime;
            //that.timeFn(time_write)
            var time_new = that.timePanduan(time_write)
            var param = {};
            var string = "list_activity[" + i + "].writetime"
            param[string] = time_new;
            this.setData(param)
          }
        }
      })

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

  timePanduan(event) {
    var time_old = event.getFullYear() + "-" + (event.getMonth() + 1) + "-" + event.getDate() + " " + (event.getHours() < 10 ? '0' + event.getHours() : event.getHours()) + ":" + (event.getMinutes() < 10 ? '0' + event.getMinutes() : event.getMinutes())
    var myDate = new Date()
    var time = myDate.getFullYear() + "-" + (myDate.getMonth() + 1) + "-" + myDate.getDate() + " " + (event.getHours() < 10 ? '0' + event.getHours() : event.getHours()) + ":" + (event.getMinutes() < 10 ? '0' + event.getMinutes() : event.getMinutes())

    var nn = time.substring(0, 9)
    //console.log(nn)
    var mm = time_old.substring(0, 9)
    var qq = new Date(nn.replace(/-/g, "/"))
    var ww = new Date(mm.replace(/-/g, "/"))

    var day = parseInt((qq.getTime() - ww.getTime()) / (1000 * 60 * 60 * 24))
    //console.log(day)
    if (day == 0) {
      time_old = "今天" + time_old.substring(10, 15)
      console.log(time_old)
    }
    if (day == 1) {
      time_old = "昨天" + time_old.substring(10, 15)
      console.log(time_old)
    }
    if (day == 2) {
      time_old = "前天" + time_old.substring(10, 15)
      console.log(time_old)
    }
    if (day > 2 && day < 365) {
      time_old = time_old.substring(5, 15)
      console.log(time_old)
    }
    if (day > 365) {
      var m = parseInt(day / 365)
      time_old = m + "年前"
      console.log(time_old)
    }
    return time_old
  },
  ViewImage(e) {
    wx.previewImage({
      urls: e.currentTarget.dataset.imglist,
      current: e.currentTarget.dataset.url
    });
  },

  deleteleague(e) {
    var that = this
    console.log(e)
    let id = e.currentTarget.dataset.id
    //let id = e.target.dataset.id
    console.log(id)
    wx.showModal({
      content: '确定要删除这条记录么？',
      cancelText: '再想想',
      confirmText: '确定',
      success: res => {
        if (res.confirm) {
          db.collection('league_from').doc(id).remove({
            success: function (res) {
              console.log(res.data)
              that.getlist_message()
            }
          });
          that.getlist_message()
        }
      }
    })

  },
  deleteactivity(e) {
    var that = this
    console.log(e)
    let id = e.currentTarget.dataset.id
    //let id = e.target.dataset.id
    console.log(id)
    wx.showModal({
      content: '确定要删除这条记录么？',
      cancelText: '再想想',
      confirmText: '确定',
      success: res => {
        if (res.confirm) {
          db.collection('activity_form').doc(id).remove({
            success: function (res) {
              console.log(res.data)
              that.getlist_activity()
            }
          });
          that.getlist_activity()
        }
      }
    })

  },
  gotoDetail(e) {
    let fenlei = e.target.dataset.fenlei
    var images_fileid = JSON.stringify(e.currentTarget.dataset.images_fileid);
    let name = e.target.dataset.name;
    let title = e.target.dataset.title;
    let phoneNumber = e.target.dataset.phonenumber;
    let qqNumber = e.target.dataset.qqnumber;
    let date = e.target.dataset.date;
    let time = e.target.dataset.time;
    let id = e.target.dataset.id;
    console.log(id)
    let userph = e.target.dataset.userph;
    let state = '报名中';
    let address = e.target.dataset.address;
    let xueyuan = e.target.dataset.xueyuan;
    let jianjie = e.target.dataset.jianjie;
    if (fenlei == "0") {
      var fenlei1 = e.target.dataset.xueyuan + "、院级社团";
    }
    else if (fenlei == "1") {
      var fenlei1 = "天津城建大学" + "、校级社团";
    }
    wx.navigateTo({
      url: '/pages/index/detail_1/detail_published/detail_published?name=' + name + '&title=' + title + '&date=' + date + '&time=' + time + '&address=' + address + '&xueyuan=' + xueyuan + '&jianjie=' + jianjie + '&phoneNumber=' + phoneNumber + '&qqNumber=' + qqNumber + '&id=' + id + '&fenlei=' + fenlei1 + '&state=' + state + '&userph=' + userph + '&images_fileid=' + images_fileid,
    })

  },
  gotoDetail1(e) {
    let fenlei = e.target.dataset.fenlei
    var images_fileid = JSON.stringify(e.currentTarget.dataset.images_fileid);
    let name = e.target.dataset.name;
    let title = e.target.dataset.title;
    let phoneNumber = e.target.dataset.phonenumber;
    let qqNumber = e.target.dataset.qqnumber;
    let date = e.target.dataset.date;
    let time = e.target.dataset.time;
    let id = e.target.dataset.id;
    console.log(id)
    let userph = e.target.dataset.userph;
    let state = '活动中';
    let address = e.target.dataset.address;
    let xueyuan = e.target.dataset.xueyuan;
    let jianjie = e.target.dataset.jianjie;
    if (fenlei == "0") {
      var fenlei1 = e.target.dataset.xueyuan + "、院级社团";
    }
    else if (fenlei == "1") {
      var fenlei1 = "天津城建大学" + "、校级社团";
    }
    wx.navigateTo({
      url: '/pages/index/detail_1/detail1/detail1?name=' + name + '&title=' + title + '&date=' + date + '&time=' + time + '&address=' + address + '&xueyuan=' + xueyuan + '&jianjie=' + jianjie + '&phoneNumber=' + phoneNumber + '&qqNumber=' + qqNumber + '&id=' + id + '&fenlei=' + fenlei1 + '&state=' + state + '&userph=' + userph + '&images_fileid=' + images_fileid,
    })

  },



})