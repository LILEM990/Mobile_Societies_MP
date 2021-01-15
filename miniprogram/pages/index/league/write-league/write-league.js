// miniprogram/pages/write-league/write-league.js
wx.cloud.init()
const db = wx.cloud.database()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: null,
    picker: ['院级社团', '校级社团'],

    time: '00:00',
    date: '2020-01-01',

    imgList: [],
    modalName: null,
    textareaAValue: '',
    textareaBValue: '',

    images_fileID: []
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

  },
  PickerChange(e) {
    console.log(e);
    this.setData({
      index: e.detail.value
    })
  },
  TimeChange(e) {
    this.setData({
      time: e.detail.value
    })
  },
  DateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  ChooseImage() {
    wx.chooseImage({
      count: 4, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
      }
    });
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  DelImg(e) {
    wx.showModal({
      title: '召唤师',
      content: '确定要删除这段回忆吗？',
      cancelText: '再看看',
      confirmText: '再见',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },
  formSubmit: function (e) {
    wx.showLoading({
      title: '发布中'
    });
    var that = this;
    var name = e.detail.value.name;//社团名称
    var userPhoto = ''
    var userPhotoid = ''
    console.log(name)
    switch (name) {
      case '魔术社':
        userPhoto = 'cloud://test-qzwkr.7465-test-qzwkr-1301875980/league/魔术社.jpg';
        userPhotoid = 'https://7465-test-qzwkr-1301875980.tcb.qcloud.la/league/%E9%AD%94%E6%9C%AF%E7%A4%BE.jpg?sign=9436854fab4d739a1e1ac1cd60b17150&t=1591706197'
        break;
      case '声乐团':
        userPhoto = 'cloud://test-qzwkr.7465-test-qzwkr-1301875980/league/声乐团.JPG';
        userPhotoid = 'https://7465-test-qzwkr-1301875980.tcb.qcloud.la/league/%E5%A3%B0%E4%B9%90%E5%9B%A2.JPG?sign=8647ae239aed12d70743d4fc2206b974&t=1591780760'
        break;
      case '艺术团':
        userPhoto = 'cloud://test-qzwkr.7465-test-qzwkr-1301875980/league/艺术团.jpg';
        userPhotoid = 'https://7465-test-qzwkr-1301875980.tcb.qcloud.la/league/%E8%89%BA%E6%9C%AF%E5%9B%A2.jpg?sign=2d91167a5e2a813f30ba135b19ee87f7&t=1591792270'
        break;
      case '学习部':
        userPhoto = 'cloud://test-qzwkr.7465-test-qzwkr-1301875980/league/学习部.jpg';
        userPhotoid = 'https://7465-test-qzwkr-1301875980.tcb.qcloud.la/league/%E5%AD%A6%E4%B9%A0%E9%83%A8.jpg?sign=4dc69c3b1c6ba8be80f7798ac4a5a7ef&t=1591792309'
        break;
      case '宣传部':
        userPhoto = 'cloud://test-qzwkr.7465-test-qzwkr-1301875980/league/宣传部.jpg';
        userPhotoid = 'https://7465-test-qzwkr-1301875980.tcb.qcloud.la/league/%E5%AE%A3%E4%BC%A0%E9%83%A8.jpg?sign=3113cf2dd82cb99ec9dbe5a3747484a4&t=1591792343'
        break;
      case '小七学生会':
        userPhoto = 'cloud://test-qzwkr.7465-test-qzwkr-1301875980/league/小七学生会.jpg';
        userPhotoid = 'https://7465-test-qzwkr-1301875980.tcb.qcloud.la/league/%E5%B0%8F%E4%B8%83%E5%AD%A6%E7%94%9F%E4%BC%9A.jpg?sign=2901adf55994d02c346eb8559b38f46b&t=1591792385'
        break;
      case '文艺部':
        userPhoto = 'cloud://test-qzwkr.7465-test-qzwkr-1301875980/league/文艺部.jpg';
        userPhotoid = 'https://7465-test-qzwkr-1301875980.tcb.qcloud.la/league/%E6%96%87%E8%89%BA%E9%83%A8.jpg?sign=63905fba14cba4f2ca77c16c7a10425c&t=1591792424'
        break;
      case '外联部':
        userPhoto = 'cloud://test-qzwkr.7465-test-qzwkr-1301875980/league/外联部.jpg';
        userPhotoid = 'https://7465-test-qzwkr-1301875980.tcb.qcloud.la/league/%E5%A4%96%E8%81%94%E9%83%A8.jpg?sign=0e411de2e037e99d5980cdc5e2dafa59&t=1591792469'
        break;
      case '体育部':
        userPhoto = 'cloud://test-qzwkr.7465-test-qzwkr-1301875980/league/体育部.jpg';
        userPhotoid = 'https://7465-test-qzwkr-1301875980.tcb.qcloud.la/league/%E4%BD%93%E8%82%B2%E9%83%A8.jpg?sign=d1a1c098373af9bceb198d3642ba95af&t=1591792508'
        break;
      case '办公室':
        userPhoto = 'cloud://test-qzwkr.7465-test-qzwkr-1301875980/league/办公室.jpg';
        userPhotoid = 'https://7465-test-qzwkr-1301875980.tcb.qcloud.la/league/%E5%8A%9E%E5%85%AC%E5%AE%A4.jpg?sign=045f5111e32111f8d61cebac1b35a615&t=1591792542'
        break;
      case '舞蹈社':
        userPhoto = 'cloud://test-qzwkr.7465-test-qzwkr-1301875980/league/舞蹈社.jpg';
        userPhotoid = 'https://7465-test-qzwkr-1301875980.tcb.qcloud.la/league/%E8%88%9E%E8%B9%88%E7%A4%BE.jpg?sign=b70ab145c13983e406c725b3a5dde5cc&t=1591706184'
        break;
      case '声乐社':
        userPhoto = 'cloud://test-qzwkr.7465-test-qzwkr-1301875980/league/声乐社.jpg';
        userPhotoid = 'https://7465-test-qzwkr-1301875980.tcb.qcloud.la/league/%E5%A3%B0%E4%B9%90%E7%A4%BE.jpg?sign=2c0a6bfc08e4fffc8197d4cd27929837&t=1591706128'
        break;
      case '广播台':
        userPhoto = 'cloud://test-qzwkr.7465-test-qzwkr-1301875980/league/广播台.jpg';
        userPhotoid = 'https://7465-test-qzwkr-1301875980.tcb.qcloud.la/league/%E5%B9%BF%E6%92%AD%E5%8F%B0.jpg?sign=d5ee16dd79476c663d0d6a0ebe3537c0&t=1591706150'
        break;
      case '电视台':
        userPhoto = 'cloud://test-qzwkr.7465-test-qzwkr-1301875980/league/电视台.jpg';
        userPhotoid = 'https://7465-test-qzwkr-1301875980.tcb.qcloud.la/league/%E7%94%B5%E8%A7%86%E5%8F%B0.jpg?sign=5075aa1cb077eaed2271b85afc77eead&t=1591706171'
        break;
      default:
        userPhoto = app.userInfo.userPhoto;
        userPhotoid = app.userInfo.userPhoto;
    }
    var phoneNumber = app.userInfo.phoneNumber//社团负责人电话
    var qqNumber = app.userInfo.qqNumber;//社团负责人qq
    var fenlei = e.detail.value.fenlei;//社团分类
    var title = e.detail.value.title;//纳新标题
    var date = e.detail.value.date;//报名截止日期
    var time = e.detail.value.time;//报名截止时间
    //console.log(time)
    var address = e.detail.value.address;//报名地点
    var xueyuan = app.userInfo.stuCollege;//社团所在学院
    var jianjie = e.detail.value.jianjie;//社团简介
    var imageFiles = that.data.imgList;
    var date_now = new Date();
    var now = date_now.getFullYear() + "/" + (date_now.getMonth() + 1) + "/" + date_now.getDate() + " " + date_now.getHours() + ":" + date_now.getMinutes() + ":" + date_now.getSeconds();    //得到此时的时间
    if (this.data.imgList.length) {
      //for循环进行图片上传
      for (var i = 0; i < this.data.imgList.length; i++) {
        var imageUrl = this.data.imgList[i].split("/");
        var name_img = imageUrl[imageUrl.length - 1];        //得到图片的名称
        var images_fileID = that.data.images_fileID;    //得到data中的fileID
        wx.cloud.uploadFile({
          cloudPath: "community/article_images/" + name_img,    //云存储路径
          filePath: imageFiles[i],                          //文件临时路径
          success: res => {
            images_fileID.push(res.fileID);
            that.setData({
              images_fileID: images_fileID         //更新data中的 fileID
            })
            if (images_fileID.length === imageFiles.length) {
              //对数据库进行操作
              db.collection("league_from").add({
                data: {
                  userPhoto: userPhoto,
                  userPhotoid: userPhotoid,
                  nickName: app.userInfo.nickName,
                  userid: app.userInfo._id,
                  name: name,
                  phoneNumber: phoneNumber,
                  qqNumber: qqNumber,
                  fenlei: fenlei,
                  address: address,
                  xueyuan: xueyuan,
                  title: title,
                  date: date,
                  time: time,
                  jianjie: jianjie,
                  nowtime: now,
                  links: 0,
                  images: imageFiles,
                  images_fileID: that.data.images_fileID,
                  writetime: new Date()    //发布时间
                },
                success(res) {
                  wx.hideLoading();
                  wx.navigateBack({
                    delta: 1
                  })
                  wx.showToast({
                    title: '发布成功'
                  });
                },
                fail(res) {
                  wx.hideLoading();
                  wx.showToast({
                    title: '发布失败'
                  });
                }
              })
            }
          },
          fail: err => {
            // handle error
            console.log(err)
          }
        })
      }
    }
    else {
      db.collection("league_from").add({
        data: {
          userPhoto: userPhoto,
          userPhotoid: userPhotoid,
          nickName: app.userInfo.nickName,
          userid: app.userInfo._id,
          name: name,
          phoneNumber: phoneNumber,
          qqNumber: qqNumber,
          fenlei: fenlei,
          address: address,
          xueyuan: xueyuan,
          title: title,
          date: date,
          time: time,
          jianjie: jianjie,
          nowtime: now,
          links: 0,
          images: imageFiles,
          images_fileID: that.data.images_fileID,
          writetime: new Date()    //发布时间
        },
        success(res) {
          wx.hideLoading();
          wx.navigateBack({
            delta: 1
          })
          wx.showToast({
            title: '发布成功'
          });
        },
        fail(res) {
          wx.hideLoading();
          wx.showToast({
            title: '发布失败'
          });
        }
      })
    }
  },
  handleAddFriend() {
    if (app.userInfo._id) {
      db.collection('message').where({
        userId: this.data.detail._id
      }).get().then((res) => {
        if (res.data.length) {   // 更新
          if (res.data[0].list.includes(app.userInfo._id)) {
            wx.showToast({
              title: '已申请过!'
            })
          }
          else {
            wx.cloud.callFunction({
              name: 'update',
              data: {
                collection: 'message',
                where: {
                  userId: this.data.detail._id
                },
                data: `{list : _.unshift('${app.userInfo._id}')}`
              }
            }).then((res) => {
              wx.showToast({
                title: '申请成功~'
              })
            });
          }
        }
        else {   // 添加 
          db.collection('message').add({
            data: {
              userId: this.data.detail._id,
              list: [app.userInfo._id]
            }
          }).then((res) => {
            wx.showToast({
              title: '申请成功'
            })
          });
        }
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
  }
})