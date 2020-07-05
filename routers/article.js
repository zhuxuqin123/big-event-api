const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const upload = multer({
    dest: path.join(__dirname, "../uploads")
});
const cn = require(path.join(__dirname, "../common/index.js"));
//查询文章列表信息
router.get("/list", async (req, res) => {
    let params = req.query;
    //页码，页条数取整
    params.pagesize = parseInt(params.pagesize);
    params.pagenum = parseInt(params.pagenum);
    console.log(params);
    //条件参数cate_id,state可选
    //利用字符串拼接起来
    let codition = "";
    for (let key in params) {
        if (key === "cate_id" && params[key]) {
            codition += key + "=" + params[key] + " and ";
        } else if (key === "state" && params[key]) {
            codition += key + '="' + params[key] + '" and ';
        }
    }
    // codition = codition.substring(0, codition.lastIndexOf('and'))
    console.log(codition);
    //数据表关联  联表处理：join on     起别名:as
    let sql =
        "select a.id,a.title,a.pub_date,a.state,c.name as cate_name from article as a join cate as c on a.cate_id = c.id where a.is_delete=0 limit ?, ?";
    //数据总数计算
    let totalsql = "select count(*) as total from article as a ";
    //条件参数存在与否的判断
    if (codition) {
        codition += "a.is_delete=0";
        sql =
            "select a.id,a.title,a.pub_date,a.state,c.name as cate_name from article as a join cate as c on a.cate_id = c.id where " +
            codition +
            " limit ?, ?";
        totalsql = "select count(*) as total from article as a where " + codition;
    }
    let ret = await cn.queryData(sql, [
        params.pagesize * (params.pagenum - 1),
        params.pagesize,
    ]);
    let cret = await cn.queryData(totalsql);
    console.log(cret);
    // console.log(ret);
    if (ret && ret.length > 0) {
        res.json({
            status: 0,
            message: "查询文章列表信息成功",
            data: ret,
            total: cret[0].total,
        });
    } else {
        res.json({
            status: 1,
            message: "查询文章列表信息失败",
        });
    }
});
//发表文章
router.post("/add", upload.single('cover_img'), async (req, res) => {
    let params = req.body;
    let id = req.user.id
    let sql = "insert into article set ?"
    let ret = await cn.queryData(sql, {
        title: params.title,
        cate_id: params.cate_id,
        content: params.content,
        cover_img: '/uploads/' + req.file.filename,
        state: params.state,
        is_delete: 0,
        author_id: id,
        pub_date: new Date()
    });
    console.log(ret);
    if (ret && ret.affectedRows > 0) {
        res.json({
            status: 0,
            message: "发布文章成功",
        });
    } else {
        res.json({
            status: 1,
            message: "发表文章失败",
        });
    }
});
//根据id删除文章数据
router.get("/delete/:id", async (req, res) => {
    let id = req.params.id;
    let sql = "update article set is_delete=1 where id=?";
    let ret = await cn.queryData(sql, id);
    if (ret && ret.length > 0) {
        res.json({
            status: 0,
            message: "删除文章成功",
            data: ret,
        });
    } else {
        res.json({
            status: 1,
            message: "删除文章失败",
        });
    }
});
//根据id获取文章详情
router.get("/:id", async (req, res) => {
    let id = req.params.id;
    // let params = req.body
    let sql = "select * from article where id=?";
    let ret = await cn.queryData(sql, id);
    if (ret && ret.length > 0) {
        res.json({
            status: 0,
            message: "获取文章成功",
            data: ret,
        });
    } else {
        res.json({
            status: 1,
            message: "获取文章失败",
        });
    }
});
//根据id更新文章信息
router.post("/edit", upload.single('cover_img'), async (req, res) => {
    let params = req.body
    let = sql = 'update article set ? where id=?'
    let ret = await cn.queryData(sql, [{
        title: params.title,
        cate_id: params.cate_id,
        content: params.content,
        cover_img: '/uploads/' + req.file.filename,
        state: params.state,
    }, params.id])
    if (ret && ret.affectedRows > 0) {
        res.json({
            status: 0,
            message: "修改文章成功",
        });
    } else {
        res.json({
            status: 1,
            message: "修改文章失败",
        });
    }
});
module.exports = router;