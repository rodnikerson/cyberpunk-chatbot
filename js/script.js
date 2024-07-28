import { API_URL } from './config.js'

document.addEventListener('DOMContentLoaded', () => {
  document
    .querySelector('.channel-message-form')
    .addEventListener('submit', async (event) => {
      event.preventDefault()
      const message = document.getElementById('message').value
      const messageTextarea = document.getElementById('message')
      const sendButton = document.querySelector('.button')

      messageTextarea.disabled = true
      sendButton.disabled = true

      const chatContainer = document.getElementsByClassName('chat-container')[0]
      const newMessageDiv = document.createElement('div')
      newMessageDiv.className = 'me'
      const newMessageP = document.createElement('p')
      newMessageP.textContent = message
      newMessageDiv.appendChild(newMessageP)
      chatContainer.appendChild(newMessageDiv)

      const messages = Array.from(chatContainer.children).map((child) => {
        const pElement = child.querySelector('p')
        if (pElement) {
          return {
            role: child.classList.contains('npc') ? 'assistant' : 'user',
            content: pElement.textContent.trim(),
          }
        }
      })

      messageTextarea.value = ''

      const loaderDiv = document.createElement('div')
      loaderDiv.className = 'loading-dots'
      loaderDiv.innerHTML = `
        <div class="loading-dots--dot"></div>
        <div class="loading-dots--dot"></div>
        <div class="loading-dots--dot"></div>
      `
      chatContainer.appendChild(loaderDiv)

      chatContainer.scrollTop = chatContainer.scrollHeight

      try {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ messages }),
        })

        if (!response.ok) {
          throw new Error('Erro no retorno da resposta.')
        }

        const data = await response.json()

        chatContainer.removeChild(loaderDiv)

        const newResponseDiv = document.createElement('div')
        newResponseDiv.className = 'npc'
        const newResponseP = document.createElement('p')
        newResponseP.textContent = data
        newResponseDiv.appendChild(newResponseP)
        chatContainer.appendChild(newResponseDiv)

        chatContainer.scrollTop = chatContainer.scrollHeight
      } catch (error) {
        chatContainer.removeChild(loaderDiv)

        console.error('Erro:', error)
      } finally {
        messageTextarea.disabled = false
        sendButton.disabled = false
        messageTextarea.value = ''
      }
    })
})
