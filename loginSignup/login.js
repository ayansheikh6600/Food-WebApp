// console.log("hi")
import { db, analytics, auth, app } from "../firebase.js"
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";

const SignupBtn = document.getElementById("SignupBtn")
const Email = document.getElementById("Email")
const Password = document.getElementById("Password")
const LoginBtn = document.getElementById("LoginBtn")


console.log(LoginBtn.innerText)

SignupBtn.addEventListener("click", SignupPage)
LoginBtn.addEventListener("click", login)

window.addEventListener("load", CheckLogin)

async function CheckLogin() {
  const CheckData = JSON.parse(localStorage.getItem("user"))
  console.log(CheckData)
  if (CheckData == null) {
    return
  }
  const docRef = doc(db, "users", CheckData.UserUID);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    const UserData = docSnap.data()

    if(UserData.UserType == "Admin"){
      window.location.replace("../admin/admin.html")
    }else if (UserData.UserType == "Customer") {
      window.location.replace("../customer/customer.html")
    } else if (UserData.UserType == "Vendor" && UserData.Status == true) {
      window.location.replace("../seller/seller.html")
    } else if (UserData.UserType == "Vendor") {
      window.location.replace("../customer/waiting.html")
    }


  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }


  console.log(CheckData)
  
}




async function login() {
  if (!Email.value || !Password.value) {
    alert("hiii")
    return
  }
  LoginBtn.innerHTML = `<div class="spinner-border text-light" role="status">
  <span class="visually-hidden">Loading...</span>
</div>`
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
        if(userData.UserType == "Admin"){
          window.location.replace("../admin/admin.html")
        }else if (userData.UserType == "Customer") {
          window.location.replace("../customer/customer.html")
        } else if (userData.UserType == "Vendor" && userData.Status == true) {
          window.location.replace("../seller/seller.html")
        } else if (userData.UserType == "Vendor") {
          window.location.replace("../customer/waiting.html")
        }
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
      // ...
    })
    .catch((error) => {
      LoginBtn.innerHTML = "Login"
      const errorCode = error.code;
      const errorMessage = error.message;

      alert("Invalid Email & Password")
    });
}








function SignupPage() {
  window.location.href = "./signup.html"
}