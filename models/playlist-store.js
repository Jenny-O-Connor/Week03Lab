'use strict';

import logger from '../utils/logger.js';
import JsonStore from './json-store.js';

const playlistStore = {

  store: new JsonStore('./models/playlist-store.json', { playlistCollection: [] }),
  collection: 'playlistCollection',
  array: 'songs',

  getAllPlaylists() {
    return this.store.findAll(this.collection);
  },

  getPlaylist(id) {
    return this.store.findOneBy(this.collection, (playlist => playlist.id === id));
},

  addSong(id, song) {
    this.store.addItem(this.collection, id, this.array, song);
},

    async addPlaylist(playlist, file, response) {
    try {
      playlist.picture = await this.store.addToCloudinary(file);
      this.store.addCollection(this.collection, playlist);
      response();
    } catch (error) {
      logger.error("Error processing playlist:", error);
      response(error);
    }
  },


  removeSong(id, songId) {
    this.store.removeItem(this.collection, id, this.array, songId);
},

    async removePlaylist(id, response) {
    const playlist = this.getPlaylist(id);

    if (playlist.picture && playlist.picture.public_id) {
      try {
        await this.store.deleteFromCloudinary(playlist.picture.public_id);
        logger.info("Cloudinary image deleted");
      } catch (err) {
        logger.error("Failed to delete Cloudinary image:", err);
      }
    }

    this.store.removeCollection(this.collection, playlist);
    response();
  },


editSong(id, songId, updatedSong) {
  this.store.editItem(this.collection, id, songId, this.array, updatedSong);
},

searchPlaylist(search) {
  return this.store.findBy(
    this.collection,
    (playlist => playlist.title.toLowerCase().includes(search.toLowerCase())))
},

getUserPlaylists(userid) {
  return this.store.findBy(this.collection, (playlist => playlist.userid === userid));
},

searchUserPlaylists(search, userid) {
  return this.store.findBy(
    this.collection,
    (playlist => playlist.userid === userid && playlist.title.toLowerCase().includes(search.toLowerCase())))
}, 

};



export default playlistStore;
