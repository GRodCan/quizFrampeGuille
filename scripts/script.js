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
    </div>`

const tenQuest=()=>{
    document.getElementById("root").innerHTML = divPregunta;
    initializeQuiz();
    return null;
}
const twentyfiveQuest=()=>{
    document.getElementById("root").innerHTML = divPregunta;
    initializeQuiz(25);
    return null;
}
const fiftyQuest=()=>{
    document.getElementById("root").innerHTML = divPregunta;
    initializeQuiz(50);
    return null;
}
  
const divB=`
<div id="respBM__container">
    <div id="parrafBM__container">
    <h2>Respuesta correcta</h2>
    <p id="parrafoBM">¿Que te crees un empollón de mierda?</p>
    <button id="siguientePregunta" onclick="populateDivsWithQuestion(window.__quizQuestions__.cursor); cuentaAtras();">Siguiente pregunta</button>
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
    <button id="siguientePregunta" onclick="populateDivsWithQuestion(window.__quizQuestions__.cursor); cuentaAtras();">Siguiente pregunta</button>
    </div>
<   button id="siguientePregunta">Siguiente pregunta</button>
    <div id="imgBM__container">
    <img src="./assets/images/mal.png" alt="Rick Disgustado" class="imgBM">
    </div>
    </div>`;

const divT=`
<div id="respBM__container">
    <div id="parrafBM__container">
    <h2>¡Se acabó el tiempo!</h2>
    <p id="parrafoBM">Se te acabó el tiempo, parguela!</p>
    <button id="siguientePregunta" onclick="populateDivsWithQuestion(window.__quizQuestions__.cursor); cuentaAtras();">Siguiente pregunta</button>
    </div>
    <div id="imgBM__container">
    <img src="./assets/images/mal.png" alt="Rick Disgustado" class="imgBM">
    </div>
    </div>`;

let segundos = 5;

function cuentaAtras() {
    let tiempo = window.setInterval(function () {
            try {
                if (segundos === 0) { window.__quizQuestions__.timeoutCurrentQuestion(); document.getElementById("root").innerHTML = divT; clearInterval(tiempo); }
                document.getElementById("timer").innerHTML = segundos.toString();
                segundos--;
            } catch (eException) {}
        },1000);
}