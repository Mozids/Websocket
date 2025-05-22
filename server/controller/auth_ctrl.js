let self = {}
const { validationResult } = require('express-validator')
const {user,student,roles,role_user,student_user} = require('../models/index')
const bcrypt = require('bcryptjs')
const { where } = require('sequelize')
const jwt = require('jsonwebtoken')

// self.me = async (req, res) => {

// }

self.login = async (req, res) => {
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json(errors)  
    }
    
    const {
        username,
        password
    } = req.body

    // const secret = process.env.JWT_SECRET
    const userData = await user.findOne({
        include: [
            {model: roles},
            {model: student},
        ],
        where: {
            username: username
        },
        Attributes: ['id', 'username', 'email', "password"]
    })

    let isCorrectPass = await bcrypt.compare(password, userData.password)
    if (!isCorrectPass) {
        return res.status(401).json({
            message: 'Invalid password'
        })
    }
    const options = {
        expiresIn: '24h'
    }
    const secret = "PIJAYA"

    const token = jwt.sign({
        data: {
            id: userData.id,
            username: userData.username,
            email: userData.email,
            firstName: userData.students[0].firstName,
            lastName: userData.students[0].lastName,
            classes: userData.students[0].classes,
            gender: userData.students[0].firstName,
            roles: userData.roles[0].name,
        }
    }, secret, options)

    res.status(200).json({
        message: 'login success',
        token: token
    })

}

self.register = async (req, res) => {
    let errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json(errors)  
        }

    const { 
        username,
        email,
        password,
        firstName,
        lastName,
        classes,
        major_id,
        gender
    } = req.body
    
    const hashedPassword = await bcrypt.hash(password, 10)

    const UserData = await user.create({
        username: username,
        email: email,
        password: hashedPassword
    })

    const StudentData = await student.create({
        firstName: firstName,
        lastName: lastName,
        classes: classes,
        major_id: major_id,
        gender: gender
    })

    const roleStudent = await roles.findOne({
        Attributes: ['id'],
        where: {
            name: 'student'
        }
    })

    await role_user.create({
        user_id: UserData.id,
        role_id: roleStudent.id
    })

    await student_user.create({
        user_id: UserData.id,
        student_id: StudentData.id
    })

    res.status(201).send({
        message: "User registered successfully",
    })
    
        // return
        // try {
        //         const { firstName, lastName, classes, gender, major_id } = req.body;
        //         const newStudent = await db.student.create({
        //             firstName,
        //             lastName,
        //             classes,
        //             gender,
        //             major_id
        //         });

        //         res.status(201).json({
        //             message: "Student added successfully",
        //             data: newStudent
        //         });
        //     } catch (error) {
        //         res.status(500).json({
        //             message: "Error adding student",
        //             error: error.message
        //         });
        //     }
}

module.exports = self