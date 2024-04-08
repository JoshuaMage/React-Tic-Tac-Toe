import { useState } from "react";
import GameBoard from "./Component/Gameboard";
import Player from "./Component/player";

function App() {
const [activePlayer, setActivePlayer] = useState("X")

function handleSelectSquare() {
  setActivePlayer((isActive) => (isActive === "X" ? "O" : "X"));
}

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName="Player 1" symbol="X" isActivePlayer={activePlayer === "X"} />
          <Player initialName="Player 2" symbol="O" isActivePlayer={activePlayer === "O"} />
        </ol>
      </div>
     <GameBoard onSelectSquare={handleSelectSquare} activePlayerSymbol={activePlayer}/>
      <div></div>
    </main>
  );
}

export default App;
