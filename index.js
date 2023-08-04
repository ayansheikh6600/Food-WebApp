



const loginLi = document.querySelector(".loginLi")


const UserData = JSON.parse(localStorage.getItem("user"))
if(UserData != null){
    console.log(UserData)
}