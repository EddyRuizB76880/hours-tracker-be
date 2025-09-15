import express from 'express';

import TaskController from '../controllers/TaskController.js';

import inputValidator from '../middleware/validators.js';

const router = express.Router();

const taskController = new TaskController();

router.post('/task', [ 
    inputValidator.createTaskDescriptionChain(), 
    inputValidator.createProjectObjectiveTaskNameChain(),
    inputValidator.createObjectiveIdChain()
],
taskController.createTask.bind(taskController));

router.patch('/task/:id', [ 
    inputValidator.createTaskDescriptionChain().optional(), 
    inputValidator.createProjectObjectiveTaskNameChain().optional() 
],
taskController.updateById.bind(taskController));

router.patch('/review/:id', [ 
    inputValidator.createTaskStatusChain(), 
    inputValidator.createTaskRejectionChain()
],
taskController.reviewTask.bind(taskController)
);

router.delete('/task/:id', taskController.deleteById.bind(taskController));

router.get('/task/:id', taskController.getTaskWithAssociationsById.bind(taskController));
router.get('/tasks', taskController.indexResources.bind(taskController));



export default router;