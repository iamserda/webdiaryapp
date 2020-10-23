const diaryStorage = []

//creating node elements that I will use to build the app.
const body = document.querySelector('body') // level 1
const head = document.querySelector('head')
const linkCss = document.createElement('link')
const appNameContainer = document.createElement('span')
// inserto body:
const greetingsContainer = document.createElement('section')
const mainAppContainer = document.createElement('main')

// inserto mainAppContainer
const inputContainer = document.createElement('section') // level 3
const displayContainer = document.createElement('div')

// inserto inside greetingsContainer
const appHeader = document.createElement('h1')
const appGreetingMessage = document.createElement('p')

// inserto inputContainer
const diaryForm = document.createElement('form')

// inserto diaryForm
const titleLabel = document.createElement('label')
const messageLabel = document.createElement('label')
const submitButton = document.createElement('button')

// inserto titleLabel
const titleInput = document.createElement('input')

//inserto messageLabel
const messageTextArea = document.createElement('textarea')

//inserto displayContainer
const selectionListArea = document.createElement('section')
const UnorderedList = document.createElement('ul')
const selectionDisplayArea = document.createElement('section')

// Styling the elements
body.setAttribute('class', 'container')
body.setAttribute('id', 'body')

linkCss.setAttribute('href', 'index.css')
linkCss.setAttribute('rel', 'stylesheet')
linkCss.setAttribute('type', 'text/css')

appHeader.setAttribute('class', 'greetings')
appGreetingMessage.setAttribute('class', 'greetings-message')

mainAppContainer.setAttribute('class', 'app-container')
mainAppContainer.setAttribute('id', 'app-container')

inputContainer.setAttribute('id', 'input-container')
displayContainer.setAttribute('id', 'display-container')

greetingsContainer.setAttribute('class', 'greetings-container')
diaryForm.setAttribute('id', 'diary-entry')
submitButton.setAttribute('id', 'submit')

titleInput.setAttribute('id', 'title')
titleInput.setAttribute('type', 'text')
titleInput.setAttribute('name', 'titleInput')
titleInput.setAttribute('placeholder', 'Title')
titleInput.setAttribute('size', '50')
titleInput.setAttribute('maxlength', '80')
titleInput.required = true // a bool

messageTextArea.setAttribute('id', 'message-box')
messageTextArea.setAttribute('name', 'messages')
messageTextArea.setAttribute('placeholder', 'Enter your ideas here...')
messageTextArea.setAttribute('cols', '40')
messageTextArea.setAttribute('rows', '10')
messageTextArea.required = true

selectionListArea.setAttribute('class', 'selection-list')
selectionDisplayArea.setAttribute('class', 'display-area')

// build the components from the various pieces
head.appendChild(linkCss)
body.appendChild(greetingsContainer)
body.appendChild(mainAppContainer)
mainAppContainer.append(inputContainer, displayContainer)
greetingsContainer.append(appHeader, appGreetingMessage)
displayContainer.append(selectionListArea, selectionDisplayArea)
selectionListArea.prepend(UnorderedList)

inputContainer.append(diaryForm)
diaryForm.append(titleLabel, messageLabel, submitButton)
titleLabel.append(titleInput)
messageLabel.append(messageTextArea)

// prompt user for name, if none is provided, set it to an emoji
submitButton.textContent = 'Submit'
appGreetingMessage.textContent = 'Hello, '
// appHeader.innerHTML = `<span>Webdiarary.app</span>`;\ //testing

appNameContainer.textContent = 'Webdiary.app'
appHeader.append(appNameContainer)

//testing
// selectionListArea.innerHTML = "<ul><li>1</li></ul>"
// selectionDisplayArea.innerHTML = "<ul><li>2</li></ul>"

//application LOGIC or AppLOGIC
let counter = 0
const newDiaryEntry = {
  id: 0,
  title: '',
  message: '',
}

// console.log(newDiaryEntry);

// testing
//for (counter; counter < 3; counter++) {
//   console.log(counter);
//   newDiaryEntry.id = counter;
//   newDiaryEntry.title = "Hello World!";
//   newDiaryEntry.message = `Message ${counter}: This is a new message.`;
//   console.log(newDiaryEntry);
//   diaryStorage.push(newDiaryEntry);
// }
// console.log(diaryStorage);
// console.log(newDiaryEntry);

// onload, prompt for user's name, if not set to default.

// -- get data from the user
// -- save the data into my object
// -- push the object into the the array
// -- clear the user title entry
// -- clear the user message entry
// -- update the selection's list
// -- display the first item of the selection's list
function getUsername() {
  let userName = prompt('What is your first and last name?')
  
  if (userName && (typeof userName).toLowerCase() === 'string') {
    appGreetingMessage.textContent += userName
    return userName
  } else {
    userName = 'Guest'
    return (appGreetingMessage.textContent += userName)
  }
}

function getTitle() {
  let myTitle = titleInput.value
  if (myTitle) {
    console.log(myTitle)
    return myTitle
  } else {
    console.log('error: HTML->  had no content.')
    return false
  }
}

function getMessage() {
  let myMessage = messageTextArea.value
  if (myMessage) {
    console.log(myMessage)
    return myMessage
  } else {
    console.log('error: HTML text-area -> No content.')
    return false
  }
}

function pushToStorageDiary() {
  let aTitle = getTitle()
  let aMessage = getMessage()

  if (aTitle && aMessage) {
    newDiaryEntry.id = counter
    newDiaryEntry.title = aTitle
    newDiaryEntry.message = aMessage
    diaryStorage.push(newDiaryEntry)
  } else {
    console.log('error -> pushToStorage failed!')
    return false
  }
}

function prependToList() {
  const newListItem = document.createElement('li')
  newListItem.className = 'liClass'
  newListItem.id = `li${newDiaryEntry.id}`
  newListItem.textContent = newDiaryEntry.title
  UnorderedList.prepend(newListItem)
}

function updateSelectionDisplayArea() {
  selectionDisplayArea.innerHTML = ''
  const displayHeader = document.createElement('h3')
  const displayText = document.createElement('p')
  displayHeader.textContent = newDiaryEntry.title
  displayText.textContent = newDiaryEntry.message
  selectionDisplayArea.append(displayHeader, displayText)
}

// body.onload = getUsername; //works
// window.addEventListener("load",getUsername,false); // works

body.onload = getUsername;

submitButton.addEventListener('click', function (event) {
  // -- stop the screen from refreshing when user hit submit
  event.preventDefault()
  console.log(titleInput.value)
  console.log(messageTextArea.value)
  console.log(counter)
  pushToStorageDiary()
  if (newDiaryEntry.message && newDiaryEntry.title) {
    prependToList()
    updateSelectionDisplayArea()
    messageTextArea.value = ''
    titleInput.value = ''
  }

  ++counter
})