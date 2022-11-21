import React from "react";
import Letters from "../letters/letters.component";
import Words from "../words/words.component";
import "./game-panel.css";
import { useState, useEffect } from "react";

//import  {Card}  from "../index";

export default function GamePanel(props) {
  const {
    selectedLevel,
    soupFinal,
    soupWordIds,
    gameStarted,
    onGameStart,
    updatePoints,
    wordList,
    wordListToShow,
    handleAddWord,
    handleWordsFound,
    onShowSolution,
    onBiderection,
    isGameOverModalOpen,
  } = props;

  //gameStarted=1;
  const gameClass =
    selectedLevel === "1"
      ? ""
      : selectedLevel === "2"
      ? "intermedio"
      : "avancado";
  return (
    <section className="game-panel">
      <div id="lettersClass">
        <Letters
          onGameStart={onGameStart}
          soupFinal={soupFinal}
          soupWordIds={soupWordIds}
          wordList={wordList}
          wordListToShow={wordListToShow}
          handleWordsFound={handleWordsFound}
          showSolution={onShowSolution}
          onBiderection={onBiderection}
          gameStarted={gameStarted}
        />
      </div>
      <div id="containerWords">
        <Words
          wordList={wordList}
          wordListToShow={wordListToShow}
          gameStarted={gameStarted}
          handleAddWord={handleAddWord}
          selectedLevel={selectedLevel}
        />
      </div>
    </section>
  );
}
