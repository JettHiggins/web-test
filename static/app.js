const popup = document.querySelector('.popup')
popup.remove()

const quill = new Quill('#editor', {
  modules: { toolbar: false },
  theme: 'snow',
  placeholder: 'Add Image/Text'
});

let getInput = function() {
  const contents = quill.getContents();
  console.log(contents);
}

let userToggle = () => {
  if (document.querySelector('.popup') == null){
    showPopup()
  }
  else{
    document.querySelector('.popup').remove()
  }
}

let showPopup = () => {
  const userInfo = document.querySelector('.login-text')
  userInfo.append(popup)
  
  const form = document.querySelector('#login-form')
  form.addEventListener('submit', login)
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
