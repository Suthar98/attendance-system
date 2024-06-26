const express = require('express');           // Import the Express library
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const fs = require('fs');                     // Import file system module to read files
const cors = require('cors'); // Import the cors middleware

const dotenv = require('dotenv');
dotenv.config();


const app = express();   // Initialize the Express application
const port = 3001;       // Define the port number

const secretKey = process.env.JWT_SECRET;

app.use(cors()); // Use cors middleware to enable CORS
app.use(bodyParser.json());

const users = JSON.parse(fs.readFileSync('users.json', 'utf-8'));

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid username or password' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`); // Log the server startup message
});
