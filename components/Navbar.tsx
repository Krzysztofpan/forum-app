import Image from 'next/image'
import { Button } from './ui/button'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div className="fixed top-0 w-full  bg-background py-4 px-10 flex justify-between">
      <Link href="/" className="flex items-center gap-1">
        <Image src="/logo.png" width={50} height={50} alt="logo" />
        <span className="font-bold text-xl">Cube</span>
      </Link>

      <div className="space-x-4">
        <Button variant="ghost">
          <Link href="/auth/login">Login in</Link>
        </Button>
        <Button variant="ghost">
          <Link href="/auth/sign-up">Sign Up</Link>
        </Button>
      </div>
    </div>
  )
}

export default Navbar
