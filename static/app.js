
const quill = new Quill('#editor', {
  modules: { toolbar: false },
  theme: 'snow',
  placeholder: 'Add Image/Text'
});

let getInput = function() {
  const contents = quill.getContents();
  console.log(contents);
}