const express = require('express')
const router = express.Router()
const path = require('path')
const {
    log
} = require('console')
const cn = require(path.join(__dirname, '../common/index.js'))
//查询文章列表信息
router.get('/list', async (req, res) => {
    let params = req.query
    params.pagesize = parseInt(params.pagesize)
    params.pagenum = parseInt(params.pagenum)
    console.log(params);
    // let sql = 'select * from article limit ?,?'
    let codition = ''
    for (let key in params) {
        if (key === 'cate_id' && params[key]) {
            codition += key + '=' + params[key] + ' and '
        } else if (key === 'state' && params[key]) {
            codition += key + '="' + params[key] + '" and '
        }
    }

    codition = codition.substring(0, codition.lastIndexOf('and'))
    console.log(codition);
    let sql = 'select * from article limit ?, ?'
    if (codition) {
        sql = 'select * from article where ' + codition + ' limit ?, ?'
    }
    let ret = await cn.queryData(sql, [params.pagesize * (params.pagenum - 1), params.pagesize])
    // console.log(ret);
    if (ret && ret.length > 0) {
        res.json({
            status: 0,
            message: '查询文章列表信息成功',
            data: ret
        })
    } else {
        res.json({
            status: 1,
            message: '查询文章列表信息失败'
        })
    }
})
//发表文章
router.post('/add', (req, res) => {

})
router.get('/delete/:id', (req, res) => {

})
router.get('/:id', (req, res) => {

})
router.get('/list', (req, res) => {

})
module.exports = router