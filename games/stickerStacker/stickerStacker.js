/**------------------------------------------------------------------------
 **                            ESTRAZIONI
 *------------------------------------------------------------------------**/
const scoreCounter = document.querySelector('.scoreCounter')
const grid = document.querySelector('.grid')
const stackButton = document.querySelector('.buttonFull')
const endGameScreen = document.querySelector('.endGameScreen')
const endGameText = document.querySelector('.endGameText')
const playAgain = document.querySelector('.playAgain')



/**------------------------------------------------------------------------
 **                            VARIABILI
 *------------------------------------------------------------------------**/
const gridMatrix = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [1, 1, 1, 0, 0, 0],
]
let currentRowIndex = gridMatrix.length - 1
let barGoesRight = true
let barSize = 3
let t
let score = 0
let gameOver = false
let velocity = 150



/**------------------------------------------------------------------------
 **                            EVENTI
 *------------------------------------------------------------------------**/
stackButton.addEventListener('click', () => {
    onStack();
})

document.addEventListener('keydown', (e) => {
    if (e.code === 'Space'){
        onStack();
    }
})

playAgain.addEventListener('click', () => {
    location.reload()
 })



/**------------------------------------------------------------------------
 **                            FUNZIONI
 *------------------------------------------------------------------------**/
function draw(){
    let isRowEven = true
    grid.innerHTML = ''

    // ciclo gli elementi della matrice con un doppio ciclo forEach
    gridMatrix.forEach(function(rowContent, rowIndex) {
        rowContent.forEach(function(cellContent, cellIndex){
            
            // creo la cella
            const cell = document.createElement('div')
            cell.classList.add('cell')

            // coloro le celle grigie
            if ((isRowEven && cellIndex%2!==0) || (!isRowEven && cellIndex%2===0)){
                cell.classList.add('cellDark')
            }

            // coloro le celle contenenti i blocchi
            if (cellContent === 1){
                cell.classList.add('bar')
            }

            // inverto la parità della riga
            if (cellIndex%(rowContent.length)===5){
                isRowEven = !isRowEven
            }

            grid.appendChild(cell)
        }) 
    });
}

function moveRight(row){
    row.pop()
    row.unshift(0);
    gridMatrix[currentRowIndex] = row
}

function moveLeft(row){
    row.shift()
    row.push(0);
    gridMatrix[currentRowIndex] = row
}

function moveBar(){
    const row = gridMatrix[currentRowIndex];

    if (row[row.length - 1] === 1){
        barGoesRight = false
    }else if (row[0] === 1){
        barGoesRight = true
    }

    if (barGoesRight){
        moveRight(row)
    }else{
        moveLeft(row)
    }
}

function updateScore(){
    const score = document.querySelectorAll('.bar')
    scoreCounter.innerText = score.length.toString().padStart(5, '0')
}

function onStack(){
    // check lost
    for (let i = 0; i < 6; i++){
        if (currentRowIndex !== gridMatrix.length - 1){
            if (gridMatrix[currentRowIndex][i] === 1 && gridMatrix[currentRowIndex + 1][i] === 0){
                barSize--
            }
        }
    }

    // check gameOver
    if(barSize === 0){
        gameOver = true
        clearInterval(t)
        endGameScreen.classList.remove('hidden')
    }else{
        updateScore()
    }

    // check win
    if (currentRowIndex === 0){
        gameOver = true
        clearInterval(t)
        endGameScreen.classList.remove('hidden')
        endGameScreen.classList.add('win')
        endGameText.innerHTML = 'YOU<br>WON!'
    }

    // change row
    currentRowIndex--;
    barGoesRight = true;

    for (let i = 0; i < barSize; i++){
        gridMatrix[currentRowIndex][i] = 1
    }
    draw();
}

function main(){
    moveBar()
    draw()
}

draw()
t = setInterval(main, velocity)