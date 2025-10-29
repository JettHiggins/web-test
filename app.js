
// Plan, Have a Text Box That can take in copied Text and Images, 
// Have a button to send the copied Text/image to the backend
// Store the Text/Image in the database of whoever is using it.
// Need to add a rich text editor to website.

const quill = new Quill('#editor', {
  modules: { toolbar: true },
  theme: 'snow'
});