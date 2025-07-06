import { pusherServer } from '@/lib/pusher-server'
import { auth } from '@/auth'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const session = await auth()

  if (!session?.user?.id) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  const body = await req.text()
  const params = new URLSearchParams(body)

  const socket_id = params.get('socket_id') || ''
  const channel_name = params.get('channel_name') || ''

  const authResponse = pusherServer.authorizeChannel(socket_id, channel_name)

  return NextResponse.json(authResponse)
}
