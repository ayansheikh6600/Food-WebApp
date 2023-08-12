import { db, analytics, auth, app } from "./firebase.js"
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { getAuth, signOut, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { getStorage, deleteObject, ref, uploadBytes, uploadString, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";




const indexProductDiv = document.getElementById("indexProductDiv")
const LoginSignupBtn = document.getElementById("LoginSignupBtn")

window.addEventListener("load", GetProduct)

async function GetProduct() {
  const UserData = JSON.parse(localStorage.getItem("user"))

  if(UserData != null){
    if (UserData.UserType == "Vendor") {
    LoginSignupBtn.innerHTML = "Dashboard"
    LoginSignupBtn.href = "./seller/seller.html"
  } else if (UserData.UserType == "Admin") {
    LoginSignupBtn.innerHTML = "Dashboard"
    LoginSignupBtn.href = "./admin/admin.html"
  } else if (UserData.UserType == "Customer") {
    LoginSignupBtn.innerHTML = "Profile"
    LoginSignupBtn.href = "./customer/customer.html"
  }
  }
  
  const querySnapshot = await getDocs(collection(db, "Products"));
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, " => ", doc.data());
    const ProductData = doc.data()
    const id = doc.id
    console.log(ProductData)

    if (UserData == null) {
      const card = `<div class="card ms-4 me-4" style="width: 18rem;">
          <img src="${ProductData.ProductImage}" height="200px" width="200px" class="mt-2 card-img-top" alt="...">
          <div class="card-body">
            <h5 id="ProductName" class="card-title">${ProductData.ProductName}</h5>
            <p  id=""class="card-text">PKR: <span class="fw-bold" id="ProductPrice">${ProductData.ProductPrice}</span><br>Restaurant: <span class="fw-bold" id="RestaurantName">${ProductData.RestaurantName}</span></p>
            <a href="#" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="LoginFirst()" >Add to Card</a>
          </div>
        </div>`
      indexProductDiv.innerHTML += card
    } else if (UserData.UserType == "Customer") {

      const card = `<div class="card ms-4 me-4" style="width: 18rem;">
          <img src="${ProductData.ProductImage}" height="200px" width="200px" class="mt-2 card-img-top" alt="...">
          <div class="card-body">
            <h5 id="ProductName" class="card-title">${ProductData.ProductName}</h5>
            <p  id=""class="card-text">PKR: <span class="fw-bold" id="ProductPrice">${ProductData.ProductPrice}</span><br>Restaurant: <span class="fw-bold" id="RestaurantName">${ProductData.RestaurantName}</span></p>
            <a href="#" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="AddCard('${id}')" >Add to Card</a>
          </div>
        </div>`
      indexProductDiv.innerHTML += card
    } else {

      const card = `<div class="card ms-4 me-4" style="width: 18rem;">
          <img src="${ProductData.ProductImage}" height="200px" width="200px" class="mt-2 card-img-top" alt="...">
          <div class="card-body">
            <h5 id="ProductName" class="card-title">${ProductData.ProductName}</h5>
            <p  id=""class="card-text">PKR: <span class="fw-bold" id="ProductPrice">${ProductData.ProductPrice}</span><br>Restaurant: <span class="fw-bold" id="RestaurantName">${ProductData.RestaurantName}</span></p>
            <a href="#" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="AcountNot()" >Add to Card</a>
          </div>
        </div>`
      indexProductDiv.innerHTML += card
    }
  });






}

function LoginFirst() {
  const ModalHeadline = document.getElementById("ModalHeadline")
  ModalHeadline.innerHTML = "Please Login First"
}



function AcountNot() {
  const ModalHeadline = document.getElementById("ModalHeadline")
  ModalHeadline.innerHTML = "Your Account Are Not Eligible for this"
}

function AddCard(id) {
  console.log("id" , id)
return
  const ModalHeadline = document.getElementById("ModalHeadline")
  ModalHeadline.innerHTML = "Order Successfully Placed"
}







window.AcountNot = AcountNot
window.AddCard = AddCard
window.LoginFirst = LoginFirst
