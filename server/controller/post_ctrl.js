const { post, user } = require('../models');
const { validationResult } = require('express-validator');
const self = {}

self.list = async (_, res) => {
    let data = await post.findAll({
        include: [
            {
            model: user,
            attributes: ['username']
        },
        {
            model: comment,
            include: {
                model: comment
            }
        }
    ]
    })
    res.status(200).json({
        message: "post is founded",
        data: data
    })
}

self.save = async (req, res) => {
    let errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json(errors)  
        }
    const { 
        content_text
    } = req.body
    
    await post.create({
        content_text: content_text,
        private: "FALSE",
        user_id: req?.user?.data?.id
    })

    res.status(201).send({
        message: "Posting successfully",
    })
    
}

module.exports = self