'use strict';

import logger from '../utils/logger.js';
import creatureStore from '../models/creature-store.js';
import { v4 as uuidv4 } from 'uuid';
import accounts from './accounts.js';


const creature = {
  createView(request, response) {
    const creatureId = request.params.id;
    const loggedInUser = accounts.getCurrentUser(request);
    logger.debug('Creature id = ' + creatureId);
    
    const viewData = {
      title: 'Creature',
      singleCreature: creatureStore.getCreature(creatureId),
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
    };

    response.render('creature', viewData);
},

  addSong(request, response) {
    const creatureId = request.params.id;
    const creature = creatureStore.getCreature(creatureId);
    const newSong = {
      id: uuidv4(),
      title: request.body.title,
      artist: request.body.artist,
    };
    creatureStore.addSong(creatureId, newSong);
    response.redirect('/creature/' + creatureId);
  },

  deleteSong(request, response) {
    const creatureId = request.params.id;
    const songId = request.params.songid;
    logger.debug(`Deleting Song  ${songId} from Creature ${creatureId}`);
    creatureStore.removeSong(creatureId, songId);
    response.redirect('/creature/' + creatureId);
},

updateSong(request, response) {
  const creatureId = request.params.id;
  const songId = request.params.songid;
  logger.debug("updating song " + songId);
  const updatedSong = {
    id: songId,
    title: request.body.title,
    artist: request.body.artist
  };
  creatureStore.editSong(creatureId, songId, updatedSong);
  response.redirect('/creature/' + creatureId);
}

};

export default creature;




