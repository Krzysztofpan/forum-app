import { NextResponse } from 'next/server'
import { pusherServer } from '@/lib/pusher-server'

export async function POST(req: Request) {
  const { message } = await req.json()

  await pusherServer.trigger('chat-channel', 'message-event', {
    message,
  })

  return NextResponse.json({ success: true })
}
