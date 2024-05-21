'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
     return queryInterface.bulkInsert('People', [{
        username: 'John Doe',
        password: '123456',
        email: 'lenhu0460@gmail.com',
        device_id: '1232343423',
        full_name: 'Le Nhu',
        phone_number: '05435435543',
        status: 'active',
        create_data: new Date(),
        update_date: new Date(),
        role_id: '1',

     }], {});

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
