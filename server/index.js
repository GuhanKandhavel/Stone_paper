const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Database Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Guhan@2003', 
  database: 'game_db'
});

db.connect(err => {
  if (err) {
      console.error('Error connecting to MySQL:', err.message);
      process.exit(1);
  }
  console.log('Connected to MySQL');
});


// Save Game Data
app.post('/api/save-game', (req, res) => {
  const { player1, player2, rounds, winner } = req.body;
  const query = 'INSERT INTO games (player1, player2, rounds, winner) VALUES (?, ?, ?, ?)';
  db.query(query, [player1, player2, JSON.stringify(rounds), winner], (err) => {
    if (err) return res.status(500).json(err);
    res.status(200).json({ message: 'Game saved successfully' });
  });
});

// Fetch All Game Results
app.get('/api/games', (req, res) => {
  db.query('SELECT * FROM games', (err, results) => {
    if (err) return res.status(500).json(err);
    res.status(200).json(results);
  });
});

// Start the Server
app.listen(5000, () => console.log('Server running on port 5000'));
