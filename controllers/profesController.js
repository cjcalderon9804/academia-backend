// profesController.js

const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

const router = express.Router();
const db_academia = new sqlite3.Database('db_academia.db');

router.use(bodyParser.json());  // Middleware para procesar el cuerpo de la solicitud en formato JSON

// Configurar una ruta para obtener datos de la base de datos
router.get('/', (req, res) => {
  db_academia.all('SELECT * FROM profesores', (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Error en el servidor');
    } else {
      res.json(rows);
    }
  });
});

// Configurar una ruta para agregar un nuevo profesor a la base de datos
router.post('/', (req, res) => {
  const { nombre } = req.body;

  if (!nombre) {
    return res.status(400).json({ error: 'El nombre del profesor es obligatorio' });
  }

  const insert = db_academia.prepare('INSERT INTO profesores (nombre) VALUES (?)');
  insert.run(nombre, (err) => {
    if (err) {
      // Verificar si el error es debido a una violación de unicidad
      if (err.message.includes('UNIQUE constraint failed: profesores.nombre')) {
        return res.status(400).json({ error: 'Ya existe un profesor con ese nombre' });
      } else {
        console.error(err.message);
        return res.status(500).send('Error en el servidor');
      }
    }

    insert.finalize();
    res.json({ message: 'Profesor agregado correctamente' });
  });
});

module.exports = router;
