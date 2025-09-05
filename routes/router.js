import express from 'express';
import ProfessorController from '../controllers/ProfessorController.js';

const router = express.Router();
router.post('/professor', ProfessorController.postAddProfessor);
router.get('/professor/:id', ProfessorController.getProfessor);
router.put('/professor/:id', ProfessorController.updateProfessor);
router.delete('/professor/:id', ProfessorController.deleteProfessor);

export default router;