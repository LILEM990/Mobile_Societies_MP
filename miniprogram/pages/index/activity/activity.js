// miniprogram/pages/index/activity/activity.js
wx.cloud.init()
const app = getApp()
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['活动汇总', '时间轴'],
    TabCur: 0,
    scrollLeft: 0,
    current: 'yuan',
    topNum: 0,
    isfresh: false,
    freshed: false,
    list_activity: [],
    list: [],
    list_time: [
      {
        face_url: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
        username: "hah",
        send_timestamp: "2020-05-04 13:42",
        centent: "woifds lfds jajlfjll",
        centent_photo: "../../../images/home/2.jpg",
        total_linkes: 10,
      },
    ]

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
    this.getlist_activity()
    this.getlist()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getlist_activity()
    this.getlist()
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
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60,
    })
  },
  //JS代码

  handlereleas: function () {
    if (app.userInfo._id) {
      wx.navigateTo({
        url: '/pages/index/activity/write_activity/write_activity',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
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
  // 获取滚动条当前位置
  scrolltoupper: function (e) {
    let t = e.detail.scrollTop;
    if (t > 100 && !this.data.floorstatus) {
      // 避免重复setData
      this.setData({
        floorstatus: true
      });
    }

    if (t <= 100 && this.data.floorstatus) {
      this.setData({
        floorstatus: false
      });
    }
  },

  //回到顶部
  goTop: function (e) {  // 一键回到顶部
    this.setData({
      topNum: this.data.topNum = 0,
      isfresh: true
    });
    setTimeout(() => {
      this.setData({
        isfresh: false,
        freshed: true
      })
    }, 700);
    setTimeout(() => {
      this.setData({
        freshed: false
      })
    }, 1500);

  },

  getlist_activity() {
    var that = this
    db.collection('activity_form').orderBy('writetime', 'desc').get().then((res) => {
      //console.log(res.data)
      this.setData({
        list_activity: res.data,
      })
      console.log(res)
      if (this.data.list_activity.length) {
        for (var i = 0; i < this.data.list_activity.length; i++) {
          // if (this.data.list_yuan.list_link[i]) {
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

  getlist(e) {
    var that = this
    db.collection('activity_form').field({
      _id: true,
      date: true,
      images: true,
      images_fileID: true,
      jianjie: true,
      links: true,
      name: true,
      nickName: true,
      nowtime: true,
      time: true,
      location: true,
      title: true,
      userPhoto: true,
      userid: true,
      writetime: true
    }).orderBy('date', 'asc').get().then((res) => {
      
        console.log(res)
        var length = res.data.length
        var param = {}
        var string = "list[" + 0 + "].date"
        param[string] = res.data[0].date
        this.setData(param)
        //console.log(that.data.list)
        var temp = 0
        var temp1 = 0
        for (var i = 0; i < res.data.length; i += temp) {
          temp = 0
          var length = res.data.length
          var param = {}
          var string = "list[" + temp1 + "].date"
          param[string] = res.data[i].date.substring(5)
          that.setData(param)
          for (var j = i; j < length; j++) {
            if (res.data[i].date == res.data[j].date) {
              var newarray = [{
                _id: res.data[j]._id,
                date: res.data[j].date.substring(5),
                images: res.data[j].images,
                images_fileID: res.data[j].images_fileID,
                jianjie: res.data[j].jianjie,
                links: res.data[j].links,
                name: res.data[j].name,
                location: res.data[j].location,
                nickName: res.data[j].nickName,
                nowtime: res.data[j].nowtime,
                time: res.data[j].time,
                title: res.data[j].title,
                userPhoto: res.data[j].userPhoto,
                userid: res.data[j].userid,
                writetime: res.data[j].writetime
              }]
              this.add_after(newarray, temp1, temp, that)
              temp++
              //console.log(that.data.list)
            }
          }
          temp1++
  
        
      }

      

    })
  },
  //向后增加数据
  add_after: function (str1, i, j, str2) {
    //console.log(str1)
    var param = {}
    var string = "list[" + i + "].data[" + j + "]"
    param[string] = str1
    str2.setData(param)
  },
  gotoDetail(e) {
    console.log(this.data.list)
    var images_fileid = JSON.stringify(e.currentTarget.dataset.images_fileid);
    let name = e.target.dataset.name;
    let title = e.target.dataset.title;
    let date = e.target.dataset.date;
    let userph = e.target.dataset.userph;
    let time = e.target.dataset.time;
    let state = '活动中';
    let location = e.target.dataset.location;
    let jianjie = e.target.dataset.jianjie;
    //let images_fileID = e.target.dataset.images_fileID;
    //console.log(images_fileid)
    wx.navigateTo({
      url: '/pages/index/detail_1/detail1/detail1?name=' + name + '&title=' + title + '&date=' + date + '&time=' + time + '&location=' + location + '&jianjie=' + jianjie + '&state=' + state+'&userph='+userph + '&images_fileid=' + images_fileid,
    })
  },
})