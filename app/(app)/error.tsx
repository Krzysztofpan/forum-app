'use client'
import Link from 'next/link'

const error = () => {
  return (
    <div className="flex gap-8 max-w-[600px] lg:max-w-[990px] w-full">
      <div className="border-x-[1px] border-solid max-w-[600px] w-full min-h-[100vh]">
        <h1 className="text-4xl my-4 text-center font-bold">
          Something went wrong!
        </h1>
        <p className="text-foreground/50 text-center mb-2">
          Sorry, but something went wrong refresh the page or click link below
        </p>
        <p className="text-center text-sm text-blue-400 hover:underline ">
          <Link href="/home" className="text-center font-bold">
            Back to home
          </Link>
        </p>
      </div>
    </div>
  )
}

export default error
