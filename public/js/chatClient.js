const socket = io('http://localhost:3000') //when webpage is loaded it goes to this URL

const clientsTotal = document.getElementById('client-total')

const messageContainer = document.getElementById('message-container')
const nameInput = document.getElementById('name-input')
const messageForm = document.getElementById('message-form')
const messageInput = document.getElementById('message-input')

const messageTone = new Audio('/message-tone.mp3')

messageForm.addEventListener('submit', (e) => {
  e.preventDefault()
  sendMessage()
})
//updating total client connected to the chatts on client side using innerhtml 
socket.on('clients-total', (data) => {
  clientsTotal.innerText = `Total Clients: ${data}`// make sure whille listening the evnts should be the same name as the name events use for listening
})

function sendMessage() {
  if (messageInput.value === '') return
  // console.log(messageInput.value)
  const data = {// SENDING DATA OBJECT TO THE SERVER    
    name: nameInput.value,
    message: messageInput.value,
    dateTime: new Date(),
  }
  socket.emit('message', data) //emitting to the server side 
  addMessageToUI(true, data)//sending message 
  messageInput.value = ''//empty input field 
}

socket.on('chat-message', (data) => {
  // console.log(data)
 
  addMessageToUI(false, data)// receiving a message 
})

function addMessageToUI(isOwnMessage, data) {
  clearFeedback()
  const element = `
      <li class="${isOwnMessage ? 'message-right' : 'message-left'}">
          <p class="message">
            ${data.message}
            <span>${data.name} ● send at ${moment(data.dateTime).format('h:mm A')}  </span>
          </p>
        </li>
        `

  messageContainer.innerHTML += element
  scrollToBottom()
}

function scrollToBottom() {
  messageContainer.scrollTo(0, messageContainer.scrollHeight)
}
// 
messageInput.addEventListener('focus', (e) => {//event triggered when user click on input field
  socket.emit('feedback', {
    feedback: `✍️ ${nameInput.value} is typing a message`,
  })
})

// messageInput.addEventListener('keypress', (e) => {
//   socket.emit('feedback', {
//     feedback: `✍️ ${nameInput.value} is typing a message`,
//   })
// })
messageInput.addEventListener('blur', (e) => {//The blur event is triggered when the user clicks away from the message input field or tabs out of it. It sends feedback to the server indicating that the user has stopped typing a message.
  socket.emit('feedback', {
    feedback: '',
  })
})

socket.on('feedback', (data) => {
  clearFeedback()
  const element = `
        <li class="message-feedback">
          <p class="feedback" id="feedback">${data.feedback}</p>
        </li>
  `
  messageContainer.innerHTML += element
})

function clearFeedback() {
  document.querySelectorAll('li.message-feedback').forEach((element) => {
    element.parentNode.removeChild(element)
  })
}