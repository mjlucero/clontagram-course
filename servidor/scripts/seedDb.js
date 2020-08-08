require('dotenv').config();
const { Seeder } = require('mongo-seeding');
const path = require('path');

const config = {
  database: process.env.MONGODB_URI,
  dropDatabase: true
};

const seeder = new Seeder(config);

const collections = seeder.readCollectionsFromPath(
  path.resolve(__dirname, './data/')
);

(async function () {
  try {
    await seeder.import(collections);
    console.log('Data importada a la base de datos "clontagram" exitosamente');
  } catch (err) {
    console.log('Hubo un error llenando la base de datos:', err);
  }
})();

// Comandos para exportar modelos de la DB
// mongoexport --db clontagram --collection usuarios --out usuarios.json
// mongoexport --db clontagram --collection posts --out posts.json
