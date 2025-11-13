const loginForm = document.querySelector('#login-form')
const registerForm = document.querySelector("#register-form")
const loginTab = document.querySelector("#login-tab")
const registerTab = document.querySelector("#register-tab")

loginForm.addEventListener('submit', login)
registerForm.addEventListener('submit', register)

const registerPopup = document.querySelector('#register-popup')


const quill = new Quill('#editor', {
  modules: { toolbar: false },
  theme: 'snow',
  placeholder: 'Add Image/Text'
});

let getInput = function() {
  const contents = quill.getContents();
  console.log(contents);
}

let toggleTab = (isLogin) => {
    loginForm.classList.toggle("hidden", !isLogin)
    registerForm.classList.toggle("hidden", isLogin)
    loginTab.classList.toggle("active", isLogin)
    registerTab.classList.toggle("active", !isLogin)
}

let togglePopup = () => {
  const Popup = document.querySelector('#popup') 
  if (Popup.classList.contains("hidden")) {
    Popup.classList.remove("hidden")
  }
  else {
    Popup.classList.add("hidden")
  }

}

async function userLogout() {
  const response = await fetch("/logout", {
    method: "POST"
  })
  if (response.ok){
    const userInfo = document.querySelector('#user-text')
    userInfo.innerText = "Please Login"
  }
  else {
    console.log("Logout failed?")
  }
}

async function login(e){
  e.preventDefault()

  const failed_text = loginForm.querySelector(".failed-login")
  const data = new FormData(loginForm)

  const response = await fetch("/login", {
    method : "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({username: data.get('username'), password: data.get('password')})
  });
  response_data = await response.json()
  if (response.ok) {
    display_user(response_data['username'])
    failed_text.style.display = 'none'
  }
  else {
      failed_text.style.display = 'block'
  }
}
async function register(e){
  e.preventDefault()
  const data = new FormData(registerForm)
  const failed = registerForm.querySelector(".failed-Registration")
  const response = await fetch("/register", {
    method : "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({username: data.get('username'), password: data.get('password')})
  });
  response_data = await response.json()
  if(response.ok){
    display_user(data.get('username'))
    failed.classList.toggle("hidden", false)
  }
  else {
    failed.classList.remove("hidden")
    console.log("Failed Register")
  }
}

let display_user = (Username) =>{
  const userInfo = document.querySelector('#user-text')
    userInfo.innerText = "User: " + Username
}