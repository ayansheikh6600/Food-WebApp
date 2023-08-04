import { db, analytics, auth, app } from "../firebase.js"
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { getAuth,signOut, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
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
const LogoutBtn = document.getElementById("LogoutBtn")
const ChangingContentDiv = document.getElementById("ChangingContentDiv")
const ProfileBtn = document.getElementById("ProfileBtn")
const ListedProductBtn = document.getElementById("ListedProductBtn")
const ActiveOrderBtn = document.getElementById("ActiveOrderBtn")
const CompleteOrderBtn = document.getElementById("CompleteOrderBtn")
const ProductInfoDiv = document.getElementById("ProductInfoDiv")
const ProfileInformation = document.querySelector(".ProfileInformation")
const ListedProductDiv = document.querySelector(".ListedProductDiv")
const ListInputShow = document.querySelector(".ListInputShow")


ProfileBtn.addEventListener("click",function(){
  ListedProductDiv.style.display = "none"
  ProfileInformation.style.display = "block"
})
ListInputShow.addEventListener("click",function(){
  ProductInfoDiv.style.display = "block"
})
ListedProductBtn.addEventListener("click",function(){
  ProfileInformation.style.display = "none"
  ListedProductDiv.style.display = "block"
})
ActiveOrderBtn.addEventListener("click",function(){

})
CompleteOrderBtn.addEventListener("click",function(){

})




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