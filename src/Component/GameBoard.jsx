import { useState } from "react";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard({ onSelectSquare, activePlayerSymbol}) {
  const [gameboard, setGameboard] = useState(initialGameBoard);

  function handleGameboard(rowIndex, columnIndex) {
    setGameboard((prevGameboard) => {
      const updatedGameboard = prevGameboard.map((initialArray) => [
        ...initialArray,
      ]);
      updatedGameboard[rowIndex][columnIndex] = activePlayerSymbol;
      return updatedGameboard;
    });
    onSelectSquare();
  }

  return (
    <ol id="game-board">
      {gameboard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerName, columnIndex) => (
              <li key={columnIndex}>
                <button onClick={() => handleGameboard(rowIndex, columnIndex)}>
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
