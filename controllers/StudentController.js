import Student from "../models/Student.js";
import Task from "../models/Task.js";
import BaseController from "./BaseController.js";

class StudentController extends BaseController {
    constructor(){
        super(Student);
    }

    async getStudentWithRelatedTasks(req, res, next){
        const student = await this.getResourceWithAssociations(req.body.userId, [ { model: Task } ] );

        if(student){
            res.status(200).json(JSON.stringify(student));
        } else {
            res.status(404).json({message: "Not Found"});
        }
    }
}

export default StudentController;
