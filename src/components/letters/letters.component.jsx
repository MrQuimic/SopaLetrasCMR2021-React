import React, { cloneElement } from "react";
import { useState, useEffect } from "react";
//import { useState } from "react";
import "./letters.css";

export default function Letters(props) {
  const {
    soupFinal,
    soupWordIds,
    onGameStart,
    wordList,
    handleWordsFound,
    showSolution,
    onBiderection,
    gameStarted,
  } = props;



  let letterFunc;
  {

    letterFunc = soupFinal.map((letter) => {
      if (letter.id > 0) {
        return (
          <button
            className={"alphaSpan"}
            key={letter.id}
            id={"alphaSpan" + letter.id}
            onMouseDown={startSelected(soupWordIds)}
            onMouseUp={endSelected(soupWordIds)}
            onPointerMove={addSelected(
              letter.id,
              letter.name,
              letter.wordName,
              soupWordIds,
              wordList,
              handleWordsFound,
              onBiderection
            )}
            onTouchMove={addSelected(
              letter.id,
              letter.name,
              letter.wordName,
              soupWordIds,
              wordList,
              handleWordsFound,
              onBiderection
            )}
            onTouchStartCapture={addSelected(
                letter.id,
                letter.name,
                letter.wordName,
                soupWordIds,
                wordList,
                handleWordsFound,
                onBiderection
            )}
            onDragOver={addSelected(
              letter.id,
              letter.name,
              letter.wordName,
              soupWordIds,
              wordList,
              handleWordsFound,
              onBiderection
            )}   
            onDragCapture={addSelected(
              letter.id,
              letter.name,
              letter.wordName,
              soupWordIds,
              wordList,
              handleWordsFound,
              onBiderection
            )} 
            onTouchMoveCapture={addSelected(
              letter.id,
              letter.name,
              letter.wordName,
              soupWordIds,
              wordList,
              handleWordsFound,
              onBiderection
            )}     
            onTouchEnd={addSelected(
              letter.id,
              letter.name,
              letter.wordName,
              soupWordIds,
              wordList,
              handleWordsFound,
              onBiderection
            )}     
    
            onTouchStart={startSelected(soupWordIds)}
            onClick={startSelected(soupWordIds)}
            disabled={!gameStarted}
          >
            {letter.name}
          </button>
        );
      }
    });
  }

  return (
    <div className="alpha" id="alpha">
      {letterFunc}
    </div>
  );
}

let bidirection = true;
/* */
let maxWidth = 15;
let selectedLetters = [],
  selectedIds = []; //current selection - always being deleted

let availableGameIds = [];
let compatibleWords = [];
let compatibleWordsRev = [];
let auxWordsId = []; // array auxiliar que vai guardando os id's das letras encontradas.
let wordsLettersFoundId = []; //save list of letters id not to be in the selection again
let wordsFound = []; //save words found
let selectedWord = "";

let wordsCSSArray = [
  "WordsFound",
  "WordsFound1",
  "WordsFound2",
  "WordsFound3",
  "WordsFound4",
  "WordsFound5",
  "WordsFound6",
  "WordsFound7",
  "WordsFound8",
  "WordsFound9",
];

let i,
  checkWordIn = 0;

let flagclick = false;
let flagletter = false;

// The list of all the possible orientations

// validaçao para comecar a selecionar as letras
const startSelected = (id, name, soupWordIds) => () => {
  flagclick = true;
};

const endSelected = (id, name, soupWordIds) => () => {
  clear();
  flagclick = false;
};

function checkCompatibleWordsReverse(wordList, soupWordIds) {
  //letter start
  let a = wordList;
  let sizeWord;
  //console.log("length " + a.length);
  for (i = 0; i < a.length; i++) {
    sizeWord = wordList[i].name.length;
    let k = sizeWord - 1;
    for (let j = 0; j < selectedLetters.length; j++) {
    

      if (selectedLetters[j] === wordList[i].name[k]) {
        checkWordIn = 0;
        for (let wordIn of compatibleWordsRev) {
   

          if (wordIn === wordList[i].name) checkWordIn = checkWordIn + 1;
        }
        if (checkWordIn == 0) {
          compatibleWordsRev.push(wordList[i].name); //adds word to list of compatible words to compare
 

          flagletter = true;
        }
      } else {
        for (let o = 0; o < selectedLetters.length; o++) {
          if (wordList[i].name === compatibleWordsRev[o])
            compatibleWordsRev.splice(o); //removes word from list of compatible words to compare
        }

        break;
      }
      k--;
    }
  }
}

