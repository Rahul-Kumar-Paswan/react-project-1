const express = require('express');
const mysql = require('mysql');
const multer = require('multer');
const path = require('path');

// Create a connection pool to handle multiple connections
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: 'S@ym341lq',
  database: 'mydatabase',
});

// Create an instance of Express app
const app = express();

// Set up middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up middleware for serving static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Set up storage engine for Multer to handle file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Define API endpoints

// Login endpoint
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  
  // Query the database to check if the user exists and their password is correct
  pool.query(
    `SELECT * FROM users WHERE username='${username}' AND password='${password}'`,
    (error, results) => {
      if (error) throw error;
      if (results.length > 0) {
        res.status(200).send();
      } else {
        res.status(401).send();
      }
    }
  );
});

// File upload endpoint
app.post('/api/upload', upload.single('file'), (req, res) => {
  
  // Insert the uploaded file into the database with its URL and associated user ID
   pool.query(
     `INSERT INTO files(name,url,user_id) VALUES('${req.file.filename}','/uploads/${req.file.filename}',1)`,
     (error, results) => {
       if (error) throw error;
       res.status(200).send();
     }
   );
});

// Files retrieval endpoint
app.get('/api/files', (req,res)=>{
  
   // Retrieve all files from the database along with their associated user IDs and send them as JSON response.
   pool.query(
     `SELECT * FROM files`,
     (error,result)=>{
       if(error){
         console.log(error);
         return res.status(500).send(error);
       }
       return res.status(200).json(result);
     }
   )
})

// Start listening on port 3000
app.listen(3000, () => console.log('Server started on port 3000'));