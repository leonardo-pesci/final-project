// commento inutile
// gpt
const OPENAI = {
    URL: "https://api.openai.com/v1/chat/completions",
    MODEL: "gpt-3.5-turbo",
    CONTENT_TYPE: "application/json",
    KEY: "sk-proj-sk-proj-HWpcgtlVISU92ltsHnLdT3BlbkFJ7iSX3Qo7ONJrPgQABV78",
    TEMPERATURE: 1.2
}

// elementi
const loading = document.querySelector(".loading")
const difficolta = document.querySelector(".difficolta")
const difficulties = document.querySelectorAll(".difficulty")
const level = document.querySelector(".level")
const placeHolder = document.querySelector("#placeHolder")
const levelQuestion = document.querySelector(".levelQuestion")
const levelOptions = document.querySelector(".levelOptions")
const levelTemplate = document.querySelector(".levelTemplate")
const gameoverTemplate = document.querySelector(".gameoverTemplate")
const victoryTemplate = document.querySelector(".victoryTemplate")
const description = document.querySelector(".description")
const startButton = document.querySelector(".startButton")
let cin = 0
let chi = 0
let pub = 0

const usato = document.querySelectorAll(".usato")

let punteggio = document.querySelector(".punteggio")
let punteggioAttuale = 0
const punteggioVittoria = 15

// eventi
startButton.addEventListener("click", function(){
    goSetDifficulty()
})

// funzioni principali
function goSetDifficulty(){
    punteggioAttuale = 0
    document.body.classList.add("gameStarted")
    difficolta.classList.remove("hidden")

    difficulties.forEach(function(diff){
        diff.addEventListener("click", function(){
            const diffSelected = diff.innerText
            
            startGame(diffSelected)
        })
    })
}

function startGame(diffSelected){
    // resettiamo il punteggio
    punteggioAttuale = 0

    difficolta.classList.add("hidden")

    placeHolder.innerHTML = null
    // generiamo il primo livello
    setLevel(diffSelected)
}

async function makeRequest(data){
    let response = await fetch(OPENAI.URL, {
        method: "POST",
        headers: {
            "Content-Type": OPENAI.CONTENT_TYPE,
            "Authorization": `Bearer ${OPENAI.KEY}`
        },
        body: JSON.stringify(data)
    })
    
    const json = await response.json()
    const message = json.choices[0].message
    const content = JSON.parse(message.content)
    return content
}

async function setLevel(diffSelected){
    // mostro il loader
    loading.classList.remove("hidden")

    // svuoto il placeHolder
    placeHolder.innerHTML = null

    console.log(diffSelected)
    // preparo le istruzioni per GPT
    let prompt = `Voglio che ti comporti come se fossi il gioco "chi vuol essere milionario di Gerry Scotti". Io sarò il concorrente. Non fare riferimento a te stesso. Ogni domanda sarà composta da massimo 90 caratteri e sarà seguita da una array di esattamente 4 opzioni (devono essere esattamente 4, ciascuna opzione deve avere un massimo di 25 caratteri), solo una di queste opzioni è corretta e porta al livello successivo. Devi restituirmi un indice, compreso da 1 a 4, che indicherà la risposta corretta. Ad esempio, se l'opzione corretta è la numero 2, l'indice deve essere 2. La posizione dell'opzione corretta deve essere casuale. Le opzioni devono essere esattamente 4. Gli argomenti delle domande sono: cultura generale, musica, sport, cinema, storia, geografia. La difficoltà delle domande deve essere ${diffSelected}. La tua risposta deve essere solo in formato JSON.

    Non aggiungere mai altre spiegazioni, inviami solo e soltanto un oggeto JSON. La domanda non deve contenere il segno ". Non fare mai riferimento a te stesso. Le tue risposte sono solo in formato JSON come in questo esempio:\n###\n{"question":"domanda","options":["opzione 1", "opzione 2", "opzione 3", "opzione 4"], "index":2}###`

    const messages = [
        {
            role: "system",
            content: prompt
        }
    ]

    // chiedo a GPT di creare il livello
    const messageResponse = await makeRequest(
        {
            model: OPENAI.MODEL,
            messages: messages,
            temperature: OPENAI.TEMPERATURE
        }
    )

    const question = messageResponse.question
    const options = messageResponse.options
    const index = messageResponse.index

    // inseriamo la descrizione nel livello
    setLevelQuestion(question)
    
    // inseriamo le azioni
    setLevelOptions(options, index)

    // nascondo il loader
    loading.classList.add("hidden")

    setPunteggio(punteggioAttuale) 
}


