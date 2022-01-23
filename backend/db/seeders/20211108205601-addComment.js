'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Comments', [
     {
      userId: 2,
      imageId: 1,
      comment: 'Nice shot!',
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
       userId: 3,
       imageId: 1,
       comment: 'Amazing!',
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
       userId: 2,
       imageId: 2,
       comment: 'Great picture',
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
       userId: 3,
       imageId: 3,
       comment: 'Best looking subie generation!',
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
       userId: 1,
       imageId: 1,
       comment: 'Thanks everyone, you\'re all so nice!',
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
   return queryInterface.bulkDelete('Comments', null, {});
  }
};
