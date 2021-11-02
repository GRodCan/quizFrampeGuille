import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";

import { 
  getAuth,
  setPersistence, 
  signInWithEmailAndPassword, 
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged
  
} from "https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js";
  
import {
    getFirestore,
    collection,
    getDocs,
    query,
    addDoc
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
  });
  
  // SIGN UP + cambio de nombre
const createUser=()=>{
  
  try{    
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
      })
    }catch{
      }}  
const establecerNombre=()=>{
  
  try{
        updateProfile(auth.currentUser, {
        displayName: `${document.getElementById("name").value}`})
        .then(() => {
        window.userName= auth.currentUser.displayName        
        console.log(auth.currentUser)
        window.localStorage.setItem("userName", auth.currentUser.displayName)
        console.log("Profile updated!")
        }).catch((error) => {
          // An error occurred
        });
      }catch{}
      }
//las establecemos como variables globales
window.createUser= createUser
window.establecerNombre= establecerNombre

// if (document.getElementById("signUp")){
//   document.getElementById("signUp").addEventListener("click", async function (){
//   await window.createUser
//   await window.establecerNombre  
//     })}

  //LO RECOGE:
  // <input type="email" id="email_SignUp" autocomplete="off">
  //   <input type="password" id="pass_SignUp">
  //   <button id="signUp">Registrar</button>


  //SIGN IN
const signIn=()=>{
    const email = document.getElementById("email_SignIn").value
    const password = document.getElementById("pass_SignIn").value
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
      const user = userCredential.user;
      console.log(user)
      window.localStorage.setItem("userName", user.displayName)
    
      })
      .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode + errorMessage)
    });
}

window.signIn=signIn
// LO RECOGE
// <input type="email" id="email_SignIn" autocomplete="off">
//     <input type="password" id="pass_SignIn">
//     <button id="signIn">Entrar</button>

if (document.getElementById("nameChange")){document.getElementById("nameChange").addEventListener("click", ()=>{
  updateProfile(auth.currentUser, {
  displayName: `${document.getElementById("name").value}`
  }).then(() => {
  console.log("Profile updated!")
  }).catch((error) => {
  // An error occurred
  });
})}

// LO RECOGE:
// <input type="text" name="" id="name">
//     <button id="nameChange">Registrar</button>
//     <script src="./scripts/scriptFireBase.js" type="module"></script>


//PARA REGISTRAR PUNTUACIONES

// accedemos a datos de usuario
// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     window.user= user
//       //añadimos doc al firestore con el nombre del ususario y la puntuación obtenida.
//       addDoc(collection(store, "puntuaciones10"), {
//           userName:`${user.displayName}`,
//           score: 10
//       })
      
//     console.log(user.displayName)
//   } else {
//     // User is signed out
//   }
// });

window.addEventListener("load",()=>{onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("si hay user")
    //para que reconozca cuando hay un usuario
      window.userName= user.displayName
    //guardamos nombre en el localstore
      window.localStorage.setItem("userName", user.displayName)
    } else {
    // User is signed out
    console.log("no hay usuario")
  }
});

})


//OBTENER PUNTUACIONES ACTUALES del firestore
const query_Puntuaciones = await query(collection(store, "puntuaciones"));
        
const docs_Puntuaciones = await getDocs(query_Puntuaciones);

let arr_puntuaciones=[]
docs_Puntuaciones.forEach(doc => {
  arr_puntuaciones.push(doc.data())
})
window.localStorage.setItem("puntuaciones", JSON.stringify(arr_puntuaciones))

// arr_puntuaciones es un array con todas las puntuaciones guardadas en el FIRESTORE





