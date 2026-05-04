'use strict';
import logger from "../utils/logger.js";
import ownerStore from "../models/owner-store.js";
import accounts from './accounts.js';

const about = {
  createView(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    logger.info("About page loading!");
    
    if (loggedInUser) {
      const viewData = {
        title: 'About the Sea Creature App',
        fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
        owner: ownerStore.getOwner(),
      };
      response.render('about', viewData);
    }
    else response.redirect('/');    
},


};

export default about;

