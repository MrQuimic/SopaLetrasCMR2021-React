import { LETTERS, wordListBase} from "../constants";

let soup = [];
let soupAux = [];

let width = 15;
let soupWordIds = []; //current selection - always being deleted
let availableGameIds = [];
let wordsNofit = []; //words that do not fit in soup
let wordsNofit2 = []; //words that do not fit in soup
let IdtoX;
let i,
  j;
let IdtoY;



let directionList = [
  "horizontal",
  "horizontalBack",
  "vertical",
  "verticalUp",
  "diagonal",
  "diagonalUp",
  "diagonalBack",
  "diagonalUpBack",
];

export function fillSoup(words, opt, opt2) {

  resetnoFit(wordsNofit);
  wordsNofit=[];
  wordsNofit2=[];
 
  let height = words.length + opt2; //number of words eaul to number of lines
  availableIds(height);
  resetSoup(height);


  for (let i = 0; i < words.length; i++) {
  
    let word = words[i].name;
    if (!InsertLetters(words[i].name, height)) { //first run
      wordsNofit.push(words[i].name);
 
    }
  }

  if(wordsNofit.length>0){ // second run
  for (i = 0; i < wordsNofit.length; i++) {
  if (!InsertLetters(wordsNofit[i], height)) {
    wordsNofit2.push(wordsNofit[i]);
   console.log("Words No fit: " + wordsNofit2[i]);
  }
}

}


  fillBlank(opt, height, soupWordIds);

  return [soupAux, soupWordIds, wordsNofit2];

}

function InsertLetters(word, height) {
  let wordSize = word.length;

  let directionsSize = directionList.length;

  let nextX = 0;
  let nextY = 0;
  let countEmpty = 0;
  let flagnoFind = false;
  let randDirection2;
  let nextXF1;
  let nextYF1;

  let countflagnoFind = 0;

  do {


    do {
      nextX = randomIntFromInterval(0, height - 1);
      nextY = randomIntFromInterval(0, width - 1);


      randDirection2 = randomIntFromInterval(1, directionsSize); //random direction try
    
    }while(soup[nextX][nextY] !== "" && soup[nextX][nextY] !== word[0]);
    

    countEmpty = 1;

    nextXF1 = nextX; //first letter x
    nextYF1 = nextY; //first letter y
  

    for (let j = 1; j < wordSize; j++) {
      nextX = CoordNext(nextX, nextY, randDirection2, "x", height);
      nextY = CoordNext(nextX, nextY, randDirection2, "y", height);

      if (nextX < 0 || nextY < 0 || nextX >= height || nextY >= width) {
        countEmpty = 0;
        break;
      }

      if (soup[nextX][nextY] === "" || soup[nextX][nextY] === word[j]) {

        countEmpty++;
      }
    }

    countflagnoFind++;

  } while (
    flagnoFind === false &&
    countflagnoFind <= 50 &&
    countEmpty !== wordSize
  );


  if (countEmpty === wordSize) {


    nextX = nextXF1;
    nextY = nextYF1;

    soup[nextXF1][nextYF1] = word[0];
    soupWordIds.push({x:nextX, y:nextY, id: translateXYtoId(nextX, nextY, width), letter: word[0], wordName: word});
    for (let k = 1; k < wordSize; k++) {
      nextX = CoordNext(nextX, nextY, randDirection2, "x", height);
      nextY = CoordNext(nextX, nextY, randDirection2, "y", height);
      
  
      soup[nextX][nextY] = word[k];
      soupWordIds.push({x:nextX, y:nextY, id: translateXYtoId(nextX, nextY, width), letter: word[k], wordName: word});

      flagnoFind = true;
    }
    return 1;
  }

  return 0;
}

function availableIds(height) {
  for (let i = 0; i <= height * width; i++) {
    IdtoXy(i);
    availableGameIds.push({ id: i, x: IdtoX, y: IdtoY });
  }
}
export function fillReset() {
  soup = [];
  soupAux = [];
  soupAux = [];
  soupWordIds = []
  return [soupAux, soupWordIds];
}



function resetSoup(height) {
  let count = 0;
  for (i = 0; i < height; i++) {
    soup.push([]); //rows

    for (j = 0; j < width; j++) {
      count++;
      // put all element in soup of words empty
      soup[i].push("");
    }
  }
}
export function fillBlank(opt, height, soupWordIds) {
  let count = 0;
  let aux = [];
  let Word ="";
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      count++;
      
      if (!soup[i][j]) {
  
        let randomLetter = Math.floor(Math.random() * LETTERS.length);
        Word ="";
        if(opt===1)
          soupAux.push({ id: count, x: j, y: i, name: LETTERS[randomLetter].toUpperCase(), wordName: Word});
        else
        soupAux.push({ id: count, x: j, y: i, name: LETTERS[randomLetter], wordName: Word});    

     
      } else {
        for (let soupWords of soupWordIds) {
          if (soupWords.id === count+1){
            Word = soupWords.wordName;
  
          }
        }
          

        soupAux.push({ id: count, x: j, y: i, name: soup[i][j], wordName: Word});
         
        
      }
    }
  }
