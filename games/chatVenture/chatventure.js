// gpt
const OPENAI = {
    BASE_URL: "https://api.openai.com/v1",
    CHAT: "/chat/completions",
    IMAGE: "/images/generations",
    MODEL: "gpt-3.5-turbo",
    CONTENT_TYPE: "application/json",
    KEY: "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",
    TEMPERATURE: 0.7
}

// elementi
const tema = document.querySelectorAll(".tema")
const home = document.querySelector(".home")
const loading = document.querySelector(".loading")
const level = document.querySelector(".level")
const gameover = document.querySelector(".gameover")
const placeholder = document.querySelector("#placeholder")
const level_template = document.querySelector(".level-template")
const level_image = document.querySelector(".level-image")
const level_description = document.querySelector(".level-description")
const level_actions = document.querySelector(".level-actions")
const gameover_template = document.querySelector(".gameover-template")
const victory_template = document.querySelector(".victory-template")
const death_description = document.querySelector(".death-description")
let punteggio = document.querySelector(".punteggio")
let punteggio_attuale = 0

// array
 completeChat = []

// eventi
tema.forEach(function(element){
    element.addEventListener("click", function(){


        // 1. recuperiamo il genere selezionato e lo impostiamo
        let selected_genere = element.dataset.genere

        // 2. avviamo la partita
        startGame(selected_genere)
    })
})

// funzioni
function startGame(selected_genere){
    // decido il numero di vittorie necessarie 
    let punteggio_vittoria = Math.floor(Math.random() * 5) + 4
    console.log(punteggio_vittoria)

    // 1. sostituiamo home con loading
    home.classList.add("hidden")

    // 2. istruzioni iniziali per GPT
    let prompt = `Voglio che ti comporti come se fossi un classico gioco di avventura testuale. Io sarò il protagonista e giocatore principale. Non fare riferimento a te stesso. L'ambientazione di questo gioco sarà a tema ${selected_genere}. Ogni ambientazione ha una descrizione di 150 caratteri seguita da una array di esattamente 4 azioni possibili (devono essere esattamente 4), espresse con verbi declinati al modo imperativo, seconda persona singolare, che il giocatore può compiere. Una di queste azioni è mortale e termina il gioco.


    Non aggiungere mai altre spiegazioni. Non fare riferimento a te stesso. Le tue risposte sono solo in formato JSON come questo esempio:\n###\n{"description":"descrizione ambientazione","actions":["azione 1", "azione 2", "azione 3", "azione 4"]}###`

    completeChat.push({
        role: "system",
        content: prompt
    })

    // 3. genero il primo livello
    setLevel(punteggio_vittoria)
}

async function makeRequest(end, data){
    let response = await fetch(OPENAI.BASE_URL + end, {
        method: "POST",
        headers: {
            "Content-Type": OPENAI.CONTENT_TYPE,
            "Authorization": `Bearer ${OPENAI.KEY}`
        },
        body: JSON.stringify(data)
    })

    const json = await response.json()
    return json
}

function setLevelDescription(description){
    // cloniamo il template
    const levelElement = level_template.content.cloneNode(true)

    // lo compiliamo
    levelElement.querySelector(".level-description").innerText = description

    // lo mostriamo
    placeholder.appendChild(levelElement)
}

async function setLevelImage(description, actions){
    document.querySelector(".level-image").innerHTML = ""
    
    // generiamo l'immagine
    const imageResponse = await makeRequest(OPENAI.IMAGE, {
        prompt: `crea un'immagine per questa scenario: ${description}`,
        n: 1,
        size: "512x512"
    })

    const Img_url = imageResponse.data[0].url

    // compiliamo il template
    document.querySelector(".level-image").innerHTML = `<img src="${Img_url}" alt="">`
}

