import Objective from "./Objective.js"; 
import Project from "./Project.js";
import Professor from "./Professor.js";
import Student from "./Student.js";
import Task from "./Task.js";

const setRelations = () => {
    Student.belongsTo(Professor);
    Student.hasMany(Task);
    Student.belongsToMany(Project, { through: 'studentProjectMappings' });
    
    Professor.hasMany(Student);
    Professor.hasMany(Project)

    Project.belongsTo(Professor);
    Project.hasMany(Objective);
    Project.belongsToMany(Student, { through: 'studentProjectMappings' });

    Objective.belongsTo(Project);
    Objective.hasMany(Task);

    Task.belongsTo(Student);
    Task.belongsTo(Objective);
}

export default setRelations;