import Student from "../models/Student.js";
import BaseController from "./BaseController.js";

class StudentController extends BaseController {
    constructor(){
        super(Student);
    }

    getStudentWithRelatedTasks(studentid){

    }
}

export default StudentController;
