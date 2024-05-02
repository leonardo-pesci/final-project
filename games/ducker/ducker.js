// * ================================================================================================
// *                                         ELEMENTI
// * ================================================================================================
const initial = document.querySelector('.initial');
const arrow = document.querySelectorAll('.arrow')
const imagePlaceHolder = document.querySelector('.imagePlaceHolder')
const soundButton = document.querySelector('.soundButton');
const heartButton = document.querySelector('.heartButton');
const difficulty = document.querySelectorAll('.difficulty');
const playButton = document.querySelector('.playButton');
const gameContainer = document.querySelector('.gameContainer');
const grid = document.querySelector('.grid');
const scoreCounter = document.querySelector('.scoreCounter');
const coinCounter = document.querySelector('.coinCounter')
const lifePanel = document.querySelector('.lifePanel');
const pause = document.querySelector('.pause');
const home = document.querySelector('.home');
const gamePaused = document.querySelector('.gamePaused');
const adScreen = document.querySelector('.adScreen')
const adFinished = document.querySelector('.adFinished')
const adCountDown = document.querySelector('.adCountDown')
const cross = document.querySelector('.cross')
const endGameScreen = document.querySelector('.endGameScreen');
const endGameText = document.querySelector('.endGameText');
const playAgainButton = document.querySelector('.playAgain');



// * ================================================================================================
// *                                         VARIABILI
// * ================================================================================================



// * --------------------------------------------
// *                PRINCIPALI
// * --------------------------------------------
let vector = [];
let M;
let pos;



// * --------------------------------------------
// *             GRIGLIA E RIGHE
// * --------------------------------------------
let grassRows = [];
let swampRows = []
let railRows = [];
let riverRows = [];
let roadRows = [];
let riverRoadRows = [];
let movingRows = [];
let leftRows = [];
let rowsList = [];
let gridRowsList = [];
let rowsDirections = [];
let gridRowsDirections = [];
let o = [];



// * --------------------------------------------
// *                MODALITÀ
// * --------------------------------------------
let soundMode = false;
let heartMode = false;
let heartNumber;
let isPaused;
let isFinished;



// * --------------------------------------------
// *             ALTRE VARIABILI
// * --------------------------------------------
let maxRowReached;
let before;
let beforeChar;
let speed;
let time;
let timeSelected;
let score;
let charRow;
var xDown = null;
var yDown = null;
let coinsPositions = [];
let coinScore = 0;
let charList = ['duck', 'pig'];
let charIndex = 0;
let char = 'duck';
let seasonList = ['Spring', 'Summer', 'Fall', 'Winter']
let seasonIndex = Math.floor(Math.random() * 4)
let season = seasonList[seasonIndex]
let reloadingTimes
let deathReason
let l
let localReloadingTimes
let audio = new Audio("sigla.mp3")



// * ================================================================================================
// *                                         EVENTI
// * ================================================================================================

// * --------------------------------------------
// *            SCHERMATA INIZIALE
// * --------------------------------------------
soundButton.addEventListener('click', switchSoundMode);

heartButton.addEventListener('click', switchHeartMode);

arrow.forEach( (el) => el.addEventListener('click', () => switchCharacter(el)));

difficulty.forEach( (el) => el.addEventListener('click', () => switchDifficulty(el)));

playButton.addEventListener('click', checkDifficulty);



// * --------------------------------------------
// *            SCHERMATA DI GIOCO
// * --------------------------------------------
cross.addEventListener('click', closeAd)

pause.addEventListener('click', pauseMode);

document.addEventListener('keydown', (e) => detectSpace(e));

home.addEventListener('click', reGame);

playAgainButton.addEventListener('click', startGame);



// * ================================================================================================
// *                                         FUNZIONI
// * ================================================================================================

// * --------------------------------------------
// *                  AVVIO
// * --------------------------------------------
function startGame(){
  // nasconde la schermata iniziale / di fine gioco e mostra il gioco
  initial.classList.add('hidden');
  endGameScreen.classList.add('hidden');
  gameContainer.classList.remove('hidden');

  let index = Math.floor(Math.random() * 1)
  if (index === 0){
    let list = ['CoppaDelRe', 'ChatVenture', 'CampoMinato']
    let index = Math.floor(Math.random() * list.length)
    let adSelected = list[index]
    // showAd(adSelected)
  }

  // attiva gli eventi relativi ai movimenti della papera
  document.addEventListener('keydown', moveChar);
  document.addEventListener('touchstart', handleTouchStart, false);
  document.addEventListener('touchmove', handleTouchMove, false);

  // imposta / resetta i valori
  resetValues();

  // mostra la barra della vita se è stata selezionata la modalità heartMode
  if (heartMode) lifePanel.classList.remove('hidden');

  // crea la matrice
  createLevel()

  // attiva il movimento delle righe
  loop();

  // mostra la papera e la griglia
  placeChar();
  drawGrid();
}; // ? passa dalla schermata iniziale al tabellone, avviando le meccaniche di gioco

