// models/index.js
const { Sequelize } = require('sequelize');
const config = require('../config');

const sequelize = new Sequelize(config.database);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user.model')(sequelize, Sequelize);

module.exports = db;
