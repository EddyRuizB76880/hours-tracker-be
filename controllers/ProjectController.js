import Objective from "../models/Objective.js";
import Professor from "../models/Professor.js";
import Project from "../models/Project.js";
import Student from "../models/Student.js";

import constants from "../utils/consts.js";
import errorCustomizer from "../utils/errors.js";

import BaseController from "./BaseController.js";

class ProjectController extends BaseController {
    constructor(){
        super(Project);
    }

    async createProject(req, res, next) {
        if(this.canCreate(req)){
            console.log(req);
            const professor = await Professor.findByPk(req.decodedToken.id);
            if(professor){
                const project = await professor.createProject({ ...req.body });
                await this.saveObjectives(req, project);
                res.status(200).json({ message: "Project created!"});
            } else {
                throw errorCustomizer(404, constants.NOT_FOUND);
            }
        }else{ throw errorCustomizer.createError(401, constants.UNAUTHORIZED) };
    }

    async saveObjectives(req, project){
        // create objectives from request
        try{
            const objectives = JSON.parse(req.body.objectives);
            for(const objective of objectives){
                project.createObjective({ ...objective });
            }

            await project.save();
        } catch(e){
            project.destroy();
            throw errorCustomizer.createError(500, "Project creation failed.");

        }
    }

    async getProjectFullDetails(req, res, next){
        //Eager load related professor, students and objectives.
        const project = await this.model.findByPk( req.params.id, {include:[ { model: Professor }, { model: Student }, { model: Objective } ]});

        if(project){
            res.status(200).json(project);
        } else {
            throw errorCustomizer.createError(404, constants.NOT_FOUND);
        }
    }
    

    async getProfessorProjects(req, res, next){
        const projects = await this.model.findAll({ where: { professorId: req.params.id }, attributes: { exclude: constants.EXCLUDED_FIELDS }, include: { model: Objective } });
        res.status(200).json(projects);
    }

    async assignStudent(req, res, next){
        // validate that the project belongs to the professor who is 

    }

    canCreate(req) {
        return req.decodedToken.type === constants.PROFESSOR_TYPE;
    }

    canRead(project, req) {
       return true;
    }

    canUpdate(project, req) {
        return this.canCreate(req) && project.professorId === req.decodedToken.id;
    }

    canDelete(project, req) {
        return this.canUpdate(project, req);
    }

    async updatedAdditionalData(project, req){
        //update objectives
    }
}

export default ProjectController;