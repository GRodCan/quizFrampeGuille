    // OBTENCIÓN DE LA API DE 10 PREGUNTAS SOBRE PELÍCULAS

    //Definimos una constante que contendrá la URL base del API
    const __API_URL_BASE__ = "https://opentdb.com";

    //Obtenemos las preguntas de la API de forma asíncrona
    async function getQuestions(iAmount, iCategory = 11) {

        //Si pedimos 0 preguntas o menos o más de 50 preguntas entonces devolvemos un error
        if(iAmount <= 0 || iAmount > 50) { console.log("API allow maximum 50 questions per request"); alert("API call fail"); return null; }

        //Controlamos los errores
        try {

            //Obtenemos la respuesta
            let fetchResponse = await fetch(__API_URL_BASE__ + '/api.php?amount=' + iAmount + '&category=' + iCategory + '&difficulty=easy&type=multiple');

            //La convertimos en un JSON
            let jsonData = await fetchResponse.json();

            //Si el código de error no es 0, entonces la petición no es válida
            if(jsonData.response_code !== 0) { console.log("Error in API response"); alert("Error in API response"); return null; }

            //Devolvemos los datos obtenidos
            return jsonData.results;

        //En caso de error lo registramos en la consola y mostramos un error
        } catch (eException) { console.log(eException); alert(eException.toString()); }

        //Terminamos la función devolviendo null
        return null;

    }

    //Establecemos el innerHtml de un div
    function setInnerHtml(sDivId, sText) {

        //Si no tenemos el texto entonces terminamos la función
        if(sText.length <= 0) { return false; }

        //Intentamos cambiar el texto del div o terminamos la función
        try { document.getElementById(sDivId).innerHTML = sText; } catch (eException) { return false; }

    }

    //Barajamos un array
    function shuffleArray(arrArray, iEntropy = 0.5) {

        //Controlamos los errores
        try {

            //Si la variable arrArray no es un objeto entonces devolvemos null
            if(typeof arrArray !== "object") { return null; }

            //Devolvemos el array barajado
            return arrArray.sort((a, b) => iEntropy - Math.random());

        //En caso de error devolvemos null
        } catch (eException) { return null; }

    }

    //Añadimos un div a un parent
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
        } catch (eException) { return false; }

    }

    //Decodificamos las entidades html de un string si existen
    function htmlEntitiesDecode(sString) {

        //Reemplazamos las comillas si existen
        sString = sString.replace(/&quot;/g, '\"');

        //Reemplazamos con la expresión regular
        return sString.replace(/&#(\d+);/g, function(match, dec) {

            //Devolvemos el string decodificado
            return String.fromCharCode(dec);

        });

    }

    //Rellenamos los divs con la preguntas
    function populateDivsWithQuestion(question) {

        //Si no hemos pasado un array entonces devolvemos un error
        if(typeof question !== "object" || question === null) { return false; }

        //Controlamos los errores
        try {

            //Establecemos los textos
            setInnerHtml("textoPregunta", question.question.toString());
            setInnerHtml("optionALabel", question.shuffled_answers[0].toString());
            setInnerHtml("optionBLabel", question.shuffled_answers[1].toString());
            setInnerHtml("optionCLabel", question.shuffled_answers[2].toString());
            setInnerHtml("optionDLabel", question.shuffled_answers[3].toString());

            //Mostramos el div de la pregunta
            document.getElementById("pregunta").style.display = "flex";

        //En caso de error terminamos el método devolviendo false
        } catch (eException) { console.log(eException.toString()); return false; }

        //Terminamos el método devolviendo true
        return true;

    }

    //Asignamos un evento a un elemento del dom
    function addEventListenerToElement(elementId, eventName, eventFunction) {

        //Controlamos los errores
        try {

            //Asignamos la función al elemento actual
            document.getElementById(elementId).addEventListener(eventName, eventFunction, false);

        //En caso de error terminamos el método devolviendo false
        } catch (eException) { console.log(eException.toString()); return false; }

        //Terminamos el método devolviendo true
        return true;

    }

    //Eliminamos los event listener de un elemento
    function removeAllEventListenerFromElement(elementId) {

        //Controlamos los errores
        try {

            //Obtenemos el elemento actual y lo clonamos
            let elElement = document.getElementById(elementId);
            let elElementClone = elElement.cloneNode(true);

            //Reemplazamos el elemento con el clonado para eliminar todos los eventListener
            elElement.parentNode.replaceChild(elElementClone, elElement);

        //En caso de error terminamos el método devolviendo false
        } catch (eException) { console.log(eException.toString()); return false; }

        //Terminamos el método devolviendo true
        return true;

    }

    //Reestablecemos el borde de los label de las opciones
    function restoreLabelsBorderStyle(parentDivId, currentSelectedLabel = null, defaultBorder = "") {

        //Definimos una variable local para saber el borde actual del label seleccionado
        let currentBorderStyle = null;

        //Si no tenemos el label actual entonces establecemos el borde como el predeterminado
        if(currentSelectedLabel === null || currentSelectedLabel.style.border === undefined) {

            //Establecemos el borde como el predeterminado
            currentBorderStyle = defaultBorder;

        //Obtenemos el estilo actual del borde del label
        } else {

            //Nos quedamos con el estilo del borde del label actual
            currentBorderStyle = currentSelectedLabel.style.border;

            //Si el estilo ya es inset entonces terminamos la función
            if(currentBorderStyle === "inset") { return true; }

            //Cambiamos el estilo al label seleccionado
            currentSelectedLabel.style.border = "inset";

        }

        //Obtenemos todos los label del div "options"
        document.getElementById(parentDivId).querySelectorAll("label").forEach(function(selectorElement) {

            //Si el label no coincide con el actual entonces continuamos
            if(currentSelectedLabel === null || (currentSelectedLabel.id !== selectorElement.id)) {

                //Devolvemos el estilo del borde que tenía antes el label
                selectorElement.style.border = currentBorderStyle;

            }

        });

    }

    //Cuando se seleccione el label correspondiente, almacenaremos en el objeto
    //la respuesta seleccionada y le cambiaremos el estilo
    function clickOnAnswerLabel(labelElement, shuffleAnswerIndex) {

        //Controlamos los errores
        try {

            //Asignamos en el objeto la respuesta seleccionada
            window.__quizQuestions__.selectedShuffleAnswerIndex = shuffleAnswerIndex;

            //Restauramos el borde de los demás label
            restoreLabelsBorderStyle("options", labelElement);

            //En caso de error terminamos el método devolviendo false
        } catch (eException) { console.log(eException.toString()); return false; }

        //Terminamos el método devolviendo true
        return true;

    }

    //Respondemos la pregunta y pasamos a la siguiente
    function answerQuestion(shuffleAnswerIndex = null) {

        //Si no hemos pasado ninguna respuesta entonces la obtenemos de la propiedad del objeto
        if(shuffleAnswerIndex === null) {

            //Obtenemos la respuesta seleccionada de la propiedad del objeto si existe
            if(window.__quizQuestions__.selectedShuffleAnswerIndex !== undefined) {

                //Asignamos la respuesta seleccionada a la variable interna de la función
                shuffleAnswerIndex = window.__quizQuestions__.selectedShuffleAnswerIndex;

            //Si no hemos seleccionado una respuesta y le hemos dado a contestar entonces
            //mostramos un error y terminamos el método
            } else { alert("Please, select an option before click on this button"); return false; }

        }

        //Respondemos a la pregunta actual
        let bAnswered = window.__quizQuestions__.answerCurrentQuestion(shuffleAnswerIndex);

        //TODO: NO SE AÑADEN LAS PREGUNTAS, HAY QUE HACERLO EN EL BOTON
        //Rellenamos el div con la siguiente pregunta
        let bPopulated = populateDivsWithQuestion(window.__quizQuestions__.getNextQuestion());

        //Si hemos podido rellenar los divs entonces restablecemos el contador y si no lo
        //establecemos a cero
        if(bAnswered !== null && bPopulated) {

            //Restablecemos el contador
            segundos = 30;

        //Lo establecemos a cero y eliminamos los eventos de los botones
        } else {

            //Establecemos los segundos a cero
            segundos = 0;

            //Eliminamos los eventos de los botones
            removeAllEventListenerFromElement("optionALabel");
            removeAllEventListenerFromElement("optionBLabel");
            removeAllEventListenerFromElement("optionCLabel");
            removeAllEventListenerFromElement("optionDLabel");

        }

        //Restauramos el estilo de todos los label
        restoreLabelsBorderStyle("options");

        //Terminamos el método devolviendo true
        return true;

    }

    //Creamos una función para obtener las preguntas de manera dinámica e inicializar el quiz
    function initializeQuiz(iAmount = 10) {

        //Obtenemos las preguntas
        getQuestions(iAmount)
            .then(function(apiData) {

                //Si no hemos obtenidos datos del API mostramos un error
                if(apiData === null) { setInnerHtml("errorDiv", "Error in API response, please refresh the page."); return false; }

                //Recorremos todas las preguntas obtenidas
                apiData.forEach(function(oQuestion) {

                    //Obtenemos las respuestas incorrectas y las copiamos en una variable
                    let arrAnswers = [... oQuestion.incorrect_answers];

                    //Le añadimos la correcta
                    arrAnswers.push(oQuestion.correct_answer);

                    //Barajamos el array
                    arrAnswers = shuffleArray(arrAnswers);

                    //Si no hemos podido barajar las respuestas entonces mostramos un error y terminamos la función
                    if(arrAnswers === null) { setInnerHtml("errorDiv", "Error shuffling answers."); return false; }

                    //Asignamos al objeto un array con las preguntas barajadas
                    oQuestion.shuffled_answers = arrAnswers;

                });

                //Establecemos una propiedad del objeto para controlar el cursor de las preguntas
                apiData.cursor = 0;

                //Establecemos las propiedades de uso estadísticos para saber el total de preguntas
                //acertadas, fallidas y timeout
                apiData.totalCorrectQuestions = 0;
                apiData.totalFailQuestions = 0;
                apiData.totalTimeoutQuestions = 0;

                //Creamos una función para obtener cualquier pregunta
                apiData.getQuestion = function (iQuestionIndex = 0) {

                    //Controlamos los errores
                    try {

                        //Si existe la pregunta la devolvemos
                        if(typeof apiData[iQuestionIndex] !== "undefined") { return apiData[iQuestionIndex]; } else { return null; }

                        //En caso de error devolvemos null
                    } catch (eException) { return null; }

                }

                //Creamos una función para obtener la siguiente pregunta y lo asignamos al objeto
                apiData.getNextQuestion = function() {

                    //Controlamos los errores
                    try {

                        //Incrementamos el cursor
                        apiData.cursor++;

                        //Obtenemos la siguiente pregunta
                        return this.getQuestion(apiData.cursor);

                        //En caso de error devolvemos null
                    } catch (eException) { return null; }

                }

                //Creamos una función para validar la respuesta de la actual pregunta y la asignamos al objeto
                apiData.answerCurrentQuestion = function (shuffleAnswerIndex) {

                    //Si el indice es menor que 0 entonces fallamos a posta la pregunta actual
                    //incrementando el contador de preguntas timeout y devolviendo false
                    if(shuffleAnswerIndex < 0) { apiData.totalTimeoutQuestions++; return false; }

                    //Controlamos los errores
                    try {

                        //Si no existe el elemento con el cursor actual entonces devolvemos null
                        if(typeof apiData[apiData.cursor] === "undefined") { return null; }

                        //Si la respuesta es válida incrementamos el contador de las respuestas válidas y devolvemos true
                        if(apiData[apiData.cursor].correct_answer.toString() === apiData[apiData.cursor].shuffled_answers[shuffleAnswerIndex].toString()) {

                            //Incrementamos el contador de las respuestas válidas
                            apiData.totalCorrectQuestions++;

                            //Devolvemos true
                            return true;

                            //Si la respuesta es incorrecta incrementamos el contador de las respuestas incorrectas y devolvemos false
                        } else {

                            //Incrementamos el contador de las respuestas incorrectas
                            apiData.totalFailQuestions++;

                            //Devolvemos false
                            return false;

                        }

                        //En caso de error devolvemos null
                    } catch (eException) { console.log(eException); return null; }

                }

                //Creamos una función para hacer timeout de la actual pregunta y la asignamos al objeto,
                //esto lo hacemo simplemente forzando el fallo de la pregunta actual y restableciendo el contador
                apiData.timeoutCurrentQuestion = function () { answerQuestion(-1); }

                //Devolvemos el objeto apiData modificado
                return apiData;

            })
            //Almacenamos las preguntas en el objeto global y devolvemos true
            .then(function(apiQuestions) {

                    //Si tenemos un obejto entonces lo asignamos a la variable global y devolvemos true, si no devolvemos false
                    if(typeof apiQuestions === "object") { window.__quizQuestions__ = apiQuestions; return true; } else { return false; }

                }

            )
            .then(function(operationStatus) {

                    //Si hemos podido asignar las preguntas a la variable global entonces populamos el div
                    //con la primera question y devolvemos true en caso contrario devolvemos false
                    if(operationStatus) { return populateDivsWithQuestion(window.__quizQuestions__.getQuestion()); } else { return false; }

                }

            )
            .then(function () {

                    //Asignamos los eventos a los label para seleccionar la respuesta
                    addEventListenerToElement("optionALabel", "click", function() { clickOnAnswerLabel(this, 0); });
                    addEventListenerToElement("optionBLabel", "click", function() { clickOnAnswerLabel(this, 1); });
                    addEventListenerToElement("optionCLabel", "click", function() { clickOnAnswerLabel(this, 2); });
                    addEventListenerToElement("optionDLabel", "click", function() { clickOnAnswerLabel(this, 3); });

                    //Asignamos el evento en el botón de contestar para validar la respuesta
                    addEventListenerToElement("btnAnswerQuestion", "click", function() { answerQuestion(); })

                    //Una vez rellenados los div con la primera pregunta y sus respuesta, iniciamos el contador al cargar el DOM
                    addEventListenerToElement("pregunta", "DOMContentLoaded", cuentaAtras());

                }

            );

    }

    //Definimos un objeto global para almacenar las preguntas del cuestionario
    if(!window["__quizQuestions__"]) { window["__quizQuestions__"] = []; }