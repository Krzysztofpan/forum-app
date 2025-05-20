import Link from 'next/link'
import SignUpForm from './SignUpForm'

const SignUpPage = () => {
  return (
    <div className="space-y-8">
      <h2 className="text-4xl text-center font-semibold">Create an account</h2>
      <SignUpForm />

      <p className="text-center">
        Already have an account?{' '}
        <Link href="/auth/login" className="text-blue-500">
          Log in
        </Link>
      </p>
    </div>
  )
}

export default SignUpPage
