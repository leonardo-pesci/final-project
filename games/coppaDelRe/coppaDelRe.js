/**========================================================================
 **                            ELEMENTI
 *========================================================================**/
const loading = document.querySelector(".loading")
const card = document.querySelector(".card")
const placeHolder = document.querySelector("#placeHolder")
const extractionTemplate = document.querySelector(".extractionTemplate")
const gameFinishedTemplate = document.querySelector(".gameFinishedTemplate")
const startButton = document.querySelector(".startButton")
const addButton = document.querySelector(".add")
const confirmButton = document.querySelector(".confirm")
const errorMessage = document.querySelector(".errorMessage")
const menu = document.querySelector(".menu")
const numMazzi = document.querySelector(".numMazzi")
const buttons = document.querySelector(".buttons")
const unoButton = document.querySelector(".unoButton")
const dueButton = document.querySelector(".dueButton")
const list = document.querySelector(".list")
const italiano = document.querySelector(".italiano")
const inglese = document.querySelector(".inglese")
const spagnolo = document.querySelector(".spagnolo")
const romano = document.querySelector(".romano")
const napoletano = document.querySelector(".napoletano")
const questionMark = document.querySelector(".questionMark")
const music = new Audio('audio.mp3')



/**========================================================================
 **                            VARIABILI
 *========================================================================**/
let conteggio = 52
let conteggioK = 4
let index = 1
let started = false
let memory = ""
let mazzo = [
    "asso di cuori",
    "due di cuori",
    "tre di cuori",
    "quattro di cuori",
    "cinque di cuori",
    "sei di cuori",
    "sette di cuori",
    "otto di cuori",
    "nove di cuori",
    "dieci di cuori",
    "jack di cuori",
    "regina di cuori",
    "re di cuori",
    "asso di fiori",
    "due di fiori",
    "tre di fiori",
    "quattro di fiori",
    "cinque di fiori",
    "sei di fiori",
    "sette di fiori",
    "otto di fiori",
    "nove di fiori",
    "dieci di fiori",
    "jack di fiori",
    "regina di fiori",
    "re di fiori",
    "asso di quadri",
    "due di quadri",
    "tre di quadri",
    "quattro di quadri",
    "cinque di quadri",
    "sei di quadri",
    "sette di quadri",
    "otto di quadri",
    "nove di quadri",
    "dieci di quadri",
    "jack di quadri",
    "regina di quadri",
    "re di quadri",
    "asso di picche",
    "due di picche",
    "tre di picche",
    "quattro di picche",
    "cinque di picche",
    "sei di picche",
    "sette di picche",
    "otto di picche",
    "nove di picche",
    "dieci di picche",
    "jack di picche",
    "regina di picche",
    "re di picche",
]
let secondoMazzo = [
    "asso di cuori",
    "due di cuori",
    "tre di cuori",
    "quattro di cuori",
    "cinque di cuori",
    "sei di cuori",
    "sette di cuori",
    "otto di cuori",
    "nove di cuori",
    "dieci di cuori",
    "jack di cuori",
    "regina di cuori",
    "asso di fiori",
    "due di fiori",
    "tre di fiori",
    "quattro di fiori",
    "cinque di fiori",
    "sei di fiori",
    "sette di fiori",
    "otto di fiori",
    "nove di fiori",
    "dieci di fiori",
    "jack di fiori",
    "regina di fiori",
    "asso di quadri",
    "due di quadri",
    "tre di quadri",
    "quattro di quadri",
    "cinque di quadri",
    "sei di quadri",
    "sette di quadri",
    "otto di quadri",
    "nove di quadri",
    "dieci di quadri",
    "jack di quadri",
    "regina di quadri",
    "asso di picche",
    "due di picche",
    "tre di picche",
    "quattro di picche",
    "cinque di picche",
    "sei di picche",
    "sette di picche",
    "otto di picche",
    "nove di picche",
    "dieci di picche",
    "jack di picche",
    "regina di picche"
]
let playersList = []
let numeroMazzi = 1
let langSelected = "italiano"



/**========================================================================
 **                            EVENTI
 *========================================================================**/