function resetValues(){
  isPaused = false;
  isFinished = false;
  before = '';
  beforeChar = '';
  score = 0;
  scoreCounter.innerText = '00000';
  charRow = 1;
  grassRows = [];
  swampRows = []
  railRows = [];
  riverRows = [];
  roadRows = [];
  riverRoadRows = [];
  movingRows = [];
  leftRows = [];
  rowsList = [];
  gridRowsList = [];
  rowsDirections = [];
  gridRowsDirections = [];
  lifePanel.innerHTML = '<div class="heart"></div> <div class="heart"></div> <div class="heart"></div>'
  hearts = document.querySelectorAll('.heart');
  heartNumber = 3;
  M = []
  pos = {
    row: 10,
    col: 4
  };
  maxRowReached = 1;
  reloadingTimes = 0
  clearInterval(l)
}; // ? // imposta / resetta le variabili utili alla logica di gioco

function loop(){
  // avvia / riavvia il movimento delle righe
  l = setInterval(moveAllRows, speed);
}; // ? avvia il movimento delle macchine e quello dei treni

function showAd(ad){
  adScreen.classList.remove('hidden')
  adScreen.classList.add(ad)
  console.log(ad)

  // countdown
  let countDown = 5
  adCountDown.innerText = countDown
  p = setInterval( () => {
    countDown--
    if (countDown === 0){
      adCountDown.classList.add('hidden')
      cross.classList.remove('hidden')
      if (ad === 'CoppaDelRe') adTitle = 'Coppa del Re'
      else if (ad === 'ChatVenture') adTitle = 'ChatVenture'
      else if (ad === 'CampoMinato') adTitle = 'Campo Minato'
      adFinished.innerHTML = `<h2 class="text adText hidden">${adTitle}</h2> <a class="adButton hidden" href="https://extraordinary-hummingbird-e7a7ba.netlify.app/">GIOCA!</a>`
      const adText = document.querySelector('.adText')
      const adButton = document.querySelector('.adButton')
      adFinished.classList.remove('hidden');
      adText.classList.remove('hidden');
      adButton.classList.remove('hidden');

      // https://extraordinary-hummingbird-e7a7ba.netlify.app/
      
      clearInterval(p)
    }

    adCountDown.innerText = countDown

  }, 1000)
} // ? mostra la pubblicità



// * --------------------------------------------
// *                TIMER E SCORE
// * --------------------------------------------
function timer(){
  t = setInterval( () => {
    if (time === 0) endGame('outOfTime');
    else time--;
  }, 1000);
}; // ? regola il timer e termina il gioco quando questo arriva a 0

function checkProgress(){
  // se è stata sbloccata una nuova riga e questa non provoca la morte della papera
  if (charRow > maxRowReached && ['grass', 'road', 'wood', 'lilypad', 'rail'].includes(M[pos.row][pos.col])){

    // aggiorna la riga più alta raggiunta e lo score
    maxRowReached = charRow;
    updateScore();

    // resetta il timer e lo avvia se la papera è avanzata per la prima volta
    time = timeSelected;
    if (score === 1) timer();
  }
}; // ? aumenta lo score e resetta il timer quando viene sbloccata una nuova riga

function updateScore(){
  // aggiorna lo score e la sua grafica
  score++
  scoreCounter.innerText = String(score).padStart(5, 0);
}; // ? aggiorna lo score e fa scorrere la matrice se lo score è compreso in un certo intervallo

function updateCoin(){
	coinScore++
	coinCounter.innerText = coinScore
}



// * --------------------------------------------
// *             FUNZIONI-EVENTO
// * --------------------------------------------
function switchSoundMode(){
  // cambia la variabile
  soundMode = !soundMode;

  // modifica la grafica e attiva / disattiva l'audio
  if (soundMode){
    soundButton.classList.add('soundOn');
    soundButton.classList.remove('soundOff');

    audio.play()
  }else{
    soundButton.classList.add('soundOff');
    soundButton.classList.remove('soundOn');

    audio.pause()
  }
}; // ? attiva / disattiva la modalità soundMode

