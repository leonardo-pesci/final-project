/* Elements */
const cards = document.querySelectorAll('.card')
const scoreSpan = document.querySelector('#scoreSpan')

/* Variables */
const animals = ['cat', 'fish', 'lion', 'pig', 'duck', 'cow']
const cardsAnimals = {
    0: null,
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
    7: null,
    8: null,
    9: null,
    10: null,
    11: null,
}

let score = 0
let first = null
let second = null
let cardSelected = 0

/* Functions */
let placeCards = () => {
    let allCards = animals.concat(animals)
    Object.keys(cardsAnimals).forEach( (key) => {
        index = Math.floor(Math.random() * allCards.length)
        choice = allCards[index]
        allCards.splice(index, 1)

        cardsAnimals[key] = choice
    });
    
}

placeCards()


cards.forEach( (card, index) => {
    card.addEventListener('click', () => {
        card.style.backgroundImage = `url(./img/${cardsAnimals[index]}.png`
        if (index === first) return // annulla il secondo tocco della stessa carta
        if (cardSelected % 2 === 0) first = index
        else {
            second = index
            checkMove(first, second)
        }
        cardSelected++
    })
})

let hideCard = (list) => {
    list.forEach( (card) => {
        cards[card].style.backgroundImage = 'url(./img/questionMark.png'
    })
}

let checkMove = (first, second) => {
    if (cardsAnimals[first] !== cardsAnimals[second]) setTimeout(hideCard, 800, [first, second])
}

let updateScore = () => {
    scoreSpan.innerHTML = score
}

// todo disabilitare tocco
// todo schermata di vittoria