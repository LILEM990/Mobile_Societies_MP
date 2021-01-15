// miniprogram/pages/index/league/league.js
wx.cloud.init()
const app = getApp()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['院级社团', '校级社团'],
    TabCur: 0,
    scrollLeft: 0,
    current: 'yuan',
    topNum: 0,
    isfresh: false,
    freshed: false,
    list_yuan: [],
    list_xiao: [],
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
    this.getlist_yuan();
    //this.getwatch()
    this.getlist_xiao()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getlist_yuan();
    this.getlist_xiao()
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
  tabSelect_yuan(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60,
    });
    this.getlist_yuan();
  },
  tabSelect_xiao(e) {
    this.getlist_xiao();
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60,
    });

  },

  getlist_yuan() {
    var that = this
    db.collection('league_from').where({
      fenlei: "0"
    }).orderBy('writetime', 'desc').get().then((res) => {
      //console.log(res.data)
      this.setData({
        list_yuan: res.data,
      })
      if (this.data.list_yuan.length) {
        for (var i = 0; i < this.data.list_yuan.length; i++) {
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
          var time_write = this.data.list_yuan[i].writetime;
          //that.timeFn(time_write)
          var time_new = that.timePanduan(time_write)
          var param = {};
          var string = "list_yuan[" + i + "].writetime"
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



  getlist_xiao() {
    var that = this
    db.collection('league_from').where({
      fenlei: "1"
    }).orderBy('writetime', 'desc').get().then((res) => {
      //console.log(res.data)
      this.setData({
        list_xiao: res.data,
      })
      if (this.data.list_xiao.length) {
        for (var i = 0; i < this.data.list_xiao.length; i++) {
          var time_write = this.data.list_xiao[i].writetime;
          var time_new = that.timePanduan(time_write)
          var param = {};
          var string = "list_xiao[" + i + "].writetime"
          param[string] = time_new;
          this.setData(param)
        }
      }
      //console.log(this.data.list_xiao)
    })
  },

  handlereleas: function () {
    if (app.userInfo._id) {
      wx.navigateTo({
        url: '/pages/index/league/write-league/write-league',
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
    }, 1000);
    setTimeout(() => {
      this.getlist_yuan();
      this.getlist_xiao();
    }, 1600);
    setTimeout(() => {
      this.setData({
        freshed: false
      });

    }, 2200);


  },
  ViewImage(e) {
    wx.previewImage({
      urls: e.currentTarget.dataset.imglist,
      current: e.currentTarget.dataset.url
    });
  },
  arrayremove(array, str) {
    var index = array.indexOf(str);
    //console.log(index)
    if (index > -1) {
      array.splice(index, 1);
    }
  },

  handleLinks(ev) {
    let id = ev.target.dataset.id;
    let num = ev.target.dataset.num;
    var that = this
    if (app.userInfo._id) {
      db.collection('league_from').where({
        _id: id,
        list_link: app.userInfo._id
      }).get().then((res) => {
        //console.log(res)
        if (res.data.length) {  //更新已赞列表
          if (res.data[0].list_link.includes(app.userInfo._id)) {   //取消赞
            var list_clone = res.data[0].list_link;
            that.arrayremove(list_clone, app.userInfo._id)
            //list_clone.splice(app.userInfo._id, 1)
            wx.cloud.callFunction({
              name: 'update',
              data: {
                collection: 'league_from',
                doc: id,
                data: { list_link: list_clone }
              }
            })
            wx.cloud.callFunction({
              name: 'update',
              data: {
                collection: 'league_from',
                doc: id,
                data: "{links : _.inc(-1)}"
              }
            }).then((res) => {
              let updated = res.result.stats.updated;
              if (updated) {
                let cloneListData = [...this.data.list_yuan];
                for (let i = 0; i < cloneListData.length; i++) {
                  if (cloneListData[i]._id == id) {
                    cloneListData[i].links--;
                    console.log(cloneListData)
                  }
                }
                this.setData({
                  list_yuan: cloneListData
                });
              }
            });
          }
          else {   //赞
            wx.cloud.callFunction({
              name: 'update',
              data: {
                collection: 'league_from',
                doc: id,
                data: `{list_link: _.unshift('${app.userInfo._id}')}`
              }
            })
            wx.cloud.callFunction({
              name: 'update',
              data: {
                collection: 'league_from',
                doc: id,
                data: "{links : _.inc(1)}"
              }
            }).then((res) => {
              let updated = res.result.stats.updated;
              if (updated) {
                let cloneListData = [...this.data.list_yuan];
                for (let i = 0; i < cloneListData.length; i++) {
                  if (cloneListData[i]._id == id) {
                    cloneListData[i].links++;
                  }
                }
                this.setData({
                  list_yuan: cloneListData
                });
              }
            });

          }
        }
        else {    //添加已赞列表
          wx.cloud.callFunction({
            name: 'update',
            data: {
              collection: 'league_from',
              doc: id,
              data: "{links : _.inc(1)}"
            }
          })
          wx.cloud.callFunction({
            name: 'update',
            data: {
              collection: 'league_from',
              doc: id,
              data: `{list_link: _.unshift('${app.userInfo._id}')}`
            }
          }).then((res) => {
            let updated = res.result.stats.updated;
            if (updated) {
              let cloneListData = [...this.data.list_yuan];
              for (let i = 0; i < cloneListData.length; i++) {
                if (cloneListData[i]._id == id) {
                  cloneListData[i].links++;
                }
              }
              this.setData({
                list_yuan: cloneListData
              });
            }
          })
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

  handleLinks1(ev) {
    let id = ev.target.dataset.id;
    let num = ev.target.dataset.num;
    var that = this
    if (app.userInfo._id) {
      db.collection('league_from').where({
        _id: id,
        list_link: app.userInfo._id
      }).get().then((res) => {
        //console.log(res)
        if (res.data.length) {  //更新已赞列表
          if (res.data[0].list_link.includes(app.userInfo._id)) {   //取消赞
            var list_clone = res.data[0].list_link;
            that.arrayremove(list_clone, app.userInfo._id)
            //list_clone.splice(app.userInfo._id, 1)
            wx.cloud.callFunction({
              name: 'update',
              data: {
                collection: 'league_from',
                doc: id,
                data: { list_link: list_clone }
              }
            })
            wx.cloud.callFunction({
              name: 'update',
              data: {
                collection: 'league_from',
                doc: id,
                data: "{links : _.inc(-1)}"
              }
            }).then((res) => {
              let updated = res.result.stats.updated;
              if (updated) {
                let cloneListData = [...this.data.list_xiao];
                for (let i = 0; i < cloneListData.length; i++) {
                  if (cloneListData[i]._id == id) {
                    cloneListData[i].links--;
                    console.log(cloneListData)
                  }
                }
                this.setData({
                  list_xiao: cloneListData
                });
              }
            });
          }
          else {   //赞
            wx.cloud.callFunction({
              name: 'update',
              data: {
                collection: 'league_from',
                doc: id,
                data: `{list_link: _.unshift('${app.userInfo._id}')}`
              }
            })
            wx.cloud.callFunction({
              name: 'update',
              data: {
                collection: 'league_from',
                doc: id,
                data: "{links : _.inc(1)}"
              }
            }).then((res) => {
              let updated = res.result.stats.updated;
              if (updated) {
                let cloneListData = [...this.data.list_xiao];
                for (let i = 0; i < cloneListData.length; i++) {
                  if (cloneListData[i]._id == id) {
                    cloneListData[i].links++;
                  }
                }
                this.setData({
                  list_xiao: cloneListData
                });
              }
            });

          }
        }
        else {    //添加已赞列表
          wx.cloud.callFunction({
            name: 'update',
            data: {
              collection: 'league_from',
              doc: id,
              data: "{links : _.inc(1)}"
            }
          })
          wx.cloud.callFunction({
            name: 'update',
            data: {
              collection: 'league_from',
              doc: id,
              data: `{list_link: _.unshift('${app.userInfo._id}')}`
            }
          }).then((res) => {
            let updated = res.result.stats.updated;
            if (updated) {
              let cloneListData = [...this.data.list_xiao];
              for (let i = 0; i < cloneListData.length; i++) {
                if (cloneListData[i]._id == id) {
                  cloneListData[i].links++;
                }
              }
              this.setData({
                list_xiao: cloneListData
              });
            }
          })
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

  gotoDetail_yuan(e) {
    var images_fileid = JSON.stringify(e.currentTarget.dataset.images_fileid);
    let name = e.target.dataset.name;
    let title = e.target.dataset.title;
    let phoneNumber = e.target.dataset.phonenumber;
    let qqNumber = e.target.dataset.qqnumber;
    let date = e.target.dataset.date;
    let time = e.target.dataset.time;
    let id = e.target.dataset.id;
    //console.log(id)
    let userph = e.target.dataset.userph;
    let userphid = e.target.dataset.userphid
    let state = '报名中';
    let fenlei = e.target.dataset.xueyuan + "、院级社团";
    let address = e.target.dataset.address;
    let xueyuan = e.target.dataset.xueyuan;
    let jianjie = e.target.dataset.jianjie;
    //console.log(e)
    //console.log(phoneNumber,qqNumber)
    //let images_fileID = e.target.dataset.images_fileID;
    console.log(images_fileid)
    wx.navigateTo({
      url: '/pages/index/detail_1/detail/detail?name=' + name + '&title=' + title + '&date=' + date + '&time=' + time + '&address=' + address + '&xueyuan=' + xueyuan + '&jianjie=' + jianjie + '&phoneNumber=' + phoneNumber + '&qqNumber=' + qqNumber + '&id=' + id + '&fenlei=' + fenlei + '&state=' + state + '&userph=' + userph + '&images_fileid=' + images_fileid + '&userphid=' + userphid,
    })
  },

  gotoDetail_xiao(e) {
    var images_fileid = JSON.stringify(e.currentTarget.dataset.images_fileid);
    let name = e.target.dataset.name;
    let phoneNumber = e.target.dataset.phonenumber;
    let qqNumber = e.target.dataset.qqnumber;
    let title = e.target.dataset.title;
    let date = e.target.dataset.date;
    let time = e.target.dataset.time;
    let id = e.target.dataset.id;
    let userph = e.target.dataset.userph;
    let userphid = e.target.dataset.userphid;
    let state = '报名中';
    let fenlei = "天津城建大学" + "、校级社团";
    let address = e.target.dataset.address;
    let xueyuan = e.target.dataset.xueyuan;
    let jianjie = e.target.dataset.jianjie;
    //let images_fileID = e.target.dataset.images_fileID;
    console.log(e)
    console.log(images_fileid)
    wx.navigateTo({
      url: '/pages/index/detail_1/detail/detail?name=' + name + '&title=' + title + '&date=' + date + '&time=' + time + '&address=' + address + '&xueyuan=' + xueyuan + '&jianjie=' + jianjie + '&phoneNumber=' + phoneNumber + '&qqNumber=' + qqNumber + '&id=' + id + '&fenlei=' + fenlei + '&state=' + state + '&userph=' + userph + '&images_fileid=' + images_fileid + '&userphid=' + userphid,
    })
  },

  // getwatch:function(){
  //   var that = this
  //  db.collection('league_from').orderBy('writetime',' asc').where({
  //   fenlei : "0"
  // }).watch({
  //     onChange: function(snapshot){
  //       console.log(snapshot)
  //       // for(var i = 0;i<that.data.list_yuan.length;i++){
  //       //   //var param = 'list_yuan['+i+'].links'
  //       //   var param = {}
  //       //   var string = 'list_yuan['+i+'].links'
  //       //   param[string] = snapshot.docs[i].links
  //       //   that.setData(param)

  //       // }

  //     },
  //     onError: function(err){

  //     }
  //   })
  // }
})