'use strict';

import express from 'express';
const router = express.Router();
import logger from "./utils/logger.js";
import stats from './controllers/stats.js';
import accounts from './controllers/accounts.js';


import start from './controllers/start.js';
import dashboard from './controllers/dashboard.js';
import about from './controllers/about.js';
import creature from './controllers/creature.js';

router.get('/start', start.createView);
router.get('/dashboard', dashboard.createView);
router.get('/about', about.createView);
router.get('/creature/:id', creature.createView);
router.get('/creature/:id/deletesong/:songid', creature.deleteSong);
router.get('/dashboard/deletecreature/:id', dashboard.deleteCreature);
router.get('/stats', stats.createView);
router.get('/searchCategory', dashboard.createView);
router.get('/sortData', dashboard.createView);
router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);


router.post('/creature/:id/addsong', creature.addSong);
router.post('/dashboard/addcreature', dashboard.addCreature);
router.post('/creature/:id/updatesong/:songid', creature.updateSong);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);


router.get('/error', (request, response) => response.status(404).end('Page not found.'));

export default router;
