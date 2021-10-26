import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";

import { 
  getAuth,
  setPersistence, 
  signInWithEmailAndPassword, 
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  updateProfile,
  
} from "https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js";
  
import {
    getFirestore,
    collection,
    getDocs,
    query,
} from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js';

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAwvAoKLlLKUmCgyXxBzgAbrnwCndFuV40",
    authDomain: "quizhalloweenframpeguille.firebaseapp.com",
    projectId: "quizhalloweenframpeguille",
    storageBucket: "quizhalloweenframpeguille.appspot.com",
    messagingSenderId: "90877128520",
    appId: "1:90877128520:web:ef48d98e2a011491fa8d7d",
    measurementId: "G-90ZXDLLFHH"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const store = getFirestore(app);


//AUTH
  
//duración de la sesion:
setPersistence(auth, browserSessionPersistence)
  .then(() => {
    return signInWithEmailAndPassword(auth, email, password);
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode+errorMessage)
  });

  console.log(auth)
  console.log(auth.currentUser)
  
  // SIGN UP
document.getElementById("signUp").addEventListener("click", ()=>{
  const email = document.getElementById("email_SignUp").value
  const password = document.getElementById("pass_SignUp").value
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      

    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode + errorMessage)
    });
  })

  //LO RECOGE:
  // <input type="email" id="email_SignUp" autocomplete="off">
  //   <input type="password" id="pass_SignUp">
  //   <button id="signUp">Registrar</button>


  //SIGN IN
document.getElementById("signIn").addEventListener("click", ()=>{
  const email = document.getElementById("email_SignIn").value
  const password = document.getElementById("pass_SignIn").value
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    const user = userCredential.user;
    console.log("bienvenido")
    })
    .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode + errorMessage)
    });
})
// LO RECOGE
// <input type="email" id="email_SignIn" autocomplete="off">
//     <input type="password" id="pass_SignIn">
//     <button id="signIn">Entrar</button>

document.getElementById("nameChange").addEventListener("click", ()=>{
  updateProfile(auth.currentUser, {
  displayName: `${document.getElementById("name").value}`
  }).then(() => {
  console.log("Profile updated!")
  // ...
  }).catch((error) => {
  // An error occurred
  // ...
  });
})

// LO RECOGE:
// <input type="text" name="" id="name">
//     <button id="nameChange">Registrar</button>
//     <script src="./scripts/scriptFireBase.js" type="module"></script>


//PARA REGISTRAR PUNTUACIONES

// accedemos a datos de usuario
onAuthStateChanged(auth, (user) => {
  if (user) {
      //añadimos doc al firestore con el nombre del ususario y la puntuación obtenida.
      addDoc(collection(store, "puntuaciones10"), {
          userName:`${user.displayName}`,
          score: 10
      })
      
    console.log(user.displayName)
  } else {
    // User is signed out
    // ...
  }
});


//OBTENER PUNTUACIONES ACTUALES
const query_Puntuaciones = await query(collection(store, "puntuaciones"));
        
const docs_Puntuaciones = await getDocs(query_Puntuaciones);

let arr_puntuaciones=[]
docs_Puntuaciones.forEach(doc => {
  arr_puntuaciones.push(doc.data())
})

// arr_puntuaciones es un array con todas las puntuaciones guardadas en el FIRESTORE
console.log(arr_puntuaciones)

