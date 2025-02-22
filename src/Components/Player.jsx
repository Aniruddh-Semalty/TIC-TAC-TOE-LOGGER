import {useState} from "react";
export default function Player({initialName,symbol,changeName,isActive}){
    const[name,setName]=useState(initialName);

    const [isEditing,setIsEditing]=useState(false);
    
    return (
        <li className={isActive?"active":undefined}>
        <span className="player">
        {isEditing?<input type="text" value={name} onChange={(e)=>setName(e.target.value)}/>:
          <span className="player-name">{name}</span>
        }
          <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={()=>
        setIsEditing(prev=>!prev)
        }>{isEditing?"Save":"Edit"}</button>
        </li>
    )
}