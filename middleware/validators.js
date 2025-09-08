import { body, header } from 'express-validator';

import Professor from '../models/Professor.js'
import Student from '../models/Student.js'

const inputValidator = {
    // This is the ideal way to store validation chains according to official docs.
    // https://express-validator.github.io/docs/guides/validation-chain

    createEmailChain: () => body('email').trim().isEmail().withMessage('Invalid email.'),
    createPasswordChain: () => body('password').trim().isLength({ min: 8 }),
    createUserNameChain: () => body('name').trim().not().isEmpty().isLength({ max: 20 }),
    createUserIdChain: () => body(['internalId']).not().isEmpty(),
    createProjectObjectiveTaskNameChain: () => body('name').trim().not().isEmpty().isLength({ max: 50 }),
    createFieldChain: () => body('field').trim().not().isEmpty(),
    createProjectDescriptionChain: () => body('description').trim().not().isEmpty().isLength({ max: 200 }),
    createObjectiveDescriptionChain: () => body('description').trim().not().isEmpty().isLength({ max: 100 }),
    createTaskDescriptionChain: () => body('description').trim().not().isEmpty().isLength({ max: 100 }),
    createHoursSpentChain: () => body('hoursSpent').not().isEmpty(),

    createUserTypeChain: () => header('User-Type').not().isEmpty(),
    
}

export default inputValidator;
