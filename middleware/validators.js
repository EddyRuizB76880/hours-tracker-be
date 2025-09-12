import { body, header } from 'express-validator';

import Professor from '../models/Professor.js'
import Student from '../models/Student.js'
import constants from '../utils/consts.js';

const inputValidator = {
    // This is the ideal way to store validation chains according to official docs.
    // https://express-validator.github.io/docs/guides/validation-chain

    createEmailChain: () => body('email').trim().isEmail().withMessage('Invalid email.'),
    createPasswordChain: () => body('password').trim().isLength({ min: 8 }),
    createNewPasswordChain: () => body('newPassword').trim().isLength({ min: 8 }).withMessage('New password does not meet requirements.'),
    createUserNameChain: () => body('name').trim().not().isEmpty().isLength({ max: 20 }),
    createUserIdChain: () => body(['internalId']).not().isEmpty(),
    createProjectObjectiveTaskNameChain: () => body('name').trim().not().isEmpty().isLength({ max: 50 }),
    createFieldChain: () => body('field').trim().not().isEmpty(),
    createProjectDescriptionChain: () => body('description').trim().not().isEmpty().isLength({ max: 200 }),
    createObjectiveDescriptionChain: () => body('description').trim().not().isEmpty().isLength({ max: 100 }),
    createTaskStatusChain: () => body('status').not().isEmpty(),

    createTaskRejectionChain: () => body('rejectionReason').custom((value, { req }) => {
        if(Number(req.body.status) === constants.TASK_DENIED){
            return value.length > 0;
        } else { 
            return true 
        }
    }).withMessage('Denied tasks must include a rejection reason.'),

    createTaskDescriptionChain: () => body('description').trim().not().isEmpty().isLength({ max: 100 }),
    createHoursSpentChain: () => body('hoursSpent').not().isEmpty(),
    createTaskStatusChain: () => body('status').not().isEmpty().isBoolean(),
    createUserTypeChain: () => header('User-Type').not().isEmpty(),
    

}

export default inputValidator;
