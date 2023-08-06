


const ProfileImage = document.getElementById("ProfileImage")
const Name = document.getElementById("Name")
const UserPhoneNO = document.getElementById("UserPhoneNO")
const UserEmail = document.getElementById("UserEmail")

const LocalData = JSON.parse(localStorage.getItem("user"))

window.addEventListener("load", GetUserData)

function GetUserData(){
ProfileImage.src = LocalData.ProfileImageURL
Name.value = LocalData.Name
UserPhoneNO.value = LocalData.Phone
    UserEmail.value = LocalData.Email
}