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


//OBTENER PUNTUACIONES ACTUALES del firestore
async function obtener_cal10(){
  const query_Puntuaciones10 = await query(collection(store, "puntuaciones10"));        
  const docs_Puntuaciones10 = await getDocs(query_Puntuaciones10);
  let arr_puntuaciones10=[]
  docs_Puntuaciones10.forEach(doc => {
    arr_puntuaciones10.push(doc.data())
  })
  window.localStorage.setItem("puntuaciones10", JSON.stringify(arr_puntuaciones10))}
  
  async function obtener_cal25(){
  const query_Puntuaciones25 = await query(collection(store, "puntuaciones25"));        
  const docs_Puntuaciones25 = await getDocs(query_Puntuaciones25);
  let arr_puntuaciones25=[]
  docs_Puntuaciones25.forEach(doc => {
    arr_puntuaciones25.push(doc.data())
  })
  window.localStorage.setItem("puntuaciones25", JSON.stringify(arr_puntuaciones25))}
  
  async function obtener_cal50(){
  const query_Puntuaciones50= await query(collection(store, "puntuaciones50"));        
  const docs_Puntuaciones50 = await getDocs(query_Puntuaciones50);
  let arr_puntuaciones50=[]
  docs_Puntuaciones50.forEach(doc => {
    arr_puntuaciones50.push(doc.data())
  })
  window.localStorage.setItem("puntuaciones50", JSON.stringify(arr_puntuaciones50))}

  //PARA REGISTRAR PUNTUACIONES

// accedemos a datos de usuario
const guardarPuntuacion=()=>{
if (window.localStorage.getItem("nuevaPuntuacion")!=null){
onAuthStateChanged(auth, (user) => {
  
    window.user= user
    const date= new Date
      //añadimos doc al firestore con el nombre del ususario y la puntuación obtenida.
      const totalQuestion=window.localStorage.getItem("totalQuestion")
      if (totalQuestion==10){
        obtener_cal10()
      addDoc(collection(store, "puntuaciones10"), {
          userName:`${user.displayName}`,
          score: window.localStorage.getItem("nuevaPuntuacion"),
          date: `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`
      })
      window.localStorage.removeItem("totalQuestion")}
      if (totalQuestion==25){
        obtener_cal25()
        addDoc(collection(store, "puntuaciones25"), {
            userName:`${user.displayName}`,
            score: window.localStorage.getItem("nuevaPuntuacion"),
            date: `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`
        })
        window.localStorage.removeItem("totalQuestion")}
        if (totalQuestion==50){
          obtener_cal50()
          addDoc(collection(store, "puntuaciones50"), {
              userName:`${user.displayName}`,
              score: window.localStorage.getItem("nuevaPuntuacion"),
              date: `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`
          })
          window.localStorage.removeItem("totalQuestion")}

      return window.localStorage.removeItem("nuevaPuntuacion")
      
  
})}
};
window.guardarPuntuacion = guardarPuntuacion




  
  window.addEventListener("load",()=>{onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("Usuario loggeado:",user.displayName)
      //para que reconozca cuando hay un usuario
        window.userName= user.displayName
      //guardamos nombre en el localstore
        window.localStorage.setItem("userName", user.displayName)
      } else {
      // User is signed out
      console.log("No hay usuario loggeado")
    }
  });
  
  })
  
  
  
  
  
