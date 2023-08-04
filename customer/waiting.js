import { db, analytics, auth, app } from "../firebase.js"
import { getAuth,signOut, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";


const LogoutBtn = document.getElementById("LogoutBtn")

LogoutBtn.addEventListener("click", LogoutUser)

async function LogoutUser(){
    signOut(auth).then(() => {
        localStorage.clear()
        window.location.replace("../index.html")
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      });
}