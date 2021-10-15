const playDiv=()=>{
    if(document.getElementById("play")){
      return document.getElementById("start").removeChild(document.getElementById("play"))
    } else{
    return document.getElementById("start").innerHTML += `<div id="play">
      <p>Name:</p><input type="text" name="" id="playerName" placeholder="Player Name">
      <div id="buttonsMode">
        <button onclick="tenQuest()">10 PREGUNTAS</button>
        <button onclick="twentyfiveQuest()">25 PREGUNTAS</button>
        <button onclick="fiftyQuest()">50 PREGUNTAS</button>
      </div>
    </div>`}
  }


  const tenQuest=()=>{
    document.getElementById("root").removeChild(document.getElementById("rickStart"))
    document.getElementById("root").removeChild(document.getElementById("start"))
    return document.getElementById("root").innerHTML +=`<div id="pregunta">
    <div id="cuadroPregunta">
        <img id="questionRick" src="./assets/images/pregun.png" alt="Rick Sánchez preguntando">
        <p id="textoPregunta">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor illo quo iusto corporis rem totam officiis laboriosam aut. Est nihil harum molestias fugit facere provident nesciunt at veniam laudantium asluijuijuijuijuijuijhdslidhasihd-asñihd-añsh-dhasidliha.ñsdlhisaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa inventore!</p>
    </div>
    <div id="options">
        <div class="optionsPair">
            <label for="optionA" id="optionALabel">Lorem
                <input type="radio" name="option" id="optionA">
                </label>
                <label for="optionB" id="optionBLabel">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam voluptas                        <input type="radio" name="option" id="optionB">
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
    
  }
  const twentyfiveQuest=()=>{
    document.getElementById("root").removeChild(document.getElementById("rickStart"))
    document.getElementById("root").removeChild(document.getElementById("start"))
    return document.getElementById("root").innerHTML +=`<div id="pregunta">
    <div id="cuadroPregunta">
        <img id="questionRick" src="./assets/images/pregun.png" alt="Rick Sánchez preguntando">
        <p id="textoPregunta">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor illo quo iusto corporis rem totam officiis laboriosam aut. Est nihil harum molestias fugit facere provident nesciunt at veniam laudantium asluijuijuijuijuijuijhdslidhasihd-asñihd-añsh-dhasidliha.ñsdlhisaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa inventore!</p>
    </div>
    <div id="options">
        <div class="optionsPair">
            <label for="optionA" id="optionALabel">Lorem
                <input type="radio" name="option" id="optionA">
                </label>
                <label for="optionB" id="optionBLabel">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam voluptas                        <input type="radio" name="option" id="optionB">
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
    
  }
  const fiftyQuest=()=>{
    document.getElementById("root").removeChild(document.getElementById("rickStart"))
    document.getElementById("root").removeChild(document.getElementById("start"))
    return document.getElementById("root").innerHTML +=`<div id="pregunta">
    <div id="cuadroPregunta">
        <img id="questionRick" src="./assets/images/pregun.png" alt="Rick Sánchez preguntando">
        <p id="textoPregunta">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor illo quo iusto corporis rem totam officiis laboriosam aut. Est nihil harum molestias fugit facere provident nesciunt at veniam laudantium asluijuijuijuijuijuijhdslidhasihd-asñihd-añsh-dhasidliha.ñsdlhisaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa inventore!</p>
    </div>
    <div id="options">
        <div class="optionsPair">
            <label for="optionA" id="optionALabel">Lorem
                <input type="radio" name="option" id="optionA">
                </label>
                <label for="optionB" id="optionBLabel">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam voluptas                        <input type="radio" name="option" id="optionB">
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
    
  }
  
  let segundos = 30
  function cuentaAtras(){ 
      let tiempo= window.setInterval(function(){
      if(segundos==0){clearInterval(tiempo)}     
      document.getElementById("timer").innerHTML =segundos
      segundos--}, 
      1000)}
  document.getElementById("pregunta").addEventListener("DOMContentLoaded", cuentaAtras(), false)
  

