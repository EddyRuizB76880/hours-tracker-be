import Professor from "../models/Professor.js";

const ProfessorController = {
    postAddProfessor: async (req, res, next) => {
        console.log("Adding Professor with this data: " + JSON.stringify(req.body));
 
        const result = await Professor.create({...req.body});

        res.status(200).json({message: 'Hello for Postman'});
    },

    getProfessor: async (req, res, next) => {
        console.log("Retrieveing Professor with id: " + JSON.stringify(req.params));
 
        const professor = await Professor.findByPk(req.params.id);

        res.status(200).json(JSON.stringify(result));
    },

    deleteProfessor: async (req, res, next) => {
        console.log("Deleting Professor with id: " + JSON.stringify(req.params));
 
        const professor = await Professor.findByPk(req.params.id);

        professor.destroy();

        res.status(200).json(JSON.stringify({message: "Deleted"}));;
    },

    updateProfessor: async (req, res, next) => {
        console.log("Updating Professor with id: " + JSON.stringify(req.params));
 
        const professor = await Professor.findByPk(req.params.id);

        professor.set({...req.body});
        professor.save();

        res.status(200).json(JSON.stringify(professor));
    },
};


export default ProfessorController;