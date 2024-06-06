// // wrapper for 20240516070017-create-user.js
// const migration = async () => {
//   const module = await import('./update_foreign_keys.js');
//   return module;
// };

// module.exports = {
//   up: async (queryInterface, Sequelize) => migration().then(m => m.up(queryInterface, Sequelize)),
//   down: async (queryInterface, Sequelize) => migration().then(m => m.down(queryInterface, Sequelize))
// };
