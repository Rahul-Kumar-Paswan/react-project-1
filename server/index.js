const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require('body-parser');


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "S@ym341lq",
  database: "new_crud",
});

db.getConnection((err, connection) => {
  if (err) throw err;
  console.log('Connected to MySQL database!');
});

app.get("/home", (req, res) => {
  const sqlInsert =
    "INSERT INTO userdetails (username,password) VALUES ('aashish','aashish@123') ";
  db.query(sqlInsert, (err, result) => {
    console.log("error", err);
    console.log("result", result);
    res.send("hello ...");
  });
});

app.post("/signup", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const confirm_Password = req.body.confirm_Password;
  db.query(
    "select * from userdetails_for_registration where username = ? ",
    [username],
    (error, result) => {
      if (error) {
        console.log(error);
        res.status(500).send("An Error Occured");
        return;
      }
      if (result.length > 0) {
        res.send(409).send("Username Already Exists");
        return;
      }

      db.query(
        "INSERT INTO userdetails_for_registration (username,password,confirm_Password) VALUES (?,?,?)",
        [username, password, confirm_Password],
        (error, result) => {
          console.log("result is",result);
          if (error) {
            console.log("error", error);
            res.status(500).send("An Error Occured");
            return;
          }
          res.send("Registration Successful");
        }
      );
    }
  );
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  db.query(
    `SELECT * FROM userdetails_for_registration WHERE username='${username}' AND password='${password}'`,
    (error, result) => {
      console.log("login result is",result);
      if (error) {
        console.log(error);
        console.log(result);
        res.status(401).send("MisMatch Username and Password");
        throw error;
      }else{
        console.log(error);
        console.log(result);
        res.send('successful login');
        return;
      }
      res.send("Registration Successful");
    }
  );
});


app.listen(3001, () => {
  console.log("Running onPort 3001");
});
