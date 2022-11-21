import React from "react";
import Footer from "../footer/footer.component";

import "./game-over-modal.css";

function GameOverModal({
  isOpen,
  totalPoints,
  handleClose,
  recordPoints,
  timer,
}) {
  const modalClass = `w3-modal ${isOpen ? "show-modal" : ""}`;
  let timer1 = timer;
  if (timer1 <= 0) timer1 = 0;
  else timer1 = timer;
  return (
    <div id="modal-gameOver" className={modalClass}>
      <div className="w3-modal-content w3-card-4 w3-animate-zoom estilos">
        <header>
          <span
            className="w3-button w3-display-topright closeModal"
            data-modalid="gameOver"
            onClick={handleClose}
          >
            &times;
          </span>
          <div>Jogo Terminado</div>
        </header>
        <div className="info" id="messageGameOver">
          <p>Pontuação: {totalPoints}</p>
          <p>Tempo Restante: {timer1} </p>
          <p>Record: {recordPoints} </p>
          <p></p>
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default GameOverModal;