const addSelectedReverse =
  (id, name, wordName, soupWordIds, wordList, handleWordsFound) => () => {
    let id_name = "alphaSpan" + id;
    let flagletter = false;
    let flagword = false;

    console.log(compatibleWordsRev.length); //logs compatible words

    for (i = 0; i < compatibleWordsRev.length; i++) {
      let w = compatibleWordsRev[i].length - 1;

      console.log(
        "selectedLetters[j] " +
          " compatibleWordsRev[i][w] " +
          compatibleWordsRev[i][w] +
          "  w   " +
          w
      );
      for (let j = 0; j < selectedLetters.length; j++) {
        console.log(
          "selectedLetters[j] " +
            selectedLetters[j] +
            " compatibleWordsRev[i][w] " +
            compatibleWordsRev[i][w] +
            "  w   " +
            w +
            " j " +
            j
        );
        if (selectedLetters[j] === compatibleWordsRev[i][w]) {
          flagletter = true;

          console.log(
            "j " +
              j +
              " w " +
              w +
              " compatibleWords[i].length " +
              compatibleWordsRev[i].length
          );
          if (j + 1 === compatibleWordsRev[i].length) {
            flagword = true;
            id_name = "alphaSpan" + selectedIds[j]; //To update id_name
            console.log("j " + j + " w " + w);
            wordsFound.push(compatibleWordsRev[i]);
            handleWordsFound(compatibleWordsRev[i]);

            for (let k = 0; k < selectedIds.length; k++) {
              id_name = "alphaSpan" + selectedIds[k]; //To update id_name
              wordsLettersFoundId.push(selectedIds[k]); //add list of found ids
              document.getElementById(id_name).classList.remove("selected");
              document.getElementById(id_name).classList.add("WordsFound");
            }

            document
              .getElementById(compatibleWordsRev[i])
              .classList.add("word_found");

            selectedLetters = []; //reset selected letters
            selectedIds = []; //reset selectedids
            auxWordsId = []; //reset auxiliar array for found ids
            compatibleWordsRev = []; //reset compatible words
            flagclick = false;

            break;
          }
        } else {
          for (let k = 0; k < auxWordsId.length; k++) {
            let id_name = "alphaSpan" + auxWordsId[j];
            document.getElementById(id_name).classList.remove("selected");
            flagclick = false;
            console.log(selectedLetters[j]);
          }
        }
        w--;
      }
    }
  };

function checkCompatibleWords(wordList, soupWordIds, onBiderection) {
  //words available to choose

  let a = wordList;
  let wordListsize = a.length;
  let sizeWord;
  let k;
  let compare;
  for (i = 0; i < wordListsize; i++) {
    if (wordListsize > 0) {
      sizeWord = a[i].name.length;
      k = sizeWord - 1;
    }

    for (let j = 0; j < selectedLetters.length; j++) {
      if (bidirection === onBiderection)
        compare =
          selectedLetters[j] === wordList[i].name[j] ||
          selectedLetters[j] === wordList[i].name[k];
      else compare = selectedLetters[j] === wordList[i].name[j];

      if (compare) {
        checkWordIn = 0;
        for (let wordIn of compatibleWords) {
          if (wordIn === wordList[i].name) checkWordIn = checkWordIn + 1;
        }
        if (checkWordIn === 0) {
          compatibleWords.push(wordList[i].name); //adds word to list of compatible words to compare

          flagletter = true;
        }
      } else {
        for (let o = 0; o < selectedLetters.length; o++) {
          if (wordList[i].name === compatibleWords[o])
            compatibleWords.splice(o); //removes word from list of compatible words to compare
        }

        break;
      }

      k--;
    }
  }
}

