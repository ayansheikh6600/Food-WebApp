import {db, analytics, auth,app} from "../firebase.js"
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";


const Name = document.getElementById("Name")
const Phone = document.getElementById("Phone")
const Email = document.getElementById("Email")
const Password = document.getElementById("Password")
const userType = document.getElementById("userType")
const SignupBtn = document.getElementById("SignupBtn")
const loginBtn = document.getElementById("loginBtn")





SignupBtn.addEventListener("click", Signup)
loginBtn.addEventListener("click", LoginPage)



async function Signup(){

    if(!Name.value || !Phone.value || !Email.value || !Password.value){
        alert("Enter Input Fields")
        return
    }

    if(userType.value == "Select User Type"){
        alert("Please Select Account Type")
        return
    }

    await createUserWithEmailAndPassword(auth, Email.value, Password.value)
    .then(async (userCredential) => {
      // Signed in 
      const user = userCredential.user;

      const userOBJ  = {
        Name : Name.value,
        Phone : Phone.value,
        Email : Email.value,
        UserType : userType.value,
        Status: false,
        UserUID : user.uid
    }
    console.log(userOBJ)
    await setDoc(doc(db, "users", user.uid), userOBJ);
    localStorage.setItem("user", JSON.stringify(userOBJ))

    if(userType.value == "Vendor"){
        window.location.replace("../customer/waiting.html")
    }else if(userType.value == "Customer"){
        window.location.replace("../customer/customer.html")
    }



    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
    
}

function LoginPage(){
    window.location.href = "./login.html"
}