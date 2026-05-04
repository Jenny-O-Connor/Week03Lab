'use strict';

import logger from '../utils/logger.js';
import JsonStore from './json-store.js';

const ownerStore = {

  store: new JsonStore('./models/owner-store.json', { owner: {} }),
  collection: 'owner',


  getOwner() {
    return this.store.findAll(this.collection);
  },

};

export default ownerStore;
