'use client'

import { useEffect, useState } from 'react'
import { pusherClient } from '@/lib/pusher-client'

export default function Chat() {
  const [messages, setMessages] = useState<string[]>([])

  useEffect(() => {
    const channel = pusherClient.subscribe('chat-channel')

    channel.bind('message-event', (data: any) => {
      setMessages((prev) => [...prev, data.message])
    })

    return () => {
      channel.unbind_all()
      channel.unsubscribe()
    }
  }, [])

  const sendMessage = async () => {
    await fetch('/api/pusher', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Siema z klienta!' }),
    })
  }

  return (
    <div>
      <button onClick={sendMessage}>Wyślij wiadomość</button>
      <ul>
        {messages.map((msg, i) => (
          <li key={i}>{msg}</li>
        ))}
      </ul>
    </div>
  )
}
