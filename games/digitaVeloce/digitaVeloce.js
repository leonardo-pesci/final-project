/* Elements */
let wordSpan = document.querySelector('#wordSpan')
let wordInput = document.querySelector('#wordInput')
let wordButton = document.querySelector('#wordButton')
let scoreSpan = document.querySelector('#digitaScore')
let timerSpan = document.querySelector('#digitaTimer')
let message = document.querySelector('#message')
let againButton = document.querySelector('#againButton')

/* Variables */
let dictionary = [
    'abbraccio', 'abbronzatura', 'abbruttire', 'abete', 'abile', 'abitudine', 'accelerare', 'accompagnare', 'accogliere', 'accordo', 
    'accurato', 'addormentare', 'addestrare', 'adescare', 'adiacente', 'admirare', 'adorare', 'adottare', 'affascinare', 'affetto', 
    'affidabile', 'affondare', 'agile', 'agio', 'agire', 'agitare', 'agonia', 'albero', 'allegare', 'alleggerire', 
    'allietare', 'amabile', 'amare', 'ambiente', 'amico', 'amore', 'andare', 'angolo', 'anima', 'annunciare', 
    'ansia', 'antico', 'anziano', 'apertura', 'apparire', 'appartenere', 'appassionare', 'appello', 'approvare', 'argento', 
    'armonia', 'arricchire', 'arrivare', 'arte', 'artista', 'ascoltare', 'aspettare', 'assaporare', 'assonnato', 'assumere', 
    'astratto', 'attento', 'attirare', 'augurare', 'autunno', 'avventura', 'azzurro', 'babbo', 'bagliore', 'bagno', 
    'bambino', 'banchetto', 'barriera', 'basilico', 'battesimo', 'bello', 'benevolo', 'benvenuto', 'bere', 'bocciolo', 
    'bontà', 'borgo', 'brillante', 'buono', 'cacciatore', 'cadere', 'calare', 'caldo', 'calmo', 'camminare', 
    'campagna', 'candore', 'cane', 'canto', 'capelli', 'capitare', 'carattere', 'carino', 'carriera', 'carta', 
    'casa', 'casuale', 'catturare', 'cavalcare', 'cena', 'centrale', 'cerchio', 'cercare', 'chiarezza', 'chiaro', 
    'chiave', 'chicco', 'chiesa', 'cibo', 'cicatrice', 'ciclone', 'cielo', 'ciotola', 'città', 'civetta', 
    'classe', 'clima', 'coccinella', 'colazione', 'colore', 'coltivare', 'comandare', 'combinare', 'come', 'comfort', 
    'cominciare', 'comodo', 'compagnia', 'compagno', 'compleanno', 'completare', 'complicare', 'condividere', 'confortare', 'confrontare', 
    'confuso', 'conoscere', 'consapevole', 'conservare', 'considerare', 'contadino', 'contento', 'contrario', 'contro', 'conversare', 
    'convincere', 'coppia', 'coraggio', 'corallo', 'corona', 'corpo', 'corsa', 'cortesia', 'coscienza', 'crescere', 
    'cucina', 'cultura', 'curioso', 'danza', 'data', 'delicato', 'desiderare', 'destinare', 'destino', 'dettaglio', 
    'diario', 'diffondere', 'diffuso', 'dire', 'dirigere', 'disegnare', 'disporre', 'distanza', 'divano', 'diverso', 
    'divertimento', 'dividere', 'dolce', 'domani', 'dormire', 'dovere', 'economia', 'edera', 'educare', 'effetto', 
    'elegante', 'emozione', 'energia', 'entusiasmo', 'entrare', 'epoca', 'erba', 'eroe', 'essere', 'estate', 
    'euforico', 'evento', 'evoluzione', 'fabbrica', 'famiglia', 'fantasia', 'farfalla', 'fascino', 'faticare', 'fatto', 
    'fazzoletto', 'felice', 'femmina', 'fiaba', 'fiamma', 'fiducia', 'figlio', 'figura', 'fila', 'fiori', 
    'fisico', 'fiume', 'foglia', 'fondamento', 'fondere', 'forma', 'fortezza', 'fortuna', 'fragile', 'fratello', 
    'fresco', 'frutteto', 'fuoco', 'futuro', 'gabbiano', 'gallina', 'gatto', 'generale', 'gente', 'giardino', 
    'gioiello', 'giorno', 'giostra', 'giovane', 'gioventù', 'giro', 'gioviale', 'giovinetto', 'girone', 'giudicare', 
    'giudizio', 'giungere', 'giuramento', 'giusto', 'gocciolina', 'goloso', 'gommone', 'grace', 'grande', 'grano', 
    'grazie', 'gridare', 'grotta', 'guadagnare', 'guancia', 'guarire', 'guardare', 'guarire', 'guidare', 'gusto', 
    'idea', 'ideale', 'idrante', 'igiene', 'illusione', 'immagine', 'immaginare', 'imparare', 'importare', 'impresa', 
    'impressionare', 'improvviso', 'incontro', 'indicare', 'indossare', 'iniziare', 'insegnare', 'insieme', 'integrazione', 'intelligenza', 
    'intendere', 'interesse', 'interno', 'interno', 'intorno', 'introdurre', 'inverno', 'invisibile', 'invitare', 'invito', 
    'italiano', 'jazz', 'lacrima', 'laggiù', 'lamentare', 'lampada', 'lavorare', 'leggere', 'leggerezza', 'leggenda', 
    'lenire', 'lentezza', 'lenticchia', 'lentiggine', 'leone', 'lezione', 'liberare', 'libero', 'libro', 'licenza', 
    'limone', 'linea', 'liquido', 'lontano', 'lontananza', 'lontano', 'luce', 'lucidare', 'luna', 'luminoso', 
    'macchina', 'magia', 'maggio', 'magnifico', 'mai', 'malattia', 'malinconia', 'mammifero', 'mano', 'mantenere', 
    'mare', 'marmellata', 'martedì', 'maschio', 'massimo', 'matematica', 'matrimonio', 'mattina', 'medico', 'melodia', 
    'memoria', 'menta', 'mente', 'mentire', 'meraviglia', 'merce', 'mercoledì', 'merito', 'merlo', 'mescolare', 
    'metafora', 'mettere', 'mezzanotte', 'mielato', 'miele', 'milione', 'minuto', 'miracolo', 'mistero', 'mistico', 
    'modo', 'mostrare', 'mucca', 'muovere', 'musica', 'narrare', 'nascere', 'natura', 'nazionale', 'negozio', 
    'nero', 'nervoso', 'nessuno', 'neve', 'nocciola', 'noia', 'normale', 'nostalgia', 'nostro', 'notizia', 
    'novità', 'nubifragio', 'nuotare', 'nuovo', 'nutrire', 'obiettivo', 'oblio', 'obsoleto', 'occupare', 'occhio', 
    'odissea', 'offerta', 'olfatto', 'ombra', 'ombrello', 'operare', 'opera', 'opinione', 'opportunità', 'ordine', 
    'orecchio', 'orgoglio', 'orizzonte', 'ormai', 'oro', 'orologio', 'osare', 'ospite', 'ospizio', 'osservare', 
    'ossigeno', 'ovunque', 'padre', 'pagare', 'palato', 'palla', 'palmo', 'pane', 'panorama', 'papa', 
    'paradiso', 'paragonare', 'paralisi', 'parlare', 'parola', 'partecipare', 'partenza', 'partire', 'partita', 'parto', 
    'passaggio', 'passare', 'passatempo', 'passero', 'pasticcino', 'pasticcino', 'patata', 'patria', 'patrimonio', 'pausa', 
    'paura', 'pavimento', 'pazzesco', 'pecora', 'peccato', 'peggio', 'peloso', 'pena', 'penna', 'pensare', 
    'perdono', 'perfetto', 'pericolo', 'perla', 'permanente', 'perno', 'però', 'persona', 'pesca', 'pesce', 
    'pessimo', 'petalo', 'petto', 'pettegolezzo', 'piano', 'piccolo', 'pietà', 'piede', 'pietra', 'pigro', 
    'pilota', 'pino', 'pioggia', 'piovere', 'piscina', 'pisello', 'pista', 'pistacchio', 'piuma', 'pizza', 
    'placare', 'plastica', 'plurale', 'poesia', 'poetico', 'polmone', 'poltrona', 'pomodoro', 'popolo', 'porpora', 
    'portare', 'portico', 'posizione', 'possedere', 'posteriore', 'posto', 'potere', 'pranzo', 'precauzione', 'precoce', 
    'preferire', 'pregare', 'premere', 'preoccupare', 'preparare', 'presente', 'presenza', 'preso', 'presto', 'pretesto', 
    'previsto', 'prigione', 'prima', 'primavera', 'principale', 'principe', 'privato', 'problema', 'processo', 'produrre', 
    'profumo', 'progredire', 'proiettile', 'prolifico', 'promessa', 'promettere', 'pronunciare', 'proprio', 'proteggere', 'prova', 
    'provare', 'provincia', 'pubblico', 'pulire', 'pulito', 'pullover', 'punta', 'puntare', 'punto', 'purezza', 
    'puzzle', 'quadro', 'qualità', 'quando', 'quanto', 'quarto', 'quercia', 'questione', 'quieto', 'quindi', 
    'raccogliere', 'raccolta', 'raccontare', 'racconto', 'radice', 'radio', 'ragazza', 'raggio', 'ragione', 'rana', 
    'rancore', 'rapido', 'raramente', 'rasoio', 'rassicurare', 'rassegna', 'ravanello', 'razza', 'reale', 'recinto', 
    'regalo', 'regina', 'regno', 'relegare', 'religione', 'remare', 'rendere', 'reputazione', 'resistere', 'respiro', 
    'restare', 'rete', 'ricchezza', 'riccio', 'ricetta', 'ricevere', 'ricompensa', 'ridere', 'ridotto', 'riflesso', 
    'rifugio', 'rigido', 'rimanere', 'rimedio', 'rimpianto', 'rinascere', 'rincorrere', 'rinforzare', 'rinfresco', 'rinuncia', 
    'riparare', 'ripetere', 'riportare', 'ripresa', 'riprendere', 'risata', 'riscaldare', 'rischio', 'riso', 'risolvere', 
    'rispetto', 'ristorante', 'ritirare', 'ritmo', 'ritornare', 'ritrovare', 'riunire', 'riuscire', 'rivela', 'rivelare', 
    'rivedere', 'rivolgersi', 'romanzo', 'rompere', 'rosa', 'rospo', 'rosso', 'rotolare', 'rubare', 'ruggire', 
    'ruota', 'ruscello', 'sabbia', 'saggio', 'sala', 'salire', 'salute', 'sapere', 'sapore', 'sarà', 
    'sarebbe', 'sarto', 'sbalordire', 'sbarra', 'scaldare', 'scambio', 'scappare', 'scarpa', 'scarso', 'scelta', 
    'schiena', 'schiuma', 'scienza', 'sciopero', 'scolaro', 'scoperta', 'scoprire', 'scoprirsi', 'scorrere', 'scrivania', 
    'scrivere', 'scuro', 'scusa', 'sdraiare', 'secco', 'segno', 'seguire', 'selezionare', 'sembrare', 'semplice', 
    'senape', 'seno', 'sensibile', 'sentire', 'sentiero', 'separare', 'sera', 'sereno', 'servire', 'servizio', 
    'settembre', 'settimo', 'sezione', 'sfida', 'sfiorare', 'sfortunato', 'sfuggire', 'sgabello', 'sguardo', 'siamo', 
    'sicuro', 'siedere', 'siepe', 'sigillare', 'silenzio', 'simpatico', 'sinistra', 'sintomo', 'situazione', 'slancio', 
    'soggiorno', 'soglia', 'sogno', 'soldato', 'sollievo', 'soltanto', 'soluzione', 'sommerso', 'sorprendere', 'sorriso', 
    'sorta', 'sospetto', 'sospirare', 'sosta', 'staccare', 'stanco', 'stare', 'stato', 'stazione', 'stella', 
    'stilista', 'storia', 'strada', 'strano', 'stretto', 'stringere', 'strumento', 'studio', 'stupire', 'stupore', 
    'suono', 'svegliare', 'svezzare', 'sviluppare', 'sviluppo', 'svincolare', 'svolta', 'tabacco', 'tacco', 'tavolo', 
    'tazza', 'tecnologia', 'televisione', 'temperatura', 'tempo', 'tendere', 'tenere', 'tensione', 'tentare', 'testa', 
    'testimone', 'tetto', 'timido', 'tiro', 'togliere', 'torcia', 'tormento', 'tossire', 'tovaglia', 'traccia', 
    'tragedia', 'tramonto', 'tranquillo', 'trasformare', 'trasportare', 'trattare', 'traversata', 'tre', 'tribù', 'triste', 
    'triumph', 'trovare', 'trucco', 'tuffarsi', 'tutti', 'uccello', 'ultimato', 'umido', 'umile', 'unicorno', 
    'unico', 'unire', 'unito', 'uomo', 'urlo', 'usare', 'uscire', 'utilizzare', 'vacanza', 'vagabondo', 
    'vagare', 'valle', 'valore', 'valutare', 'vapore', 'variare', 'vasca', 'vaso', 'vegetale', 'vela', 
    'veloce', 'venire', 'vento', 'verità', 'verde', 'vergine', 'vetro', 'viale', 'vicinanza', 'vicino', 
    'vigilia', 'villaggio', 'vincere', 'vino', 'viola', 'violenza', 'vivace', 'vivere', 'voglia', 'volare', 
    'volere', 'volontà', 'volpe', 'volto', 'vomito', 'vortice', 'vostro', 'zanzara', 'zucchero', 'zuppa'
]
let wordSelected = ''
score = 0
time = 60

/* Functions */
let startGame = () => {
    timerFunction = setInterval(reduceTime, 1000)
    document.removeEventListener('click', startGame)

    wordButton.classList.remove('disabled')
    wordInput.disabled = false;

    wordInput.focus()
    selectWord()

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Enter') checkWord()
    })
}

let reduceTime = () => {
    time--
    timerSpan.innerHTML = time

    if (time === 0) {
        clearInterval(timerFunction)
        wordButton.classList.add('disabled')
        message.classList.remove('visually-hidden')
        message.innerHTML = 'Tempo scaduto!'
        againButton.classList.remove('visually-hidden')
        wordInput.disabled = true;
    }
}

let checkWord = () => {
    inputValue = wordInput.value
    if (inputValue === wordSelected) {
        selectWord()
        score++
        scoreSpan.innerHTML = score
        message.classList.add('visually-hidden')
    } else {
        message.classList.remove('visually-hidden')
    }
}

let selectWord = () => {
    let index = Math.floor(Math.random() * dictionary.length)
    wordSelected = dictionary[index]
    wordInput.value = ''
    wordSpan.innerHTML = wordSelected
}

/* Events */
document.addEventListener('click', startGame)