'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Images', [
     {
       userId: 1,
       albumId: 1,
       imageUrl: 'https://res.cloudinary.com/depdd11lz/image/upload/v1636259258/Drivr-dual-subie_zpi8rk.jpg',
       content: 'Two WRB Subaru WRX STI\'s',
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
       userId: 1,
       albumId: 2,
       imageUrl: 'https://res.cloudinary.com/depdd11lz/image/upload/v1636259092/Drivr-teal-subie_vojhqn.jpg',
       content: 'Fall Subaru',
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
       userId: 1,
       imageUrl: 'https://res.cloudinary.com/depdd11lz/image/upload/v1636258425/Drivr-blue-blobeye_txg1x2.jpg',
       content: 'Blobeye',
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
       userId: 2,
       imageUrl: 'https://res.cloudinary.com/depdd11lz/image/upload/v1636565772/Drivr-snow-subie_d3pu22.jpg',
       content: 'Moody Subie',
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
       userId: 3,
       imageUrl: 'https://res.cloudinary.com/depdd11lz/image/upload/v1636565741/Drivr-98subie_e9vfc6.jpg',
       content: 'Offroading',
       createdAt: new Date(),
       updatedAt: new Date()
     }
   ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Images', null, {});
  }
};
