const popup = document.querySelector('.popup')
popup.remove()

const test_db = {
    username : "Test",
    password : "Password"
};
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

let login = (e) => {
  const form = document.querySelector('#login-form')
  e.preventDefault()
  console.log(form.elements)
}