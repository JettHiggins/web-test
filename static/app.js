
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
  const popup = document.createElement('div')
  const userInfo = document.querySelector('.login-text')
  popup.classList.add("popup")
  userInfo.append(popup)

}