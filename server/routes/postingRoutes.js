const { body } = require("express-validator")
const { authenticateJWT } = require("../middleware/authMiddleware")
const post_ctrl = require('../controller/post_ctrl')

module.exports = (app) => {
    const router = app.Router()

    router.get('/list', authenticateJWT, post_ctrl.list)

    router.post('/create', authenticateJWT, [
    body('content_text').notEmpty()
    ], post_ctrl.save)

    return router
}