// aulasController.js

const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const moment = require('moment');

const router = express.Router();
const db_academia = new sqlite3.Database('db_academia.db');

router.use(bodyParser.json());  // Middleware para procesar el cuerpo de la solicitud en formato JSON

// Función para validar fecha y hora
function isValidDateTime(dateString, timeString) {
  const dateTimeString = `${dateString} ${timeString}`;
  const isValidFormat = moment(dateTimeString, 'YYYY-MM-DD HH:mm', true).isValid();

  if (!isValidFormat) {
    return false;
  }

  // Validar la hora específicamente
  const hour = moment(dateTimeString, 'YYYY-MM-DD HH:mm', true).hour();
  const minute = moment(dateTimeString, 'YYYY-MM-DD HH:mm', true).minute();

  return hour >= 0 && hour <= 23 && minute >= 0 && minute <= 59;
}

// Configurar una ruta para obtener datos de la base de datos
router.get('/', (req, res) => {
  db_academia.all('SELECT * FROM aulas', (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Error en el servidor');
    } else {
      res.json(rows);
    }
  });
});

// Configurar una ruta para agregar una nueva aula a la base de datos
router.post('/', (req, res) => {
  const { fecha, hora, tema, profesor_id, materia_id } = req.body;

  // Verificar que se proporcionen los datos necesarios
  if (!fecha || !hora || !tema || !profesor_id || !materia_id) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  // Validar la fecha y hora utilizando moment
  if (!isValidDateTime(fecha, hora)) {
    return res.status(400).json({ error: 'Fecha u hora no válidos' });
  }

  const insert = db_academia.prepare('INSERT INTO aulas (fecha, hora, tema, profesor_id, materia_id) VALUES (?, ?, ?, ?, ?)');
  insert.run(fecha, hora, tema, profesor_id, materia_id);
  insert.finalize();

  res.json({ message: 'Aula agregada correctamente' });
});

module.exports = router;
