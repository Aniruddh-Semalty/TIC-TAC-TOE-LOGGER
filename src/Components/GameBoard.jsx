
const initialBoard=[
    [null,null,null],
    [null,null,null],
    [null,null,null]
]
export default function GameBoard({onSelectSquare,gameTurns}){
        const gameBoard=initialBoard;
        for(const turn of gameTurns){
        const {square,currentPlayer}=turn;
        const {rowIndex,colIndex}=square;
         gameBoard[rowIndex][colIndex]=currentPlayer;
       
    }
    
    
    
    // const [gameBoard,setGameBoard]=useState(initialBoard);
    // const handleClickSquare=(rowIndex,colIndex)=>{
    //     setGameBoard((prevBoard)=>{
    //         const updatedBoard=[...prevBoard.map((value)=>([...value]))];
    //         updatedBoard[rowIndex][colIndex]=activeSymbol;

    //         return updatedBoard;
    //     })
    //     onSelectSquare();
    // }
    return(
        <ol id="game-board">
            {gameBoard.map((row,rowIndex)=>(
                <li key={rowIndex}>
                    <ol>
                        {row.map((col,colIndex)=>(
                            <li key={colIndex}>
                            <button onClick={()=>onSelectSquare(rowIndex,colIndex)} disabled={col!==null}>{col}</button>
                            </li>
                        ))}
                    </ol>
                </li>
            ))}
        </ol>
    )
}