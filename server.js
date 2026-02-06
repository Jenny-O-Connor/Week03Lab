'use strict';

import logger from "./utils/logger.js";
import express from 'express';
import routes from './routes.js'; 

const app = express();
const port = 3000;

app.use("/", routes);

app.listen(port, () => logger.info(`Your app is listening on port ${port}!`));

