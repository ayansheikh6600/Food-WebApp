




const UserData = JSON.parse(localStorage.getItem("user"))
console.log(UserData)
window.addEventListener("load" ,function(){
    if(UserData.UserType !== "admin"){
        history.back()
        return
    }
})