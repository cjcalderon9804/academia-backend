const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

// Conectar a la base de datos SQLite (creará un archivo llamado 'db_usuarios.db')
const db_usuarios = new sqlite3.Database('db_usuarios.db');

// Crear una tabla de ejemplo
db_usuarios.serialize(() => {
  db_usuarios.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT)');
  
  // Poblar la tabla con tres registros
  const insert = db_usuarios.prepare('INSERT INTO users (name) VALUES (?)');
  insert.run('Usuario1');
  insert.run('Usuario2');
  insert.run('Usuario3');
  insert.finalize();
});

// Configurar una ruta para obtener datos de la base de datos
app.get('/users', (req, res) => {
  db_usuarios.all('SELECT * FROM users', (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Error en el servidor');
    } else {
      res.json(rows);
    }
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
