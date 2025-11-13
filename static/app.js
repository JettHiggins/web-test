document.querySelector('#login-form').addEventListener('submit', login)

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

let showLogin = () => {
  document.querySelector("#login-form").classList.remove("hidden")
  document.querySelector("#register-form").classList.add("hidden")
  document.querySelector("#login-tab").classList.add("active")
  document.querySelector("#register-tab").classList.remove("active")
}
let showRegistration = () => {
  document.querySelector("#login-form").classList.add("hidden")
  document.querySelector("#register-form").classList.remove("hidden")
  document.querySelector("#login-tab").classList.remove("active")
  document.querySelector("#register-tab").classList.add("active")
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
    const userInfo = document.querySelector('.login-text')
    userInfo.innerText = "Please Login"
  }
  else {
    console.log("Logout failed?")
  }
}
async function login(e){
  const form = document.querySelector('#login-form')
  const failed_text = form.querySelector(".failed-login")
  const data = new FormData(form)
  e.preventDefault()

  const response = await fetch("/login", {
    method : "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({username: data.get('username'), password: data.get('password')})
  });
  response_data = await response.json()
  if (response.ok) {
    const userInfo = document.querySelector('.login-text')
    userInfo.innerText = "User: " + response_data['username']
    failed_text.style.display = 'none'
  }
  else {
      failed_text.style.display = 'block'
  }
}
