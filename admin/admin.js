



const UserData = JSON.parse(localStorage.getItem("user"))
console.log(UserData)
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
