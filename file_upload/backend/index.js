const express = require('express');
const fileUpload = require('express-fileupload');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());
app.use(fileUpload());

// Create MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'S@ym341lq',
  database: 'mydb'
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL');
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



// Upload endpoint
// app.post('/upload', (req, res) => {
//   if (!req.files || Object.keys(req.files).length === 0) {
//     return res.status(400).send('No files were uploaded.');
//   }

//   const { file } = req.files;

//   // Save file to server
//   file.mv(`uploads/${file.name}`, (err) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).send(err);
//     }

//     // Save file details to database
//     const sql = 'INSERT INTO files SET ?';
//     const values = { name: file.name };
//     db.query(sql, values, (err, result) => {
//       if (err) {
//         console.error(err);
//         return res.status(500).send(err);
//       }
//       res.send('File uploaded successfully!');
//     });
//   });
// });

// // Get all files endpoint
// app.get('/files', (req, res) => {
//   const sql = 'SELECT * FROM files';
  
//   db.query(sql, (err, results) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).send(err);
//     }
    
//     const files = results.map(({ id, name }) => ({ id, name }));
    
//     res.send(files);
//   });
// });

// Serve static files from uploads directory
app.use('/uploads', express.static('uploads'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));