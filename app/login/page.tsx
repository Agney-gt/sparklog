'use client'
import GoogleButton from 'react-google-button'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import HeaderHome from '@/components/HeaderHome'
import Footer from '@/components/Footer'

// Dynamically import AnimatedReflectionProgress with no SSR
const AnimatedReflectionProgress = dynamic(
  () => import('@/components/animated-reflection-progress'),
  { ssr: false }
)

export default function Component() {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [, setIsLoading] = useState(false)
  
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        router.push('/journal')
        router.refresh()
      }
    }
    checkUser()
  }, [router, supabase])

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true)
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        }
      })

      if (error) throw error
      
      if (data?.url) {
        window.location.href = data.url
      }

    } catch (err) {
      console.error('Error:', err)
      alert('Error logging in with Google')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <HeaderHome />
      <main className="flex-1">
        <section className="w-full py-6 md:py-12 lg:py-16">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Swap scrolling for <span className="text-blue-600">self-reflection</span>
                </h1>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
              
                
              </div>
            </div>
          </div>
          <AnimatedReflectionProgress />
        </section>
        <GoogleButton
  type="dark" // can be light or dark
  onClick={handleGoogleLogin}
/>
      </main>
      <Footer />
    </div>
  )
}