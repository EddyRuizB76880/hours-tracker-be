import express from 'express';

import ProjectController from '../controllers/ProjectController.js';

import inputValidator from '../middleware/validators.js';

const router = express.Router();

const projectController = new ProjectController();

router.post('/project', [ 
    inputValidator.createProjectObjectiveTaskNameChain(), 
    inputValidator.createProjectDescriptionChain() 
  ],
projectController.createProject.bind(projectController));

router.patch('/project/:id', [ 
    inputValidator.createProjectObjectiveTaskNameChain().optional(), 
    inputValidator.createProjectDescriptionChain().optional() 
], 
projectController.updateById.bind(projectController));

router.delete('/project/:id', projectController.deleteById.bind(projectController));

router.get('professor/:id/projects', projectController.getProfessorProjects.bind(projectController));
router.get('/project/:id', projectController.getProjectFullDetails.bind(projectController));
router.get('/projects', projectController.indexResources.bind(projectController));

export default router;