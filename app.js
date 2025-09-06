import express from 'express';
import bodyParser from 'body-parser';

import setRelations from './models/relations.js';
import SEQUELIZE_CONNECTION from './utils/database.js';
import router from './routes/router.js';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
console.log(router);
app.use(router);

setRelations();

const dbConnectionResult = await SEQUELIZE_CONNECTION.sync();

app.listen(PORT, ()=>{
    console.log(`Listening to requests on port ${PORT}`);
});