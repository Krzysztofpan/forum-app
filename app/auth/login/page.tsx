import Link from 'next/link'
import LoginForm from './LoginForm'
export const metadata = {
  title: 'Log In to Cube – Access Your Account',
  description:
    'Log in to your Cube account to connect with your community, access personalized content, and stay updated. Enter your credentials to get started!',
  alternates: {
    canonical: `https://${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,
  },
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: 'Log In to Cube – Access Your Account',
    description:
      'Securely log in to Cube and continue your journey of connection and growth.',
    url: `https://${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,
    siteName: 'Cube',
    type: 'website',
    images: [
      {
        url: `${process.env.LOGO_URL}`,
        width: 630,
        height: 630,
        alt: 'Cube login page preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Log In to Cube – Access Your Account',
    description:
      'Securely log in to Cube and continue your journey of connection and growth.',
    images: [`${process.env.LOGO_URL}`],
  },
  viewport: 'width=device-width, initial-scale=1',
  lang: 'en',
}
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
