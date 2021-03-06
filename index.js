//1.导入模块
//服务器模块
const express = require("express");
//跨域模块
const cors = require("cors");
//路径模块
const path = require("path");
//统一解析token标志
const jwt = require("express-jwt");
//统一路由模块
const loginRouter = require(path.join(__dirname, "./routers/index.js"));
const userRouter = require(path.join(__dirname, "./routers/user.js"));
const cateRouter = require(path.join(__dirname, "./routers/cate.js"));
const articleRouter = require(path.join(__dirname, "./routers/article.js"));
//2.创建服务器
const app = express();
//使用静态资源路径
app.use('/uploads', express.static('uploads'))
//处理post数据格式
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());
//中间件解决跨域
app.use(cors());

app.use(jwt({
  secret: 'bigevent'
}).unless({
  path: /^\/api/
}))
//导入路由信息
app.use("/api", loginRouter);
app.use("/my", userRouter);
app.use("/my/article", cateRouter);
app.use("/my/article", articleRouter);
//统一处理不存在的路由
app.all('*', (req, res) => {
  res.status(404).json({
    status: 404,
    message: '请求的资源不存在'
  })
})
//添加一个中间件，统一处理错误信息
app.use((err, req, res, next) => {
  //token验证失败
  if (err.status === 401) {
    res.status(401).json({
      status: 401,
      message: err.message
    })
  } else {
    res.json({
      status: 500,
      message: '服务器错误' + err.message
    })
  }

})
//3.开启服务器
app.listen(3000, () => {
  console.log("running");
});