// database.js
const db = require('./models');

db.sequelize.sync({ force: true }).then(() => {
  console.log('Base de datos sincronizada.');
});
