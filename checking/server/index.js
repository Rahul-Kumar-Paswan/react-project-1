const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');

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

// Configure Multer storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Initialize Multer upload middleware
const upload = multer({ storage });

// Handle POST request for uploading PDF files to MySQL table
app.post('/upload', upload.single('pdf'), (req, res) => {

  // Get uploaded file data from request object
  const { originalname, mimetype, filename } = req.file;

  // Insert file data into MySQL table
  const sql = `INSERT INTO pdf_files (name, type, path) VALUES (?, ?, ?)`;
  console.log("adding");
  
  db.query(sql, [originalname, mimetype, filename], (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.send(result);
  });
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
    const username = req.body.username;
    const password = req.body.password;
    const confirm_password = req.body.confirm_password;
    db.query(
      "select * from users where username = ? ",
      [username],
      (error, result) => {
        if (result.length > 0) {
          res.send(409).send("Username Already Exists");
        }
  
        db.query(
          "INSERT INTO users (username,password,confirm_password) VALUES (?,?,?)",
          [username, password, confirm_password],
          (error, result) => {
            console.log("result is",result);
            if (error) {
              console.log("error", error);
              res.status(500).send("An Error Occured");
            }
            res.send("Registration Successful");
          }
        );
      }
    );
  });


app.listen(5000, () => console.log('Server running on port http://localhost:5000'));