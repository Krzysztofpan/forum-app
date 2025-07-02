import type { NextFetchEvent, NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export type CustomMiddleware = (
  req: NextRequest,
  ev: NextFetchEvent,
  res: NextResponse
) => Promise<NextResponse>

export function chain(middlewares: CustomMiddleware[]): CustomMiddleware {
  return async (req: NextRequest, ev: NextFetchEvent, res: NextResponse) => {
    let response = res
    for (const middleware of middlewares) {
      response = await middleware(req, ev, response)
    }
    return response
  }
}