const addSelected =
  (
    id,
    name,
    wordName,
    soupWordIds,
    wordList,
    handleWordsFound,
    onBiderection
  ) =>
  () => {
    if (flagclick === true) {
      //console.log(id);
      let id_name = "alphaSpan" + id;
      let flagletter = false;
      let flagword = false;
      let checkidIn = 0; //not same ID
      let checkidInSolution = 0;
      let a = wordList;
      let wordListsize = a.length;
      let k;
      console.log(name);
      if (selectedIds.length <= 0) selectedWord = wordName;
      console.log(name);
      for (let idIn of selectedIds) {


        if (idIn === id) checkidIn = checkidIn + 1;
      }

      console.log(wordName + " " + checkidIn);

      for (let K = 0; K < soupWordIds.length; K++) {
      
        if (id === soupWordIds[K].id) {
          checkidInSolution++;
          selectedWord = wordName;
          
        }
      }
      //  }
      // if (checkidIn === 0 && checkidInSolution===1) {
      if (checkidIn === 0) {
        selectedLetters.push(name);

        selectedIds.push(id);
        document.getElementById(id_name).classList.add("selected");
        selectedWord = wordName;
      }

      checkCompatibleWords(wordList, soupWordIds, onBiderection);

      //console.log(compatibleWords); //logs compatible words

      for (i = 0; i < compatibleWords.length; i++) {
        let w = compatibleWords[i].length - 1;
        for (let j = 0; j < selectedLetters.length; j++) {
          if (
            selectedLetters[j] === compatibleWords[i][j] ||
            selectedLetters[j] === compatibleWords[i][w]
          ) {
            auxWordsId.push(selectedIds[j]);

            flagletter = true;

            if (j + 1 === compatibleWords[i].length) {
              flagword = true;
              id_name = "alphaSpan" + selectedIds[j]; //To update id_name

              wordsFound.push(compatibleWords[i]);
              handleWordsFound(compatibleWords[i]);
              let randColor = randomIntFromInterval(1, 10);
              for (let k = 0; k < selectedIds.length; k++) {
                id_name = "alphaSpan" + selectedIds[k]; //To update id_name
                wordsLettersFoundId.push(selectedIds[k]); //add list of found ids
                document.getElementById(id_name).classList.remove("selected");
                document
                  .getElementById(id_name)
                  .classList.add(`WordsFound${randColor}`);
              }

              document
                .getElementById(compatibleWords[i])
                .classList.add("word_found");

              selectedLetters = []; //reset selected letters
              selectedIds = []; //reset selectedids
              auxWordsId = []; //reset auxiliar array for found ids
              compatibleWords = []; //reset compatible words
              flagclick = false;

              break;
            }
          } else {
            for (let k = 0; k < auxWordsId.length; k++) {
              let id_name = "alphaSpan" + auxWordsId[j];
              document.getElementById(id_name).classList.remove("selected");
              flagclick = false;
              console.log(selectedLetters[j]);
            }
          }
          w--;
        }
      }
      if (compatibleWords.length === 0 || checkidInSolution === 0) {
        //if no compatible word clean selected ids
        clear();
      }
    }
  };

const addSolution =
  (id, name, wordName, soupWordIds, wordList, handleWordsFound) => () => {
    for (let idIn of soupWordIds) {
      let id_name = "alphaSpan" + idIn.id;
      document.getElementById(id_name).classList.add("selected");
    }
  };

const ResetSolution =
  (id, name, wordName, soupWordIds, wordList, handleWordsFound) => () => {
    for (let idIn of soupWordIds) {
      let id_name = "alphaSpan" + idIn.id;
      document.getElementById(id_name).classList.remove("selected");
    }
  };

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function clear() {
  for (let j = 0; j < selectedLetters.length; j++) {
    let id_name = "alphaSpan" + selectedIds[j];

    document.getElementById(id_name).classList.remove("selected");
  }
  flagclick = false;
  selectedLetters = [];
  selectedIds = [];
}
