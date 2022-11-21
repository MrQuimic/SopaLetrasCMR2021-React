import React from "react";
import "./words.css";
import {useState, useEffect} from "react"

function Words(props) {
  const { wordList, gameStarted, handleAddWord, selectedLevel, } = props;

  const [input, setInput] = useState('');
  const [clickButton, setClickButton] = useState(false);

  const gameStartedClass = gameStarted ? "" : "gameStarted";
  useEffect(() => {
    setInput('');
  }, [clickButton]);

  return (
    <div className={`containerWords${gameStartedClass}`}>
      <ul>
        {wordList.map((word) => {
          return (
            <div className={`word${gameStartedClass}`} key={word.id} >
              <li className="li_word" key={word.id} id={word.name}>
                {word.name}
              </li>
            </div>
          );
        })}
        <input
          className={`input${gameStartedClass}`} 
          placeholder="Nova palavra"
          //disabled={gameStarted}
          value={input}
          onInput={(e) => setInput(e.target.value)}
          hidden={selectedLevel === "0" || gameStarted}
        ></input>
        <button
          type="button"
          id="buttonAdd"
          //disabled={(gameStarted)}
          onClick={() => {handleAddWord(input); setClickButton(true)}}
          hidden={selectedLevel === "0" || gameStarted}
        >
          ADICIONAR
        </button>
      </ul>
    </div>
  );
}


export default Words;
