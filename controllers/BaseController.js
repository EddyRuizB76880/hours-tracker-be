class BaseController{  

        constructor(model){
            this.model = model;
        }

        async postAddResource  (req, res, next) {
            console.log("Adding model with this data: " + JSON.stringify(req.body));
     
            const result = await this.model.create({...req.body});
    
            res.status(200).json({message: 'Created resource'});
        }
    
        async getById (req, res, next) {
            console.log("Retrieveing model with id: " + JSON.stringify(req.params));

            const resource = await this.model.findByPk(req.params.id);
            
            res.status(200).json(JSON.stringify(resource));
        }
    
        async deleteById (req, res, next) {
            console.log("Deleting model with id: " + JSON.stringify(req.params));
     
            const resource = await this.model.findByPk(req.params.id);
    
            resource.destroy();
    
            res.status(200).json(JSON.stringify({message: "Deleted"}));;
        }
    
        async updateById (req, res, next) {
            console.log("Updating model with id: " + JSON.stringify(req.params));
     
            const resource = await this.model.findByPk(req.params.id);
    
            resource.set({...req.body});
            resource.save();
    
            res.status(200).json(JSON.stringify(model));
        }
    
        async indexResources (req, res, next) {
            const resources = await this.model.findAll();
            res.status(200).json(JSON.stringify(resources));   
        }
  }

  export default BaseController;