startButton.addEventListener("click", function(){
    setGame()
})
unoButton.addEventListener("click", function(){
    numeroMazzi = 1
    unoButton.classList.add("selected")
    dueButton.classList.remove("selected")
})
dueButton.addEventListener("click", function(){
    numeroMazzi = 2
    dueButton.classList.add("selected")
    unoButton.classList.remove("selected")
})
addButton.addEventListener("click", function(){
    let player = document.querySelector(".player")

    if(player.value != ""){
        playersList.push(player.value)
        list.innerHTML+=`<div class="listElement" id="a${index}">${player.value}<div class="cross" data-num="${index}">✗</div></div>`
    }
    player.value = ""
    index += 1

    const cross = document.querySelectorAll(".cross")
    cross.forEach(function(element){
        element.addEventListener("click", function(){
            play = playersList[element.dataset.num - 1]
            listElements = document.querySelectorAll(".listElement")
            el = document.getElementById(`a${element.dataset.num}`)
            el.remove()

            for(var i = 0; i < playersList.length; i++){ 
                if ( playersList[i] === playersList[element.dataset.num - 1]) {
                  playersList.splice(i, 1); 
                }
             }
        })   
    })
})
confirmButton.addEventListener("click", function(){
    // messaggio di errore
    let player = document.querySelector(".player")
    if(player.value != ""){
        setErrorMessage()
    }else{
        errorMessage.classList.add("hidden")

        console.log(playersList)
        // nascondiamo il menu
        menu.classList.add("hidden")

        // estraiamo un giocatore casuale
        ind = getRandomPlayer(playersList)
        firstPlayer = playersList[ind]

        if(started === false){
            if(numeroMazzi==2){
                mazzo = mazzo.concat(secondoMazzo)
                conteggio = 100
            }else{
                conteggio = 52
            }
        }

        // procediamo con la prima estrazione
        if(started === false){
            setExtraction()
        }else{
            console.log(memory)
            placeHolder.innerHTML = memory

            const memory = memory.cloneNode(true)
            
            // apertura guida
            const questionMark = memory.querySelector(".questionMark")
            const contK = memory.querySelector(".conteggioK")
            
            questionMark.addEventListener("click", function(){
                const guide = document.querySelector(".guide")

                guide.classList.remove("hidden")
                questionMark.classList.add("hidden")
                edit.classList.add("hidden")
                contK.classList.add("hidden")

                // chiusura guida
                const exit = document.querySelector(".exit")
                exit.addEventListener("click", function(){
                    guide.classList.add("hidden")
                    questionMark.classList.remove("hidden")
                    edit.classList.remove("hidden")
                    contK.classList.remove("hidden")
                })
            })

            // apertura edit
            const edit = memory.querySelector(".edit")
            edit.addEventListener("click", function(){
                setGame()
            })
        }

        started = true
    }
})
italiano.addEventListener("click", function(){
    langSelected = "italiano"

    italiano.classList.add("selected")
    inglese.classList.remove("selected")
    spagnolo.classList.remove("selected")
    romano.classList.remove("selected")
    napoletano.classList.remove("selected")
})
inglese.addEventListener("click", function(){
    langSelected = "inglese"

    inglese.classList.add("selected")
    italiano.classList.remove("selected")
    spagnolo.classList.remove("selected")
    romano.classList.remove("selected")
    napoletano.classList.remove("selected")
})
spagnolo.addEventListener("click", function(){
    langSelected = "spagnolo"

    spagnolo.classList.add("selected")
    inglese.classList.remove("selected")
    italiano.classList.remove("selected")
    romano.classList.remove("selected")
    napoletano.classList.remove("selected")
})
romano.addEventListener("click", function(){
    langSelected = "romano"

    romano.classList.add("selected")
    inglese.classList.remove("selected")
    spagnolo.classList.remove("selected")
    italiano.classList.remove("selected")
    napoletano.classList.remove("selected")
})
napoletano.addEventListener("click", function(){
    langSelected = "napoletano"

    napoletano.classList.add("selected")
    inglese.classList.remove("selected")
    spagnolo.classList.remove("selected")
    romano.classList.remove("selected")
    italiano.classList.remove("selected")
})



/**========================================================================
 **                            FUNZIONI
 *========================================================================**/
function setGame(){
    
    if(started === false){
        // nascondiamo la home
        document.body.classList.add("gameStarted")
    }else{
        placeHolder.innerHTML=""
        numMazzi.classList.add("hidden")
        buttons.classList.add("hidden")
    }
    
    // mostriamo la schermata dei giocatori
    menu.classList.remove("hidden")
}

