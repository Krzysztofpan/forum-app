import crypto from 'crypto'

export function generateRandomString(length: number) {
  const characters =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    const randomIndex = crypto.randomInt(0, characters.length)
    result += characters[randomIndex]
  }
  return result
}
