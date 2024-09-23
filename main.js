const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json()); // Middleware to parse JSON bodies

// Mock user data (in a real app, this would be in a database)
const users = [
  { username: 'admin', password: 'admin123', role: 'admin' },
  { username: 'user', password: 'user123', role: 'user' },
];

// Middleware to verify JWT and check roles
function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
      return res.sendStatus(403); // Forbidden
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403); // Forbidden
      }

      req.user = user;
      if (!allowedRoles.includes(user.role)) {
        return res.sendStatus(403); // Forbidden
      }
      next();
    });
  };
}

// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user || user.password !== password) {
    return res.status(400).json({ message: 'Invalid username or password' });
  }

  const token = jwt.sign({ username: user.username, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

// Admin route
app.get('/admin', authorizeRoles('admin'), (req, res) => {
  res.json({ message: 'Welcome to the admin area!', user: req.user });
});

// User route
app.get('/user', (req, res) => {
  res.json({ message: 'Welcome to the user area!', user: req.user });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
