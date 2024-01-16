const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const profesController = require('./controllers/profesController');
const materiasController = require('./controllers/materiasController');
const aulasController = require('./controllers/aulasController');


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



// Inicio Aulas:

// Crear una tabla vacía de aulas
db_academia.serialize(() => {
  db_academia.run(`
    CREATE TABLE IF NOT EXISTS aulas (
      aula_id INTEGER PRIMARY KEY,
      fecha TEXT,
      hora TEXT,
      tema TEXT,
      profesor_id INTEGER,
      materia_id INTEGER,
      FOREIGN KEY (profesor_id) REFERENCES profesores(id),
      FOREIGN KEY (materia_id) REFERENCES materias(id)
    )
  `);
});

// Fin Aulas


app.use('/profesores', profesController);
app.use('/materias', materiasController);
app.use('/aulas', aulasController);


app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});