import { body, header } from 'express-validator';

import constants from '../utils/consts.js';

const inputValidator = {
    // This is the ideal way to store validation chains according to official docs.
    // https://express-validator.github.io/docs/guides/validation-chain

    createEmailChain: () => body('email').trim().isEmail().withMessage('Invalid email.'),
    createPasswordChain: () => body('password').trim().isLength({ min: 8 }),
    createNewPasswordChain: () => body('newPassword').trim().isLength({ min: 8 }).withMessage('New password does not meet requirements.'),
    createUserNameChain: () => body('name').trim().not().isEmpty().isLength({ max: 20 }),

    createUserIdChain: () => body('internalId').trim().not().isEmpty().custom((value, { req }) => {
      
        const id = value;
        const isExpectedLength = id.length === 6;
        //ToDo: make sure the first char is a letter and not a comma, exclamation mark, etc...
        const isFirstCharAUpperCaseLetter = Number.isNaN(Number(id.charAt(0)));
        const isRestOfTheIdNaN = Number.isNaN(Number(id.substring(1)));
        console.log('Evaluation results ' + isExpectedLength + ' ' + isFirstCharAUpperCaseLetter + ' ' + !isRestOfTheIdNaN);
        return isExpectedLength && isFirstCharAUpperCaseLetter && !isRestOfTheIdNaN;
    }).withMessage('Invalid internal university id.'),

    createProjectObjectiveTaskNameChain: () => body('name').trim().not().isEmpty().isLength({ max: 50 }),
    createFieldChain: () => body('field').trim().not().isEmpty(),
    createProjectDescriptionChain: () => body('description').trim().not().isEmpty().isLength({ max: 200 }),
    createObjectiveDescriptionChain: () => body('description').trim().not().isEmpty().isLength({ max: 100 }),
    createTaskStatusChain: () => body('status').not().isEmpty().isNumeric(),

    createTaskRejectionChain: () => body('rejectionReason').trim().custom((value, { req }) => {
        if(Number(req.body.status) === constants.TASK_DENIED){
            return value.length > 0;
        } else { 
            return true 
        }
    }).withMessage('Denied tasks must include a rejection reason.'),

    createTaskDescriptionChain: () => body('description').trim().not().isEmpty().isLength({ max: 100 }),
    createHoursSpentChain: () => body('hoursSpent').not().isEmpty().isNumeric(),
    createUserTypeChain: () => header('User-Type').trim().not().isEmpty().custom((value, { req }) => {
        return value === constants.STUDENT_TYPE || value === constants.PROFESSOR_TYPE; 
    }).withMessage('Only professors or students may be created.'),
}

export default inputValidator;