/*
const cinquanta = levelElement.querySelector(".cinquanta")
    const chiamata = levelElement.querySelector(".chiamata")
    const pubblico = levelElement.querySelector(".pubblico")

    cinquanta.addEventListener("click", function(){
        cin = 1
        console.log("arg")
    }, {once: true})
    chiamata.addEventListener("click", function(){
        chi = 1
    })
    pubblico.addEventListener("click", function(){
        pub = 1
    })

    if (cin == 1){
        cinquanta.innerHTML = `<img src="img/slash.png" alt="" class="usato"></img>`
    }
    if (chi == 1){
        chiamata.innerHTML = `<img src="img/slash.png" alt="" class="usato"></img>`
    }
    if (pub == 1){
        pubblico.innerHTML = `<img src="img/slash.png" alt="" class="usato"></img>`
    }
*/

// set functions
function setLevelQuestion(question){
    placeHolder.innerHTML = null
    // cloniamo il template
    const levelElement = levelTemplate.content.cloneNode(true)

    // lo compiliamo
    levelElement.querySelector(".levelQuestion").innerText = question

    // aiuti







    // lo mostriamo
    placeHolder.appendChild(levelElement)
}

function setLevelOptions(options, index){
    // preparo il necessario
    optionsHTML = ""
    let num = 0
    const lettere = ["A", "B", "C", "D"]

    // compilo le opzioni
    lettere.forEach(function(){
        optionsHTML += `<button class="pulsante" data-num="${num}"><span>${lettere[num]}:</span><div class="option"> ${options[num]}</div></button>`
        num += 1
    })
    
    document.querySelector(".levelOptions").innerHTML = optionsHTML

    const optionButtons = document.querySelectorAll(".pulsante")

    optionButtons.forEach(function(optionButton){
        optionButton.addEventListener("click", function(){
            correctOption = document.querySelector(`[data-num="${index-1}"]`);

            const check = (optionButton.dataset.num == index - 1)
            optionButton.classList.add("accendiamo")

            setTimeout(function(){
                    correctOption.classList.add("corretto")
            }, 1500)

            setTimeout(function(){
                if(check === true){
                    if(punteggioAttuale === punteggioVittoria){
                        setVictory()
                    }else{
                    setLevel()
                    }
                }else{
                    setGameOver()
                }
            }, 2500)
        })
    })
}

function setPunteggio(){
    punteggioAttuale += 1
    document.querySelector(".punteggio").innerText = `Livello ${punteggioAttuale}`
}

// vittoria e sconfitta

function setVictory(){
    // cloniamo il template
    const victoryElement = victoryTemplate.content.cloneNode(true)

    // estraiamo un messaggio di vittoria casuale
    const message = getRandomVictoryMessage()

    // lo compiliamo
    victoryElement.querySelector(".description").innerText = message

    // rimpiazziamo il placeHolder
    placeHolder.innerHTML = null
    placeHolder.appendChild(victoryElement)

    // rigioca
    const rigioca = document.querySelector(".rigioca")
    rigioca.addEventListener("click", function(){
        reGame()
    })
}

function setGameOver(){
    // cloniamo il template
    const gameoverElement = gameoverTemplate.content.cloneNode(true)

    // estraiamo un messaggio di gameover casuale
    const message = getRandomGameoverMessage()

    // lo compiliamo
    gameoverElement.querySelector(".description").innerText = message

    // rimpiazziamo il placeHolder
    placeHolder.innerHTML = null
    placeHolder.appendChild(gameoverElement)

    // rigioca
    const rigioca = document.querySelector(".rigioca")
    rigioca.addEventListener("click", function(){
        reGame()
    })
}

