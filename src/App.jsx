import GameBoard from "./Components/GameBoard";
import Player from "./Components/Player";
import Log from "./Components/Log";
import { useState } from "react";
import GameOver from "./Components/GameOver";
import { winningCombinations } from "./winning-combinations";
import deriveWinner from "./utils/deriveWinner";
import deriveGameBoard from "./utils/deriveGameBoard";

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
const PLAYERS = {
  X: "Player1",
  Y: "Player2",
};

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].currentPlayer === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);
  const gameBoard = deriveGameBoard(INITIAL_GAME_BOARD, gameTurns);

  let winner = deriveWinner(gameBoard);
  const activePlayer = deriveActivePlayer(gameTurns);

  let isDraw = gameTurns.length == 9 && !winner;

  const handleRematch = () => {
    setGameTurns([]);
  };

  const handleSavePlayerName = (symbol, name) => {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: name,
      };
    });
  };

  const handleGameTurns = (rowIndex, colIndex) => {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [
        { square: { rowIndex, colIndex }, currentPlayer: currentPlayer },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  };

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            saveName={handleSavePlayerName}
          />
          <Player
            initialName={PLAYERS.Y}
            symbol="O"
            saveName={handleSavePlayerName}
            isActive={activePlayer === "O"}
          />
        </ol>
        {(winner || isDraw) && (
          <GameOver winner={players[winner]} handleRematch={handleRematch} />
        )}
        <GameBoard onSelectSquare={handleGameTurns} gameBoard={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
