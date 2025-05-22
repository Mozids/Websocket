const student_ctrl = require('../controller/student_ctrl')
const { body, param } = require('express-validator')


module.exports = (app) => {

    const router = app.Router()

    const Validation = [
        body('firstName').notEmpty().withMessage('First name is required')
            .isString().withMessage('First name must be a string'),
        body('lastName').notEmpty().withMessage('Last name is required')
            .isString().withMessage('Last name must be a string'),
        body('classes').notEmpty().withMessage('Class is required')
            .isIn(['X', 'XI', 'XII']).withMessage('Class must be one of: X, XI, XII'),
        body('gender').notEmpty().withMessage('Gender is required')
            .isIn(['M', 'F']).withMessage('Gender must be either M or F'),
        body('major_id').notEmpty().withMessage('Major ID is required')
            .isInt({ min: 1 }).withMessage('Major ID must be a positive integer')
            .custom(async (value) => {
                const major = await db.major.findByPk(value);
                if (!major) {
                    throw new Error('Major ID does not exist');
                }
            }).withMessage('Major ID does not exist')
    ];
    const idValidation = param('id').isInt().withMessage('ID must be an integer');

    router.get('/', student_ctrl.get)

    router.get('/detail/:id', student_ctrl.detail)
    
    // router.post('/addstudent', [ 
    //     Validation,
    // ],student_ctrl.add)

    router.put('/update/:id', [ 
        ...Validation,
        idValidation
    ],student_ctrl.update)

    router.delete('/delete/:id', [
        idValidation
    ],student_ctrl.delete)

    return router
}