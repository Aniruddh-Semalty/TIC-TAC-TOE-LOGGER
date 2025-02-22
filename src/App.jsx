import GameBoard from "./Components/GameBoard";
import Player from "./Components/Player";
import Log from "./Components/Log";
import { useState } from "react";
import GameOver from "./Components/GameOver";
import { winningCombinations } from "./winning-combinations";
function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].currentPlayer === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}
const initialBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function App() {
  const [players, setPlayers] = useState({
    X: "Player1",
    O: "Player2",
  });
  const [gameTurns, setGameTurns] = useState([]);
  const gameBoard = [...initialBoard.map((array) => [...array])];
  const activePlayer = deriveActivePlayer(gameTurns);

  for (const turn of gameTurns) {
    const { square, currentPlayer } = turn;
    const { rowIndex, colIndex } = square;
    gameBoard[rowIndex][colIndex] = currentPlayer;
  }

  let winner;

  let isDraw = gameTurns.length == 9 && !winner;

  const handleRematch = () => {
    setGameTurns([]);
  };

  for (let combination of winningCombinations) {
    let firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    let secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    let thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = firstSquareSymbol;
    }
  }
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
            initialName="player1"
            symbol="X"
            isActive={activePlayer === "X"}
            saveName={handleSavePlayerName}
          />
          <Player
            initialName="player2"
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