function switchHeartMode(){
  // attiva / disattiva la modalità heartMode
  heartMode = !heartMode;

  // modifica la grafica
  if (heartMode) heartButton.classList.add('selected');
  else heartButton.classList.remove('selected');
}; // ? attiva / disattiva la modalità heartMode

function detectSpace(e){
  // intercetta la barra spaziatrice e chiama la funzione pauseMode
  if (e.code === 'Space') pauseMode();
}; // ? chiama la funzione pauseMode quando viene premuta la barra spaziatrice

function pauseMode(){
  // se il gioco è finito
  if (isFinished) return;

  // attiva / disattiva la modalità pausa
  isPaused = !isPaused;

  if (isPaused){
    // se attivo, ferma il timer
    if (score >= 1) clearInterval(t);

    // ferma il movimento delle righe
    clearInterval(l);
    moveAllTrains('stop')

    // cambia la grafica
    gamePaused.classList.remove('hidden');
    pause.classList.add('resume');
  }else{
    // se è stata raggiunta la seconda riga, attiva / riattiva il timer
    if (score >= 1) timer();

    // attiva / riattiva il movimento delle righe
    loop();
    moveAllTrains('start')
    
    // cambia la grafica
    gamePaused.classList.add('hidden');
    pause.classList.remove('resume');
  };
}; // ? attiva / disattiva la modalità pauseMode, interrompendo / riprendendo timer e loop

function switchCharacter(el){
	// imposta la velocità in base alla difficoltà selezionata e aggiorna la grafica
	if(el.id === 'leftArrow') {
		if (charIndex === 0) charIndex = (charList.length - 1)
	  	else charIndex--
	}else if(el.id === 'rightArrow') {
	  	if (charIndex === (charList.length - 1)) charIndex = 0
		else charIndex++
	};

	char = charList[charIndex]

	imagePlaceHolder.innerHTML = `<img src="img/characters/${char}/walk.gif"></img>`
}; // ? cambia il personaggio selezionato

function switchDifficulty(el){
  // imposta la velocità in base alla difficoltà selezionata e aggiorna la grafica
  if(el.id === 'easy') {
    easy.classList.add('selected');
    normal.classList.remove('selected');
    hard.classList.remove('selected');
    speed = 1000;
    timeSelected = 15;
  }else if(el.id === 'normal') {
    normal.classList.add('selected');
    easy.classList.remove('selected');
    hard.classList.remove('selected');
    speed = 600;
    timeSelected = 8;
  }else if(el.id === 'hard') {
    hard.classList.add('selected');
    easy.classList.remove('selected');
    normal.classList.remove('selected');
    speed = 400;
    timeSelected = 5;
  };
}; // ? cambia la difficoltà selezionata

function checkDifficulty(){
  // controlla se è stata selezionata una difficoltà
  if (isNaN(speed)) alert('seleziona prima la difficoltà');
  else startGame();
}; // ? controlla che sia stata selezionata la difficoltà e avvia il gioco

function closeAd(){
  // chiude la pubblicità
  adScreen.classList.add('hidden')

  // resetta le varie classi
  adCountDown.classList.remove('hidden')
  cross.classList.add('hidden')
  adText.classList.add('hidden')
  adButton.classList.add('hidden')
  adFinished.classList.add('hidden')
}; // ? chiude la pubblicità



// * --------------------------------------------
// *                   TOUCH
// * --------------------------------------------
function handleTouchStart(e){
  xDown = e.touches[0].clientX;
  yDown = e.touches[0].clientY;
}; // ? intercetta il tocco del dito

function handleTouchMove(e){
  // ricolloca ciò che c'era al posto della paperella
  M[pos.row][pos.col] = before;
  
  if (!xDown || !yDown) return;
  var xUp = e.touches[0].clientX;
  var yUp = e.touches[0].clientY;
  var xDiff = xDown - xUp;
  var yDiff = yDown - yUp;

  // individua la direzione dello swipe e successivamente il verso
  if (Math.abs(xDiff) > Math.abs(yDiff)){
    if (xDiff > 0) moveLeft();
    else moveRight();
  }else{
    if (yDiff > 0) moveUp();
    else moveDown();
  };

  // resetta i valori
  xDown = null;
  yDown = null;

  // aggiorna la grafica
  drawElements();
}; // ? intercetta il movimento del dito



