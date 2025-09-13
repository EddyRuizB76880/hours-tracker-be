import jwt from 'jsonwebtoken';

import errorCustomizer from '../utils/errors.js';
import constants from '../utils/consts.js';

const authenticator = {
    authenticateRequest: (req, res, next) => {
            const publicRoutes = ['/login']
            const authHeader = req.get('Authorization');
            if(! publicRoutes.includes(req.path)){
                if (!authHeader) {
                    throw errorCustomizer.createError(403, constants.FORBIDDEN);
                }
                    const token = authHeader.split(' ')[1];
                    let decodedToken;
                    try {
                        decodedToken = jwt.verify(token, process.env.SECRET);
                    } catch (err) {
                        throw errorCustomizer.createError(500, 'Internal error')
                    }

                if (!decodedToken) {
                    throw errorCustomizer.createError(403, constants.FORBIDDEN);
                }
             
                req.decodedToken = decodedToken;
        }
        next();
      }
}

export default authenticator;
