"use strict";
import logger from "../utils/logger.js";
import creatureStore from "../models/creature-store.js";
import creature from "./creature.js";
import accounts from './accounts.js';
import userStore from "../models/user-store.js";

const stats = {
    createView(request, response) {
        const loggedInUser = accounts.getCurrentUser(request);
    
        if (loggedInUser) {
          logger.info("Stats page loading!");
    
          // app statistics calculations
          const creatures = creatureStore.getAllCreatures();
    
          let numCreatures = creatures.length;
    
          let numSongs = creatures.reduce((total, creature) => total + creature.songs.length, 0);
    
          let average = numCreatures > 0 ? (numSongs / numCreatures).toFixed(2) : 0;
    
          let totalRating = creatures.reduce((total, creature) => total + parseInt(creature.rating), 0);
    
          let avgRating = numCreatures > 0 ? totalRating / numCreatures : 0;
    
          let maxRating = creatures.length > 0 ? Math.max(...creatures.map(creature => creature.rating)) : 0;
          let maxRated = creatures.filter(creature => creature.rating === maxRating);
          let favTitles = maxRated.map(item => item.title);
    
          //for new purple plus icon
          let Longest = Math.max(...creatures.map(creature => creature.songs.length));
          let LongestCreatures = creatures.filter(creature => creature.songs.length === Longest);
          let longestTitles = LongestCreatures.map(item => item.title);

          //for users statistic
          const users = userStore.getAllUsers();
          let numUsers = users.length;

          const statistics = {
            displayNumCreatures: numCreatures,
            displayNumSongs: numSongs,
            displayAverage: average,
            displayAvgRating: avgRating.toFixed(2),
            highest: maxRating,
            displayFav: favTitles,
            //for new purple icon
            displayLongest: longestTitles,
            //for the users
            displayNumUsers: numUsers
          };
    
          const viewData = {
            title: "Creature App Statistics",
            stats: statistics,
            fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName
          };
    
          response.render("stats", viewData);
        }
        else response.redirect('/');
      },
    
};

export default stats;



