import StudentController from "./StudentController.js"

const index = (req, res, next) => {
    let controller = new StudentController();
    
    if(req.decodedToken.type === 'student'){
        controller.getStudentSummary(req, res, next);
    } else if(req.decodedToken.type === 'professor'){
        controller.getProfessorsStudentList(req, res, next);
    }

}

export default index;