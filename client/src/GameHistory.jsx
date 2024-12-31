import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_BASE_URL from './config';

function GameHistory() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/games`)
      .then(response => {
        setGames(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching game history:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Game History</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table border="1" style={{ margin: '0 auto', width: '80%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Player 1</th>
              <th>Player 2</th>
              <th>Winner</th>
              <th>Rounds</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {games.map(game => (
              <tr key={game.id}>
                <td>{game.id}</td>
                <td>{game.player1}</td>
                <td>{game.player2}</td>
                <td>{game.winner}</td>
                <td>{JSON.stringify(game.rounds)}</td>
                <td>{new Date(game.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default GameHistory;
