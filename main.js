const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let users = [];


app.post('/users', (req, res) => {
  const { name, email } = req.body;
  const newId = users.length + 1;
  users.push({ newId, name, email });
  
  res.status(201).json(users)
});



app.get('/users', (req, res) => {
  res.status(200).json(users);
})
app.get('/users/:id', (req, res) => {
  const { id } = parseInt(req.params.id);

  const user = users.find(item => item.id === id);

  if (user) {
    res.json(user)
  } else {
    res.status(404).send("no user exists")
  }
})
app.put('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
    const { name, email } = req.body;
    
    // Find the user by ID
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex !== -1) {
        // Update the user details
        users[userIndex] = { id: userId, name, email };
        res.status(200).json(users[userIndex]);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
})
app.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    
    // Find the user by ID and remove them from the array
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex !== -1) {
        users.splice(userIndex, 1);  // Remove the user from the array
        res.status(200).json({ message: 'User deleted successfully' });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});