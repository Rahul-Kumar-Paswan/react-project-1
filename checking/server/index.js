const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'S@ym341lq',
  database: 'mydb',
});

db.getConnection((err, connection) => {
  if (err) throw err;
  console.log('Connected to MySQL database!');
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.query(
    `SELECT * FROM users WHERE username='${username}' AND password='${password}'`,
    (error, results, fields) => {
      if (error) throw error;

      if (results.length > 0) {
        res.send({ message: 'Authentication successful!' });
      } else {
        res.status(401).send({ message: 'Invalid credentials!' });
      }
    }
  );
});


// Handle POST request for registering a new user
app.post('/register', (req, res) => {
    const { username, password, confirm_password } = req.body;
    
    // Insert new user into database
    const sql = `INSERT INTO users (username, password, confirm_password) VALUES ('${username}','${password}', '${confirm_password}')`;
    
    db.query(sql, (err, result) => {
      if (err) {
        throw err;
      }
      console.log(result);
      res.send('User registered successfully!');
    });
  });


app.listen(5000, () => console.log('Server running on port http://localhost:5000'));