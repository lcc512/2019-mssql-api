const md5 = require('blueimp-md5')
const db = require('../models/db')

exports.get = (req, res, next) => {

    const user = req.session.user

    // console.log(user)

    if (!user) {
        return res.status(401).json({
            error: '未登录'
        })
    }

    res.status(200).json(user)

}

/**
 * 创建会话
 * @param req
 * @param res
 * @param next
 */
exports.create = async(req, res, next) => {

    const body = req.body
        // body.password=md5(body.password)

    const sqlStr = `select * from all_user where username='${body.username}' and password='${body.password}' 
  `

    try {
        var [user] = await db.query(sqlStr)

        if (!user) {
            res.status(404).json({
                error: 'Invalid username or password'
            })
        }

        // 登录成功，返回当前用户信息
        // req.session.user = user
        res.status(201).json(user)

    } catch (err) {
        next(err)
    }
}
exports.destroy = (req, res, next) => {

    delete req.session.user

    res.status(201).json({})

}