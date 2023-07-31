import {db, analytics, auth,app} from "../firebase.js"
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";

const RestaurantsName = document.getElementById("RestaurantsName")
const RestaurantsAddress = document.getElementById("RestaurantsAddress")
const RestaurantsEmail = document.getElementById("RestaurantsEmail")
const RestaurantsPhone = document.getElementById("RestaurantsPhone")
const RestaurantsSubmint = document.getElementById("RestaurantsSubmint")

RestaurantsSubmint.addEventListener("click" , RestaurantsSubmintBtn)

async function RestaurantsSubmintBtn(){

    if(!RestaurantsName.value || !RestaurantsAddress.value || !RestaurantsEmail.value || !RestaurantsPhone.value){
        alert("Enter Input Fields")
        return
    }

    const UserData = JSON.parse(localStorage.getItem("user"))
    console.log(UserData)
    const userUID = UserData.UserUID
    console.log(userUID)
    const RName = RestaurantsName.value
    const RPhone = RestaurantsAddress.value
    const REmail = RestaurantsEmail.value
    const RAddress = RestaurantsPhone.value


    // return
    const docRef = doc(db, "users", userUID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data());
        const venderData = docSnap.data()

        console.log(venderData.Restaurant.RName)
        venderData.Restaurant.RName = RName
        venderData.Restaurant.REmail = REmail
        venderData.Restaurant.RPhone = RPhone
        venderData.Restaurant.RAddress = RAddress

        await updateDoc(docRef, venderData);
        console.log("Done")
        localStorage.setItem("user", JSON.stringify(venderData))

        if(venderData.Status == false){
            window.location.replace("../customer/waiting.html")
        }else{
            window.location.replace("./seller.html")
        }

        


    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
    }





}