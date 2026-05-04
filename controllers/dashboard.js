'use strict';

import logger from "../utils/logger.js";
import creatureStore from "../models/creature-store.js";
import { v4 as uuidv4 } from 'uuid';
import accounts from './accounts.js';


const dashboard = {
  createView(request, response) {
    logger.info("Dashboard page loading!");

    const loggedInUser = accounts.getCurrentUser(request);

    if (loggedInUser) {
      const searchTerm = request.query.searchTerm || "";

      const creatures = searchTerm
        ? creatureStore.searchUserCreatures(searchTerm, loggedInUser.id)
        : creatureStore.getUserCreatures(loggedInUser.id);

      const sortField = request.query.sort;
      const order = request.query.order === "desc" ? -1 : 1;

      let sorted = creatures;

      if (sortField) {
        sorted = creatures.slice().sort((a, b) => {
          if (sortField === "title") {
            return a.title.localeCompare(b.title) * order;
          }

          if (sortField === "rating") {
            return (a.rating - b.rating) * order;
          }

          return 0;
        });
      }

      const viewData = {
        title: "Creature App Dashboard",
        fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
        creatures: sortField ? sorted : creatures,
        search: searchTerm,
        titleSelected: request.query.sort === "title",
        ratingSelected: request.query.sort === "rating",
        ascSelected: request.query.order === "asc",
        descSelected: request.query.order === "desc",
      };
      
      logger.info('about to render' + viewData.creatures);
      
      response.render('dashboard', viewData);
    }
    else response.redirect('/');

  },


   addCreature(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const timestamp = new Date();
	
    const newCreature = {
      id: uuidv4(),
      userid: loggedInUser.id,
      title: request.body.title,
      rating: parseInt(request.body.rating),
      songs: [],
      date: timestamp
    };

    creatureStore.addCreature(newCreature, request.files.picture, function() {
        response.redirect("/dashboard");
    });
  },


    deleteCreature(request, response) {
    const creatureId = request.params.id;
    logger.debug(`Deleting Creature ${creatureId}`);
    creatureStore.removeCreature(creatureId, function() {
      response.redirect("/dashboard");
    });
  },

};

export default dashboard;

