import { db, analytics, auth, app } from "../firebase.js"
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { getAuth,signOut, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { getStorage, deleteObject, ref, uploadBytes, uploadString, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";


const CustomerData = document.getElementById("CustomerData")
const VendorData = document.getElementById("VendorData")
const ShowCustomer = document.getElementById("ShowCustomer")
const ShowVendor = document.getElementById("ShowVendor")
const PageUID = document.getElementById("PageUID")

const UserData = JSON.parse(localStorage.getItem("user"))
// console.log(UserData)
window.addEventListener("load", function () {
    if (localStorage.getItem("user") === null) {
        window.location.replace("/")
        return
    } else {
        if (UserData.UserType !== "Admin") {
            history.back()
            return
        }
    }
})






ShowCustomer.addEventListener("click", ShowCustomerData)
window.addEventListener("load", ShowCustomerData)
var usernumber = 1


async function ShowCustomerData() {
    // PageUID.innerHTML = "UID"
    VendorData.style.display = "none"
    CustomerData.style.display = ""
    if (CustomerData.value == undefined) {
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {

            console.log(doc.data())
            const Buydata = doc.data()

            const userName = Buydata.Name
            const userEmail = Buydata.Email
            const userUID = Buydata.UserUID
            const userImage = Buydata.ProfileImageURL

            if(Buydata.UserType == "Customer"){
                CustomerData.innerHTML += `<tr>
                <th scope="row">${usernumber}.&nbsp&nbsp<img width="50px" height="50px" style="border-radius: 100%; border: 2px solid black;" src="${userImage}" alt=""></th>
                <td>${userName}</td>
                <td>${userEmail}</td>
                <td>${userUID}</td>
                </tr>`
    
                CustomerData.value = 1
            }
            
            // doc.data() is never undefined for query doc snapshots
            //   console.log(doc.id, " => ", doc.data());
        });
    }

}


ShowVendor.addEventListener("click", ShowVendorData)
async function ShowVendorData() {
    // PageUID.innerHTML = "Status"
    if (VendorData.value == undefined) {
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {

            const Vendata = doc.data()
            // console.log(Vendata)
            const userName = Vendata.Name
            const userEmail = Vendata.Email
            const userStatus = Vendata.Status
            const userImage = Vendata.ProfileImageURL
            const userUID = Vendata.UserUID
console.log(userStatus)
            if(Vendata.UserType == "Vendor"){
                VendorData.innerHTML += `<tr>
                <th scope="row">${usernumber}.&nbsp&nbsp<img width="50px" height="50px" style="border-radius: 100%; border: 2px solid black;" src="${userImage}" alt=""></th>
                <td>${userName}</td>
                <td>${userEmail}</td>
                <td>${userUID}</td>
                <td>${userStatus ? `<div class="form-check form-switch ">
                    <input class="form-check-input OnCheckBtn" onchange={handleAccountActivation(this)} type="checkbox" id="flexSwitchCheckChecked" checked>
                  </div>` : `<div class="form-check form-switch">
                  <input class="form-check-input CheckBtn"  onchange={handleAccountActivation(this)} type="checkbox" id="flexSwitchCheckChecked" >
                </div>`
                        }</td>
                     </tr>`
                    VendorData.value = 1
                    usernumber++
            }
            

            // doc.data() is never undefined for query doc snapshots
            //   console.log(doc.id, " => ", doc.data());
        });
    }


    CustomerData.style.display = "none"
    VendorData.style.display = ""

}

async function handleAccountActivation(e) {
    // console.log(e.parentNode.parentNode.parentNode.children[3].innerHTML)
    const venderUID = (e.parentNode.parentNode.parentNode.children[3].innerHTML)

    const docRef = doc(db, "users", venderUID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data());
        const venderData = docSnap.data()
        console.log(venderData)

        if(venderData.Status == false ){
            venderData.Status = true

            await updateDoc(docRef, venderData);
            window.location.reload()
        }else{
            venderData.Status = false
            await updateDoc(docRef, venderData);
            window.location.reload()

        }
        // console.log(venderData)


    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
    }
}


window.handleAccountActivation = handleAccountActivation


