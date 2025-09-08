import Objective from "../models/Objective.js";
import Project from "../models/Project.js";
import Student from "../models/Student.js";
import Task from "../models/Task.js";
import BaseController from "./BaseController.js";

class TaskController extends BaseController {
    constructor(){
        super(Task);
    }

    async getTaskWithAssociationsById(req, res, next){
        //Eager load related objective and student
        const task = await this.getResourceWithAssociations(req.params.id,  [ { model: Student }, 
                                                                                     {  
                                                                                        model: Objective, 
                                                                                        include: { model: Project }
                                                                                     }
                                                                                   ] 
                                                            );
        
        if(task) {
            res.status(200).json(JSON.stringify(task));
        } else {
            res.status(404).json({message: "Not Found"});
        }
    }
}


export default TaskController;