function setExtraction(){
    // svuotiamo il placeholder
    placeHolder.innerHTML = null

    // mostriamo il loader
    loading.classList.remove("hidden")

    // estraiamo una carta
    let card = getRandomCard()
    let description = setExtractionResponse(card)

    if(playersList.length != 0){
        if(ind == playersList.length - 1){
            ind = 0
        }else{
            ind += 1
        }
    }else{
        playersList = [""]
    }

    if(conteggioK == 0){
        // mostriamo la schermata finale
        setGameFinished(card)
    }else{
        // mostriamo la carta
        setTimeout(function(){
            showExtraction(card, description, ind)
        },500)
    }
}

function showExtraction(card, description, ind){
    // cloniamo il template
    const extractionElement = extractionTemplate.content.cloneNode(true)

    //
    console.log(card)

    // lo compiliamo
    extractionElement.querySelector(".conteggioKText").innerHTML = `${conteggioK}K`
    if(card.includes("asso di cuori")){
        image = `<img src="img/card/assocuori.png">`
    }else if(card.includes("due di cuori")){
        image = `<img src="img/card/duecuori.png">`
    }else if(card.includes("tre di cuori")){
        image = `<img src="img/card/trecuori.png">`
    }else if(card.includes("quattro di cuori")){
        image = `<img src="img/card/quattrocuori.png">`
    }else if(card.includes("cinque di cuori")){
        image = `<img src="img/card/cinquecuori.png">`
    }else if(card.includes("sei di cuori")){
        image = `<img src="img/card/seicuori.png">`
    }else if(card.includes("sette di cuori")){
        image = `<img src="img/card/settecuori.png">`
    }else if(card.includes("otto di cuori")){
        image = `<img src="img/card/ottocuori.png">`
    }else if(card.includes("nove di cuori")){
        image = `<img src="img/card/novecuori.png">`
    }else if(card.includes("dieci di cuori")){
        image = `<img src="img/card/diecicuori.png">`
    }else if(card.includes("jack di cuori")){
        image = `<img src="img/card/jackcuori.png">`
    }else if(card.includes("regina di cuori")){
        image = `<img src="img/card/reginacuori.png">`
    }else if(card.includes("re di cuori")){
        image = `<img src="img/card/recuori.png">`
    }else if(card.includes("asso di fiori")){
        image = `<img src="img/card/assofiori.png">`
    }else if(card.includes("due di fiori")){
        image = `<img src="img/card/duefiori.png">`
    }else if(card.includes("tre di fiori")){
        image = `<img src="img/card/trefiori.png">`
    }else if(card.includes("quattro di fiori")){
        image = `<img src="img/card/quattrofiori.png">`
    }else if(card.includes("cinque di fiori")){
        image = `<img src="img/card/cinquefiori.png">`
    }else if(card.includes("sei di fiori")){
        image = `<img src="img/card/seifiori.png">`
    }else if(card.includes("sette di fiori")){
        image = `<img src="img/card/settefiori.png">`
    }else if(card.includes("otto di fiori")){
        image = `<img src="img/card/ottofiori.png">`
    }else if(card.includes("nove di fiori")){
        image = `<img src="img/card/novefiori.png">`
    }else if(card.includes("dieci di fiori")){
        image = `<img src="img/card/diecifiori.png">`
    }else if(card.includes("jack di fiori")){
        image = `<img src="img/card/jackfiori.png">`
    }else if(card.includes("regina di fiori")){
        image = `<img src="img/card/reginafiori.png">`
    }else if(card.includes("re di fiori")){
        image = `<img src="img/card/refiori.png">`
    }else if(card.includes("asso di quadri")){
        image = `<img src="img/card/assoquadri.png">`
    }else if(card.includes("due di quadri")){
        image = `<img src="img/card/duequadri.png">`
    }else if(card.includes("tre di quadri")){
        image = `<img src="img/card/trequadri.png">`
    }else if(card.includes("quattro di quadri")){
        image = `<img src="img/card/quattroquadri.png">`
    }else if(card.includes("cinque di quadri")){
        image = `<img src="img/card/cinquequadri.png">`
    }else if(card.includes("sei di quadri")){
        image = `<img src="img/card/seiquadri.png">`
    }else if(card.includes("sette di quadri")){
        image = `<img src="img/card/settequadri.png">`
    }else if(card.includes("otto di quadri")){
        image = `<img src="img/card/ottoquadri.png">`
    }else if(card.includes("nove di quadri")){
        image = `<img src="img/card/novequadri.png">`
    }else if(card.includes("dieci di quadri")){
        image = `<img src="img/card/dieciquadri.png">`
    }else if(card.includes("jack di quadri")){
        image = `<img src="img/card/jackquadri.png">`
    }else if(card.includes("regina di quadri")){
        image = `<img src="img/card/reginaquadri.png">`
    }else if(card.includes("re di quadri")){
        image = `<img src="img/card/requadri.png">`
    }else if(card.includes("asso di picche")){
        image = `<img src="img/card/assopicche.png">`
    }else if(card.includes("due di picche")){
        image = `<img src="img/card/duepicche.png">`
    }else if(card.includes("tre di picche")){
        image = `<img src="img/card/trepicche.png">`
    }else if(card.includes("quattro di picche")){
        image = `<img src="img/card/quattropicche.png">`
    }else if(card.includes("cinque di picche")){
        image = `<img src="img/card/cinquepicche.png">`
    }else if(card.includes("sei di picche")){
        image = `<img src="img/card/seipicche.png">`
    }else if(card.includes("sette di picche")){
        image = `<img src="img/card/settepicche.png">`
    }else if(card.includes("otto di picche")){
        image = `<img src="img/card/ottopicche.png">`
    }else if(card.includes("nove di picche")){
        image = `<img src="img/card/novepicche.png">`
    }else if(card.includes("dieci di picche")){
        image = `<img src="img/card/diecipicche.png">`
    }else if(card.includes("jack di picche")){
        image = `<img src="img/card/jackpicche.png">`
    }else if(card.includes("regina di picche")){
        image = `<img src="img/card/reginapicche.png">`
    }else if(card.includes("re di picche")){
        image = `<img src="img/card/repicche.png">`
    }

    extractionElement.querySelector(".cardImage").innerHTML = image
    extractionElement.querySelector(".extractionText").innerText = description
    extractionElement.querySelector(".playerName").innerText = playersList[ind]

    // apertura guida
    const questionMark = extractionElement.querySelector(".questionMark")
    const contK = extractionElement.querySelector(".conteggioK")
    
    questionMark.addEventListener("click", function(){
        const guide = document.querySelector(".guide")

        guide.classList.remove("hidden")
        questionMark.classList.add("hidden")
        edit.classList.add("hidden")
        contK.classList.add("hidden")

        // chiusura guida
        const exit = document.querySelector(".exit")
        exit.addEventListener("click", function(){
            guide.classList.add("hidden")
            questionMark.classList.remove("hidden")
            edit.classList.remove("hidden")
            contK.classList.remove("hidden")
        })
    })

    // apertura edit
    const edit = extractionElement.querySelector(".edit")
    const editPage = document.querySelector(".editPage")
    edit.addEventListener("click", function(){
        editPage.classList.remove("hidden")
        questionMark.classList.add("hidden")
        edit.classList.add("hidden")
        contK.classList.add("hidden")

        // chiusura edit
        const exitEdit = document.querySelector(".exitEdit")
        exitEdit.addEventListener("click", function(){
            editPage.classList.add("hidden")
            questionMark.classList.remove("hidden")
            edit.classList.remove("hidden")
            contK.classList.remove("hidden")
        })
    })

    // nascondiamo il loader
    loading.classList.add("hidden")

    // mostriamo il template
    placeHolder.appendChild(extractionElement)

    // copiamo il placeHolder
    memory = placeHolder.innerHTML
    console.log(memory)

    // mostriamo il pulsante next
    const nextButton = document.querySelector(".next")

    nextButton.addEventListener("click", function(){
        setExtraction()
    })

    setConteggio()
}