// * --------------------------------------------
// *              MOVIMENTO PAPERA
// * --------------------------------------------
function moveChar(event){
  // ricolloca ciò che c'era al posto della paperella
  M[pos.row][pos.col] = before;

  // rileva la freccia premuta
  switch (event.key) {
    case 'ArrowUp':
      moveUp();
      break;
    case 'ArrowDown':
      moveDown();
      break;
    case 'ArrowLeft':
      moveLeft();
      break;
    case 'ArrowRight':
      moveRight();
      break;
    default:
      return;
  }
  
  // aggiorna la grafica
  drawElements();
}; // ? permette il movimento della papera con le frecce

function moveUp(){
  // fa scorrere la matrice se la papera ha superato il centro
  if (pos.row > 0 && !['rock', 'tree', 'lightOn', 'lightOff'].includes(M[pos.row - 1][pos.col])){
    if (pos.row === 5) updateMatrix();
    charRow++
    if (pos.row > 5){
      pos.row--;
    }
    
    // controlla se è stata sbloccata una nuova riga
    checkProgress();
  }
}; // ? muove la papera verso l'alto (e segna se ha sbloccato una nuova riga)

function moveDown(){
  if (pos.row < (M.length - 1)  && !['rock', 'tree', 'lightOn', 'lightOff'].includes(M[pos.row + 1][pos.col])){
    pos.row++;
    charRow--
  }
}; // ? muove la papera verso il basso

function moveLeft(){
  if (pos.col > 0  && !['rock', 'tree', 'lightOn', 'lightOff'].includes(M[pos.row][pos.col - 1])) pos.col--;
}; // ? muove la papera verso sinistra

function moveRight(){
  if (pos.col < 8  && !['rock', 'tree', 'lightOn', 'lightOff'].includes(M[pos.row][pos.col + 1])) pos.col++;
}; // ? muove la papera verso destra



// * --------------------------------------------
// *           AGGIORNAMENTO GRAFICA
// * --------------------------------------------
function drawElements(){
  // chiama le 3 funzioni che aggiornano la griglia e controllano lo stato della papera

  // memorizza cosa c'era nella cella prima della papera
  before = M[pos.row][pos.col];
  checkStatus();
  placeChar();
  drawGrid();
  // console.table(M)
}; // ? raggruppa le funzioni che aggiornano la grafica e controllano lo stato della papera

function placeChar(_eagle){
  // memorizza cosa c'era nella cella prima della papera
  before = M[pos.row][pos.col];

  coinsPositions.forEach( (coin, i) => {
    if (pos.row === (10 - coin.row + reloadingTimes) && pos.col === coin.col){

      // nasconde la moneta
      coinsPositions[i] = {}
      updateCoin()
    }
  });

  // inserisce la papera al suo posto
  if (!isFinished || _eagle) M[pos.row][pos.col] = `${char}`;
}; // ? memorizza il contenuto della cella e ci sposta la papera

function checkStatus(){
  // investita
  if (before === 'car' || before === 'jeep' || before === 'bus' || before === 'camion1' || before === 'camion2') endGame(`${char}Hit`);

  // treno
  if (before === 'train1' || before === 'train2' || before === 'train3') endGame(before);

  // annegata
  if (before === 'river' || before === 'swamp') endGame(`${char}Drowned`);

  // mangiata
  if (before === 'crocodile') endGame(`${char}Eaten`);
}; // ? controlla che la papera possa spostarsi altrimenti termina la partita

function drawGrid(){
  // svuota la griglia
  grid.innerHTML = '';

  grassRows = [];
  swampRows = [];
  riverRows = [];
  roadRows = [];
  riverRoadRows = [];
  movingRows = [];

  // cicla le righe
  M.forEach( (rowContent, i) => {

    if (['river', 'road', 'rail'].includes(gridRowsList[10 - i])) movingRows.push(i)

    // console.table(M)
    // cicla le celle
    rowContent.forEach( (cellContent, j) => {

      if (j < 9){
        // crea la cella
        const cell = document.createElement('div');
        cell.classList.add('cell');

        // colora le righe relative a fiumi, paludi, strade, rotaie ed erba
        if (gridRowsList[10 - i] === 'grass'){

          // aggiunge le stagioni
          cell.classList.add(`grass${season}`)
        }else{
          cell.classList.add(gridRowsList[10-i])
        }

        // aggiunge la grafica alla cella
        cell.classList.add(cellContent);

        // aggiunge le monete
        coinsPositions.forEach(coin => {
          
          if (i === (10 - coin.row + reloadingTimes) && j === coin.col){
            cell.classList.add('coin')
          } 
        });

        if (isFinished && i === pos.row && j === pos.col){
          cell.classList.add(deathReason)
        }

        // aggiunge la grafica alla cella
        if (gridRowsList[10 - i] === 'grass'){

          // aggiunge le stagioni
          if (['grass', 'tree', 'rock'].includes(cellContent)) cell.classList.add(`${cellContent + season}`)
        }else{
          cell.classList.add(cellContent);
        }

        // inverte la direzione dei veicoli dove serve
        if (gridRowsDirections[10 - i] === 'left') cell.classList.add('reverse');

        // la inserisce nella griglia
        grid.appendChild(cell);
      };
    });

  });
}; // ? aggiorna la grafica della griglia mostrando le modifiche



