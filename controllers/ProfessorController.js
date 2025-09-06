import Professor from "../models/Professor.js";
import BaseController from "./BaseController.js";

class ProfessorController extends BaseController {
    constructor(){
        super(Professor);
    }

    getProfessorWithRelatedProjects(professorId){
        // Eager load related projects
    }
}


export default ProfessorController;