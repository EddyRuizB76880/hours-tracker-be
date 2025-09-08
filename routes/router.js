import express from 'express';

import ProfessorController from '../controllers/ProfessorController.js';
import StudentController from '../controllers/StudentController.js';
import ObjectiveController from '../controllers/ObjectiveController.js';
import ProjectController from '../controllers/ProjectController.js';
import TaskController from '../controllers/TaskController.js';

import inputValidator from '../middleware/validators.js';

const router = express.Router();

const professorController = new ProfessorController();
const studentController = new StudentController();
const projectController = new ProjectController();
const objectiveController = new ObjectiveController();
const taskController = new TaskController();

router.post('/professor', [ 
                            inputValidator.createEmailChain(), 
                            inputValidator.customIsEmailInUse(),
                            inputValidator.createPasswordChain(), 
                            inputValidator.customIsValidProfessorStudentId(),
                            inputValidator.createUserNameChain()
                          ],
            professorController.postAddResource.bind(professorController));
router.get('/professor/:id', professorController.getById.bind(professorController));
router.put('/professor/:id', professorController.updateById.bind(professorController));
router.delete('/professor/:id', professorController.deleteById.bind(professorController));
router.get('/professors', professorController.indexResources.bind(professorController));

router.post('/student', [ 
                            inputValidator.createEmailChain(),
                            inputValidator.customIsEmailInUse(),
                            inputValidator.createPasswordChain(), 
                            inputValidator.customIsValidProfessorStudentId(),
                            inputValidator.createUserNameChain()
                        ], 
            studentController.postAddResource.bind(studentController));
router.get('/student/:id', studentController.getById.bind(studentController));
router.put('/student/:id', studentController.updateById.bind(studentController));
router.delete('/student/:id', studentController.deleteById.bind(studentController));
router.get('/students', studentController.indexResources.bind(studentController));

router.post('/project', [ 
                            inputValidator.createProjectObjectiveTaskNameChain(), 
                            inputValidator.createProjectDescriptionChain() 
                        ],
            projectController.postAddResource.bind(projectController));
router.get('/project/:id', projectController.getById.bind(projectController));
router.put('/project/:id', projectController.updateById.bind(projectController));
router.delete('/project/:id', projectController.deleteById.bind(projectController));
router.get('/projects', projectController.indexResources.bind(projectController));

router.post('/objective', [
                            inputValidator.createProjectObjectiveTaskNameChain(),
                            inputValidator.createObjectiveDescriptionChain(),
                          ],
            objectiveController.postAddResource.bind(objectiveController));
router.get('/objective/:id', objectiveController.getById.bind(objectiveController));
router.put('/objective/:id', objectiveController.updateById.bind(objectiveController));
router.delete('/objective/:id', objectiveController.deleteById.bind(objectiveController));
router.get('/objectives', objectiveController.indexResources.bind(objectiveController));

router.post('/task', [ 
                        inputValidator.createTaskDescriptionChain(), 
                        inputValidator.createProjectObjectiveTaskNameChain() 
                     ],
            taskController.postAddResource.bind(taskController));
router.get('/task/:id', taskController.getById.bind(taskController));
router.put('/task/:id', taskController.updateById.bind(taskController));
router.delete('/task/:id', taskController.deleteById.bind(taskController));
router.get('/tasks', taskController.indexResources.bind(taskController));


export default router;