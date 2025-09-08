import bcrypt from "bcrypt";
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken'

import Student from '../models/Student.js';
import Professor from '../models/Professor.js';
import errorCustomizer from "../utils/errors.js";

class AuthController {  

        constructor(){}

        async signup(req, res, next) {
            const isStudentSignup = req.get('User-Type') === 'student';
            const user = isStudentSignup ? Student : Professor;

            const errors = validationResult(req).array();
            

            if(errors.length === 0){

                if(await this.isEmailInUse(req.body.email, user)) errors.push({message: 'Email already in use!'});
                if(await this.isInternalIdInUse(req.body.internalId, user)) errors.push({message: 'Internal ID already in use!'});

                if(!this.isValidID(req.body.internalId.trim())) errors.push({ message: 'Invalid ID.' });

                if(errors.length === 0){
                    const hashedPassword = await bcrypt.hash(req.body.password, 12);
                    let fieldsToSave = {...req.body, password: hashedPassword};
                    
                    if(isStudentSignup) { 
                        const beganOn = new Date(Date.now());
                        const deadline = new Date(Date.now());
                        deadline.setFullYear(beganOn.getFullYear() + 1);

                        fieldsToSave = this.appendStudentFields(fieldsToSave, { 
                                                                                status: 1,
                                                                                beganOn: beganOn.toString(), 
                                                                                deadline: deadline.toString(),
                                                                                hoursRemaining: 300,
                                                                            }); 
                                                                                        
                    }
                    
                    const result = await user.create(fieldsToSave);
                
                    res.status(200).json(JSON.stringify({message: `New ${req.get('User-Type')} created!`}));
                } else {
                    throw errorCustomizer.createError(400, 'The following issues were found during signup.', errors);
                }
            } else {
                throw errorCustomizer.createError(400, 'The following issues were found during signup.', errors);
            }
        }

        async login(req, res, next){
            const isStudentLogin = req.get('User-Type') === 'student';
            const user = isStudentLogin ? Student : Professor;

            const errors = validationResult(req).array();

            if(errors.length === 0){
                const userInstance = await user.findOne({ where: { email: req.body.email }});
                if(userInstance){
                    const isMatchingPassword = await bcrypt.compare(req.body.password, userInstance.password);
                    if(isMatchingPassword){
                        const token = this.generateAuthToken(userInstance, req.get('User-Type'));
                        let fieldsToSend =  {
                                                name: userInstance.name,
                                                field: userInstance.field,
                                                email: userInstance.email,
                                                internalId: userInstance.internalId,
                                              }
                        if(isStudentLogin) fieldsToSend = this.appendStudentFields(fieldsToSend, { 
                                                                                                    hoursRemaining: userInstance.hoursRemaining, 
                                                                                                    deadline: userInstance.deadline, 
                                                                                                    status: userInstance.status 
                                                                                                }); 

                        res.status(200).json({ token: token, user: fieldsToSend});

                    } else {
                        throw errorCustomizer.createError(400, 'Wrong credentials.', errors);
                    }
                } else {
                    throw errorCustomizer.createError(400, 'Wrong credentials.', errors);
                }
                
            } else {
                throw errorCustomizer.createError(400, 'The following issues were found during login.', errors);
            }
        }

        appendStudentFields(baseFields, addedFields) {
            const fieldsToSend = {...baseFields, ...addedFields};
            return fieldsToSend;
        }

        generateAuthToken(user, type) {
            return jwt.sign(
                                {
                                    email: user.email,
                                    id: user.id,
                                    type: type
                                },
                                process.env.SECRET,
                                { expiresIn: '1h' }
                            );
        }

        async isEmailInUse(email, user){
            const count = await user.count({ where: { email: email }});
            return count > 0;
        }

        async isInternalIdInUse(id, user){
            const count = await user.count({ where: { internalId: id }});
            return count > 0;
        }

        isValidID(id){
            const isExpectedLength = id.length === 6;
            //ToDo: make sure the first char is a letter and not a comma, exclamation mark, etc...
            const isFirstCharAUpperCaseLetter = Number.isNaN(Number(id.charAt(0)));
            const isRestOfTheIdNaN = Number.isNaN(Number(id.substring(1)));
            console.log('Evaluation results ' + isExpectedLength + ' ' + isFirstCharAUpperCaseLetter + ' ' + !isRestOfTheIdNaN);
            return isExpectedLength && isFirstCharAUpperCaseLetter && !isRestOfTheIdNaN;
        }
  }

  export default AuthController;