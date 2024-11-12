'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Component() {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [isLoading, setIsLoading] = useState(false)

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
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <span className="font-bold text-xl flex items-center">
            <span className="text-primary">sparklog</span>
          </span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/login">
            Home
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/community">
            Community
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Blog
          </Link>
          
        </nav>
        <div className="ml-auto flex items-center">
          <Button onClick={handleGoogleLogin} disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Sign in with Google'}
          </Button>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="w-1/2 space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Imagine giving yourself <span className="text-blue-600">the same attention you give your screen.</span>
                  </h1>
                  <p className="w-10/11 text-gray-500 md:text-xl dark:text-gray-400">
                    Shift from scrolling to self-reflection. Capture your journey and watch your growth unfold.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" onClick={handleGoogleLogin} disabled={isLoading}>
                    {isLoading ? 'Loading...' : 'Start Journaling Today'}
                  </Button>
                </div>
              
            </div>
          </div>
          <div className="bg-white min-h-screen flex flex-col items-center justify-center p-8">
            <div className="relative w-full max-w-6xl">
              {/* Connector Lines */}
              <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2">
                <div className="relative h-px">
                  {/* Central processor to cards connectors */}
                  <div className="absolute left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-gray-200 -top-16" />
                  <div className="absolute w-full h-px bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700" />
                </div>
              </div>

              {/* Powered By Chip */}
              <div className="relative z-10 mb-16">
                <div className="bg-gray-50 text-gray-900 px-8 py-4 rounded-lg mx-auto w-fit border border-gray-200">
                  <div className="text-xl font-semibold">Powered By</div>
                </div>
              </div>

              {/* Cards Container */}
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Consistency Card */}
                <div className="bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-500/50 transition-colors shadow-sm">
                  <div className="h-12 w-12 rounded-lg bg-blue-50 flex items-center justify-center mb-6">
                    <div className="text-blue-600 text-2xl">⚡</div>
                  </div>
                  <h2 className="text-gray-900 text-xl font-semibold flex items-center gap-2 mb-4">
                    Consistency
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    Use external content to inspire actionable steps for growth, consistently applying what you learn to turn inspiration into progress and fuel creativity.
                  </p>
                </div>

                {/* Compounding Card */}
                <div className="bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-500/50 transition-colors shadow-sm">
                  <div className="h-12 w-12 rounded-lg bg-blue-50 flex items-center justify-center mb-6">
                    <div className="text-blue-600 text-2xl">📈</div>
                  </div>
                  <h2 className="text-gray-900 text-xl font-semibold flex items-center gap-2 mb-4">
                    Compounding
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    Leverage wisdom learned from others and lived experience as compounding data points, creating a time series that deepens your understanding of yourself over time.
                  </p>
                </div>

                {/* Catharsis Card */}
                <div className="bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-500/50 transition-colors shadow-sm">
                  <div className="h-12 w-12 rounded-lg bg-blue-50 flex items-center justify-center mb-6">
                    <div className="text-blue-600 text-2xl">🌟</div>
                  </div>
                  <h2 className="text-gray-900 text-xl font-semibold flex items-center gap-2 mb-4">
                    Catharsis
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    Consistent journaling compounds self-awareness and emotional release, creating an outlet for catharsis that deepens clarity and fuels personal growth.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 Sparklog. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}