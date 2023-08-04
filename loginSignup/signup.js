import {db, analytics, auth,app} from "../firebase.js"
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { getStorage,deleteObject, ref, uploadBytes, uploadString, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";

const Name = document.getElementById("Name")
const Phone = document.getElementById("Phone")
const Email = document.getElementById("Email")
const Password = document.getElementById("Password")
const userType = document.getElementById("userType")
const SignupBtn = document.getElementById("SignupBtn")
const loginBtn = document.getElementById("loginBtn")


const storage = getStorage();


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

    const file = document.getElementById("ProfilePic").files[0];
  
    if (!file) {
      console.log("No file selected.");
      return;
    }
  
    console.log("File:", file);
  
    const metadata = {
      contentType: 'image/png'
    };
  
    const storageRef = ref(storage, 'images/' + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);
  
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        console.error("Upload error:", error);
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          console.log('File available at', downloadURL);

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
        UserUID : user.uid,
        Restaurant : {
            RName : "",
            RPhone : "",
            REmail : "",
            RAddress : ""
        },
        ProfileImageURL : downloadURL
    }
    console.log(userOBJ)
    await setDoc(doc(db, "users", user.uid), userOBJ);
    // localStorage.setItem("user", JSON.stringify(userOBJ))
    window.location.replace("./login.html")

    // if(userType.value == "Vendor"){
    //     window.location.replace("../seller/restaurant.html")
    // }else if(userType.value == "Customer"){
    //     window.location.replace("../customer/customer.html")
    // }



    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
          
        });
      }
    );

    
    
}

function LoginPage(){
    window.location.href = "./login.html"
}