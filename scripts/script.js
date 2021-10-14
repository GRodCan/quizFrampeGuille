const playDiv=()=>{
    if(document.getElementById("play")){
      return document.getElementById("start").removeChild(document.getElementById("play"))
    } else{
    return document.getElementById("start").innerHTML += `<div id="play">
    <input type="text" name="" id="" placeholder="Player Name">
    <button>10 PREGUNTAS</button><button>25 PREGUNTAS</button><button>50 PREGUNTAS</button>
    </div>`}
  }
  