// * --------------------------------------------
// *         MOVIMENTO STRADE E FIUMI
// * --------------------------------------------
function moveAllRows(){
  // gestisce la posizione e lo spostamento della papera
  handleCharPosition();

  M.forEach( (rowContent, rowIndex) => {

    // muove le righe dei fiumi e delle strade
    if (['road', 'river'].includes(gridRowsList[10 - rowIndex])){
      moveRow(rowContent, rowIndex);
    };
  });

  // aggiorna la grafica
  drawElements();
}; // ? muove i tronchi e i veicoli, rispettando le direzioni delle righe

function moveRow(rowContent, rowIndex){
  // estrae la riga

  // muove i veicoli / tronchi all'interno della riga
  if (gridRowsDirections[10 - rowIndex] === 'right'){
    const lastCell = rowContent.pop();
    rowContent.unshift(lastCell);
  }else if (gridRowsDirections[10 - rowIndex] === 'left'){
    const firstCell = rowContent.shift();
    rowContent.push(firstCell);
  };
}; // ? muove la riga sapendone l'indice e la direzione

function handleCharPosition(){
  // ricolloca l'elemento che c'era prima della papera
  M[pos.row][pos.col] = before;
  
  // corretto spostamento sui tronchi
  if (gridRowsList[10 - pos.row] === 'river'){
    if (gridRowsDirections[10 - pos.row] === 'right') pos.col++;
    if (gridRowsDirections[10 - pos.row] === 'left') pos.col--;
  };
}; // ? gestisce il corretto spostamento della papera sui tronchi



// * --------------------------------------------
// *             MOVIMENTO TRENI
// * --------------------------------------------
function moveAllTrains(state){
  if (state === 'start'){
    railRows.forEach( (row, i) => {
      o[row] = setInterval( () => {
        moveTrain(row)
      }, ((i % 11) + 1200))
    })
  }else if (state === 'stop'){
    railRows.forEach(row => {
      o[row] = clearInterval(o[row])
    })
  }
}; // ? muove i treni diversificando i timer

function moveTrain(rowIndex){
  localReloadingTimes = reloadingTimes

  // interrompe la funzione se la riga non è visibile
  if (rowIndex >= 11) return
 
  // accende il semaforo
  // switchTrainLight(rowIndex, 'lightOff');

  // estrae la direzione della riga
  setTimeout( () => {
    // cicla le celle
    M[rowIndex].forEach( (cell, j) => {
      
      // testa del treno
      setTimeout( () => {
        moveWagon(rowIndex, j, 'train1')
      }, j * 25);

      // vagone
      setTimeout( () => {
        moveWagon(rowIndex, j, 'train2')
      }, j * 25 + 20);

      // coda
      setTimeout( () => {
        moveWagon(rowIndex, j, 'train3')
      }, j * 25 + 620);

      // binario
      setTimeout( () => {
        moveWagon(rowIndex, j, 'rail');
      }, j * 25 + 640);

    })
  }, 600);

  // spegne il semaforo
  // g = setTimeout( () => {
  //   switchTrainLight(rowIndex, 'lightOn');
  // }, 1000);
}; // ? muove la riga del treno
//! sistemare semaforo

function switchTrainLight(rowIndex, state){
  M[pos.row][pos.col] = before;

  // accende / spegne il semaforo
  M[rowIndex - 1][5] = state;

  // aggiorna la grafica
  drawElements();
}; // ? gestisce la meccanica del semaforo del treno

