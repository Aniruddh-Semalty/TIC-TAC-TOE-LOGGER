export default function Log({ turns }) {
  return (
    <ol id="log">
      {turns.map((turn) => (
        <li
          key={`${turn.square.rowIndex} ${turn.square.colIndex}`}
        >{`${turn.currentPlayer} selected row ${turn.square.rowIndex} column ${turn.square.colIndex}`}</li>
      ))}
    </ol>
  );
}
