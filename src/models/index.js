import { fileURLToPath, pathToFileURL } from 'url';
import path from 'path';
import dotenv from 'dotenv';
import Sequelize, { DataTypes } from 'sequelize';
import accountModel from './account.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const env = process.env.NODE_ENV || 'development';

// Load configuration synchronously, ensure config file can be read directly
const configPath = path.join(__dirname, '../config/config.json');
const configFileUrl = pathToFileURL(configPath).href;
const config = (await import(configFileUrl, { assert: { type: 'json' } })).default[env];

// Initialize Sequelize
const sequelize = new Sequelize(
    config.database, config.username, config.password, config
);

// DB object to hold all models
const db = {};

// Load models
db.Account = accountModel(sequelize, DataTypes);
// db.Role = roleModel(sequelize, DataTypes);

// Setup associations
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Authenticate and log success
sequelize.authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch(error => {
        console.error('Unable to connect to the database:', error);
        throw error; // Exit application on database connection failure
    });

export default db;
