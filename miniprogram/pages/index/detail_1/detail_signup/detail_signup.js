// pages/WeChat/detail/detail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1532027772,1266945951&fm=27&gp=0.jpg',
    activecontent: "艺术团又又又纳新啦！！！",
    state: '',
    shetuanid: '',
    photo: '',
    id: '#ID:210210#',
    person: '#已报人数：160/250#',
    societyname: '计算机院艺术团',
    societydetail: '计算机与信息工程学院、院系级',
    content: '绘画社是城建校园中成立较早的社团之一，隶属于团委领导下的大学生社团联合会，属于艺术类社团。这些年，在社联的领导和支持下，在极富绘画热情的社员的参与下，逐步成长为有思想、有技术、勇于开拓创新的社团。旨在丰富校园生活，繁荣社团文化，增添校园的艺术氛围，为喜爱绘画的同学提供一个展示自我的平台',
    nametime: "2020.06.02 14:00-2020.06.10 14:00",
    gametime: "2020.06.10 17:00-2020.06.10 19:00",
    addressdetail: "鸣飞堂二楼",
    //轮播图
    imgUrls: [],
    indicatorDots: true, //显示面板显示点
    autoplay: true,  //自动切换
    interval: 5000,  //切换时间
    duration: 1000, //动画时长
    qqNumber: '',

    ellipsis: true, // 文字是否收起，默认收起

    optionList: ['所有', '选项1', '选项2'],
    value: '所有',

    hideFlag: true,//true-隐藏  false-显示
    animationData: {},//

  },
  /**
   * 收起/展开按钮点击事件
   */
  ellipsis: function () {
    var value = !this.data.ellipsis;
    this.setData({
      ellipsis: value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    //let url = '../../../../images/'

    console.log(options)
    let phoneNumber = options.phoneNumber;
    let qqNumber = options.qqNumber;
    let state = options.state;
    let name = options.name;
    let userph = options.userph;
    let title = options.title;
    let date = options.date;
    let time = options.time;
    let address = options.address;
    let xueyuan = options.xueyuan;
    let jianjie = options.jianjie;
    var shetuanid = options.id;
    let fenlei = options.fenlei;
    let images_fileid = JSON.parse(options.images_fileid);
    console.log(shetuanid)
    this.setData({
      phoneNumber: phoneNumber,
      qqNumber: qqNumber,
      shetuanid: shetuanid,
      state: state,
      photo: userph,
      activecontent: title,
      societyname: name,
      societydetail: fenlei,
      content: jianjie,
      nametime: date,
      gametime: time,
      addressdetail: address,
      imgUrls: images_fileid
    })
    console.log(this.data)
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
  ViewImage(e) {
    wx.previewImage({
      urls: e.currentTarget.dataset.imglist,
      current: e.currentTarget.dataset.url
    });
  },
  gotosign() {
    if (app.userInfo._id) {
      wx.navigateTo({
        url: '/pages/index/league/signup/signup?shetuanid=' + this.data.shetuanid + '&name=' + this.data.societyname + '&title=' + this.data.activecontent + '&photo=' + this.data.photo
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
  getOption_weixin: function (e) {
    var that = this;
    that.hideModal();
    if (this.data.qqNumber) {
      that.showModal1();
    }
    else {
      wx.showToast({
        title: '该用户暂未设置QQ',
        icon: 'none',
      })
    }
  },
  getOption_phone: function (e) {
    var that = this;
    that.hideModal();
    if (this.data.phoneNumber) {
      var phoneNumber = app.userInfo.phoneNumber
      wx.makePhoneCall({
        phoneNumber: phoneNumber //仅为示例，并非真实的电话号码
      })
    }
    else {
      wx.showToast({
        title: '该用户暂未设置手机号',
        icon: 'none',
      })
    }

  },
  //取消
  mCancel: function () {
    var that = this;
    that.hideModal();
  },

  // ----------------------------------------------------------------------modal
  // 显示遮罩层
  showModal: function () {
    var that = this;
    that.setData({
      hideFlag: false
    })
    // 创建动画实例
    var animation = wx.createAnimation({
      duration: 400,//动画的持续时间
      timingFunction: 'ease',//动画的效果 默认值是linear->匀速，ease->动画以低速开始，然后加快，在结束前变慢
    })
    this.animation = animation; //将animation变量赋值给当前动画
    var time1 = setTimeout(function () {
      that.slideIn();//调用动画--滑入
      clearTimeout(time1);
      time1 = null;
    }, 100)
  },

  // 隐藏遮罩层
  hideModal: function () {
    var that = this;
    var animation = wx.createAnimation({
      duration: 400,//动画的持续时间 默认400ms
      timingFunction: 'ease',//动画的效果 默认值是linear
    })
    this.animation = animation
    that.slideDown();//调用动画--滑出
    var time1 = setTimeout(function () {
      that.setData({
        hideFlag: true
      })
      clearTimeout(time1);
      time1 = null;
    }, 220)//先执行下滑动画，再隐藏模块

  },
  //动画 -- 滑入
  slideIn: function () {
    this.animation.translateY(0).step() // 在y轴偏移，然后用step()完成一个动画
    this.setData({
      //动画实例的export方法导出动画数据传递给组件的animation属性
      animationData: this.animation.export()
    })
  },
  //动画 -- 滑出
  slideDown: function () {
    this.animation.translateY(300).step()
    this.setData({
      animationData: this.animation.export(),
    })
  },
  showModal1(e) {
    this.setData({
      flag: 'true'
    })
  },
  hideModal1(e) {
    this.setData({
      flag: null
    })
  },
  hindlecopy() {
    wx.setClipboardData({
      data: this.data.qqNumber,
      success(res) {

        console.log(res.data) // data


      }
    })
  }

})