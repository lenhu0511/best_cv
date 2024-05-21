const { Sequelize } = require('sequelize');

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('bestcv', 'team', 'Best123456', {
  host: 'bestmysql.mysql.database.azure.com',
  dialect: 'mysql',
  port: 3306,
  ssl: true,
  logging: false,
  dialectOptions: {
    ssl: {
       require: true,
       rejectUnauthorized: false
    }
  },
  define: {
    timestamps: false
}
});

let connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

module.exports = connectDB;