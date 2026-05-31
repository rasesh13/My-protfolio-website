// Simple in-memory message storage for Vercel
// Messages persist during the request session

const messages = []

export const storeMessage = (data) => {
  const message = {
    id: Date.now().toString(),
    ...data,
    timestamp: new Date().toISOString(),
    status: 'received'
  }
  messages.push(message)
  console.log('💾 Message stored:', message.id)
  return message
}

export const getAllMessages = () => {
  return messages.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
}

export const getMessageById = (id) => {
  return messages.find(m => m.id === id)
}