function setExtractionResponse(card){
    if(langSelected=="italiano"){
        if(card.includes("asso")){
            response = "catena"
        }else if(card.includes("due")){
            response = "distribuisci due penalità"
        }else if(card.includes("tre")){
            response = "bevi due penalità"
        }else if(card.includes("quattro")){
            response = "distribuisci due penalità e bevine due"
        }else if(card.includes("cinque")){
            response = "bevono tutti i ragazzi"
        }else if(card.includes("sei")){
            response = "bevono tutte le ragazze"
        }else if(card.includes("sette")){
            response = "re dei pollici"
        }else if(card.includes("otto")){
            response = "SPECCHIO"
        }else if(card.includes("nove")){
            response = "rima"
        }else if(card.includes("dieci")){
            response = "bevono tutti"
        }else if(card.includes("jack")){
            response = "regola"
        }else if(card.includes("regina")){
            response = "categoria"
        }else if(card.includes("re")){
            conteggioK -= 1
            response = "versa il bicchiere nella coppa"
        }

        // compilo la guida
        const guideBox = document.querySelector(".guideBox")
        guideBox.innerHTML=`
        <span class="cardGuide">Catena: quando il giocatore che pesca l'asso comincia a bere, quello alla sua sinistra comincia e così via; viceversa, quando il primo giocatore smette di bere, quello alla sinistra fa lo stesso e così via.</span>
        <span class="cardGuide">Re dei pollici: il giocatore che ha pescato la carta diventa il re dei pollici: ogni volta che metterà il pollice sul tavolo, gli altri dovranno fare lo stesso; l'ultimo a farlo beve.</span>
        <span class="cardGuide">Specchio: il giocatore che pesca la carta deve sceglierne un altro per il resto della partita, in modo tale che quando uno beve l'altro farà lo stesso e viceversa.</span>
        <span class="cardGuide">Rima: chi pesca la carta deve dire una parola, a turno ognuno dirà una parola che fa rima con la prima nominata, chi non la trova o ne ripete una già detta beve.</span>
        <span class="cardGuide">Regola: chi pesca la carta deve inventare una regola, ogni volta che qualcuno la infrangerà, dovrà bere.</span>
        <span class="cardGuide">Categoria: chi pesca la carta deve scegliere una categoria, a turno ognuno dirà una parola che rientra nella categoria scelta, chi non la trova o ne ripete una già detta beve.</span>
        `
    }else if(langSelected=="inglese"){
        if(card.includes("asso")){
            response = "chain"
        }else if(card.includes("due")){
            response = "give two sips"
        }else if(card.includes("tre")){
            response = "drink two sips"
        }else if(card.includes("quattro")){
            response = "give and drink two sips"
        }else if(card.includes("cinque")){
            response = "all guys drink"
        }else if(card.includes("sei")){
            response = "all girls drink"
        }else if(card.includes("sette")){
            response = "king of thumbs"
        }else if(card.includes("otto")){
            response = "MIRROR"
        }else if(card.includes("nove")){
            response = "rhyme"
        }else if(card.includes("dieci")){
            response = "everyone drinks"
        }else if(card.includes("jack")){
            response = "rule"
        }else if(card.includes("regina")){
            response = "category"
        }else if(card.includes("re")){
            conteggioK -= 1
            response = "put your glass in the cup"
        }

        // compilo la guida
        const guideBox = document.querySelector(".guideBox")
        guideBox.innerHTML=`
        <span class="cardGuide">Chain: when the first player starts drinking, the player on his left starts to drink until the player on his right finish.</span>
        <span class="cardGuide">King of thumbs: the player who takes this card is now the king of thumbs, he has to put his thumb on the table and then everyone has to do the same thing, the last player who puts the thumb on the table has to drink.</span>
        <span class="cardGuide">MIRROR: the player who draws the card must choose another for the rest of the game, such that when one drinks the other will do the same and vice versa.</span>
        <span class="cardGuide">Rhyme: whoever draws the card must say a word, everyone in turn will say a word that rhymes with the first named, whoever cannot find it or repeats one already said drinks.</span>
        <span class="cardGuide">Rule: you have to set a rule: every player who break it has to drink</span>
        <span class="cardGuide">Category: whoever draws the card must choose a category, in turn everyone will say a word that falls within the chosen category, whoever cannot find it or repeats one already said drinks.</span>
        `
    }else if(langSelected=="spagnolo"){
        if(card.includes("asso")){
            response = "la cadena"
        }else if(card.includes("due")){
            response = "dàle dos sorces"
        }else if(card.includes("tre")){
            response = "bivés dos sorses"
        }else if(card.includes("quattro")){
            response = "dàle dos sorces y bivés dos sorses"
        }else if(card.includes("cinque")){
            response = "todos los guapos tenìa que bebér"
        }else if(card.includes("sei")){
            response = "todas las señoritas tenìa que bebér"
        }else if(card.includes("sette")){
            response = "el rey de los pulgares"
        }else if(card.includes("otto")){
            response = "¡el espejo!"
        }else if(card.includes("nove")){
            response = "¡MIRA QUE RIMA!"
        }else if(card.includes("dieci")){
            response = "todo el mundo bebe"
        }else if(card.includes("jack")){
            response = "envienta una regla"
        }else if(card.includes("regina")){
            response = "là categorilla"
        }else if(card.includes("re")){
            conteggioK -= 1
            response = "tira el vaso en la copa"
        }

        // compilo la guida
        const guideBox = document.querySelector(".guideBox")
        guideBox.innerHTML=`
        <span class="cardGuide">La cadena: cuando el jugador que saca el as empieza a beber, empieza el de su izquierda y así sucesivamente; por el contrario, cuando el primer jugador deja de beber, el de la izquierda hace lo mismo y así sucesivamente.</span>
        <span class="cardGuide">El rey de los pulgares: el jugador que sacó la carta se convierte en el rey de los pulgares: cada vez que pone su pulgar sobre la mesa, los demás deben hacer lo mismo; el último en hacerlo bebe.</span>
        <span class="cardGuide">El espejo: el jugador que roba la carta debe elegir otra para el resto de la partida, de forma que cuando una beba la otra hará lo mismo y viceversa.</span>
        <span class="cardGuide">Rima: el que saca la carta debe decir una palabra, a su vez todos dirán una palabra que rime con la primera nombrada, el que no la encuentre o repita una ya dicha bebe.</span>
        <span class="cardGuide">Regla: quien saca la carta debe inventar una regla, cada vez que alguien la rompa, tendrá que beber.</span>
        <span class="cardGuide">Categorilla: quien saque la carta deberá elegir una categoría, a su vez todos dirán una palabra que entre dentro de la categoría elegida, quien no la encuentre o repita una ya dicha bebe.</span>
        `
    }else if(langSelected=="romano"){
        if(card.includes("asso")){
            response = "popo a catena"
        }else if(card.includes("due")){
            response = "daje du sorse"
        }else if(card.includes("tre")){
            response = "bevi du sorse"
        }else if(card.includes("quattro")){
            response = "daje du sorse e bevi du sorse"
        }else if(card.includes("cinque")){
            response = "bevono tutti i piskelli"
        }else if(card.includes("sei")){
            response = "bevono tutte e piskelle"
        }else if(card.includes("sette")){
            response = "l'omo dii pollici"
        }else if(card.includes("otto")){
            response = "O SPECCHIO"
        }else if(card.includes("nove")){
            response = "facce sta rima"
        }else if(card.includes("dieci")){
            response = "bevono tutti a sto giro"
        }else if(card.includes("jack")){
            response = "inventate na regola"
        }else if(card.includes("regina")){
            response = "dacce na categoria"
        }else if(card.includes("re")){
            conteggioK -= 1
            response = "junta r bicchiere naa coppa"
        }

        // compilo la guida
        const guideBox = document.querySelector(".guideBox")
        guideBox.innerHTML=`
        <span class="cardGuide">Popo a catena: quanno er giocatore che pesca l'asso comincia da beve, quello alla sua sinistra je fa compagnia finché er primo non accanna de beve, e così fanno pure tutti li artri.</span>
        <span class="cardGuide">L'omo dii pollici: il piskello o la piskella che pija la carta diventa l'omo dii pollici: quanno tante vorte je va de mette er pollice suo sul tavolo o devono fa pure li artri e l'ultimo che lo fa deve da beve.</span>
        <span class="cardGuide">O SPECCHIO: chi pesca la carta deve sceglie er fratellino suo: pe tutta a partita, quando uno dei due beve, deve da beve pure l'artro.</span>
        <span class="cardGuide">Facce sta rima: devi di na parola, quello dopo de te ne deve di n'artra che fa la rima e pure li artri. Chi nsa più che dì o ripete na parola già detta deve da beve.</span>
        <span class="cardGuide">Inventate na regola: devi inventà na regola, chi nt'ascorta beve.</span>
        <span class="cardGuide">Dacce na categoria: scegli na categoria tipo gli animali co la c o i giocatori daa MAGGICA, npo' come la rima, li artri devono di na parola de quella categoria finché uno non se impiccia.</span>
        `
    }else if(langSelected=="napoletano"){
        if(card.includes("asso")){
            response = "a 'ccaten"
        }else if(card.includes("due")){
            response = "agg distribuì duj bicchier"
        }else if(card.includes("tre")){
            response = "biv duj bicchier"
        }else if(card.includes("quattro")){
            response = "agg distribuì duj bicchier e biv duj bicchier"
        }else if(card.includes("cinque")){
            response = "tutt' i wuaglion bivn"
        }else if(card.includes("sei")){
            response = "tutt' e wuaglion bivn"
        }else if(card.includes("sette")){
            response = "u frat ru cazz jett u pollic n'gopp u tavl"
        }else if(card.includes("otto")){
            response = "u specchij rifless"
        }else if(card.includes("nove")){
            response = "a 'rrim"
        }else if(card.includes("dieci")){
            response = "tutt' bivn"
        }else if(card.includes("jack")){
            response = "a 'rregl"
        }else if(card.includes("regina")){
            response = "a 'ccategorij"
        }else if(card.includes("re")){
            conteggioK -= 1
            response = "jett tutt 'cos rind a copp"
        }

        // compilo la guida
        const guideBox = document.querySelector(".guideBox")
        guideBox.innerHTML=`
        <span class="cardGuide">A 'ccaten: quann u scugnizz napltan chi pisc l'ass comincia u bevr, chill alla sinistr suij comincia i bivr; viceversa, quando il primo giocatore smette di bere, quello alla sinistra fa lo stesso e così via.</span>
        <span class="cardGuide">U frat ru cazz jett u pollic n'gopp u tavl: il giocatore che ha pescato la carta diventa il re dei pollici: ogni volta che metterà il pollice sul tavolo, gli altri dovranno fare lo stesso; l'ultimo a farlo beve.</span>
        <span class="cardGuide">U specchij rifless: il giocatore che pesca la carta deve sceglierne un altro per il resto della partita, in modo tale che quando uno beve l'altro farà lo stesso e viceversa.</span>
        <span class="cardGuide">A 'rrim: chi pesca la carta deve dire una parola, a turno ognuno dirà una parola che fa rima con la prima nominata, chi non la trova o ne ripete una già detta beve.</span>
        <span class="cardGuide">A 'rregl: chi pesca la carta deve inventare una regola, ogni volta che qualcuno la infrangerà, dovrà bere.</span>
        <span class="cardGuide">a 'ccategorij: chi pesca la carta deve scegliere una categoria, a turno ognuno dirà una parola che rientra nella categoria scelta, chi non la trova o ne ripete una già detta beve.</span>
        `
    }

    return response
}

