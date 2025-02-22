import GameBoard from "./Components/GameBoard";
import Player from "./Components/Player"
import Log from "./Components/Log";
import {useState} from "react";
function deriveActivePlayer(gameTurns)
{
  let currentPlayer='X';
  if(gameTurns.length>0 && gameTurns[0].currentPlayer==='X')
  {
    currentPlayer='O';
  }
  return currentPlayer;
}
function App() {


  const [gameTurns,setGameTurns]=useState([]);

  const activePlayer=deriveActivePlayer(gameTurns);

  const handleGameTurns=(rowIndex,colIndex)=>{
     
    setGameTurns((prevTurns)=>{

        const currentPlayer=deriveActivePlayer(prevTurns);
        const updatedTurns=[
          {square:{rowIndex,colIndex},currentPlayer:currentPlayer},...prevTurns];
        
        return updatedTurns
      });
    
  }
 

 
  

  return (
   <main>
  <div id="game-container">
    <ol id="players" className="highlight-player">
   
      <Player initialName="player1" symbol ="X"  isActive={activePlayer==='X'}/>
      <Player initialName="player2" symbol ="O"  isActive={activePlayer==='O'}/>
       
    </ol>
    <GameBoard onSelectSquare={handleGameTurns} gameTurns={gameTurns} />
  </div>
  <Log turns={gameTurns}/>
   </main>
  )
}

export default App
