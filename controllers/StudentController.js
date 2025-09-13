import Student from "../models/Student.js";
import Task from "../models/Task.js";
import Objective from "../models/Objective.js";
import Project from "../models/Project.js";

import BaseController from "./BaseController.js";

import utils from "../utils/utils.js";
import errorCustomizer from "../utils/errors.js";
import constants from "../utils/consts.js";

class StudentController extends BaseController {
    constructor(){
        super(Student);
    }

    async getStudentSummary(req, res, next){
        const id = req.params.id ?? req.decodedToken.id;
        let student = await this.model.findByPk(
                                        id,
                                        {  
                                            attributes: {exclude: consts.EXCLUDED_FIELDS}, 
                                            include: [ 
                                                        { 
                                                            model: Task, 
                                                            include: {
                                                                    model: Objective, 
                                                                    include: { 
                                                                        model: Project
                                                                    }
                                                            } 
                                                        } 
                                                    ],
                                            raw: true  
                                        } 
        );

        if(student){
            this.attachStudentMetrics(student);
            res.status(200).json(student);
        } else {
           throw errorCustomizer.createError(404, constants.NOT_FOUND);
           ;
        }
    }

    async getProfessorsStudentList(req, res, next) {
        const id = req.params.id ?? req.decodedToken.id;
        const students = await this.model.findAll({ where: {professorid: id } , attributes: { exclude: consts.EXCLUDED_FIELDS }, raw: true });
        
        for(let student of students){
            this.attachStudentMetrics(student);
        }
  
        return res.status(200).json(students);
    }

    attachStudentMetrics(student){
        const totalHoursRequired = 300;
        const approvedHours = totalHoursRequired - student.hoursRemaining;
        const today = new Date(Date.now());
    
        console.log(student);
        let elapsedDays = utils.getDifferenceInDays(student.beganOn, today);

        elapsedDays = elapsedDays > 0 ? elapsedDays : 1;

        const metrics = {
            avgDailiyProgress: utils.getAvgDailyProgress(elapsedDays, approvedHours),
            daysRemaining: utils.getDifferenceInDays(today, student.deadline),
            progress: utils.getProgressPercentage(totalHoursRequired, approvedHours)
        }

       Object.assign(student, metrics);

       return metrics;
    }

    async canCreate(req) {
        // must be created through signup.
        return false;
    }

    async canRead(student, req) {
       return true;
    }

    async canUpdate(student, req) {
        if(req.decodedToken.type === consts.STUDENT_TYPE && student.id === req.decodedToken.id){
            const allowedFields = ['name', 'field', 'email'];
            const changingFields = Object.keys(req.body);

            return utils.isValidChange(allowedFields, changingFields);
        }

        return false;
    }

    async canDelete(student, req) {
        return this.canUpdate(student, req)
    }
    
}

export default StudentController;