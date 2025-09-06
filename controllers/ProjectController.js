import Project from "../models/Project.js";
import BaseController from "./BaseController.js";

class ProjectController extends BaseController {
    constructor(){
        super(Project);
    }

    getProjectFullDetails(projId){
        //Eager load related professor, students and objectives.
    }
}

export default ProjectController;