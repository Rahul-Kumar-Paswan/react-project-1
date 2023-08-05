const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const multer = require('multer');



// Create a connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: 'S@ym341lq',
  database: 'mydatabase',
});

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log('Connected to MySQL database!');
  });

// Signup route
app.post('/signup', (req, res) => {
  const { name, email, password } = req.body;

  // Hash the password before storing it in the database
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) throw err;

    // Insert the new user into the database
    pool.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hash],
      (error, results) => {
        if (error) throw error;
        res.send('User created successfully!');
      }
    );
  });
});

// Login route
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Check if the user exists in the database
  pool.query(
    'SELECT * FROM users WHERE email = ?',
    [email],
    (error, results) => {
      if (error) throw error;

      if (results.length === 0) {
        res.status(401).send('Invalid email or password');
        return;
      }

      // Compare the hashed password with the input password
      bcrypt.compare(password, results[0].password, (err, result) => {
        if (err || !result) {
          res.status(401).send('Invalid email or password');
          return;
        }

        res.send('Login successful!');
      });
    }
  );
});



// Configure Multer to handle file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

// Upload route
app.post('/upload', upload.single('file'), (req, res) => {
  const { filename } = req.file;

  // Insert the file into the database
  pool.query(
    'INSERT INTO files (filename) VALUES (?)',
    [filename],
    (error, results) => {
      if (error) 
      {
        console.log("Second");
        throw error;
      }
      res.send('File uploaded successfully!');
    }
  );
});

// View route
app.get('/view/:id', (req, res) => {
  const { id } = req.params;

  // Get the filename from the database
  pool.query(
    'SELECT * FROM files WHERE id = ?',
    [id],
    (error, results) => {
      if (error || results.length === 0) {
        res.status(404).send('File not found');
        return;
      }

      const { filename } = results[0];

      // Send the file to the client
      res.sendFile(filename, { root: './uploads' }, err => {
        if (err) throw err;
      });
    }
  );
});







app.listen(3001, () => console.log('Server running on port http://localhost:3001'));