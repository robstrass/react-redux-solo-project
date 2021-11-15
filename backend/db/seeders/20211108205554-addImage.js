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
       albumId: 1,
       imageUrl: 'https://res.cloudinary.com/depdd11lz/image/upload/v1636259092/Drivr-teal-subie_vojhqn.jpg',
       content: 'Fall Subaru',
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
       userId: 1,
       albumId: 1,
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
     },
     {
      userId: 1,
      albumId: 2,
      imageUrl: 'https://res.cloudinary.com/depdd11lz/image/upload/v1636952646/Drivr-gt3_ddxik8.jpg',
      content: 'GT 3',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      userId: 1,
      albumId: 2,
      imageUrl: 'https://res.cloudinary.com/depdd11lz/image/upload/v1636952645/Drivr-huracan_gwmnm8.jpg',
      content: 'Huracan',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      userId: 1,
      albumId: 2,
      imageUrl: 'https://res.cloudinary.com/depdd11lz/image/upload/v1636678657/Driver-audi-fall_s9ehvf.jpg',
      content: 'R8',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      userId: 3,
      imageUrl: 'https://res.cloudinary.com/depdd11lz/image/upload/v1636952666/Drivr-Rolly_ejfumo.jpg',
      content: 'Rolls Royce',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      userId: 3,
      imageUrl: 'https://res.cloudinary.com/depdd11lz/image/upload/v1636952646/Drivr-gt500_jvgizn.jpg',
      content: 'GT500',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      userId: 3,
      imageUrl: 'https://res.cloudinary.com/depdd11lz/image/upload/v1636703446/Drivr-dark-grey-audi_jgtj20.jpg',
      content: 'RS5',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      userId: 1,
      albumId: 2,
      imageUrl: 'https://res.cloudinary.com/depdd11lz/image/upload/v1636954228/Drivr-viper_i4neqp.jpg',
      content: 'Viper',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      userId: 1,
      imageUrl: 'https://res.cloudinary.com/depdd11lz/image/upload/v1636954228/Drivr-white-datsun_rrrvuk.jpg',
      content: 'White Datsun',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      userId: 1,
      imageUrl: 'https://res.cloudinary.com/depdd11lz/image/upload/v1636954205/Drivr-71-mach1-mustang_c3pnxn.jpg',
      content: '1971 Mach 1',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      userId: 1,
      imageUrl: 'https://res.cloudinary.com/depdd11lz/image/upload/v1636954219/Drivr-orange-datsun_z4qxq5.jpg',
      content: 'Aerial Datsun',
      createdAt: new Date(),
      updatedAt: new Date()
    },
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
