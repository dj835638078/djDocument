const { ErroeModel } = require('../model/resModel')
module.exports = (req, res, next) => {
    if (req.session.username) {
        next()
        return
    }
    res.json(
        new ErroeModel('未登录')
    )
}