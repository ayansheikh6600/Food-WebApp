import { getAuth, signOut, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { db, analytics, auth, app } from "../firebase.js"

const ProfileImage = document.getElementById("ProfileImage")
const Name = document.getElementById("Name")
const UserPhoneNO = document.getElementById("UserPhoneNO")
const UserEmail = document.getElementById("UserEmail")
const LogoutBtn = document.getElementById("LogoutBtn")

const LocalData = JSON.parse(localStorage.getItem("user"))

window.addEventListener("load", GetUserData)

function GetUserData(){
ProfileImage.src = LocalData.ProfileImageURL
Name.value = LocalData.Name
UserPhoneNO.value = LocalData.Phone
    UserEmail.value = LocalData.Email
}

LogoutBtn.addEventListener("click", LogoutUser)

async function LogoutUser() {
  signOut(auth).then(() => {
    localStorage.clear()
    window.location.replace("../index.html")
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
}