import Professor from "../models/Professor.js";
import Project from "../models/Project.js";
import BaseController from "./BaseController.js";

class ProfessorController extends BaseController {
    constructor(){
        super(Professor);
    }

    async getProfessorWithRelatedProjects(req, res, next){
        // Eager load related projects
        const professor = await this.getResourceWithAssociations(req.params.id, [{ model: Project }]);
        
        if(professor){
            res.status(200).json(JSON.stringify(professor));
        } else{
            res.status(404).json({message: "Not Found"});
        }
    }
}


export default ProfessorController;