function moveWagon(rowIndex, j, content){
  M[pos.row][pos.col] = before;

  let isRight;
  if (gridRowsDirections[rowIndex] === 'right') isRight = true
  else if (gridRowsDirections[rowIndex] === 'left') isRight = false

  // aggiunge / rimuove la classe treno nella giusta direzione
  if (isRight) M[rowIndex + (reloadingTimes - localReloadingTimes)][j] = content;
  else M[rowIndex + (reloadingTimes - localReloadingTimes)][M[rowIndex].length - 1 - j] = content;

  // aggiorna la grafica
  drawElements();
};



// * --------------------------------------------
// *             CREAZIONE RIGHE
// * --------------------------------------------
function createLevel(){
  row = ['grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass']
  M.push(row)
  rowsList.push('grass')
  gridRowsList.push('grass')
  rowsDirections.push('')
  gridRowsDirections.push('')

  for (i = 2; i <= 11; i++){
    results = getRandomType(i)
    type = results[0]
    direction = results[1]
    row = createRow(type, i, direction)
    M.unshift(row)
  }
}; // ? crea la matrice che contiene le prime 11 righe

function getRandomType(rowNumber){
  // definisce variabili utili
  let last1 = rowsList[rowsList.length - 1]
  let last2 = rowsList[rowsList.length - 2]
  let last3 = rowsList[rowsList.length - 3]
  let last4 = rowsList[rowsList.length - 4]
  let last5 = rowsList[rowsList.length - 5]

  // seleziona il tipo di riga
  let list = ['rail', 'river', 'river', 'swamp', 'road', 'road', 'road', 'road', 'grass', 'grass', 'grass']
  if (speed === 400) list.length = 7

  // controlla la randomizzazione delle tipologie di riga
  if (rowNumber <= 2){
    type = 'grass'
  }else{
    if (last1 === 'swamp'){
      list = ['grass', 'river', 'road']
      let rand = Math.floor(Math.random() * 3)
      if (rand !== 0) list = ['river']
    }else if (last1 === 'road' && last2 === 'road' && last3 === 'road' && last4 === 'road'){
      list = ['grass']
    }else if (last1 === 'rail' && last2 === 'rail' && last3 === 'rail'){
      list = ['grass']
    }else if (last1 === 'river' && last2 === 'river' && last3 === 'river'){
      list = ['grass', 'swamp']
    }else if (last1 === 'grass' && last2 === 'grass'  && last3 === 'grass'){
      list = ['rail', 'river', 'swamp', 'road']
    }else if (last1 === 'road' && last2 !== 'road'){
      let rand = Math.floor(Math.random() * 2)
      if (rand) list = ['road']
    }else if (last1 === 'rail'){
      let rand = Math.floor(Math.random() * 4)
      if (rand === 0){
        list = ['rail']
      }else{
        list = ['grass', 'road']
      }
    }else if (last1 === 'river'){
      let rand = Math.floor(Math.random() * 4)
      if (rand !== 0) list = ['grass', 'swamp']
    }

    if (['river', 'swamp'].includes(last1) && ['river', 'swamp'].includes(last2) && ['river', 'swamp'].includes(last3) && ['river', 'swamp'].includes(last4)){
      list = ['grass']
    }else if (last1 !== 'grass' && last2 !== 'grass' && last3 !== 'grass' && last4 !== 'grass' && last5 !== 'grass'){
      list = ['grass']
    }

    // se la riga è tra le prime 11 generate, evita che sia una rotaia
    if (rowNumber <= 11)
      if (list.includes('rail')) list.shift()

    // list = ['grass', 'rail']
    let index = Math.floor(Math.random() * list.length)
    type = list[index]
  }
 
  rowsList.push(type)
  gridRowsList = rowsList.slice(-11)

  // estrae la direzione
  direction = compileDirections()

  return [type, direction]
}; // ? estrae un tipo di riga a caso tra grass, road, river, swamp e rail con criterio

