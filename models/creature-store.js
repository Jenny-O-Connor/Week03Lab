'use strict';

import logger from '../utils/logger.js';
import JsonStore from './json-store.js';

const creatureStore = {

  store: new JsonStore('./models/creature-store.json', { creatureCollection: [] }),
  collection: 'creatureCollection',
  array: 'songs',

  getAllCreatures() {
    return this.store.findAll(this.collection);
  },

  getCreature(id) {
    return this.store.findOneBy(this.collection, (creature => creature.id === id));
},

  addSong(id, song) {
    this.store.addItem(this.collection, id, this.array, song);
},

    async addCreature(creature, file, response) {
    try {
      creature.picture = await this.store.addToCloudinary(file);
      this.store.addCollection(this.collection, creature);
      response();
    } catch (error) {
      logger.error("Error processing creature:", error);
      response(error);
    }
  },


  removeSong(id, songId) {
    this.store.removeItem(this.collection, id, this.array, songId);
},

    async removeCreature(id, response) {
    const creature = this.getCreature(id);

    if (creature.picture && creature.picture.public_id) {
      try {
        await this.store.deleteFromCloudinary(creature.picture.public_id);
        logger.info("Cloudinary image deleted");
      } catch (err) {
        logger.error("Failed to delete Cloudinary image:", err);
      }
    }

    this.store.removeCollection(this.collection, creature);
    response();
  },


editSong(id, songId, updatedSong) {
  this.store.editItem(this.collection, id, songId, this.array, updatedSong);
},

searchCreature(search) {
  return this.store.findBy(
    this.collection,
    (creature => creature.title.toLowerCase().includes(search.toLowerCase())))
},

getUserCreatures(userid) {
  return this.store.findBy(this.collection, (creature => creature.userid === userid));
},

searchUserCreatures(search, userid) {
  return this.store.findBy(
    this.collection,
    (creature => creature.userid === userid && creature.title.toLowerCase().includes(search.toLowerCase())))
}, 

};



export default creatureStore;
