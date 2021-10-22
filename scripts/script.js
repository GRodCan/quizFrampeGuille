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
            <p id="textoPregunta">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor illo quo iusto corporis rem totam officiis laboriosam aut. Est nihil harum molestias fugit facere provident nesciunt at veniam laudantium asluijuijuijuijuijuijhdslidhasihd-asñihd-añsh-dhasidliha.ñsdlhisaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa inventore!</p>
        </div>
        <div id="options">
            <div class="optionsPair">
                <label for="optionA" id="optionALabel">Lorem
                    <input type="radio" name="option" id="optionA">
                </label>
                <label for="optionB" id="optionBLabel">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam voluptas
                <input type="radio" name="option" id="optionB">
                </label>                
            </div>
            <div class="optionsPair">
                <label for="optionC" id="optionCLabel">Lorem ipsum dolor sit amet consectetur ad
                    <input type="radio" name="option" id="optionC">
                </label>                
                <label for="optionD" id="optionDLabel">Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident tenetur, veritatis consectetur.
                    <input type="radio" name="option" id="optionD">
                </label>
            </div>               
        </div>
        <button>Contestar</button>
    </div>`

const tenQuest=()=>{
    document.getElementById("root").innerHTML=null
    return document.getElementById("root").innerHTML += divPregunta,
    document.getElementById("pregunta").addEventListener("DOMContentLoaded", cuentaAtras(5), false)    
}
const twentyfiveQuest=()=>{
    document.getElementById("root").innerHTML=null
    return document.getElementById("root").innerHTML += divPregunta,
    document.getElementById("pregunta").addEventListener("DOMContentLoaded", cuentaAtras(30), false)
    
}
const fiftyQuest=()=>{
    document.getElementById("root").innerHTML=null
    return document.getElementById("root").innerHTML +=divPregunta,
    document.getElementById("pregunta").addEventListener("DOMContentLoaded", cuentaAtras(30), false)
}
  
const divB=`
<div id="respBM__container">
    <div id="parrafBM__container"><h2>Respuesta errónea</h2><p id="parrafoBM">Bueno, supongo que un despiste lo puede tener cualquiera...</p>
    </div>
    <div id="imgBM__container">
    <img src="./assets/images/mal.png" alt="Rick Disgustado" class="imgBM">
    </div>
    </div>
<button id="siguientePregunta">Siguiente pregunta</button>
`
const divM=`
<div id="respBM__container">
    <div id="parrafBM__container"><h2>Respuesta errónea</h2><p id="parrafoBM">Bueno, supongo que un despiste lo puede tener cualquiera...</p>
    </div>
<   button id="siguientePregunta">Siguiente pregunta</button>
    <div id="imgBM__container">
    <img src="./assets/images/mal.png" alt="Rick Disgustado" class="imgBM">
    </div>
    </div>
<button id="siguientePregunta">Siguiente pregunta</button>
`
const divT=`
<div id="respBM__container">
    <div id="parrafBM__container"><h2>¡Se acabó el tiempo!</h2><p id="parrafoBM">Bueno, supongo que un despiste lo puede tener cualquiera...</p>
    </div>
    <div id="imgBM__container">
    <img src="./assets/images/mal.png" alt="Rick Disgustado" class="imgBM">
    </div>
    </div>
<button id="siguientePregunta">Siguiente pregunta</button>
`

  
function cuentaAtras(segundos){ 
      let tiempo= window.setInterval(function(){
            if(segundos==0){
                clearInterval(tiempo)
                document.getElementById("root").innerHTML=divT
            }     
            document.getElementById("timer").innerHTML=segundos
            segundos--}, 
            1000)}


  

