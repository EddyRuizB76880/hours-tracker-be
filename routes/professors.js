import express from 'express';

import ProfessorController from '../controllers/ProfessorController.js';

import inputValidator from '../middleware/validators.js';


const router = express.Router();

const professorController = new ProfessorController();

// Adding optional() makes the validation only apply when the field is indeed present.
router.patch('/professor/:id', [ 
  inputValidator.createEmailChain().optional(), 
  inputValidator.createUserNameChain().optional(),
  inputValidator.createFieldChain().optional(),
],
professorController.updateById.bind(professorController));

router.delete('/professor/:id', professorController.deleteById.bind(professorController));

router.get('/professor/:id', professorController.getProfessorWithRelatedProjects.bind(professorController));
router.get('/professors', professorController.indexResources.bind(professorController));

export default router;