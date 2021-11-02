const userName= window.localStorage.getItem("userName");
console.log(userName);
const divPlay=`<div id="play">
<p>Bienvenido ${userName}, elige un modo</p>
<div id="buttonsMode">
  <button onclick="tenQuest()">10 PREGUNTAS</button>
  <button onclick="twentyfiveQuest()">25 PREGUNTAS</button>
  <button onclick="fiftyQuest()">50 PREGUNTAS</button>
</div>
</div>`

const divPreSignUpIn =`
<div id="play">
<button id="button_to_signUp">Vengo a ver que es esto</button>
<button id="button_to_signIn">Ya nos conocemos...</button>
</div>
`

const divSignUp_emailpass=`
<div id="divSignUp">
    <div id="title_signUp">
    <a href=".">
        <h1>El QUIZ DEL CALAMAR</h1>
    </a>
    </div>
    <label>Email:</label>
    <input type="email" id="email_SignUp" autocomplete="off">
    <label>Password:</label>
    <input type="password" id="pass_SignUp">
    <button id="signUp">Registrar</button>
</div>
`
const divSignUp_name=`
<div id="divSignUp">
    <div id="title_signUp">
    <a href=".">
        <h1>El QUIZ DEL CALAMAR</h1>
    </a>
    </div>
    <label>Name:</label>
    <input type="text" name="" id="name">
    <button id="signUp_N">Registrar</button>
</div>`

const divSignIn=`
<div id="play">
<label>Name:</label>
<input type="email" id="email_SignIn" autocomplete="off">
<label>Password:</label>
<input type="password" id="pass_SignIn">
<button id="signIn">Entrar</button>
</div>
`
const divStart=`
<div id="errorDiv"></div>
<!-- codigo start -->
<img id="rickStart" src="./assets/images/start.png" alt="Rick vacilón">
<div id="start">
    <div id="title">
        <h1>El QUIZ DEL CALAMAR</h1>
    </div>
    <div id="buttonsStart">
        <button id="buttonPlay" onclick="buttonPlay()">PLAY</button>
        <button id="buttonClas" >CLASIFICATION</button>
     </div>
`


const buttonPlay=()=>{
    if(document.getElementById("play")){
      return document.getElementById("start").removeChild(document.getElementById("play"))
    }
    if(window.userName !=undefined){
        return document.getElementById("start").innerHTML += divPlay
    }
     else{
        document.getElementById("start").innerHTML += divPreSignUpIn
        document.getElementById("button_to_signIn").addEventListener("click",
            ()=>{
                document.getElementById("start").removeChild(document.getElementById("play"))
                document.getElementById("start").innerHTML += divSignIn
                return document.getElementById("signIn").addEventListener("click",()=>{
                    document.getElementById("start").removeChild(document.getElementById("play"))
                    document.getElementById("start").innerHTML += divPlay
                })
            })
            document.getElementById("button_to_signUp").addEventListener("click",
            ()=>{
                document.getElementById("root").innerHTML = divSignUp_emailpass
                document.getElementById("signUp").addEventListener("click", async function(){
                    await window.createUser()
                    document.getElementById("root").innerHTML = divSignUp_name
                    document.getElementById("signUp_N").addEventListener("click", async function(){
                        await window.establecerNombre() 
                        document.getElementById("root").innerHTML = divStart
                })
            })
        })
    }};
                       



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

    //Asignamos al div root los divs con las preguntas
    document.getElementById("root").innerHTML = divPregunta;

    //Incializamos el cuestionario con las 10 preguntas por defecto
    initializeQuiz(userName);

    //Terminamos la función
    return true;

}

const twentyfiveQuest=()=>{

    //Asignamos al div root los divs con las preguntas
    document.getElementById("root").innerHTML = divPregunta;

    //Incializamos el cuestionario con 25 preguntas
    initializeQuiz(userName, 25);

    //Terminamos la función
    return true;

}

const fiftyQuest=()=>{

    //Asignamos al div root los divs con las preguntas
    document.getElementById("root").innerHTML = divPregunta;

    //Incializamos el cuestionario con 50 preguntas
    initializeQuiz(userName, 50);

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

const divStats = '<div id="individualClassifications">\n' +
    '            <div id="titleClassifications">\n' +
    '                <h3>There are your results:</h3>\n' +
    '            </div>\n' +
    '            <div id="totalCorrectQuestions">\n' +
    '                <img src="./assets/bien.png" alt="Corrects questions">\n' +
    '                <p id="totalCorrectQuestionsP"></p>\n' +
    '            </div>\n' +
    '            <div id="totalIncorrectQuestions">\n' +
    '                <img src="./assets/mal.png" alt="Incorrect questions">\n' +
    '                <p id="totalIncorrectQuestionsP"></p>\n' +
    '            </div>\n' +
    '        </div>';

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

        //Mostramos el div que incluye las clasificaciones individuales
        document.getElementById("root").innerHTML = divStats;

        //Obtenemos el nombre del jugador actual
        let currentPlayerName = window.__quizQuestions__.currentPlayer;

        //Obtenemos el objeto que contiene la puntuación del jugador actual
        let currentPlayerScore = window.__quizQuestions__.players[currentPlayerName];

        //Mostramos las preguntas correctas e incorrectas
        document.getElementById("totalCorrectQuestionsP").innerHTML = currentPlayerScore.totalCorrectQuestions;
        document.getElementById("totalIncorrectQuestionsP").innerHTML = (currentPlayerScore.totalFailQuestions + currentPlayerScore.totalTimeoutQuestions).toString();

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
