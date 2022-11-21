export const CARDS_LOGOS = [
     "angular",
     "bootstrap",
     "html",
     "javascript",
     "vue",
     "svelte",
     "react",
     "css",
     "backbone",
     "ember",
];

export const wordListBase = [
     { id: 1, name: "ANGULAR" },
  { id: 2, name: "BOOTSTRAP" },
  { id: 3, name: "HTML" },
  { id: 4, name: "EMBER" },
  { id: 5, name: "BACKBONE" },
  { id: 6, name: "TYPESCRIPT" },
  { id: 7, name: "ISEC" },
  { id: 8, name: "LINGUAGENS" },
  { id: 9, name: "ASSEMBLY" },
  { id: 10, name: "PYTHON" },
  { id: 11, name: "JAVASCRIPT" },
  { id: 12, name: "POWERSHELL" },
  { id: 13, name: "GROOVY" },
  { id: 14, name: "MATLAB" },
  { id: 15, name: "KOTLIN" },
  { id: 16, name: "FORTRAN" },
   ];

export const LETTERS = "abcdefghijklmnopqrstuvwxyz"; // Letters used to fill blank spots in the enigma


export const message = document.querySelector('#message');
export const panelControl = document.querySelector('#panel-control');
export const panelGame = document.querySelector('#game');
export let cards =  document.querySelectorAll('.card');
export const btLevel = document.querySelector('#btLevel');
export const btPlay = document.querySelector('#btPlay');
export const TIMEOUTGAME = 120; // seconds

export const labelGameTime = document.querySelector('#gameTime');
export const labelPoints = document.querySelector('#points');
export let totalPoints;
export let timer = TIMEOUTGAME;
export let timeoutGameId; 
export let flippedCards;
export let timerId;
export let totalFlippedCards;


export const PLACEHOLDER_CARD_PATH = "/assets/images/";
export const PLACEHOLDER_CARDBACK_PATH = `${PLACEHOLDER_CARD_PATH}ls.png`;