function getRandomVictoryMessage(){
    const messages = [
        "Chi osa vince. (motto dello Special Air Service)",
        "Chi vile ingiuria fa fuor di ragione | sua possanza adoprando in atto ingiusto, | non vince, no; poi che vittoria vera | è giustizia serbar schietta ed intera. (Luís de Camões)",
        "Coloro che vincono, in qualunque modo vincono, mai non ne riportono vergogna. (Niccolò Machiavelli)",
        "È più importante vincere o partecipare? È importante partecipare, ma se vinci è meglio ancora. (Patrizio Sala)",
        "Fu il vincer sempre mai laudabil cosa | Vincasi o per fortuna o per ingegno. (Ludovico Ariosto)",
        "Ho l'ossessione per la vittoria e non penso che sia qualcosa di brutto, penso che sia una cosa buona. Mi motiva. Se non sei motivato, è meglio fermarsi. (Cristiano Ronaldo)",
        "I vincitori non sanno quello che perdono. (Gesualdo Bufalino)",
        "Il momento della vittoria è troppo breve per vivere solo di quello e niente altro. (Martina Navrátilová)",
        "Il profumo della vittoria acceca molti uomini. Il gioco non finisce finché la baionetta non viene affondata e rigirata nelle viscere. (Francis Urquhart, Michael Dobbs)",
        "Il sapore della vittoria è difficile da spiegare, come lo sono tutte le sensazioni interiori. (Irma Testa)",
        "Il vero vincente non è colui che vince tutti i giorni ma è quello che trova il giusto equilibrio tra un'esaltante vittoria e un momento difficile o una grande sconfitta. (Maurizia Cacciatori)",
        "Io correvo per vincere, non mi è mai interessato niente oltre la vittoria: arrivare secondo mi dava una rabbia pazzesca. Oggi in tanti si dicono soddisfatti per il podio; non scherziamo, dai. (Giancarlo Falappa)",
        "Io non mi permetterei mai di giocare, si figuri se mi permetterei di vincere, sire. (Il secondo tragico Fantozzi)",
        "L'animo preferisce la vittoria alla pace. (Tito Livio, attribuita ad Annibale)",
        "L'importante non è vincere; è pensare in modo vincente. (Gianluca Vialli)",
        "La parola d'ordine è una sola, categorica e impegnativa per tutti. Essa già trasvola ed accende i cuori dalle Alpi all'Oceano Indiano: vincere! (Benito Mussolini)",
        "La vittoria alimenta inimicizia, perché chi è vinto giace dolente. Chi ha abbandonato vittoria e sconfitta, costui ristà tranquillo e felice. (Gautama Buddha)",
        "La vittoria è del forte che ha fede. (Corrado Corradini)",
        "La vittoria è il sorriso di Dio. (John Greenleaf Whittier)",
        "La vittoria è sempre nel pugno di pochi. Provare a preparare questa pattuglia di eroi è il segreto di ogni vittoria. (Carlo Gnocchi)",
        "La vittoria non ha valore se l'oscurità si impadronisce di te. (Kingdom Hearts Birth by Sleep)",
        "Le vittorie consumano le forze al pari o poco meno delle disfatte, e le forze si perdono inutilmente se non prive di consiglio, o lo scopo è tale che non possa ottenersi. (Vincenzo Cuoco)",
        "Ma io non corro per essere battuto, io corro per vincere! Se non posso vincere non corro.",
        "E se non corri non puoi vincere. (Momenti di gloria)",
        "Nella mia carriera ho ricevuto tanto, ma il bilancio non si traccia solo attraverso le vittorie. Ci sono momenti che non vanno nell'albo d'oro ma che rimangono comunque importanti. (Angelo Lorenzetti)",
        "Non è la vittoria che conta ma quello che devi soffrire per ottenerla. (Jeeg robot d'acciaio)",
        "Non è vittoria quella che non mette fine alla guerra. (Michel de Montaigne)",
        "Se in battaglia un uomo ne vincesse mille, e un altro vincesse se stesso, il vero vincitore sarebbe il secondo. (Gautama Buddha)",
        "Se vincere non è importante, allora perché si segnano i punti? (Worf, Star Trek: The Next Generation)",
        "Sono drogato. Drogato di vittoria. In questo momento sono totalmente dipendente dal successo: corro, vinco e dunque vivo. (Ayrton Senna)",
        "Spesso la vittoria può dipendere soltanto da un cavallo molto veloce. (L'attacco dei giganti)",
        "Un vincitore è semplicemente un sognatore che non si è mai arreso. (Nelson Mandela)",
        "Una vittoria senza merito non è una vittoria. (Arrigo Sacchi)",
        "Vincere non è importante: è la sola cosa che conti. (Giampiero Boniperti)",
        "Vincere non è saper proclamare un'idea eclatante, ma saper farla propria e tradurla in atto. (Eduard Shevardnadze)",
        "Vincere non è solo tagliare il traguardo per primi. (Lance Armstrong)",
        "Vincere non è tutto, è l'unica cosa! (Un'ottima annata)"
    ]

    const index = Math.floor(Math.random() * messages.length)
    const selectedMessage = messages[index]
    return selectedMessage
}

