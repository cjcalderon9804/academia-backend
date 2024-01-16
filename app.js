const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const profesController = require('./controllers/profesController');
const materiasController = require('./controllers/materiasController');


const app = express();
const port = 3000;

// Habilitar CORS
app.use(cors());

// Inicio Profesores:

  // Conectar a la base de datos SQLite (creará un archivo llamado 'db_profes.db')
  const db_profes = new sqlite3.Database('db_profes.db');

  // Crear una tabla de ejemplo
  db_profes.serialize(() => {
    db_profes.run('CREATE TABLE IF NOT EXISTS profesores (id INTEGER PRIMARY KEY, nombre TEXT)');
  });

// Fin Profesores


// Inicio Materias:

  // Conectar a la base de datos SQLite (creará un archivo llamado 'db_profes.db')
  const db_materias = new sqlite3.Database('db_materias.db');

  // Crear una tabla de ejemplo
  db_materias.serialize(() => {
    db_materias.run('CREATE TABLE IF NOT EXISTS materias (id INTEGER PRIMARY KEY, nombre TEXT)');
  });

// Fin Materias


app.use('/profesores', profesController);
app.use('/materias', materiasController);

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});