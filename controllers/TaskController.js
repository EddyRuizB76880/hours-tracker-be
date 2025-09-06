import Task from "../models/Task.js";
import BaseController from "./BaseController.js";

class TaskController extends BaseController {
    constructor(){
        super(Task);
    }

    getTaskById(taskId){
        //Eager load related objective and student
    }
}


export default TaskController;