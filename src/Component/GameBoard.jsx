export default function GameBoard({ onSelectSquare, board }) {
  //const [gameboard, setGameboard] = useState(initialGameBoard);

  // function handleGameboard(rowIndex, columnIndex) {
  //setGameboard((prevGameboard) => {
  //  const updatedGameboard = prevGameboard.map((initialArray) => [
  //  ...initialArray,
  //]);
  // updatedGameboard[rowIndex][columnIndex] = activePlayerSymbol;
  // return updatedGameboard;
  // });
  //  onSelectSquare();

  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerName, colIndex) => (
              <li key={colIndex}>
                <button
                  onClick={() => onSelectSquare(rowIndex, colIndex)}
                  disabled={playerName !== null}
                >
                  {playerName}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
