'use client'

import { Button } from "@/components/ui/button"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import AnimatedReflectionProgress from '@/components/animated-reflection-progress'
import Footer from '@/components/Footer'; // Adjust the import path as necessary
import HeaderHome from '@/components/HeaderHome'; // Adjust the import path as necessary


export default function Component() {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [isLoading, setIsLoading] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="w-1/2 space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Swap scrolling for <span className="text-blue-600">self-reflection </span>
                  </h1>
                  
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" onClick={handleGoogleLogin} disabled={isLoading}>
                    {isLoading ? 'Loading...' : 'Evolve with Intention'}
                  </Button>
                </div>
              
            </div>
          </div>
          
          <AnimatedReflectionProgress />
        </section>
        
      </main>
      <Footer />
    </div>
  )
}