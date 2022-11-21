import React from "react";
import { useState } from "react";
import shuffleArray from "../../helpers/shuffle";
import "./control-panel.css";
const btLevel = document.querySelector("#btLevel");
const btPlay = document.querySelector("#btPlay");
const message = document.querySelector("#message");
const start = document.getElementById("startBtn");
const startBtn = document.getElementById("startBtn");
const changeTime = document.getElementById("changeTimeBtn");
const newTimeValue = document.getElementById("newTimeId");
const resetTimerBtn = document.getElementById("resetTimer");
const resetBtn = document.getElementById("resetBtn");

const INITIALTIMER = 120;
let ACTUALTIMER = INITIALTIMER;
let timerID;
let aux;

const panelControl = document.querySelector("#panel-control");
const panelGame = document.querySelector("#game");

const TIMEOUTGAME = 100;
const labelGameTime = document.querySelector("#gameTime");
const labelPoints = document.querySelector("#points");
let timer = TIMEOUTGAME;
let timeoutGameId;
let timerId;

function ControlPanel(props) {
  const {
    gameStarted,
    selectedLevel,
    onGameStart,
    onLevelChange,
    timer,
    totalPoints,
    BestScore,
    onShowSolution,
    handleBiderection,
    onBiderection,
  } = props;
  const gameStartedClass = gameStarted ? " gameStarted" : "";
  let onBiderVal = onBiderection;

  let timer1 = timer;
  if (timer1 <= 0) timer1 = 0;
  else timer1 = timer;
  //todo Timer guardar tempo de fim de jogo
  return (
    <section id="panel-control">
      <h3 className="sr-only">Escolha um nível</h3>
      <form className="form">
        <fieldset className="col1 form-group">
          <label htmlFor="btlevel">Nível:</label>
          <select
            defaultValue="1"
            id="btlevel"
            onChange={onLevelChange}
            disabled={gameStarted}
          >
            <option value="1" onClick={onLevelChange}>
              Básico (2x3)
            </option>
            <option value="2" onClick={onLevelChange}>
              Intermédio (3x4){" "}
            </option>
            <option value="3" onClick={onLevelChange}>
              Avançado (4x5)
            </option>
          </select>
        </fieldset>

        <button type="button" id="btPlay" onClick={onGameStart}>
          {gameStarted ? "Parar Jogo" : "Iniciar Jogo"}
        </button>
      </form>
      <div className="form-metadata">
        <p id="message" role="alert" className="hide">
          Clique em iniciar Jogo!
        </p>

        <dl className={`list-item left${gameStartedClass}`}>
          <dt>Pontuação:</dt>
          <dd id="points">{totalPoints}</dd>
        </dl>
        <dl className={`list-item left${gameStartedClass}`}>
          Top Score
          <dd id="pointsTop">{BestScore} </dd>
        </dl>

        <dl className={`list-item left${gameStartedClass}`}>
          <dt>Tempo de jogo:</dt>
          <dd id="gameTime">{timer1}</dd>
        </dl>

        <button
          className={`list-item left${gameStartedClass}`}
          id="solutionBtn"
          onClick={onShowSolution}
        >
          Solução
        </button>

        <button
          className={`list-item left${gameStartedClass}`}
          id="Btnbiderection"
          onClick={handleBiderection}
        >
          {onBiderVal ? "Bidirection" : "OneDirection"}
        </button>
        {onBiderVal}
      </div>
      {onBiderVal}
    </section>
  );
}

export { btLevel, btPlay, message };

export default ControlPanel;
