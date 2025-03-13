import { useState } from "react";
export default function Player({
  initialName,
  symbol,
  changeName,
  isActive,
  saveName,
}) {
  const [name, setName] = useState(initialName);

  const [isEditing, setIsEditing] = useState(false);

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {isEditing ? (
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value.slice(0,12))}
          />
        ) : (
          <span className="player-name">{name}</span>
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button
        onClick={() => {
         
          if (isEditing) saveName(symbol, name);

          setIsEditing((prev) => !prev);
        }}
      >
        {isEditing ? "Save" : "Edit"}
      </button>
    </li>
  );
}
