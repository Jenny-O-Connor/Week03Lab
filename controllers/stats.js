"use strict";
import logger from "../utils/logger.js";
import playlistStore from "../models/playlist-store.js";
import playlist from "./playlist.js";
import accounts from './accounts.js';

const stats = {
    createView(request, response) {
        const loggedInUser = accounts.getCurrentUser(request);
    
        if (loggedInUser) {
          logger.info("Stats page loading!");
    
          // app statistics calculations
          const playlists = playlistStore.getAllPlaylists();
    
          let numPlaylists = playlists.length;
    
          let numSongs = playlists.reduce((total, playlist) => total + playlist.songs.length, 0);
    
          let average = numPlaylists > 0 ? (numSongs / numPlaylists).toFixed(2) : 0;
    
          let totalRating = playlists.reduce((total, playlist) => total + parseInt(playlist.rating), 0);
    
          let avgRating = numPlaylists > 0 ? totalRating / numPlaylists : 0;
    
          let maxRating = playlists.length > 0 ? Math.max(...playlists.map(playlist => playlist.rating)) : 0;
          let maxRated = playlists.filter(playlist => playlist.rating === maxRating);
          let favTitles = maxRated.map(item => item.title);
    
          //for new purple plus icon
          let Longest = Math.max(...playlists.map(playlist => playlist.songs.length));
          let LongestPlaylists = playlists.filter(playlist => playlist.songs.length === Longest);
          let longestTitles = LongestPlaylists.map(item => item.title);


          const statistics = {
            displayNumPlaylists: numPlaylists,
            displayNumSongs: numSongs,
            displayAverage: average,
            displayAvgRating: avgRating.toFixed(2),
            highest: maxRating,
            displayFav: favTitles,
            //for new purple icon
            displayLongest: longestTitles,
          };
    
          const viewData = {
            title: "Playlist App Statistics",
            stats: statistics,
            fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName
          };
    
          response.render("stats", viewData);
        }
        else response.redirect('/');
      },
    
};

export default stats;



