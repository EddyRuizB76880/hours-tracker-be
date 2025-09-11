import Objective from "../models/Objective.js";
import Professor from "../models/Professor.js";
import Project from "../models/Project.js";
import Student from "../models/Student.js";
import Task from "../models/Task.js";

import constants from "../utils/consts.js";
import errorCustomizer from "../utils/errors.js";
import utils from "../utils/utils.js";

import BaseController from "./BaseController.js";

class TaskController extends BaseController {
    constructor(){
        super(Task);
    }

    async getTaskWithAssociationsById(req, res, next){
        //Eager load related objective and student
        const task = await this.findByPk(req.params.id, { 
                                                            include: [ 
                                                                        { model: Student }, 
                                                                        {  
                                                                            model: Objective, 
                                                                            include: { model: Project }
                                                                        }
                                                                    ] 
                                                        }
                                        );
        
        if(task) {
            if(!this.canRead(task)){
                throw errorCustomizer.createError(401, constants.UNAUTHORIZED);
            };

            res.status(200).json(JSON.stringify(task));
        } else {
            throw errorCustomizer.createError(404, constants.NOT_FOUND);
        }
    }

    async createTask(req, res, next) {
        if(this.canCreate()){
            const student = await this.model.findByPk(req.decodedToken.id);
            if(student){
                await student.createTask({ ...req.body });
                res.status(200).json({  "message": "Task created!" });
            } else {
                throw errorCustomizer(400, constants.BAD_REQUEST);
            }
        } else {
            throw errorCustomizer(401, constants.UNAUTHORIZED);
        }
    }

    async reviewTask(req, res, next){
        const task = await this.model.findByPk(req.body.taskId,{ include: [ { model: Student } ] } );

        if(task){
            const newStatus = Number(req.body.status);
            const statusUpdated = task.status !== newStatus;
            const canReview = await this.canReview(task, req);
            
            if(canReview){

                if(statusUpdated && newStatus === constants.TASK_ACCEPTED) {
                    task.student.hoursRemaining -= task.hoursSpent;
                    task.student.save();
                }

                if(statusUpdated && task.status === constants.TASK_ACCEPTED && newStatus === constants.TASK_DENIED) {
                    task.student.hoursRemaining += task.hoursSpent;
                    task.student.save();
                }

                task.status = newStatus;
                if(req.body.rejectionReason) task.rejectionReason = req.body.rejectionReason;

                task.save();

                res.status(200).json({message: 'Review submitted.'});
            } else {
                throw errorCustomizer.createError(401, constants.UNAUTHORIZED);
            }
        } else 
        {
            throw errorCustomizer.createError(404, constants.NOT_FOUND);
        };
    }

    canCreate(req) {
        if(req.decodedToken.type === constants.STUDENT_TYPE){
            const allowedFields = ['name', 'description', 'hoursSpent'];
            const incomingFields = Object.keys(req.body);

            return utils.isValidChange(allowedFields, incomingFields);
        }

        return false;
    }

    async canRead(task, req) {
        if(decodedToken.type === constants.STUDENT_TYPE){
            return req.decodedToken.id === task.studentId;
        }

        if(req.decodedToken.type === constants.PROFESSOR_TYPE){
            const student = await this.model.findByPk(decodedToken.id, { include: [{ model: Professor }] })
            return req.decodedToken.id === student.professor.id;
        }

        return false;
    }

    async canUpdate(task, req) {
        if( task.status !== constants.TASK_ACCEPTED && req.decodedToken.type === constants.STUDENT_TYPE && req.decodedToken.id === task.studentId ){
            const allowedFields = ['name', 'description', 'hoursSpent'];
            const changingFields = Object.keys(req.body);

            return req.decodedToken.id === task.studentId && utils.isValidChange(allowedFields, changingFields);
        }

        return false;
    }

    async canReview(task, req) {
        if(req.decodedToken.type === constants.PROFESSOR_TYPE){
            // Professors can only update the status of the task and the content of rejectionReason (if any).
            const allowedFields = ['status', 'rejectionReason'];
            const changingFields = Object.keys(req.body);
            
            task.student = await task.getStudent();

            return req.decodedToken.id === task.student.professorId && utils.isValidChange(allowedFields, changingFields);
        }

        return false;
    }

    async canDelete(task) {
        return req.decodedToken.type === constants.STUDENT_TYPE && decodedToken.id === task.studentId;
    }

    async filterQuery(req) {
        req.query.studentId = req.decodedToken.id;
    }
}

export default TaskController;