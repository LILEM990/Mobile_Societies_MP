// miniprogram/pages/index/league/signup/signup.js
const db = wx.cloud.database()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: null,
    picker1: ['男', '女'],
    picker: ['建筑学院', '土木工程学院', '地测学院', '环境与市政工程学院', '经济与管理学院', '能源学院', '计算机与信息工程学院', '控制学院', '理学院', '城市艺术学院', '国际教育学院'],
    shetuanid: '',

    modalName: null,
    textareaAValue: '',
    textareaBValue: '',

    images_fileID: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let name = options.name
    let title = options.title
    let photo = options.photo
    let shetuanid = options.shetuanid
    this.setData({
      name: name,
      title: title,
      photo: photo,
      shetuanid: shetuanid
    })
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
  PickerChange1(e) {
    console.log(e);
    this.setData({
      index1: e.detail.value
    })
  },
  PickerChange(e) {
    console.log(e);
    this.setData({
      index: e.detail.value
    })
  },
  formSubmit(e) {
    wx.showLoading({
      title: '报名中'
    });
    var that = this;
    var userid = app.userInfo._id
    var shetuanname = this.data.name
    var shetuantitle = this.data.title
    var photo = this.data.photo
    var shetuanid = this.data.shetuanid;//社团负责人id
    var name = e.detail.value.name;//学生姓名
    var xuehao = e.detail.value.xuehao;//学生学号
    var sex = e.detail.value.sex;//学生性别
    switch (sex) {
      case '0':
        sex = '男';
        break;
      case '1':
        sex = '女';
        break;
      default:
        sex = '未知';
    }
    var xueyuan = e.detail.value.xueyuan;//学生所在学院
    switch (xueyuan) {
      case '0':
        xueyuan = '建筑学院';
        break;
      case '1':
        xueyuan = '土木工程学院';
        break;
      case '2':
        xueyuan = '地测学院';
        break;
      case '3':
        xueyuan = '环境与市政工程学院';
        break;
      case '4':
        xueyuan = '经济与管理学院';
        break;
      case '5':
        xueyuan = '能源学院';
        break;
      case '6':
        xueyuan = '计算机与信息工程学院';
        break;
      case '7':
        xueyuan = '控制学院';
        break;
      case '8':
        xueyuan = '理学院';
        break;
      case '9':
        xueyuan = '城市与艺术学院';
        break;
      case '10':
        xueyuan = '国际教育学院';
        break;
      default:
        xueyuan = '未知';
    }
    var phone = e.detail.value.phone;//学生联系方式
    var qq = e.detail.value.qq;//学生qq
    console.log(shetuanid)
    db.collection("league_signup").add({
      data: {
        shetuanid: shetuanid,
        shetuanname: shetuanname,
        shetuantitle: shetuantitle,
        photo: photo,
        userid: userid,
        name: name,
        xuehao: xuehao,
        sex: sex,
        xueyuan: xueyuan,
        phone: phone,
        qq: qq
      },
      success(res) {
        wx.hideLoading();
        wx.navigateBack({
          delta: 1
        })
        wx.showToast({
          title: '报名成功'
        });
      },
      fail(res) {
        wx.hideLoading();
        wx.showToast({
          title: '报名失败'
        });
      }
    })

  },
})