import { db, analytics, auth, app } from "../firebase.js"
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { getStorage, deleteObject, ref, uploadBytes, uploadString, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";

const storage = getStorage();

const ProfileImage = document.getElementById("ProfileImage")
const UserName = document.getElementById("UserName")
const RestaurantName = document.getElementById("RestaurantName")
const RestaurantNameInput = document.getElementById("RestaurantNameInput")
const RestaurantPhone = document.getElementById("RestaurantPhone")
const RestaurantEmail = document.getElementById("RestaurantEmail")
const RestaurantAddress = document.getElementById("RestaurantAddress")
const Name = document.getElementById("Name")
const UserPhoneNO = document.getElementById("UserPhoneNO")
const UserEmail = document.getElementById("UserEmail")

window.addEventListener("load", getUserData)

function getUserData() {
    const UserData = JSON.parse(localStorage.getItem("user"))
    console.log(UserData)
    ProfileImage.src = UserData.ProfileImageURL
    UserName.innerHTML = UserData.Name
    RestaurantName.innerHTML = UserData.Restaurant.RName

    Name.value = UserData.Name
    UserPhoneNO.value = UserData.Phone
    UserEmail.value = UserData.Email
RestaurantNameInput.value = UserData.Restaurant.RName
RestaurantPhone.value = UserData.Restaurant.RPhone
RestaurantEmail.value = UserData.Restaurant.REmail
RestaurantAddress.value = UserData.Restaurant.RAddress    
}