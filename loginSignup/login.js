// console.log("hi")
import { db, analytics, auth, app } from "../firebase.js"
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";

const SignupBtn = document.getElementById("SignupBtn")
const Email = document.getElementById("Email")
const Password = document.getElementById("Password")
const LoginBtn = document.getElementById("LoginBtn")




SignupBtn.addEventListener("click", SignupPage)
LoginBtn.addEventListener("click", login)

window.addEventListener("load", CheckLogin)

function CheckLogin(){
  const CheckData = JSON.parse(localStorage.getItem("user"))
  console.log(CheckData)
  if(CheckData.UserType == "Customer"){
    window.location.replace("../customer/customer.html")
  }else if(CheckData.UserType == "Vendor" && CheckData.Status == true){
    window.location.replace("../seller/seller.html")
  }else if(CheckData.UserType == "Vendor"){
    window.location.replace("../customer/waiting.html")
  }
}




async function login() {
  if (!Email.value || !Password.value) {
    alert("hiii")
    return
  }
  await signInWithEmailAndPassword(auth, Email.value, Password.value)
    .then(async (userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user)
      console.log("hii")
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      console.log(docSnap)

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        const userData = docSnap.data()
        localStorage.setItem("user", JSON.stringify(userData))
        if(userData.UserType == "Customer"){
          window.location.replace("../customer/customer.html")
        }else if(userData.UserType == "Vendor" && userData.Status == true){
          window.location.replace("../seller/seller.html")
        }else if(userData.UserType == "Vendor"){
          window.location.replace("../customer/waiting.html")
        }
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}








function SignupPage() {
  window.location.href = "./signup.html"
}