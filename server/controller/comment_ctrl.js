const { validationResult } = require("express-validator");
const { comment, user } = require("../models");
const self = {}

self.save = async (req, res) => {
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json(errors)
    }

    const {
        content_comment_text,
    } = req.body

    await comment.create({
        content_comment_text: content_comment_text,
        user_id: req?.user?.data?.id,
        post_id: req?.params?.post_id, 
    })

    res.status(201).send({
        message: "comment created successfully",
    })
}

self.list = async (_, res) => {
    let data = await comment.findAll({
        include: [{
            model: user,
            attributes: ['username']
        }]
    })

    res.status(200).json({
        message: 'comment is found',
        data: data
    })
}


module.exports = self