function createRow(type, rowNumber, direction){
  // passa i seguenti argomenti: lista, nelementi, elementsList, emptyList, minElements, maxElements
  if (type === 'grass'){
    list = ['grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'tree', 'tree', 'rock']
    var row = getRandomElements(list, 9, ['tree', 'rock'], ['grass'], 2, 3,)
  }else if (type === 'river'){
    list = ['river', 'river', 'river', 'river', 'river', 'river', 'river', 'river', 'river', 'river', 'crocodile', 'wood', 'wood', 'wood', 'wood', 'wood', 'wood', 'wood']
    var row = getRandomElements(list, 12, ['wood'], ['river', 'crocodile'], 4, 6)
  }else if (type === 'swamp'){
    list = ['swamp', 'swamp', 'swamp', 'swamp', 'swamp', 'swamp', 'lilypad', 'lilypad', 'lilypad']
    var row = getRandomElements(list, 9, ['lilypad'], ['swamp'], 3, 4)
  }else if (type === 'road'){
    list = ['road', 'road', 'road', 'road', 'road', 'road', 'road', 'road', 'car', 'car', 'jeep', 'bus']
    var row = getRandomElements(list, 12, ['car', 'jeep', 'bus', 'camion1', 'camion2'], ['road'], 3, 4, direction)
  }else if (type === 'rail'){
    var row = ['rail', 'rail', 'rail', 'rail', 'rail', 'rail', 'rail', 'rail', 'rail']
  }

  // moneta
  // se la riga non è fiume
  if (type !== 'river'){
    let index = Math.floor(Math.random() * 5)
    if (index === 0) addCoin(rowNumber, row)
  }

  return row
}; // ? compila gli argomenti per chiamare correttemente la funzione getRandomElements

function addCoin(rowNumber, row){
  // riduce a 9 la lunghezza della riga se è maggiore
  cutRow = row.slice(0, 9)

  // crea un nuovo array includendo solo le celle in cui possono comparire monete
  let allowedIndex = []
  cutRow.forEach( (el, i) => {
    if (['grass', 'lilypad', 'rail', 'road'].includes(el)) allowedIndex.push(i)
  });

  let index = Math.floor(Math.random() * allowedIndex.length)
  let coinPos = {
    row: rowNumber - 1,
    col: allowedIndex[index],
  }

  coinsPositions.push(coinPos)
}

function getRandomElements(list, rowLength, elementsList, emptyList, minElements, maxElements, _direction){
  // definisce variabili utili alla generazione della riga
  let row = []
  let countElement = 0
  let countEmpty = 0
  let prev
  let index = 0
  let i = 0

  // cicla le celle
  while (row.length < rowLength){

    // estrae un elemento
    index = Math.floor(Math.random() * list.length)
    cell = list[index]
    
    // gestisce il posizionamento di alcuni elementi
    if (['car', 'jeep', 'bus', 'camion1', 'camion2', 'tree', 'rock'].includes(prev) || (i === (rowLength - 1) && emptyList[0] === 'road')){

      cell = emptyList[0]

    }

    if ( emptyList[0] === 'road' && prev === 'road' && i < (rowLength - 2)){
      index = Math.floor(Math.random() * 10)
      if (index === 0){
        if (_direction === 'left') cell = 'camion1'
        else if (_direction === 'right') cell = 'camion2'
      }
    }

    if (prev === 'camion1' && _direction === 'left') cell = 'camion2'
    else if (prev === 'camion2' && _direction === 'right') cell = 'camion1'

    prev = cell


    // incrementa il conteggio degli elementi / delle celle vuote 
    if (elementsList.includes(cell)) countElement++
    else if (emptyList.includes(cell)) countEmpty++

    // modifica la lista se necessario
    if (list.length > 3){
      if (countElement === maxElements) list = list.slice(0, 1)
      if (countEmpty === (rowLength - minElements)) list = list.slice(-3)
    }

    // inserisce la cella
    row.push(cell)

    i++
  }

  return row
}; // ? estrae elementi a caso tra rock, tree, car, river... a seconda della riga e la compone

function compileDirections(){
  let direction
  if (['road', 'river', 'rail'].includes(type)) direction = getRandomDirection()
  rowsDirections.push(direction)
  gridRowsDirections = rowsDirections.slice(-11)

  return direction
}; // ? riempie i due array di controllo che registrano le direzioni delle righe

function getRandomDirection(){
  const directions = ['left', 'right'];
  const index = Math.floor(Math.random() * 2);
  const choseDirection = directions[index];
  
  return choseDirection;
}; // ? estrae una direzione a caso tra left e right

function updateMatrix(){
  reloadingTimes++;
  
  moveAllTrains('stop')

  M.pop()
  let rowNumber = 11 + reloadingTimes
  list = getRandomType(rowNumber)
  type = list[0]
  direction = list[1]
  M.unshift(createRow(type, rowNumber, direction))

  // meccanica treni
  railRows.forEach( (row, i) => {
    if (row <= 9) railRows[i] = (row + 1)
    else railRows.pop();
  })

  if (gridRowsList[10] === 'rail'){
    railRows.unshift(0)
  }

  moveAllTrains('start')

}; // ? faccio scorrere la matrice verso il basso rimuovendo l'ultima riga e aggiungendone una nuova



// * --------------------------------------------
// *                FINE GIOCO
// * --------------------------------------------
function endGame(reason){

  // se il giocatore non ha terminato le vite, annulla l'endGame
  if (heartMode && heartNumber > 1 && reason !== 'outOfTime'){
    reduceHearts();
    return;
  } else if (heartMode){
    hearts.forEach( (heart) => heart.classList.add('heartUsed'));
  }

  deathReason = reason
  isFinished = true;

  // ferma i timer
  clearInterval(t);
  railRows.forEach(rowIndex => clearInterval(o[rowIndex]));

  // rimuove gli eventi
  document.removeEventListener('keydown', moveChar);
  document.removeEventListener('touchstart', handleTouchStart, false);
  document.removeEventListener('touchmove', handleTouchMove, false);
  pause.removeEventListener('click', pauseMode);
  home.removeEventListener('click', location.reload);

  // altre meccaniche di fine gioco
  let delay = 500;
  if (reason === 'outOfTime'){
    delay = 1000;
    eagle();
  }

  // mostra la schermata di endGame
  setTimeout( () => {
    if (isPaused) gamePaused.classList.add('hidden');
    endGameScreen.classList.remove('hidden');

    // sposta il focus sul pulsante playAgain
    playAgainButton.focus();
  }, delay);
}; // ? termina il gioco comportandosi in maniera differente a seconda della ragione del termine

function reduceHearts(){
  // riduce il numero dei cuori
  heartNumber--;
    
  // aggiorna la grafica dei cuori
  hearts[heartNumber].classList.add('heartUsed')

  // fa arretrare di una posizione la paperella
  M[pos.row][pos.col] = before
  pos.row++;

  // se incontra una roccia o un albero la sposta verso destra / sinistra
  while (['rock', 'tree', 'lightOn', 'lightOff'].includes(M[pos.row][pos.col])){
    if (pos.col === 8){
      while (['rock', 'tree', 'lightOn', 'lightOff'].includes(M[pos.row][pos.col])) pos.col--;
    }else pos.col++
  };
  
  // aggiorna la grafica
  drawElements()  
}; // ? riduce il numero di cuori e retrocede correttamente la papera

// ! sistema funzione aquila (inclusi beforeEagle e beforChar)
function eagle(){
  // colloca l'aquila sulla riga più in alto, corrispondente colonna dove si trova la papera
  let eaglePos = {
    row: 0,
    col: pos.col,
  };

  // salvo il contenuto della cella dove si trova la papera
  beforeChar = M[pos.row][pos.col];

  // cicla le celle della colonna
  for (let i = 0; i < 12; i++) {
    e = setTimeout( () => {

      // quando l'aquila raggiunge la riga più bassa, sparisce
      if (i === 11){
        M[10][eaglePos.col] = beforeEagle;
        drawGrid();
        return;
      };

      // fa scorrere l'aquila
      beforeEagle = M[eaglePos.row][eaglePos.col];
      if (eaglePos.row < pos.row) placeChar(true);
      else M[pos.row][pos.col] = beforeChar;
      drawElements();
      M[eaglePos.row][eaglePos.col] = 'eagle';

      // aggiorno la grafica
      drawGrid();
      eaglePos.row++;
      M[eaglePos.row - 1][eaglePos.col] = beforeEagle;
    }, i * 600);
  };
}; // ? gestisce la grafica dell'endGame per out of time

function reGame(){
  location.reload();
}; // ? chiude la partita e ne avvia una nuova



// * ================================================================================================
// *                                         NOTE
// * ================================================================================================
// ! CSS aquila sugli elementi
// ! sistema funzione resetValues
// ! a volte la moneta viene generata su un albero o su una pietra

// todo sistema il problema delle trainRows
// ! resetta e richiama la funzione moveAllTrains ogni volta che la matrice si aggiorna
// * potrebbe essere utile definire una variabile isTrain ed impostarla a true quando un treno sta passando, in modo che non partano altri treni

// ! semaforo treno sul binario
// ! riattivare la funzione switchTrainLight

// todo aggiungi evento per il tocco singolo
// ! se lo spostamento del tocco è insignificante, chiama moveUp

// todo riordinare il codice
// ! ottimizzare le funzioni e i blocchi di codice
// ! rimuovere variabili inutili
// ! togliere spazi vuoti / inutilizzati
// ! ridurre il codice dove possibile
// ! metti i punti e virgola
// ! rivedere i commenti

// todo testare il gioco