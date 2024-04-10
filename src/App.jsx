import { useState } from "react";
import GameBoard from "./Component/Gameboard";
import Player from "./Component/player";
import Log from "./Component/Log";
import GameOver from "./Component/gameOver.jsx";
import { WINNING_COMBINATIONS } from "./Component/winning-combination.js";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function App() {
  const [player, setPlayer] = useState({
    X: "Player 1",
    O: "Player 2",
  });
  const [gameTurns, setGameTurn] = useState([]);
  //const [activePlayer, setActivePlayer] = useState("X");
  const activePlayer = deriveActivePlayer(gameTurns);

  let gameboard = [...initialGameBoard.map((array) => [...array])];
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameboard[row][col] = player;
  }

  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameboard[combination[0].row][combination[0].column];
    const secondtSquareSymbol =
      gameboard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameboard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondtSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = player[firstSquareSymbol];
    }
  }

  const hasDraw = gameTurns.length === !9 && winner;

  function handleSelectSquare(rowIndex, colIndex) {
    // setActivePlayer((isActive) => (isActive === "X" ? "O" : "X"));

    setGameTurn((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updateTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];

      return updateTurns;
    });
  }

  function handlePlayerNameChange(symbol, name) {
    setPlayer((prevPlayer) => {
      return {
        ...prevPlayer,
        [symbol]: name,
      };
    });
  }

  function handleRestart() {
    setGameTurn([]);
    console.log("clicked");
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="Player 1"
            symbol="X"
            isActivePlayer={activePlayer === "X"}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initialName="Player 2"
            symbol="O"
            isActivePlayer={activePlayer === "O"}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameboard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
