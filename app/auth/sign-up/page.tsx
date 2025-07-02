import Link from 'next/link'
import SignUpForm from './SignUpForm'
export const metadata = {
  title: 'Register on Cube – Join Our Community',
  description:
    'Create your Cube account today and start connecting with like-minded people. Join us and unlock personalized content, resources, and more!',
  alternates: {
    canonical: `https://${process.env.NEXT_PUBLIC_BASE_URL}/auth/sign-up`,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Register on Cube – Join Our Community',
    description:
      'Sign up for Cube and begin your journey of connection, learning, and growth.',
    url: `https://${process.env.NEXT_PUBLIC_BASE_URL}/auth/sign-up`,
    siteName: 'Cube',
    type: 'website',
    images: [
      {
        url: `${process.env.LOGO_URL}`,
        width: 630,
        height: 630,
        alt: 'Cube registration page preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Register on Cube – Join Our Community',
    description:
      'Sign up for Cube and begin your journey of connection, learning, and growth.',
    images: [`${process.env.LOGO_URL}`],
  },
  viewport: 'width=device-width, initial-scale=1',
  lang: 'en',
}
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
