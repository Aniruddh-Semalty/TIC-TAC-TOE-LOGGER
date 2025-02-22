export default function deriveGameBoard(initialBoard, gameTurns) {
  const gameBoard = [...initialBoard.map((array) => [...array])];

  for (const turn of gameTurns) {
    const { square, currentPlayer } = turn;
    const { rowIndex, colIndex } = square;
    gameBoard[rowIndex][colIndex] = currentPlayer;
  }
  return gameBoard;
}
