// 统一管理路由信息
const express = require('express');
const path = require('path')
const db = require(path.join(__dirname, '../common/index.js'))
const router = express.Router()
router.post('/login', (req, res) => {
    res.send('login')
})
router.post('/reguser', (req, res) => {
    res.send('reguser')
})
router.get('/test', async (req, res) => {
    let sql = 'select * from user'
    let ret = await db.queryData(sql, null)
    res.json({
        status: 0,
        data: ret,
        message: '获取数据成功'
    })
})
module.exports = router