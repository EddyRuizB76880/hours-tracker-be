import { body } from 'express-validator';

import Professor from '../models/Professor.js'
import Student from '../models/Student.js'

const inputValidator = {
    // This is the ideal way to store validation chains according to official docs.
    // https://express-validator.github.io/docs/guides/validation-chain

    createEmailChain: () => body('email').trim().isEmail().withMessage('Invalid email.'),
    createPasswordChain: () => body('password').trim().isLength({ min: 8 }),
    createUserNameChain: () => body('name').not().isEmpty().isLength({ max: 20 }),
    createProjectObjectiveTaskNameChain: () => body('name').not().isEmpty().isLength({ max: 50 }),
    createFieldChain: () => body('field').not().isEmpty(),
    createProjectDescriptionChain: () => body('description').not().isEmpty().isLength({ max: 200 }),
    createObjectiveDescriptionChain: () => body('description').not().isEmpty().isLength({ max: 100 }),
    createTaskDescriptionChain: () => body('description').not().isEmpty().isLength({ max: 100 }),
    createHoursSpentChain: () => body('hoursSpent').not().isEmpty(),

    customIsValidProfessorStudentId: () => { 
            return body('userId').trim().not().isEmpty().isLength({ min: 6, max: 6 }).custom( (value, { req }) => {
                const isFirstCharAUpperCaseLetter = value.charAt(0).match(/[A-Z]/gi);
                const isRestOfTheIdAValidNumber = Number.isNaN(Number(value.substring(1)));
                if( !isFirstCharAUpperCaseLetter || !isRestOfTheIdAValidNumber){
                    throw new Error('Invalid ID.');
                }
        });
    },

    customIsEmailInUse: () => { 
            return body('email').custom( async (value, { req }) => {
                const user = req.body.userType === 'student' ? Student : Professor;
                const existingUser = await user.findOne({ where: { email: value }});
                if(existingUser) {
                    throw new Error('E-Mail address already exists!');
                }
        });
    }
}

export default inputValidator;
