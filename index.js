import { db, analytics, auth, app } from "../firebase.js"
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { getAuth, signOut, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { getStorage, deleteObject, ref, uploadBytes, uploadString, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";




const indexProductDiv = document.getElementById("indexProductDiv")

window.addEventListener("load", GetProduct)

async function GetProduct(){
    const querySnapshot = await getDocs(collection(db, "Products"));
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        const ProductData = doc.data()
        console.log(ProductData)

        const card =`<div class="card ms-4 me-4" style="width: 18rem;">
        <img src="${ProductData.ProductImage}" height="200px" width="200px" class="mt-2 card-img-top" alt="...">
        <div class="card-body">
          <h5 id="ProductName" class="card-title">${ProductData.ProductName}</h5>
          <p  id=""class="card-text">PKR: <span class="fw-bold" id="ProductPrice">${ProductData.ProductPrice}</span><br>Restaurant: <span class="fw-bold" id="RestaurantName">${ProductData.RestaurantName}</span></p>
          <a href="#" class="btn btn-dark">Add to Card</a>
        </div>
      </div>`

      
      indexProductDiv.innerHTML += card


    });
}