function setConteggio(){
    conteggio -= 1
    document.querySelector(".conteggio").innerText = conteggio
}

function setErrorMessage(){
    errorMessage.classList.remove("hidden")
}

function getRandomPlayer(playersList){
    // estraiamo un numero a caso
    randomIndex = Math.floor(Math.random() * playersList.length)

    // estraiamo il giocatore corrispondente
    return randomIndex
}

function getRandomCard(){
    // estraiamo un numero a caso
    randomIndex = Math.floor(Math.random() * mazzo.length)

    // estraiamo la carta corrispondente
    const randomCard = mazzo[randomIndex]

    // rimuoviamo la carta dal mazzo
    mazzo.splice(randomIndex, 1)
    return randomCard
}

function setGameFinished(){
    // cloniamo il template
    const gameFinishedElement = gameFinishedTemplate.content.cloneNode(true)

    // lo compiliamo
    if(langSelected=="italiano"){
        response = "e ora bevi tutto!"
    }else if(langSelected=="inglese"){
        response = "drink it all!"
    }else if(langSelected=="spagnolo"){
        response = "¡bive toda la copa!"
    }else if(langSelected=="romano"){
        response = "e mo so cazzi tua!"
    }else if(langSelected=="napoletano"){
        response = "biv tutt' cos!"
    }

    gameFinishedElement.querySelector(".title").innerText = response

    // nascondiamo il loader
    loading.classList.add("hidden")

    // rimpiazziamo il placeHolder
    placeHolder.innerHTML = null
    placeHolder.appendChild(gameFinishedElement)

    // rigioca
    const rigioca = document.querySelector(".rigioca")
    rigioca.addEventListener("click", function(){
        reGame()
    })
}

function reGame(){
    window.location.reload()
}



// todo descrizioni lingue
// todo edit
// todo musichetta