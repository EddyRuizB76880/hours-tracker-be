import errorCustomizer from '../utils/errors.js';
import constants from '../utils/consts.js';
import { validationResult } from 'express-validator';

class BaseController {  

        constructor(model){
            this.model = model;
        }

    
        async getById (req, res, next) {
            console.log("Retrieveing model with id: " + JSON.stringify(req.query));

            const resource = await this.model.findByPk(req.params.id, { attributes: { exclude: constants.EXCLUDED_FIELDS} });
            const canRead = await this.canRead(resource, req);

            if(!canRead){
                throw errorCustomizer.createError(401, constants.UNAUTHORIZED);
            }

            res.status(200).json(resource);
        }
    
        async deleteById (req, res, next) {
            console.log("Deleting model with id: " + JSON.stringify(req.params));
            
            const resource = await this.model.findByPk(req.params.id);
            const canDelete = await this.canDelete(resource, req);

            if(!canDelete){
                throw errorCustomizer.createError(401, constants.UNAUTHORIZED);
            }

            resource.destroy();
    
            res.status(200).json({message: "Deleted"});
        }
    
        async updateById (req, res, next) {
            console.log("Updating model with id: " + JSON.stringify(req.params));
            
            const errors = validationResult(req).array();

            if(errors.length > 0) {
                throw errorCustomizer.createError(400, constants.BAD_REQUEST, errors);
            }

            const resource = await this.model.findByPk(req.params.id);
            const canUpdate = await this.canUpdate(resource, req);

            if(!canUpdate){
                throw errorCustomizer.createError(401, constants.UNAUTHORIZED);
            }

            resource.set({...req.body});
            await resource.save();

            await this.updatedAdditionalData(req, resource);
    
            res.status(200).json(resource);
        }
    
        async indexResources (req, res, next) {
            this.filterQuery(req);
            
            const resources = this.model.findAll({ where: req.query, attributes: { exclude: constants.EXCLUDED_FIELDS } });
            
            if(resources.length > 0){
                const canRead = this.canRead(resources[0]);

                if(!canRead){
                    throw errorCustomizer.createError(401, constants.UNAUTHORIZED )
                } 
                
                res.status(200).json(resources);   
                

            } else{ throw errorCustomizer.createError(404, constants.NOT_FOUND ); }  
        }

        async canCreate(resource, req) {
            return false;
        }

        async canRead(resource, req) {
            return false;
        }

       async canUpdate(resource, req) {
            return false;
        }

        async canDelete(resource, req) {
            return false;
        }

        async updatedAdditionalData(req, resource){}
        async filterQuery(req){}
  }

  export default BaseController;