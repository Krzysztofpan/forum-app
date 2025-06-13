const createImage = (url: string) =>
  new Promise((resolve, reject) => {
    const image = new Image()
    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', (error) => reject(error))
    image.setAttribute('crossOrigin', 'anonymous') // ważne przy CORS
    image.src = url
  })

// funkcja do wycięcia obrazu na podstawie współrzędnych cropa
export async function getCroppedImg(
  imageSrc: string,
  crop: { x: number; y: number; width: number; height: number }
) {
  const image = await createImage(imageSrc)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  // ustaw rozmiar canvas na rozmiar wycinka
  canvas.width = crop.width
  canvas.height = crop.height

  // rysuj wycięty fragment na canvas
  ctx!.drawImage(
    image as CanvasImageSource,
    crop.x,
    crop.y,
    crop.width,
    crop.height,
    0,
    0,
    crop.width,
    crop.height
  )

  // zwróć blob obrazu (można też użyć canvas.toDataURL)
  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(blob)
    }, 'image/jpeg')
  })
}
