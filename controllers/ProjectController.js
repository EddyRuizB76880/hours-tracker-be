import Objective from "../models/Objective.js";
import Professor from "../models/Professor.js";
import Project from "../models/Project.js";
import Student from "../models/Student.js";
import BaseController from "./BaseController.js";

class ProjectController extends BaseController {
    constructor(){
        super(Project);
    }

    async getProjectFullDetails(req, res, next){
        //Eager load related professor, students and objectives.
        const project = await this.getResourceWithAssociations(req.params.id, [ { model: Professor }, { model: Student }, { model: Objective } ] );

        if(project){
            res.status(200).json(JSON.stringify(project));
        } else {
            res.status(404).json({message: "Not Found"});
        }
    }
}

export default ProjectController;