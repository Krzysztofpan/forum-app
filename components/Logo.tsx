import Image from 'next/image'
import Link from 'next/link'

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-1">
      <Image src="/logo.png" width={50} height={50} alt="logo" />
      <span className="font-bold text-xl">Cube</span>
    </Link>
  )
}

export default Logo
