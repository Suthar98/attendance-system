const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const cors = require('cors'); // Import the cors middleware

const app = express();
const port = 3001;
const secretKey = 'your_secret_key';

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
  console.log(`Server is running on http://localhost:${port}`);
});
