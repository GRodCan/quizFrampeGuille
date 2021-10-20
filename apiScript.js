async function getQuestions(iAmount, iCategory = 11) {

    //Si pedimos 0 preguntas o menos o más de 50 preguntas entonces devolvemos un error
    if(iAmount <= 0 || iAmount > 50) { console.log("API allow maximum 50 questions per request"); alert("API call fail"); return null; }

    //Controlamos los errores
    try {

        //Obtenemos la respuesta
        let fetchResponse = await fetch('https://opentdb.com/api.php?amount=' + iAmount + '&category=' + iCategory + '&difficulty=easy&type=multiple');

        //La convertimos en un JSON
        let jsonData = await fetchResponse.json()

        //Devolvemos los datos obtenidos
        return jsonData.results;

    //En caso de error lo registramos en la consola y mostramos un error
    } catch (eError) { console.log(eError); alert(eError.toString()); }

    //Terminamos la función devolviendo null
    return null;

}

function setInnerHtml(sDivId, sText) {

    //Si no tenemos el texto entonces terminamos la función
    if(sText.length <= 0) { return null; }

    //Intentamos cambiar el texto del div o terminamos la función
    try { document.getElementById(sDivId).innerHTML = sText; } catch (eError) { return null; }

}

function shuffleArray(arrArray, iEntropy = 0.5) {

    //Si la variable arrArray no es un objeto entonces devolvemos null
    if(typeof arrArray !== "object") { return null; }

    //Devolvemos el array barajado
    return arrArray.sort((a, b) => iEntropy - Math.random());

}

function addDivToParent(sParent, sDivId) {

    //Controlamos los errores
    try {

        //Creamos el div
        let iDiv = document.createElement('div');

        //Le asignamos el id
        iDiv.id = sDivId;

        //Se lo añadimos al padre
        document.getElementById(sParent).appendChild(iDiv);

        //Terminamos la función devolviendo true
        return true;

    //En caso de error terminamos la función devolviendo false
    } catch (eError) { return false; }

}

function htmlEntitiesDecode(sString) {

    //Reemplazamos las comillas si existen
    sString = sString.replace(/&quot;/g, '\"');

    //Reemplazamos con la expresión regular
    return sString.replace(/&#(\d+);/g, function(match, dec) {

        //Devolvemos el string decodificado
        return String.fromCharCode(dec);

    });

}

  getQuestions(10).then(function(apiData) {

      //Si no hemos obtenidos datos del API mostramos un error
      if(apiData === null) { setInnerHtml("errorDiv", "Error in API response, please refresh the page."); }

      //Recorremos todas las preguntas obtenidas
      apiData.forEach(function(oQuestion, iQuestionIndex) {

          //Añadimos un div al principal que contendrá la pregunta
          addDivToParent("mainContainer", "quizQuestion" + iQuestionIndex);

          //Añadimos la pregunta al div que hemos creado antes
          setInnerHtml("quizQuestion" + iQuestionIndex, "<p>" + htmlEntitiesDecode(oQuestion.question) + "</p>");

          //Obtenemos las respuestas incorrectas y las copiamos en una variable
          let arrAnswers = [... oQuestion.incorrect_answers];

          //Le añadimos la correcta
          arrAnswers.push(oQuestion.correct_answer);

          //Barajamos el array
          arrAnswers = shuffleArray(arrAnswers);

          //Si no hemos podido barajar las respuestas entonces mostramos un error y terminamos la función
          if(arrAnswers === null) { setInnerHtml("errorDiv", "Error shuffling answers."); return null; }

          //Asignamos al objeto un array con las preguntas barajadas
          oQuestion.shuffled_answers = arrAnswers;

          //Recorremos todas las repuestas barajadas
          oQuestion.shuffled_answers.forEach(function (oAnswer, iAnswerIndex) {

              //Generamos el div con la respuesta
              addDivToParent("quizQuestion" + iQuestionIndex, "quizAnswer" + iQuestionIndex + iAnswerIndex);

              //Añadimos la pregunta al div que hemos creado antes
              setInnerHtml("quizAnswer" + iQuestionIndex + iAnswerIndex, "<p>" + htmlEntitiesDecode(oAnswer) + "</p>");

          });

      });

  });