console.log(soup[count]);
  count=0;
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      count++;
      
      if (soup[count] && (soup[count].name=="A" || soup[count].name=="a")) {
  
       
    
      
          soupAux.name=".";
       

     
      } 
    }
  }
  
  return soupAux;
}

function CoordNext(x, y, direction, coordType, height) {
  if (direction === 1) {
    //horizontal to the right
    x = x;
    y = y + 1;
  } else if (direction === 2) {
    //horizontal Back to the left
    x = x;
    y = y - 1;
  } else if (direction === 3) {
    //up
    x = x + 1;
    y = y;
  } else if (direction === 4) {
    //down
    x = x - 1;
    y = y;
  } else if (direction === 5) {
    //Diagonal down - right
    x = x + 1;
    y = y + 1;
  } else if (direction === 6) {
    //Diagonal up - right
    x = x - 1;
    y = y + 1;
  } else if (direction === 7) {
    //Diagonal down - left
    x = x + 1;
    y = y - 1;
  } else if (direction === 8) {
    //Diagonal up - left
    x = x - 1;
    y = y - 1;
  } else {
    //ERROR
    x = 0;
    y = 0;
  }

  if (x < 0 || y < 0 || x >= height || y >= width) return -1;

  if (coordType === "x") return x;
  else return y;
}

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function translateXYtoId(x, y, width) {
  let id;

if (x===0)
  
  id = y+1;
  else
  id = (x) * width + y+1;

  return id;
}

function IdtoXy(id, height) {
  let nColumns = width;
  let nRows = height;
  if (id <= 0 || id >= nRows * nColumns) {
    //if dont have translation

    IdtoX = 0;
    IdtoY = 0; //return 0 0
  }

  let aux;
  aux = id;
  let linha = 0;
  let coluna;

  linha = Math.trunc(aux / (nColumns - 2)) + 1;

  coluna = aux - (linha - 1) * (nColumns - 2);

  if (coluna <= 0) {
    linha--;
    coluna = nColumns - 2;
  }

  IdtoX = linha;
  IdtoY = coluna;
}

const shuffleArray = array => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i].name;
    array[i].name = array[j].name;
    array[j].name = temp;
  }
}

export function startListWords(numWords){
    
  let auxWords = [];
  let tempWordListBase = wordListBase;
  i = 1;
  shuffleArray(tempWordListBase);

  for(i = 1; i <= numWords; i++){
    auxWords.push(tempWordListBase[i-1]);
  }
  //auxWords = wordListBase;

  return auxWords;
}

export function checkSpacesInString(string){
  if(string.indexOf(' ') >= 0){
    
    return true;
  }
    
  return false;
}

export function checkRepeatedWordInArray(string, array){
  for(let i = 0; i < array.length; i++){
    if(array[i].name === string){
      return true;
    } 
  }
  return false;
}


export function addSolutionMain(soupWordIds, wordList,handleWordsFound) {


  for (let idIn of soupWordIds) {
     let id_name = "alphaSpan" + idIn.id;
        document.getElementById(id_name).classList.add("selected");   
  }

}


export function ResetSolution(soupWordIds, wordList,handleWordsFound) {


  for (let idIn of soupWordIds) {
     let id_name = "alphaSpan" + idIn.id;
        document.getElementById(id_name).classList.remove("selected");   
  }

}


export function wordsnoFitCss(wordsNofit2){


  for (let idIn of wordsNofit2) {

     let id_name = idIn;
       document.getElementById(id_name).classList.add("word_NoFit");   
  
}
}


export function resetnoFitCss(WordNof){

  let WordNofAux = WordNof;

  for (let idIn of WordNofAux) {

     let id_name = idIn.name;

     if(id_name != null){
   

         document.getElementById(id_name).classList.remove("word_found");   
       
  }
}
};


export function resetnoFit(WordNof){
  
  let WordNofAux = WordNof;

  for (let idIn of WordNofAux) {

     let id_name = idIn.name;

     if(id_name != null){


         document.getElementById(id_name).classList.remove("word_NoFit");   
      }
  }
};


export default { soup, soupAux, wordsNofit, wordsNofit2,soupWordIds};