function queryData(sql, params) {
    return new Promise((resolve, reject) => {
        //导入mysql模块
        const mysql = require('mysql')
        //创建数据库连接  设置参数
        const cn = mysql.createConnection({
            host: 'localhost',
            database: 'db',
            user: 'root',
            password: 'admin123'
        })
        //连接数据库
        cn.connect()
        //执行MySQL语句
        cn.query(sql, params, (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
        //关闭数据库连接
        cn.end()
    })
}


module.exports = {
    queryData
}