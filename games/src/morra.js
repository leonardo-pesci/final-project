/* Elementi */
const computerCard = document.querySelector('#computerCard')
const playerCards = document.querySelectorAll('.playerCard')
const response = document.querySelector('#response')
const scoreSpan = document.querySelector('#scoreSpan')

/* Variabili */
let possibility = ['paper', 'scissors', 'rock']
let score = 0

/* Funzioni */
let resetGame = () => {
    computerCard.classList = 'card'
}

let drawCard = () => {
    index = Math.floor(Math.random() * possibility.length)

    cardChose = possibility[index]

    return cardChose
}

let showComputerCard = (card) => {
    
    computerCard.classList.remove('questionMark')
    computerCard.classList.add(card)
}

playerCards.forEach( (card) => {
    card.addEventListener('click', () => {
        resetGame()

        playerChoice = card.id
        computerChoice = drawCard()
        showComputerCard(computerChoice)

        let res = checkVictory(playerChoice, computerChoice)
        response.innerHTML = res

        if (res === 'vittoria') setScore('up')
        else if (res === 'sconfitta') setScore('down')
    })
})

let checkVictory = (player, computer) => {
    console.log(player, computer)
    if (player === 'paper') {
        if (computer === 'rock') return 'vittoria'
        else if (computer === 'scissors') return 'sconfitta'
    } else if (player === 'scissors') {
        if (computer === 'paper') return 'vittoria'
        else if (computer === 'rock') return 'sconfitta'
    } else if (player === 'rock') {
        if (computer === 'scissors') return 'vittoria'
        else if (computer === 'paper') return 'sconfitta'
    }
    return 'pareggio'
}

let setScore = (direction) => {
    if (direction === 'up') score++;
    else if (direction === 'down') score--;

    scoreSpan.innerHTML = score
}