const express = require("express");
const path = require("path");
const utils = require('utility');
const {
  log
} = require("console");
const router = express.Router();
const db = require(path.join(__dirname, "../common/index.js"));

// 获取用户信息
router.get("/userinfo", async (req, res) => {
  console.log(req.user);
  let sql = 'select id, username, nickname, email, user_pic from user where id = ?'
  let ret = await db.queryData(sql, req.user.id)
  console.log(ret);
  if (ret && ret.length > 0) {
    res.json({
      status: 0,
      message: '获取用户基本信息成功！',
      data: ret[0]
    })
  } else {
    res.json({
      status: 1,
      message: '获取用户信息失败！'
    })
  }
  // res.send("userinfo");
});
router.post("/userinfo", async (req, res) => {
  res.send('update userinfo')
});
//更新密码
router.post("/updatepwd", async (req, res) => {
  let params = req.body
  let id = req.user.id
  params.oldpwd = utils.md5(req.body.oldpwd)
  params.newpwd = utils.md5(req.body.newpwd)
  let sql = 'update user set password=? where id=? and password=?'
  let ret = await db.queryData(sql, [params.newpwd, id, params.oldpwd])
  if (ret && ret.affectedRows > 0) {
    res.json({
      status: 0,
      message: '更新密码成功！',
    })
  } else {
    res.json({
      status: 1,
      message: '更新密码失败！'
    })
  }
  // res.send('update userinfo')
});
//更新头像
router.post("/update/avatar", async (req, res) => {
  let params = req.body
  console.log(params);
  let id = req.user.id
  let sql = 'update user set user_pic=? where id=?'
  let ret = await db.queryData(sql, [params.avatar, id])
  if (ret && ret.affectedRows > 0) {
    res.json({
      status: 0,
      message: '更新头像成功！',
    })
  } else {
    res.json({
      status: 1,
      message: '更新头像失败！'
    })
  }
  // res.send('update ')
});
module.exports = router