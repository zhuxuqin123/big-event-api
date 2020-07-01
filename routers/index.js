// 统一管理路由信息
const express = require("express");
const path = require("path");
//对密码进行加密的包
const utils = require("utility");
//设置token标志的包
const jwt = require("jsonwebtoken");
const db = require(path.join(__dirname, "../common/index.js"));
const router = express.Router();
//登录接口
router.post("/login", async (req, res) => {
  //获取客户端发送过来的数据
  let params = req.body;
  //对密码进行加密
  params.password = utils.md5(req.body.password);
  //查询数据库信息进行判断
  let sql = "select id from user where username = ? and password =?";
  let ret = await db.queryData(sql, [params.username, params.password]);
  console.log(ret);

  if (ret && ret.length > 0) {
    //验证通过添加token标志
    let token = jwt.sign(
      {
        //token需要携带的参数
        username: params.username,
        id: ret[0].id,
      },
      //加密的唯一标识
      "bigevent",
      {
        //设置配置项，token有效期
        expiresIn: "2 days",
      }
    );
    res.json({
      status: 0,
      messagawaite: "登录成功",
      token: "Bearer" + token,
    });
  } else {
    res.json({
      status: 1,
      messagawaite: "登录失败",
    });
  }
  res.send("login");
});
//注册接口
router.post("/reguser", async (req, res) => {
  //获取前端传递过来的参数
  let params = req.body;
  params.password = utils.md5(req.body.password);
  console.log(params);
  //调用数据库方法添加数据库数据
  let sql = "insert into user set ?";
  let ret = await db.queryData(sql, params);
  console.log(ret);

  if (ret && ret.affectedRows > 0) {
    res.json({
      status: 0,
      messagawaite: "注册成功",
    });
  } else {
    res.json({
      status: 1,
      messagawaite: "注册失败",
    });
  }
});
//测试接口
router.get("/test", async (req, res) => {
  let sql = "select * from user";
  let ret = db.queryData(sql, null);
  res.json({
    status: 0,
    data: ret,
    message: "获取数据成功",
  });
});
module.exports = router;
