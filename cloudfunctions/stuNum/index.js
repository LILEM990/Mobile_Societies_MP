// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: "test-qzwkr"
})

const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return await db.collection('students').where({
      stuNumber : event.stuNumber
    }).update({
      // data 传入需要局部更新的数据
      data: {
        status : '1'
      }
    })
  } catch (e) {
    console.error(e)
  }
}