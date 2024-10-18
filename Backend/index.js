// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Parse JSON request bodies
app.use(bodyParser.json());

// Create a connection to the MySQL server
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
});

// Create the database and table if they don't exist
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');

  // Create the database
  connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_DATABASE}`, (err) => {
    if (err) {
      console.error('Error creating database:', err);
      return;
    }
    console.log('Database created or already exists');

    // Switch to the newly created database
    connection.changeUser({ database: process.env.DB_DATABASE }, (err) => {
      if (err) {
        console.error('Error switching to database:', err);
        return;
      }

      // Create the Registration table
      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS Registration (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          email VARCHAR(150) NOT NULL UNIQUE,
          dob DATE NOT NULL,
          phone_number VARCHAR(13),
          registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `; //phone_number format +910000000000 {+countrycode 10digit  number}
      connection.query(createTableQuery, (err) => {
        if (err) {
          console.error('Error creating table:', err);
          return;
        }
        console.log('Table created or already exists');
      });
    });
  });
});

// CRUD Operations

// Create (Register a new user)
app.post('/register', (req, res) => {
  const { name, email, dob, phone_number } = req.body;

  const query = `INSERT INTO Registration (name, email, dob, phone_number) VALUES (?, ?, ?, ?)`;
  connection.query(query, [name, email, dob, phone_number], (err, result) => {
    if (err) {
      console.error('Error during registration:', err);
      return res.status(500).send('Error during registration');
    }
    res.status(201).json({ id: result.insertId, name, email, dob, phone_number });
  });
});

// Read (Retrieve all users)
app.get('/registrations', (req, res) => {
  connection.query('SELECT * FROM Registration', (err, rows) => {
    if (err) {
      console.error('Error fetching registrations:', err);
      return res.status(500).send('Error fetching registrations');
    }
    res.status(200).json(rows);
  });
});

// Read (Retrieve a single user by ID)
app.get('/registration/:id', (req, res) => {
  const { id } = req.params;

  connection.query('SELECT * FROM Registration WHERE id = ?', [id], (err, rows) => {
    if (err) {
      console.error('Error fetching registration:', err);
      return res.status(500).send('Error fetching registration');
    }
    if (rows.length > 0) {
      res.status(200).json(rows[0]);
    } else {
      res.status(404).send('Registration not found');
    }
  });
});

// Update (Update user details by ID)
app.put('/registration/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, dob, phone_number } = req.body;

  const query = `
    UPDATE Registration
    SET name = ?, email = ?, dob = ?, phone_number = ?
    WHERE id = ?
  `;
  connection.query(query, [name, email, dob, phone_number, id], (err, result) => {
    if (err) {
      console.error('Error updating registration:', err);
      return res.status(500).send('Error updating registration');
    }
    if (result.affectedRows > 0) {
      res.status(200).json({ id, name, email, dob, phone_number });
    } else {
      res.status(404).send('Registration not found');
    }
  });
});

// Delete (Delete a user by ID)
app.delete('/registration/:id', (req, res) => {
  const { id } = req.params;

  connection.query('DELETE FROM Registration WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('Error deleting registration:', err);
      return res.status(500).send('Error deleting registration');
    }
    if (result.affectedRows > 0) {
      res.status(200).send('Registration deleted');
    } else {
      res.status(404).send('Registration not found');
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});