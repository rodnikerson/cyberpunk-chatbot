import { API_URL } from './config.js'
import ShuffleText from 'shuffle-text'

document.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('shuffle-effect')
  const text = new ShuffleText(el)

  text.start()

  const form = document.querySelector('.channel-message-form')
  const messageTextarea = document.getElementById('message')
  const sendButton = document.querySelector('.button')
  const chatContainer = document.querySelector('.chat-container')

  form.addEventListener('submit', async (event) => {
    event.preventDefault()
    const message = messageTextarea.value.trim()

    if (message) {
      disableInput()
      appendUserMessage(message)
      clearTextarea()
      const messages = getChatMessages()
      appendLoader()

      try {
        const data = await fetchResponse(messages)
        appendAssistantMessage(data)
      } catch (error) {
        console.error('Erro:', error)
      } finally {
        enableInput()
        removeLoader()
      }
    }
  })

  function disableInput() {
    messageTextarea.disabled = true
    sendButton.disabled = true
  }

  function enableInput() {
    messageTextarea.disabled = false
    sendButton.disabled = false
  }

  function clearTextarea() {
    messageTextarea.value = ''
  }

  function appendUserMessage(message) {
    const userMessageDiv = createMessageDiv('me', message)
    chatContainer.appendChild(userMessageDiv)
    scrollToBottom()
  }

  function appendAssistantMessage(message) {
    const assistantMessageDiv = createMessageDiv('npc', message)
    chatContainer.appendChild(assistantMessageDiv)
    scrollToBottom()
  }

  function appendLoader() {
    const loaderDiv = document.createElement('div')
    loaderDiv.className = 'loading-dots'
    loaderDiv.innerHTML = `
      <div class="loading-dots--dot"></div>
      <div class="loading-dots--dot"></div>
      <div class="loading-dots--dot"></div>
    `
    chatContainer.appendChild(loaderDiv)
  }

  function removeLoader() {
    const loaderDiv = chatContainer.querySelector('.loading-dots')
    if (loaderDiv) {
      chatContainer.removeChild(loaderDiv)
    }
  }

  function createMessageDiv(className, message) {
    const messageDiv = document.createElement('div')
    messageDiv.className = className
    const messageP = document.createElement('p')
    messageP.textContent = message
    messageDiv.appendChild(messageP)
    return messageDiv
  }

  function scrollToBottom() {
    chatContainer.scrollTop = chatContainer.scrollHeight
  }

  function getChatMessages() {
    return Array.from(chatContainer.children)
      .map((child) => {
        const pElement = child.querySelector('p')
        if (pElement) {
          return {
            role: child.classList.contains('npc') ? 'assistant' : 'user',
            content: pElement.textContent.trim(),
          }
        }
      })
      .filter(Boolean)
  }

  async function fetchResponse(messages) {
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

    return response.json()
  }
})
