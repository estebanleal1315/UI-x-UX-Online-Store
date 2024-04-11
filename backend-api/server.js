const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL connection
const connection = mysql.createConnection({
  host: 'uiux-database.cd06q6yeyxj0.us-east-2.rds.amazonaws.com',
  user: 'admin',
  password: 'uiux12.3',
  database: 'uiuxdatabase'
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// API endpoints

// Get all items from Mens Clothing table
app.get('/api/mens-clothing', (req, res) => {
  connection.query('SELECT * FROM `Mens Clothing`', (error, results) => {
    if (error) {
      console.error('Error fetching data from Mens Clothing table:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(results);
  });
});

// Get all items from Womens Clothing table
app.get('/api/womens-clothing', (req, res) => {
  connection.query('SELECT * FROM `Womens Clothing`', (error, results) => {
    if (error) {
      console.error('Error fetching data from Womens Clothing table:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(results);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
