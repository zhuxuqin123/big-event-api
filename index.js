//1.导入模块
//路径模块
const path = require('path')
//服务器模块
const express = require("express");
//跨域模块
const cors = require("cors");
//统一路由模块
const Router = require(path.join(__dirname, './routers/index.js'))
//2.创建服务器
let app = express();
//3.开启服务器
app.listen(3000, () => {
    console.log("running");
});
//处理post数据格式
app.use(
    express.urlencoded({
        extended: false,
    })
);
app.use(express.json());
//中间件解决跨域
app.use(cors());
//导入路由信息
app.use("/api", Router);