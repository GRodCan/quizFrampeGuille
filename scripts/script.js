const divPlay=`<div id="play">
<p>Name:</p><input type="text" name="" id="playerName" placeholder="Player Name">
<div id="buttonsMode">
  <button onclick="tenQuest()">10 PREGUNTAS</button>
  <button onclick="twentyfiveQuest()">25 PREGUNTAS</button>
  <button onclick="fiftyQuest()">50 PREGUNTAS</button>
</div>
</div>`

const playDiv=()=>{
    if(document.getElementById("play")){
      return document.getElementById("start").removeChild(document.getElementById("play"))
    } else{
    return document.getElementById("start").innerHTML += divPlay}
}

const divPregunta=
    `<div id="pregunta">
        <div id="divTimer">
            <p id="timer">30</p>
        </div>
        <div id="cuadroPregunta">
            <img id="questionRick" src="./assets/images/pregun.png" alt="Rick Sánchez preguntando">
            <p id="textoPregunta"></p>
        </div>
        <div id="options">
            <div class="optionsPair">
                <label id="optionALabel"></label>
                <label id="optionBLabel"></label>                
            </div>
            <div class="optionsPair">
                <label id="optionCLabel"></label>                
                <label id="optionDLabel"></label>
            </div>               
        </div>
        <button id="btnAnswerQuestion">Contestar</button>
    </div>`;

const tenQuest=()=>{

    //Obtenemos el nombre del jugador
    let playerName = document.getElementById("playerName");

    //Si no tenemos el nombre del jugador entonces damos un error y detenemos la función
    if(playerName === null || playerName.value === "") { alert("Please, enter a player name"); return false; }

    //Asignamos al div root los divs con las preguntas
    document.getElementById("root").innerHTML = divPregunta;

    //Incializamos el cuestionario con las 10 preguntas por defecto
    initializeQuiz(playerName.value);

    //Terminamos la función
    return true;

}

const twentyfiveQuest=()=>{

    //Obtenemos el nombre del jugador
    let playerName = document.getElementById("playerName");

    //Si no tenemos el nombre del jugador entonces damos un error y detenemos la función
    if(playerName === null || playerName.value === "") { alert("Please, enter a player name"); return false; }

    //Asignamos al div root los divs con las preguntas
    document.getElementById("root").innerHTML = divPregunta;

    //Incializamos el cuestionario con 25 preguntas
    initializeQuiz(playerName.value, 25);

    //Terminamos la función
    return true;

}

const fiftyQuest=()=>{

    //Obtenemos el nombre del jugador
    let playerName = document.getElementById("playerName");

    //Si no tenemos el nombre del jugador entonces damos un error y detenemos la función
    if(playerName === null || playerName.value === "") { alert("Please, enter a player name"); return false; }

    //Asignamos al div root los divs con las preguntas
    document.getElementById("root").innerHTML = divPregunta;

    //Incializamos el cuestionario con 50 preguntas
    initializeQuiz(playerName.value, 50);

    //Terminamos la función
    return true;

}
  
const divB=`
<div id="respBM__container">
    <div id="parrafBM__container">
    <h2>Respuesta correcta</h2>
    <p id="parrafoBM">Que te crees un empollón de mierda?</p>
    <button id="siguientePregunta" onclick="showNextQuestion()">Siguiente pregunta</button>
    </div>
    <div id="imgBM__container">
    <img src="./assets/images/bien.png" alt="Rick contento" class="imgBM">
    </div>
    </div>`;

const divM=`
<div id="respBM__container">
    <div id="parrafBM__container">
    <h2>Respuesta errónea</h2>
    <p id="parrafoBM">Bueno, supongo que un despiste lo puede tener cualquiera... imbécil.</p>
    <button id="siguientePregunta" onclick="showNextQuestion()">Siguiente pregunta</button>
    </div>
    <div id="imgBM__container">
    <img src="./assets/images/mal.png" alt="Rick Disgustado" class="imgBM">
    </div>
    </div>`;

const divT=`
<div id="respBM__container">
    <div id="parrafBM__container">
    <h2>¡Se acabó el tiempo!</h2>
    <p id="parrafoBM">Se te acabó el tiempo, parguela!</p>
    <button id="siguientePregunta" onclick="showNextQuestion()">Siguiente pregunta</button>
    </div>
    <div id="imgBM__container">
    <img src="./assets/images/mal.png" alt="Rick Disgustado" class="imgBM">
    </div>
    </div>`;

let segundos = 30;
let tiempo = null;

function cuentaAtras() {
    if(tiempo !== null) { return false; }
    tiempo = window.setInterval(function () {
            try {
                if (segundos === 0) { window.__quizQuestions__.timeoutCurrentQuestion(); clearInterval(tiempo); tiempo = null; }
                document.getElementById("timer").innerHTML = segundos.toString();
                segundos--;
            } catch (eException) {}
        },1000);
    return true;
}

function showNextQuestion() {

    //Obtenemos la siguiente pregunta
    let nextQuestion = window.__quizQuestions__.getNextQuestion();

    //Si no tenemos siguiente entonces hemos llegado al fin del formulario
    if(nextQuestion === null) {

        //Mostramos el div de final del formulário
        document.getElementById('root').innerHTML = 'FIN DEL FORMULARIO. RECUERDA QUE LOS STATS ESTAN EN EL OBJETO';

        //Terminamos la función
        return true;

    }

    //Añadimos el div de preguntas al dom
    document.getElementById('root').innerHTML = divPregunta;

    //Rellenamos el div de las preguntas con la siguiente
    populateDivsWithQuestion(nextQuestion);

    //Volvemos a añadir los eventos a los label ya al destruirlos
    //del dom estos se pierden
    addEventListenerToQuizButtons();

    //Volvemos a iniciar el contador
    cuentaAtras();

}