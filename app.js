import express from 'express';
import bodyParser from 'body-parser';

import setRelations from './models/relations.js';
import SEQUELIZE_CONNECTION from './utils/database.js';
import router from './routes/router.js';
import authenticator from './middleware/auth.js';

const app = express();

app.use(bodyParser.json());
console.log(router);
app.use(authenticator.authenticateRequest);
app.use(router);


setRelations();

const dbConnectionResult = await SEQUELIZE_CONNECTION.sync();

app.listen(process.env.PORT, ()=>{
    console.log(`Listening to requests on port ${process.env.PORT}`);
});