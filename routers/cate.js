const express = require('express')
const router = express.Router()
const path = require('path')
const cn = require(path.join(__dirname, '../common/index.js'))
//获取文章列表
router.get('/cates', async (req, res) => {
    let sql = 'select * from cate'
    let ret = await cn.queryData(sql, null)
    // console.log(ret);
    if (ret && ret.length > 0) {
        res.json({
            status: 0,
            message: '获取文章分类列表成功',
            data: ret
        })
    } else {
        res.json({
            status: 1,
            message: '获取文章分类列表失败'
        })
    }

})
//添加文章列表
router.post('/addcates', async (req, res) => {
    let params = req.body
    // console.log(params);
    let sql = 'insert into cate set ?'
    let ret = await cn.queryData(sql, params)
    if (ret && ret.affectedRows > 0) {
        res.json({
            status: 0,
            message: "新增文章分类成功！"
        })
    } else {
        res.json({
            status: 1,
            message: "新增文章分类失败！"
        })
    }
})
//删除文章列表
router.get('/deletecate/:id', async (req, res) => {
    let id = req.params.id
    // console.log(id);
    let sql = 'update cate set is_delete=1 where id= ?'
    let ret = await cn.queryData(sql, id)
    if (ret && ret.affectedRows > 0) {
        res.json({
            status: 0,
            message: "删除文章分类成功！"
        })
    } else {
        res.json({
            status: 1,
            message: "删除文章分类失败！"
        })
    }
})
//获取列表数据
router.get('/cates/:id', async (req, res) => {
    let id = req.params.id
    // console.log(id);
    let sql = 'select * from cate where id= ?'
    let ret = await cn.queryData(sql, id)
    if (ret && ret.length > 0) {
        res.json({
            status: 0,
            data: ret,
            message: "获取文章分类数据成功！"
        })
    } else {
        res.json({
            status: 1,
            message: "获取文章分类数据失败！"
        })
    }
})
//更新文章列表
router.post('/updatecate', async (req, res) => {
    let params = req.body
    // console.log(id);
    let sql = 'update cate set ? where id=?'
    let ret = await cn.queryData(sql, [{
        name: params.name,
        alias: params.alias
    }, params.id])
    console.log(ret);

    if (ret && ret.affectedRows > 0) {
        res.json({
            status: 0,
            message: "更新文章分类数据成功！"
        })
    } else {
        res.json({
            status: 1,
            message: "更新文章分类数据失败！"
        })
    }
})
module.exports = router