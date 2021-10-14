const playDiv=()=>{
    if(document.getElementById("play")){
      return document.getElementById("start").removeChild(document.getElementById("play"))
    } else{
    return document.getElementById("start").innerHTML += `<div id="play">
      <p>Name:</p><input type="text" name="" id="playerName" placeholder="Player Name">
      <div id="buttonsMode">
        <button>10 PREGUNTAS</button><button>25 PREGUNTAS</button><button>50 PREGUNTAS</button>
      </div>
    </div>`}
  }
  
