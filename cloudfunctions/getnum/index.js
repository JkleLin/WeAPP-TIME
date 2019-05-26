// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database({
  env: 'jkle-plan-cua0s'
})

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  const userlist = await db.collection("USERS").where({
    openid: wxContext.OPENID
  }).get()

  if (userlist.data.length == 0) {
    return {
       recoNum: 0,
       suceRate:0
    }
  }
  return {
    recoNum: userlist.data[0].numOfReco,
    suceRate: userlist.data[0].suceRate * 100
  }
}