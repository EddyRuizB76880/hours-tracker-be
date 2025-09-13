import Professor from "../models/Professor.js";
import Project from "../models/Project.js";
import BaseController from "./BaseController.js";

import constants from "../utils/consts.js";
import errorCustomizer from "../utils/errors.js";

class ProfessorController extends BaseController {
    constructor(){
        super(Professor);
    }

    async getProfessorWithRelatedProjects(req, res, next){
        // Eager load related projects
        const professor = await this.model.findByPk(req.params.id, { include: { model: Project } });
        
        if(professor){
            res.status(200).json(professor);
        } else{
            throw errorCustomizer.createError(404, constants.NOT_FOUND);
        }
    }

    async canCreate(req) {
        // must be created through signup.
        return false;
    }

    async canRead(project, req) {
       return true;
    }

    async canUpdate(professor, req) {
        if(professor.id === req.decodedToken.id){
            const allowedFields = ['name', 'field', 'email'];
            const changingFields = Object.keys(req.body);

            return utils.isValidChange(allowedFields, changingFields);
        }
    }

    async canDelete(professor, req) {
        return this.canUpdate(professor, req)
    }
}


export default ProfessorController;