import jwt from 'jsonwebtoken';

import errorCustomizer from '../utils/errors.js';

const authenticator = {
    authenticateRequest: (req, res, next) => {
            const publicRoutes = ['/login', '/signup']
            const authHeader = req.get('Authorization');
            if(! publicRoutes.includes(req.path)){
                if (!authHeader) {
                    throw errorCustomizer.createError(401, 'Not authenticated');
                }
                    const token = authHeader.split(' ')[1];
                    let decodedToken;
                    try {
                        decodedToken = jwt.verify(token, process.env.SECRET);
                    } catch (err) {
                        throw errorCustomizer(500, 'Internal Error')
                    }

                if (!decodedToken) {
                    throw errorCustomizer.createError(401, 'Not authenticated.');
                }

                req.decodedToken = decodedToken;
        }
        next();
      }
}

export default authenticator;
