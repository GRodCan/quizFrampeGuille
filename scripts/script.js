
async function getUserName(){  
const userName= await window.localStorage.getItem("userName")
}

const divPlay= `<div id="play">
<p>Bienvenido ${window.localStorage.getItem("userName")}, elige un modo</p>
<div id="buttonsMode">
  <button onclick="tenQuest()" class="other_buttons">10 PREGUNTAS</button>
  <button onclick="twentyfiveQuest()" class="other_buttons">25 PREGUNTAS</button>
  <button onclick="fiftyQuest()" class="other_buttons">50 PREGUNTAS</button>
</div>
</div>`


const divPreSignUpIn =`
<div id="play">
<button id="button_to_signUp" class="other_buttons">Vengo a ver que es esto</button>
<button id="button_to_signIn" class="other_buttons">Ya nos conocemos...</button>
</div>
`

const divSignUp_emailpass=`
<a href="." class="link_title">
<div id="title_signUp" class="small_title">
<h1>El QUIZ DEL CALAMAR</h1>
</div>
</a>
<div class="divSignUp" >
    <label>Email:</label>
    <input type="email" id="email_SignUp" autocomplete="off">
    <label>Password:</label>
    <input type="password" id="pass_SignUp" placeholder="Mín 6 characters">
    </div>
    <button id="signUp" class="other_buttons">Registrar</button>
`
const divSignUp_name=`
<a href="." class="link_title">
<div id="title_signUp" class="small_title">
<h1>El QUIZ DEL CALAMAR</h1>
</div>
</a>
<div class="divSignUp">
    <label>Name:</label>
    <input type="text" name="" id="name">
    </div>
    <button id="signUp_N" class="other_buttons">Registrar</button>
    `

const divSignIn=`
<div id="play">
<label>Email:</label>
<input type="email" id="email_SignIn" autocomplete="off">
<label>Password:</label>
<input type="password" id="pass_SignIn">
<button id="signIn" class="other_buttons">Entrar</button>
</div>
`
const divStart=`
<div id="errorDiv"></div>
<img id="rickStart" src="./assets/images/start.png" alt="Rick vacilón">
<div id="start">
    <div id="title">
        <h1>El QUIZ DEL CALAMAR</h1>
    </div>
    <div id="buttonsStart">
        <button id="buttonPlay" onclick="buttonPlay()" class="start_buttons">PLAY</button>
        <button id="buttonClas" onclick="clasification_print(10)" class="start_buttons" >CLASIFICATION</button>
     </div>
`



