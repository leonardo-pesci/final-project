/**------------------------------------------------------------------------
 **                            ESTRAZIONI
 *------------------------------------------------------------------------**/ 
 const playButton = document.querySelector('.playButton');
 const initial = document.querySelector('.initial');
 const clockButton = document.querySelector('.clockButton');
 const treasureButton = document.querySelector('.treasureButton');
 const difficulty = document.querySelectorAll('.difficulty');
 const easy = document.querySelector('#easy');
 const normal = document.querySelector('#normal');
 const hard = document.querySelector('#hard');
 const gameContainer = document.querySelector('.gameContainer');
 const timeCounter = document.querySelector('.timeCounter')
 const scoreCounter = document.querySelector('.scoreCounter');
 const grid = document.querySelector('.grid');
 const flagBox = document.querySelector('.flagBox');
 const pause = document.querySelector('.pause');
 const home = document.querySelector('.home');
 const gamePaused = document.querySelector('.gamePaused')
 const gameOverScreen = document.querySelector('.gameOver');
 const winScreen = document.querySelector('.win');
 const replay = document.querySelectorAll('.replay');
 
 
 
 /**------------------------------------------------------------------------
  **                            VARIABILI
  *------------------------------------------------------------------------**/ 
 const totalCells = 100;
 let totalBombs = '';
 let bombsList = [];
 let maxScore = 0
 let treasureNumber = 1
 let score = 0;
 let time = 0
 let isClock = false
 let isTreasure = false
 let isFlag = false
 let isPaused = false
 
 
 
 /**------------------------------------------------------------------------
  **                            EVENTI
  *------------------------------------------------------------------------**/ 
 clockButton.addEventListener('click', () => {
     isClock = !isClock
     if (isClock){
         clockButton.classList.add('selected')
     }else{
         clockButton.classList.remove('selected')
     }
 })
 
 treasureButton.addEventListener('click', () => {
     isTreasure = !isTreasure
     if (isTreasure){
         treasureButton.classList.add('selected')
     }else{
         treasureButton.classList.remove('selected')
     }
 })
 
 difficulty.forEach( (el) => {
     el.addEventListener( 'click', () => {
         if(el.id === 'easy') {
             console.log(easy)
             easy.classList.add('selected')
             normal.classList.remove('selected')
             hard.classList.remove('selected')
             totalBombs = 10
         }else if(el.id === 'normal') {
             normal.classList.add('selected')
             easy.classList.remove('selected')
             hard.classList.remove('selected')
             totalBombs = 16
         }else if(el.id === 'hard') {
             hard.classList.add('selected')
             easy.classList.remove('selected')
             normal.classList.remove('selected')
             totalBombs = 24
         }
 
     })
 })
 
 playButton.addEventListener('click', () => {
     // controlla se è stata selezionata una difficoltà
     if (totalBombs === '') {
         alert('seleziona prima la difficoltà')
         return
     }
 
     // setto il punteggio massimo
     maxScore = totalCells - totalBombs;
     startGame()
 })
 
 flagBox.addEventListener('click', () => {
     if (!isPaused){
         if (isFlag){
             flagBox.classList.remove('flagSelected')
         }else{
             flagBox.classList.add('flagSelected')
         }
         isFlag = !isFlag
     }
 })
 
 document.addEventListener('keydown', (e) => {
     if (e.code === 'KeyF'){
         if (!isPaused){
             if (isFlag){
                 flagBox.classList.remove('flagSelected')
             }else{
                 flagBox.classList.add('flagSelected')
             }
             isFlag = !isFlag
         }
     }
 })
 
 pause.addEventListener('click', () => {
     if (gameOverScreen.classList.contains('hidden') && winScreen.classList.contains('hidden')){
         if (isPaused){
             gamePaused.classList.add('hidden')
             pause.classList.remove('resume')
             if (isClock) timer()
         }else{
             gamePaused.classList.remove('hidden')
             pause.classList.add('resume')
             if (isClock) clearInterval(t)
         }
         isPaused = !isPaused
     }
 })
 
 document.addEventListener('keydown', (e) => {
     if (e.code === 'Space'){
         if (isPaused){
             gamePaused.classList.add('hidden')
             pause.classList.remove('resume')
             timer()
         }else{
             gamePaused.classList.remove('hidden')
             pause.classList.add('resume')
             clearInterval(t)
         }
         isPaused = !isPaused
     }
 })
 
 home.addEventListener('click', () => {
     window.location.reload()
 })
 
 replay.forEach(button => {
     button.addEventListener('click', () => {
         reGame()
     })
 })
 
 document.addEventListener('keydown', (e) => {
     if (e.code === 'KeyR'){
         reGame()
     }
 })
 
 
 
 /**------------------------------------------------------------------------
  **                            FUNZIONI
  *------------------------------------------------------------------------**/ 
 function startGame(){
     initial.classList.add('hidden')
     gameContainer.classList.remove('hidden')
     play()
 }
 
 function play(){
     getRandomBombs()
     if (isClock){
         timer()
     }
     if (isTreasure){ 
         getRandomTreasure()
     }
     createGrid()
     
 }
 
 function getRandomBombs(){
     while (bombsList.length < totalBombs){
         const number = Math.floor(Math.random() * totalCells) + 1;
         if (!bombsList.includes(number)){
             bombsList.push(number);
         }
     }
     bombsList.sort()
     console.log(bombsList);
 }
 
 function getRandomTreasure(){
     let a = 1
     while (a === 1){
         const number = Math.floor(Math.random() * totalCells) + 1;
         if (!bombsList.includes(number)){
             console.log(number);
             treasureNumber = number
             a++;
         }
     }
 }
 
 function createGrid(){
     let isRowEven = false;
     for (let i = 1; i <= totalCells; i++){
 
         // creo la cella
         const cell = document.createElement('div');
         cell.classList.add('cell');
         cell.dataset.number = i
 
         // celle scure
         if ((i%2 === 0 && !isRowEven) || (i%2 === 1 && isRowEven)){
             cell.classList.add('dark');
         }
 
         if (i % 10 === 0){
             isRowEven = !isRowEven;
         }
         
         cell.addEventListener('click', () => {
 
             // evito che la prima cella cliccata sia una bomba
             if (score === 0 && bombsList.includes(i)) {
                 let newbombsList = bombsList.filter( (e) => {
                     return e != i
                 })
                 console.log(newbombsList)
 
                 bombsList = []
                 while (bombsList.length < totalBombs){
                     const lastBombIndex = Math.floor(Math.random() * totalCells) + 1;
                     if (!bombsList.includes(lastBombIndex)){
                         bombsList = newbombsList.concat(lastBombIndex)
                         console.log(bombsList)        
                     }
                 }
             }
 
             // controllo che non sia già stata cliccata
             if (cell.classList.contains('clicked' || 'bomb')){
                 return
             }else{
 
                 // flag
                 if (isFlag){
                     if (cell.classList.contains('flag')){
                         cell.classList.remove('flag')
                         cell.dataset.flag = ''
                     }else{
                         cell.classList.add('flag')
                         cell.dataset.flag = true
                     }
 
                 }else if (!cell.dataset.flag){
                     // controllo la cella cliccata
                     if (bombsList.includes(i)){
                         // bomba
                         cell.classList.add('bomb');
                         gameOver();
                     }else{
                         // non bomba
                         cell.classList.add('clicked');
                         updateScore();
 
                         // tesoro
                         if (isTreasure){
                             if (i === treasureNumber){
                                 cell.classList.add('treasure')
                                 setTimeout(function(){
                                     win()
                                 }, 1200)
                             }
                         }
 
                         // controllo le celle circostanti e mostro il numero
                         let count = 0
                         if (bombsList.includes(i+10)){
                             count++
                         }
                         if (bombsList.includes(i-10)){
                             count++
                         }
                         if (i % 10 !==0){
                             if (bombsList.includes(i-9)){
                                 count++
                             }
                             if (bombsList.includes(i+1)){
                                 count++
                             }
                             if (bombsList.includes(i+11)){
                                 count++
                             }
                         }
                         if (i % 10 !==1){
                             if (bombsList.includes(i-11)){
                                 count++
                             }
                             if (bombsList.includes(i-1)){
                                 count++
                             }
                             if (bombsList.includes(i+9)){
                                 count++
                             }
                         }
 
                         if (count === 0){
                             count = ''
                         }
 
                         cell.dataset.count = count
 
                         // se la modalità tesoro è attiva e la cella tesoro viene trovata, non mostro il numero
                         if (!(isTreasure && i === treasureNumber)){
                             cell.innerHTML = `<div class='count'>${count}</div>`
                         }
                     }
                 }
             }
         })
 
         // aggiungo la cella
         grid.appendChild(cell);
     }
 }
 
 function timer() {
     t = setInterval(function(){
         time++;
         timeCounter.innerText = String(time).padStart(5, 0);
     }, 1000);
 }
 
 function updateScore(){
 
     // incremento e inserisco il punteggio
     score++;
     scoreCounter.innerText = String(score).padStart(5, 0);
 
     // controllo se l'utente ha vinto
     if (score === maxScore){
         win();
     }
 }
 
 function gameOver(){
     // fermo il timer
     if (isClock){
         clearInterval(t)
     }
     
     // mostro la schermata di Game Over
     gameOverScreen.classList.remove('hidden');
 
     // rivelo tutte le bombe
     revealAllBombs()
 }
 
 /*
 function revealNearbyCells(i){
     const cells = document.querySelectorAll('.cell')
     console.log(i)
     if (i > 10){
         let cell = cells[i-11]
         console.log(cell)
         if (cell.dataset.count === '' && !cell.classList.contains('clicked')){
             console.log('patata')
             revealNearbyCells(i-10)
         }
         cell.classList.add('clicked')
     }
     
     if (i < 91){
         cells[i+9].classList.add('clicked')
         revealNearbyCells(i+10)
     }   
     if (i % 10 !==0){
         if (i > 10){
             cells[i-10].classList.add('clicked')
         }
         cells[i].classList.add('clicked')
         if (i < 91){
             cells[i+10].classList.add('clicked')
         }
     }
     if (i % 10 !==1){
         if (i > 10){
             cells[i-12].classList.add('clicked')
         }    
         cells[i-2].classList.add('clicked')
         if (i < 91){
             cells[i+8].classList.add('clicked')
         }
     }
 }
 */
 
 function revealAllBombs(){
     // raccolgo le celle create
     const cells = document.querySelectorAll('.cell')
     
     i = 1
     cells.forEach(cell => {
         if (bombsList.includes(i)){
             cell.classList.add('bomb')
         };
         i++;
     });
 }
 
 function win(){
     // fermo il timer
     if (isClock){
         clearInterval(t)
     }
     
     // mostra la schermata di vittoria
     winScreen.classList.remove('hidden');
 }
 
 function reGame(){
     if (isClock){
         time = 0
         timeCounter.innerText = String(time).padStart(5, 0);
     }
     winScreen.classList.add('hidden')
     gameOverScreen.classList.add('hidden')
     grid.innerHTML = ''
     bombsList = []
     score = 0
     scoreCounter.innerText = String(score).padStart(5, 0);
     play();
 }
 
 // todo celle vuote automatiche