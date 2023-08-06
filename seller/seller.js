import { db, analytics, auth, app } from "../firebase.js"
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { getAuth, signOut, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
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
const ProductListBtn = document.getElementById("ProductListBtn")
const ProductInfoDiv = document.getElementById("ProductInfoDiv")
const ProfileInformation = document.querySelector(".ProfileInformation")
const ListedProductDiv = document.querySelector(".ListedProductDiv")
const ListInputShow = document.querySelector(".ListInputShow")


ProfileBtn.addEventListener("click", function () {
  ListedProductDiv.style.display = "none"
  ProfileInformation.style.display = "block"
})
ListInputShow.addEventListener("click", function () {
  ProductInfoDiv.style.display = "block"
})
ListedProductBtn.addEventListener("click", function () {
  ProfileInformation.style.display = "none"
  ListedProductDiv.style.display = "block"
})
ActiveOrderBtn.addEventListener("click", function () {

})
CompleteOrderBtn.addEventListener("click", function () {

})

ProductListBtn.addEventListener("click", ProductList)
function ProductList() {

  ProductListBtn.innerHTML = `<div class="spinner-border text-light" role="status">
  <span class="visually-hidden">Loading...</span>
</div>`

  console.log("hiii")

  const ProductName = document.getElementById("ProductName")
  const ProductPrice = document.getElementById("ProductPrice")
  const ProductImage = document.getElementById("ProductImage")
  const UserData = JSON.parse(localStorage.getItem("user"))
  console.log(UserData)

  if (ProductImage == undefined) {
    alert("please choose Product Image")
    return
  }

  console.log(ProductImage)

  // Create the file metadata
  /** @type {any} */
  const metadata = {
    contentType: 'image/jpeg'
  };

  // Upload file and metadata to the object 'images/mountains.jpg'
  const storageRef = ref(storage, 'ProductImages/' + ProductImage.files[0].name);
  const uploadTask = uploadBytesResumable(storageRef, ProductImage.files[0], metadata);

  // Listen for state changes, errors, and completion of the upload.
  uploadTask.on('state_changed',
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
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
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          break;
        case 'storage/canceled':
          // User canceled the upload
          break;

        // ...

        case 'storage/unknown':
          // Unknown error occurred, inspect error.serverResponse
          break;
      }
    },
    () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
        console.log('File available at', downloadURL);


        const ProductOBJ = {
          ProductName: ProductName.value,
          ProductPrice: ProductPrice.value,
          ProductImage: downloadURL,
          SellerUID: UserData.UserUID,
          RestaurantName: UserData.Restaurant.RName
        }
        const docRef = await addDoc(collection(db, "Products"), ProductOBJ);
        console.log(docRef)

        ProductName.value = ""
        ProductPrice.value = ""
        ProductImage.value = ""
        ProductListBtn.innerHTML = "List"


      });
    }
  );




}




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

async function LogoutUser() {
  signOut(auth).then(() => {
    localStorage.clear()
    window.location.replace("../index.html")
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
}