function getRandomGameoverMessage(){
    const messages = [
        "Che libidine quando perdo. La sconfitta mi esalta e mi fa assaporare stimoli insostituibili. (Franco Scoglio)",
        "Come dal vincitor fugge e s'asconde | Il vinto, in volto mesto e vergognoso, | Sommerse il carro suo tosto nell'onde. (Angelo di Costanzo)",
        "È sconfitto solo chi si crede tale. (Fernando de Rojas)",
        "Giocavo a basket con un gruppo di amiche e ho imparato che perdere insieme è molto formativo. (Alessandra De Stefano)",
        "Guai ai vinti! (Tito Livio, attribuita a Brenno)",
        "Ho sempre visto la sconfitta come un passo per la vittoria, uno stimolo a migliorarmi. Non che sia bello: perdere è frustrazione, tristezza e rabbia ma può tramutarsi in energia positiva per la sfida successiva. (Arianna Fontana)",
        "Ho vinto tanto, ma ho perso anche tanto. E le sconfitte mi hanno insegnato a dare di più, a migliorarmi. (Francesca Piccinini)",
        "Io odio la sensazione di quel momento in cui capisci che non c'è più nulla da fare. (Sebastian Vettel)",
        "L'idea di sconfitte positive – quelle in cui si impara o si dona qualcosa, oppure quelle in cui si fa un passo indietro per dare spazio al migliore – è un concetto importante. (Anthony Clifford Grayling)",
        "L'uomo non è fatto per la sconfitta. Un uomo può essere distrutto, ma non può essere sconfitto. (Ernest Hemingway)",
        "La sconfitta agita nella mia mente il senso della paura, che non è certo quella di prendere pugni. La vera paura è perdere dopo tanti sacrifici. Odio la sconfitta, la considero umiliante. (Irma Testa)",
        "La sconfitta è elegante, la sconfitta è riposante. Mai, però, farsi sconfiggere dentro. (Fausto Gianfranceschi)",
        "La sola speranza per i vinti è non sperare in alcuna salvezza.(Publio Virgilio Marone, Eneide)",
        "Lo sconfitto è colui che si siede e cerca di analizzare le cause di una battuta d'arresto, il perdente invece non accetta le critiche e vuole sempre sentirsi dire che tutto va bene. Ma io sono per la verità. (Patrizio Oliva)",
        "Penso che tutte le sconfitte pesanti mi siano servite per capire me stessa un po' meglio ogni volta. (Aryna Sabalenka)",
        "Perdere è un dovere civico, la residua dignità di chi vive. (Gesualdo Bufalino)",
        "Presso i vinti ci sono più lamentele che forze. (Publio Cornelio Tacito)",
        "Qual è l'apporto di una sconfitta? Una visione più precisa di noi stessi. (Emil Cioran)",
        "Sconfitti eravamo, col muso a terra e lo sconforto nel cuore. (Mario Giannone)",
        "Se si sappia vivere da vinti, lo si è un po' meno. (Guido Ceronetti)",
        'La sconfitta aiuta davvero o è solo retorica? Serve a fare passi indietro per andare avanti. Insegna a non disunirsi e a investire in tecnologie, uomini e "cultura": individuare i punti deboli e correggerli. (Mattia Binotto)',
        "Tutti hanno bisogno di qualche sconfitta. Un po' di mortificazione ogni tanto non nuoce. (Arthur Hailey)",
        "Venire sconfitti non è una vergogna. La vera infamia è sottrarsi al combattimento. (Il destino di Kakugo)"
    ]

    const index = Math.floor(Math.random() * messages.length)
    const selectedMessage = messages[index]
    return selectedMessage
}

function reGame(){
    window.location.reload()
}

// to do
// rendere gli aiuti monouso
// chiamata gpt per aiuto da casa
// chiamata gpt per aiuto dal pubblico
// 50 e 50

// schermata monte premi
// selezione monouso
// musichetta