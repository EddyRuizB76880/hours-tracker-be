import express from 'express';

import StudentController from '../controllers/StudentController.js';

import inputValidator from '../middleware/validators.js';

const router = express.Router();

const studentController = new StudentController();

router.patch('/student/:id',[ 
    inputValidator.createEmailChain().optional(), 
    inputValidator.createUserNameChain().optional(),
    inputValidator.createFieldChain().optional(),
  ], 
studentController.updateById.bind(studentController));

router.delete('/student/:id', studentController.deleteById.bind(studentController));

router.get('/student/:id', studentController.getById.bind(studentController));
router.get('/students', studentController.indexResources.bind(studentController));

export default router;