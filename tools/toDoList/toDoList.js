//^ Elements
const emptyMessage = document.querySelector('#emptyMessage')
const todoContainer = document.querySelector('#todoContainer')
const doneContainer = document.querySelector('#doneContainer')
const todoInput = document.querySelector('#todoInput')
const todoAddBtn = document.querySelector('#todoAddBtn')

//^ Variables
let todoList = []
const todoStorage = localStorage.getItem('todoList')
if (todoStorage) todoList = JSON.parse(todoStorage)

let doneList = []
const doneStorage = localStorage.getItem('doneList')
if (doneStorage) doneList = JSON.parse(todoStorage)

//^ Functions
let buttonEvent = () => {
    if (todoInput.value !== '') {
        todoList.push(todoInput.value.trim())
        renderList()

        todoInput.value = ''
        todoInput.focus()
    }
} //? Funzione eseguita dagli eventi

let createItem = (type, text, i) => {
    let item = document.createElement('li')
    
    if (type === 'todo') {
        item.id = 'item' + i
        item.className = 'todoItem panel d-flex'
        item.innerHTML = `<div id="check${i}" class="todoCheck c-pointer"><img src="./img/check.svg" alt=""></div><span class="text">${text}</span>`

    } else if (type === 'done') {
        item.id = 'doneItem' + i
        item.className = 'doneItem panel d-flex'
        item.innerHTML = `<div id="uncheck${i}" class="doneUncheck c-pointer"><img src="./img/check.svg" alt=""></div><span class="text">${text}</span><div id="close${i}" class="doneClose c-pointer"><img src="./img/close.png" alt=""></div>`
    }

    return item
} //? Crea l'elemento e assegna id e classi

let renderList = () => {
    // svuota i contenitori
    todoContainer.innerHTML = ''
    doneContainer.innerHTML = ''

    if (todoList.length === 0) emptyMessage.classList.remove('visually-hidden')
    else emptyMessage.classList.add('visually-hidden')

    // riempie i contenitori
    fillContainers()

    // salva in locale le liste
    localStorage.setItem('todoList', JSON.stringify(todoList))
    localStorage.setItem('doneList', JSON.stringify(doneList))

    // abilita i tasti
    ableChecks()
    ableUncheck()
    ableCloses()

} //? aggiorna le liste e i dati salvati in locale

let fillContainers = () => {
    todoList.forEach( (item, i) => {
        let element = createItem('todo', item, i)

        todoContainer.appendChild(element)
    })

    doneList.forEach( (item, i) => {
        let element = createItem('done', item, i)

        doneContainer.appendChild(element)
    })
} //? Riempie i contenitori

let ableChecks = () => {
    const checks = document.querySelectorAll('.todoCheck')
    checks.forEach( (check, i) => {
        check.addEventListener('click', () => {
            doneList.push(todoList[i])
            todoList.splice(i, 1)

            renderList()
        })
    })
} //? abilita i check gialli

let ableUncheck = () => {
    const unchecks = document.querySelectorAll('.doneUncheck') //!
    unchecks.forEach( (uncheck, i) => {
        uncheck.addEventListener('click', () => {
            todoList.push(doneList[i])
            doneList.splice(i, 1)

            renderList()
        })
    })
} //? abilita i check verdi (inversi)

let ableCloses = () => {
    const crosses = document.querySelectorAll('.doneClose') //!
    crosses.forEach( (cross, i) => {
        cross.addEventListener('click', () => {
            doneList.splice(i, 1)

            renderList()
        })
    })
} //? Abilita i tasti di chiusura

renderList()


//^ Events
todoAddBtn.addEventListener('click', buttonEvent)

document.addEventListener('keydown', (e) => {
    if (e.code === 'Enter') buttonEvent()
}) 