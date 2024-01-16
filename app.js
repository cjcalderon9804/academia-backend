const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const profesController = require('./controllers/profesController');
const materiasController = require('./controllers/materiasController');


const app = express();
const port = 3000;

// Crear una base de datos "db_academia.db"
const db_academia = new sqlite3.Database('db_academia.db');

// Habilitar CORS
app.use(cors());

// Inicio Profesores:

  // Crear una tabla vacía de profesores
  db_academia.serialize(() => {
    db_academia.run('CREATE TABLE IF NOT EXISTS profesores (id INTEGER PRIMARY KEY, nombre TEXT)');
  });

// Fin Profesores



// Inicio Materias:

  // Crear una tabla vacía de materias
  db_academia.serialize(() => {
    db_academia.run('CREATE TABLE IF NOT EXISTS materias (id INTEGER PRIMARY KEY, nombre TEXT)');
  });

// Fin Materias


app.use('/profesores', profesController);
app.use('/materias', materiasController);

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});