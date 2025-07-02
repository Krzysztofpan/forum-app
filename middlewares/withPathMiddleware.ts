import type { NextFetchEvent, NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function withPathMiddleware() {
  return async (
    request: NextRequest,
    event: NextFetchEvent,
    response: NextResponse
  ) => {
    // Dodaj nagłówek z aktualną ścieżką
    response.headers.set('x-current-path', request.nextUrl.pathname)
    return response
  }
}