async function buttonPlay(){
    if(document.getElementById("play")){
      return document.getElementById("start").removeChild(document.getElementById("play"))
    }
   
    if(window.userName !=undefined){

        await getUserName()
        return document.getElementById("start").innerHTML += divPlay
    }
     else{
        document.getElementById("start").innerHTML += divPreSignUpIn
        document.getElementById("button_to_signIn").addEventListener("click",
            ()=>{
                document.getElementById("start").removeChild(document.getElementById("play"))
                document.getElementById("start").innerHTML += divSignIn
                
                async function logIn(){
                    await window.signIn()
                    document.getElementById("start").removeChild(document.getElementById("play"))
                    await getUserName()
                }

                document.getElementById("signIn").addEventListener("click",async function(){
                    await logIn();
                    return document.getElementById("start").innerHTML += divPlay
                }
                )
                
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
    }}
                       



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
        <button id="btnAnswerQuestion" class="other_buttons">Contestar</button>
    </div>`;

async function tenQuest (){


    const userName= await window.localStorage.getItem("userName")
    


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
    <button id="siguientePregunta" onclick="showNextQuestion()" class="other_buttons">Siguiente pregunta</button>
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
    <button id="siguientePregunta" onclick="showNextQuestion()" class="other_buttons">Siguiente pregunta</button>
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
    <button id="siguientePregunta" onclick="showNextQuestion()" class="other_buttons">Siguiente pregunta</button>
    </div>
    <div id="imgBM__container">
    <img src="./assets/images/mal.png" alt="Rick Disgustado" class="imgBM">
    </div>
    </div>`;

    const divs_clasificaciones=`
    <a href="." class="link_title">
    <div class="small_title" >
        <h1>El QUIZ DEL CALAMAR</h1>
        </div>
        </a>
    <div id="div_clasificaciones">
    <div id="div_clasificaciones_buttons">
    <button id="button_clasification10" onclick="clasification_print(10)" class="other_buttons">10 Questions Mode</button>
    <button id="button_clasification25" onclick="clasification_print(25)" class="other_buttons">25 Questions Mode</button>
    <button id="button_clasification50" onclick="clasification_print(50)" class="other_buttons">50 Questions Mode</button>
    </div>
        <div id="container_tarjetas">
        </div>
    </div>`
    async function clasification_print(number){
        let arr_puntuaciones=[]
            document.getElementById("root").innerHTML = divs_clasificaciones
            if(number==10){        
            JSON.parse(localStorage.puntuaciones10).forEach( (doc)=>{
                arr_puntuaciones.push(doc)
            })
            }
            if(number==25){
            JSON.parse(localStorage.puntuaciones25).forEach( (doc)=>{
               arr_puntuaciones.push(doc)
            })
            }
        if(number==50){
            JSON.parse(localStorage.puntuaciones50).forEach( (doc)=>{
                arr_puntuaciones.push(doc)
            })
        }
           
        let arr_ordenado=arr_puntuaciones.sort((a,b)=> {return b.score-a.score})
         
        for (let i=0;i<arr_ordenado.length;i++){
            const div_tarjeta= `
                <div class="tarjeta_puntuacion">
                    <div class="ranking_num">
                        <p>${i + 1}</p>
                    </div>
                    <div>
                        <div>
                            <p>Name:</p>
                        </div>
                        <div id="tarjeta_name">
                            <p>${arr_ordenado[i].userName}</p>
                        </div>
                    </div>
                    <div>
                        <div>
                            <p>Score:</p>
                        </div>
                        <div id="tarjeta_score">
                            <p>${arr_ordenado[i].score}</p>
                        </div>
                    </div>
                    
                        <div id="tarjeta_date">
                            <p>${arr_ordenado[i].date}</p>
                        </div>
                    
                </div>
            `
            document.getElementById("container_tarjetas").innerHTML += div_tarjeta 
        }
}
    
    
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
    
        //Obtenemos el nombre del jugador actual
     let currentPlayerName = window.__quizQuestions__.currentPlayer;
    
        //Obtenemos el objeto que contiene la puntuación del jugador actual
        let currentPlayerScore = window.__quizQuestions__.players[currentPlayerName];
    
        //obtenemos total de preguntas con la suma del desglose y lo guardamos para guardar en la clasificacion correspondiente.
        let currentTotalQuestion= currentPlayerScore.totalCorrectQuestions + currentPlayerScore.totalFailQuestions + currentPlayerScore.totalTimeoutQuestions
        window.localStorage.setItem("totalQuestion", currentTotalQuestion)
    
        // estructura div con boton dinamico mostrará clasificaciones totales segun el modo jugado
        const divStats = `<div id="individualClassifications">
                <div id="titleClassifications">
                    <h3>There are your results:</h3>
                </div>
                <div id="totalCorrectQuestions">
                    <img src="./assets/bien.png" alt="Corrects questions">
                    <p id="totalCorrectQuestionsP"></p>
                </div>
                <div id="totalIncorrectQuestions">
                    <img src="./assets/mal.png" alt="Incorrect questions">
                    <p id="totalIncorrectQuestionsP"></p>
               </div> 
                <button id="button_individualClassifications" class="other_buttons" onclick="clasification_print(${currentTotalQuestion})">Continuar</button>
            </div>`
        
        //Mostramos el div que incluye las clasificaciones individuales
        document.getElementById("root").innerHTML = divStats;
        //Mostramos las preguntas correctas e incorrectas
        window.localStorage.setItem("nuevaPuntuacion", currentPlayerScore.totalCorrectQuestions)
        document.getElementById("totalCorrectQuestionsP").innerHTML = currentPlayerScore.totalCorrectQuestions;
        document.getElementById("totalIncorrectQuestionsP").innerHTML = (currentPlayerScore.totalFailQuestions + currentPlayerScore.totalTimeoutQuestions).toString();
        //addEventListener del boton
        document.getElementById("button_individualClassifications").addEventListener("click", window.guardarPuntuacion())
        console.log(currentPlayerScore)
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


