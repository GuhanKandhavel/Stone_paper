import React, { useState } from 'react';
import axios from 'axios';
import API_BASE_URL from './config';

function App() {
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [player1Choice, setPlayer1Choice] = useState('');
  const [player2Choice, setPlayer2Choice] = useState('');
  const [rounds, setRounds] = useState([]);
  const [currentRound, setCurrentRound] = useState(1);
  const [winner, setWinner] = useState('');

  const choices = ['Stone', 'Paper', 'Scissors'];

  const determineWinner = (choice1, choice2) => {
    if (choice1 === choice2) return 'Tie';
    if (
      (choice1 === 'Stone' && choice2 === 'Scissors') ||
      (choice1 === 'Scissors' && choice2 === 'Paper') ||
      (choice1 === 'Paper' && choice2 === 'Stone')
    ) {
      return player1;
    }
    return player2;
  };

  const playRound = () => {
    if (!player1 || !player2 || !player1Choice || !player2Choice) {
      alert('Both players must select their choices!');
      return;
    }

    const roundWinner = determineWinner(player1Choice, player2Choice);
    const newRound = {
      round: currentRound,
      player1Choice,
      player2Choice,
      result: roundWinner,
    };

    setRounds([...rounds, newRound]);

    if (currentRound === 6) {
      const player1Wins = rounds.filter(r => r.result === player1).length;
      const player2Wins = rounds.filter(r => r.result === player2).length;
      const finalWinner = player1Wins > player2Wins ? player1 : player2;

      setWinner(finalWinner);

      // Save game data to the backend
      axios.post(`${API_BASE_URL}/save-game`, {
        player1,
        player2,
        rounds: [...rounds, newRound],
        winner: finalWinner,
      })
      .then(() => {
        alert('Game saved successfully!');
      })
      .catch(err => {
        console.error('Error saving game:', err);
      });
    }

    setCurrentRound(currentRound + 1);
    setPlayer1Choice('');
    setPlayer2Choice('');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Rock Paper Scissors</h1>
      
      {/* Player Names */}
      <div>
        <input
          type="text"
          placeholder="Player 1 Name"
          value={player1}
          onChange={e => setPlayer1(e.target.value)}
        />
        <input
          type="text"
          placeholder="Player 2 Name"
          value={player2}
          onChange={e => setPlayer2(e.target.value)}
        />
      </div>

      {/* Round and Choices */}
      <h2>Round {currentRound}</h2>
      <div>
        <select value={player1Choice} onChange={e => setPlayer1Choice(e.target.value)}>
          <option value="">Player 1 Choice</option>
          {choices.map(choice => <option key={choice}>{choice}</option>)}
        </select>

        <select value={player2Choice} onChange={e => setPlayer2Choice(e.target.value)}>
          <option value="">Player 2 Choice</option>
          {choices.map(choice => <option key={choice}>{choice}</option>)}
        </select>
      </div>

      {/* Play Button */}
      <button onClick={playRound}>Play Round</button>

      {/* Display Winner */}
      {winner && <h2>Winner: {winner}</h2>}

      {/* Round Results */}
      <h3>Round Results:</h3>
      <ul>
        {rounds.map((round, index) => (
          <li key={index}>
            Round {round.round}: {player1} ({round.player1Choice}) vs {player2} ({round.player2Choice}) — Winner: {round.result}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
