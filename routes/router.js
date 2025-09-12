import express from 'express';

import ProfessorController from '../controllers/ProfessorController.js';
import StudentController from '../controllers/StudentController.js';
import ProjectController from '../controllers/ProjectController.js';
import TaskController from '../controllers/TaskController.js';
import AuthController from '../controllers/AuthController.js';
import index from '../controllers/index.js';

import inputValidator from '../middleware/validators.js';


const router = express.Router();

const professorController = new ProfessorController();
const studentController = new StudentController();
const projectController = new ProjectController();
const taskController = new TaskController();
const authController = new AuthController();

router.get('/', index)

router.get('/professor/:id', professorController.getProfessorWithRelatedProjects.bind(professorController));
router.put('/professor/:id', professorController.updateById.bind(professorController));
router.delete('/professor/:id', professorController.deleteById.bind(professorController));
router.get('/professors', professorController.indexResources.bind(professorController));

router.get('/student/:id', studentController.getById.bind(studentController));
router.put('/student/:id', studentController.updateById.bind(studentController));
router.delete('/student/:id', studentController.deleteById.bind(studentController));
router.get('/students', studentController.indexResources.bind(studentController));

router.post('/project', [ 
  inputValidator.createProjectObjectiveTaskNameChain(), 
  inputValidator.createProjectDescriptionChain() 
],
projectController.createProject.bind(projectController));

router.get('professor/:id/projects', projectController.getProfessorProjects.bind(professorController));

router.get('/project/:id', projectController.getProjectFullDetails.bind(projectController));
router.put('/project/:id', projectController.updateById.bind(projectController));
router.delete('/project/:id', projectController.deleteById.bind(projectController));
router.get('/projects', projectController.indexResources.bind(projectController));


router.post('/task', [ 
  inputValidator.createTaskDescriptionChain(), 
  inputValidator.createProjectObjectiveTaskNameChain() 
],
taskController.createTask.bind(taskController));

router.get('/task/:id', taskController.getTaskWithAssociationsById.bind(taskController));
router.put('/task/:id', taskController.updateById.bind(taskController));
router.delete('/task/:id', taskController.deleteById.bind(taskController));
router.get('/tasks', taskController.indexResources.bind(taskController));

router.patch('/review', [ 
  inputValidator.createTaskStatusChain(), 
  inputValidator.createTaskRejectionChain() ],
taskController.reviewTask.bind(taskController));

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