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