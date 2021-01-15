// pages/WeChat/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1532027772,1266945951&fm=27&gp=0.jpg',
    activecontent: "艺术团又又又纳新啦！！！",
    state: '',
    photo: '',
    id: '#ID:210210#',
    person: '',
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

    ellipsis: true, // 文字是否收起，默认收起
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
    console.log(options)
    let state = options.state;
    let userph = options.userph;
    let name = options.name;
    let title = options.title;
    let date = options.date;
    let time = options.time;
    let location = options.location;
    let jianjie = options.jianjie;
    let images_fileid = JSON.parse(options.images_fileid);
    this.setData({
      photo: userph,
      state: state,
      activecontent: title,
      societyname: title,
      societydetail: name,
      content: jianjie,
      nametime: date,
      gametime: time,
      addressdetail: location,
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
})