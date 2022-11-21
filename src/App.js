import "./assets/styles/App.css";

import Header from "./components/header/header.component.jsx";
import Footer from "./components/footer/footer.component.jsx";
import ControlPanel from "./components/control-panel/control-panel.component";
import GamePanel from "./components/game-panel/game-panel.component";
import GameOverModal from "./components/game-over-modal/game-over-modal.component";

import { useState, useEffect } from "react";
import { TIMEOUTGAME } from "./constants";
import {
  fillSoup,
  fillReset,
  startListWords,
  checkSpacesInString,
  checkRepeatedWordInArray,
  addSolutionMain,
  ResetSolution,
  wordsnoFitCss,
  resetnoFit,
  resetnoFitCss,
} from "./helpers/LetterShuffle";
let timerId = undefined;

let soup = [];
let i;

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState("0");
  const [cards, setCards] = useState([]);
  const [timer, setTimer] = useState(TIMEOUTGAME);
  const [soupFinal, setSoupFinal] = useState([]);
  const [soupWordIds, setSoupsoupWordIds] = useState([]);
  const [wordList, setWordList] = useState([]);
  const [nrWords, setNrWords] = useState(0);
  const [wordsListFound, setWordsFound] = useState([]);
  const [totalPoints, setTotalPoints] = useState(0);
  const [addWordCounter, setAddWordCounter] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [onBiderection, setBiderection] = useState(true);

  const [wordsNoFit, setWordsNoFit] = useState(0);

  const [isGameOverModalOpen, setIsGameOverModalOpen] = useState(false);

  let data = JSON.parse(window.localStorage.getItem("Points"));
  let optCaps;
  let sizeIncrese;
  const BestScore = localStorage.getItem("Points");
  let onBiderectionValue;

  const handleAddWord = (props) => {
    let word = props.toUpperCase();
    if (
      word.length <= 10 &&
      word != "" &&
      word.length >= 2 &&
      !checkSpacesInString(word) &&
      !checkRepeatedWordInArray(word, wordList) &&
      addWordCounter < 2
    ) {
      let tempWords = wordList;
      tempWords.push({ id: wordList.length + 1, name: word });
      setWordList([...tempWords]);
      setAddWordCounter(addWordCounter + 1);
    }
  };

  useEffect(() => {
    setAddWordCounter(0);

    let auxWords = startListWords(nrWords);

    setWordList([...auxWords]);

    setSoupFinal([]);
  }, [selectedLevel]);

  useEffect(() => {
    if (!gameStarted) {
      setSelectedLevel("1");

      setNrWords(10);

      setGameStarted(false);
      setTotalPoints(0);
    }

    if (gameStarted) {
      if (selectedLevel == "1") {
        optCaps = 0;
        sizeIncrese = 0;
      } else if (selectedLevel == "2") {
        optCaps = 1;
        sizeIncrese = 0;
      } else {
        optCaps = 1;
        sizeIncrese = 0;
      }

      let wordListSlices = wordList.slice(0).sort();

      let [auxSoup, soupWordIds, wordsNoFit] = fillSoup(
        wordListSlices,
        optCaps,
        sizeIncrese
      );
      resetnoFit(wordListSlices);
      setWordsNoFit(wordsNoFit);
      resetnoFitCss(wordListSlices);
      wordsnoFitCss(wordsNoFit);

      setSoupFinal([...auxSoup]);
      setSoupsoupWordIds([...soupWordIds]);

      console.log(auxSoup);
      console.log(soupWordIds);

      timerId = setInterval(() => {
        let nextTimer;
        setTimer((previousState) => {
          nextTimer = previousState - 1;
          return nextTimer;
        });
        if (nextTimer === 0) {
          setGameStarted(false);
        }
      }, 1000);
    } else if (timer !== TIMEOUTGAME) {
      if (selectedLevel === "1") setTimer(150);
      else if (selectedLevel === "2") setTimer(190);
      else if (selectedLevel === "3") setTimer(250);
      else setTimer(150);
    }
    return () => {
      if (timerId) {
        clearInterval(timerId);
      }
    };
  }, [gameStarted]);

  useEffect(() => {
    if (timer === 0) {
      onGameOver();
    }
  }, [timer]);

  function myFunction() {
    timerId = setTimeout(function () {
      alert("Hello");
    }, 3000);
  }

  function myStopFunction() {
    clearTimeout(timerId);
  }
  const onGameOverModelClose = () => {
    setGameStarted(false);
 

    setIsGameOverModalOpen(false);
    let [auxSoup, soupWordIds] = fillReset();
    setSoupFinal([...auxSoup]);
    setSoupsoupWordIds([...soupWordIds]);

    setSoupFinal([]);
    setWordList([]);
    setWordsFound([]);
    //setTotalPoints(0);
    setSelectedLevel(1);

    //setTotalPoints(0);
  };

  const handleWordsFound = (props) => {
    let temp = wordsListFound;
    // verifica se essa palavra ja foi encontrada...
    for (let i = 0; i < wordsListFound.length; i++) {
      if (props === wordsListFound[i]) {
        return;
      }
    }

    temp.push(props);
    console.log(temp);
    setWordsFound([...temp]);

    // verifica se ja encontrou as letras todas
    if (wordsListFound.length + wordsNoFit.length === nrWords) {
      setTimeout(() => {
        onGameOver();
      }, 500);
    }
  };
  useEffect(() => {
    let tempTotalPoints = totalPoints;
    if (wordsListFound.length > 0) {
      tempTotalPoints = Math.round(
        tempTotalPoints +
          wordsListFound[wordsListFound.length - 1].length * 0.1 * timer,
        0
      );
      if (BestScore < tempTotalPoints) {
        const textForStorage = tempTotalPoints;

        // setter
        localStorage.setItem("Points", textForStorage);

        // getter
        const textFromStorage = localStorage.getItem("Points");

      }
    }

    setTotalPoints(tempTotalPoints);
  }, [wordsListFound]);

  const handleGameStart = () => {

    if (gameStarted) {
      console.log("Termina Jogo");
      setGameStarted(false);
      console.log(wordsNoFit);
;

      let [auxSoup, soupWordIds] = fillReset();
      setSoupFinal([...auxSoup]);
      setSoupsoupWordIds([...soupWordIds]);
      setIsGameOverModalOpen(false);

    } else {
      //console.log("Inicia Jogo");
      setTotalPoints(0);
      setGameStarted(true);
    }
  };

  const onGameOver = () => {
    setIsGameOverModalOpen(true);
  };

  const handleLevelChange = (event) => {
    const { value } = event.currentTarget;
    setSelectedLevel(value);

    let numOfCards;

    switch (value) {
      case "1":
        //beginer leve
        setTimer(120);
        setNrWords(10);
        break;
      case "2":
        //intermediate level
        setTimer(180);
        setNrWords(12);
        break;
      case "3":
        //advance level
        setTimer(240);
        setNrWords(14);
        break;
      //advance level
      case "4":
        //Closed
        setTimer(0);
        setNrWords(10);
        break;
    }
  };

  const handleShowSolution = () => {
    if (showSolution === true) setShowSolution(false);
    else setShowSolution(true);
  };
  const handleBiderection = () => {
    if (onBiderection === true) {
      setBiderection(false);
    } else {
      setBiderection(true);
    }
  };

  useEffect(() => {
    if (showSolution === true)
      addSolutionMain(soupWordIds, wordList, handleWordsFound);
    else {
      ResetSolution(soupWordIds, wordList, handleWordsFound);
    }
  }, [showSolution]);

  return (
    <div id="container">
      <div id="painelControl">
        <Header />

        <ControlPanel
          gameStarted={gameStarted}
          onGameStart={handleGameStart}
          onLevelChange={handleLevelChange}
          selectedLevel={selectedLevel}
          timer={timer}
          totalPoints={totalPoints}
          BestScore={BestScore}
          onShowSolution={handleShowSolution}
          handleBiderection={handleBiderection}
          onBiderection={onBiderection}
        />
      </div>
      <main className="main-content">
        <GamePanel
          cards={cards}
          soupFinal={soupFinal}
          soupWordIds={soupWordIds}
          selectedLevel={selectedLevel}
          gameStarted={gameStarted}
          onGameStart={handleGameStart}
          wordList={wordList}
          handleAddWord={handleAddWord}
          handleWordsFound={handleWordsFound}
          onShowSolution={showSolution}
          onBiderection={onBiderection}
          isGameOverModalOpen={isGameOverModalOpen}
        />
      </main>
      <Footer />
      <GameOverModal
        isOpen={isGameOverModalOpen}
        totalPoints={totalPoints}
        handleClose={onGameOverModelClose}
        recordPoints={BestScore}
        timer={timer}
      />
    </div>
  );
}

export { soup };
export default App;
