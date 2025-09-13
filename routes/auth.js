import express from 'express';

import AuthController from '../controllers/AuthController.js';

import inputValidator from '../middleware/validators.js';

const authController = new AuthController();

const router = express.Router();

router.post('/signup', [ 
    inputValidator.createEmailChain(), 
    inputValidator.createPasswordChain(), 
    inputValidator.createUserNameChain(),
    inputValidator.createUserTypeChain(),
    inputValidator.createUserIdChain()
  ],
  authController.signup.bind(authController));
  
  router.post('/resetPassword', [  
    inputValidator.createPasswordChain(),
    inputValidator.createNewPasswordChain(),
  ],
  authController.setNewPassword.bind(authController));
  
  router.post('/login', [ 
    inputValidator.createEmailChain(), 
    inputValidator.createPasswordChain(),
    inputValidator.createUserTypeChain()
  ],
  authController.login.bind(authController));

  export default router;