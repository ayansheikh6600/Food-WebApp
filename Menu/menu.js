

window.addEventListener("load", CheckUser)

function CheckUser(){
    const UserData = JSON.parse(localStorage.getItem("user"))

console.log(UserData)

if(UserData == null){
    history.back()
    return
}

if(UserData.UserType !== "Customer"){
    history.back()
    return
}



}