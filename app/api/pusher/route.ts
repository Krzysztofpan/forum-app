import { pusherServer } from '@/lib/pusher-server'
import { auth } from '@/auth' // next-auth
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const session = await auth()

  if (!session?.user?.id) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  const body = await req.json()
  const { socket_id, channel_name } = body

  const authResponse = pusherServer.authorizeChannel(socket_id, channel_name)

  return NextResponse.json(authResponse)
}
