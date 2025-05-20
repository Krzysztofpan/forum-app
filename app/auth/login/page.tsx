import Link from 'next/link'
import LoginForm from './LoginForm'

const LoginPage = () => {
  return (
    <div className="space-y-8 max-w-[700px]">
      <h2 className="text-4xl text-center font-semibold">Welcome back</h2>
      <LoginForm />

      <p className="text-center">
        Don&apos;t have an account?{' '}
        <Link href="/auth/sign-up" className="text-blue-500">
          Sign Up
        </Link>
      </p>
    </div>
  )
}

export default LoginPage