function setLevelActions(actions){
    let actionsHTML = ""
    actions.forEach(function(action){
        actionsHTML += `<button>${action}</button>`
    })
    
    document.querySelector(".level-actions").innerHTML = actionsHTML

    const actionButtons = document.querySelectorAll(".level-actions button")

    actionButtons.forEach(function(button){
        button.addEventListener("click", function(){
            // recuperiamo l'azione scelta
            const actionSelected = button.innerText

            // prepariamo il messaggio per chat GPT
            completeChat.push(
                {
                    role: "user",
                    content: `\
                    ${actionSelected}. Se questa azione è mortale l'elenco delle azioni è vuoto. Non dare altro testo che non sia un oggetto JSON. Le tue risposte sono solo in formato JSON come questo esempio:\n###\n{"description": "sei morto per questa motivazione","actions":[]}###`
                }
            )

            // generiamo un nuovo livello
            setLevel()
        })
    })
}

function setPunteggio(){
    punteggio_attuale += 1
    document.querySelector(".punteggio").innerHTML = `Livello ${punteggio_attuale}`
}

function setGameOver(description){
    
    placeholder.innerHTML = null
    loading.classList.add("hidden")

    // cloniamo il template
    const gameoverElement = gameover_template.content.cloneNode(true)

    // lo compiliamo
    gameoverElement.querySelector(".death-description").innerText = description

    // lo mostriamo
    placeholder.appendChild(gameoverElement)

    // svuotiamo lo storico
    completeChat = []

    // azzeriamo il punteggio
    punteggio_attuale = 0

    // rigioca
    const rigioca = document.querySelector(".rigioca")

    rigioca.addEventListener("click", function(){
        placeholder.innerHTML = null
        home.classList.remove("hidden")
    })
}

async function setVictory(description){
    // cambio il numero di vittorie richiesto
    let punteggio_vittoria = Math.floor(Math.random() * 5) + 4

    // trasformiamo la descrizione in testo di vittoria
    const messageResponse = await makeRequest(OPENAI.CHAT, {
        model: OPENAI.MODEL,
        messages: [
        {
            role: "system",
            content: `trasforma la seguente descrizione: ${description} in una descrizione di vittoria di massimo 220 caratteri`
        }
    ],
        temperature: OPENAI.TEMPERATURE
    })

    const response = messageResponse.choices[0].message.content
    console.log(response)
 
    // cloniamo il template
    const victoryElement = victory_template.content.cloneNode(true)

    // lo compiliamo
    victoryElement.querySelector(".death-description").innerText = response

    // lo mostriamo
    loading.classList.add("hidden")
    placeholder.appendChild(victoryElement)

    // svuotiamo lo storico
    completeChat = []

    // azzeriamo il punteggio
    punteggio_attuale = 0

    // rigioca
    const rigioca = document.querySelector(".rigioca")

    rigioca.addEventListener("click", function(){
        placeholder.innerHTML = null
        home.classList.remove("hidden")
    })
}

async function setLevel(punteggio_vittoria){
    placeholder.innerHTML = null

    // mostro il loader
    loading.classList.remove("hidden")

    // chiedo a GPT di creare il livello
    const messageResponse = await makeRequest(OPENAI.CHAT, {
        model: OPENAI.MODEL,
        messages: completeChat,
        temperature: OPENAI.TEMPERATURE
    })

    const message = messageResponse.choices[0].message

    completeChat.push(message)

    const content = JSON.parse(message.content)
    const description = content.description
    const actions = content.actions

    if (actions.length === 0){
        setGameOver(description)
        
    } else {

        if (punteggio_attuale === punteggio_vittoria){
            setVictory(description)

        } else{
            // inseriamo la descrizione nel livello
            setLevelDescription(description)
            
            // nascondo il loader
            loading.classList.add("hidden")
            
            // mostriamo il livello
            level_template.classList.remove("hidden")
            
            // mostriamo le azioni disponibili
            setLevelActions(actions)

            setPunteggio()
            
            // mostriamo l'immagine
            await setLevelImage(description, actions)
        }
    }   
}