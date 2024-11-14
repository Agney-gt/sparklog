'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { JournalingBenefits } from '@/components/journaling-benefits'

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
          <JournalingBenefits />
        </section>
        
      </main>
      <footer className="border-t bg-white">
      <div className="mx-auto w-full max-w-screen-xl px-4 py-12 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold">Resources</h3>
            <nav className="mt-4 flex flex-col space-y-2">
              <Link className="text-sm text-muted-foreground hover:text-primary" href="#">
                Documentation
              </Link>
              <Link className="text-sm text-muted-foreground hover:text-primary" href="#">
                Blog
              </Link>
              <Link className="text-sm text-muted-foreground hover:text-primary" href="#">
                Analytics
              </Link>
            </nav>
          </div>
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold">Company</h3>
            <nav className="mt-4 flex flex-col space-y-2">
              <Link className="text-sm text-muted-foreground hover:text-primary" href="#">
                About Us
              </Link>
              <Link className="text-sm text-muted-foreground hover:text-primary" href="#">
                Careers
              </Link>
              <Link className="text-sm text-muted-foreground hover:text-primary" href="#">
                Contact
              </Link>
            </nav>
          </div>
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold">Legal</h3>
            <nav className="mt-4 flex flex-col space-y-2">
              <Link className="text-sm text-muted-foreground hover:text-primary" href="#">
                Terms of Service
              </Link>
              <Link className="text-sm text-muted-foreground hover:text-primary" href="#">
                Privacy Policy
              </Link>
            </nav>
          </div>
          
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">© 2024 Sparklog. All rights reserved.</p>
          <div className="flex space-x-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary"
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12c0 5.25 3.438 9.688 8.207 11.188.6.112.793-.262.793-.585 0-.287-.011-1.045-.017-2.052-3.338.724-4.042-1.607-4.042-1.607-.546-1.38-1.333-1.749-1.333-1.749-1.086-.743.083-.728.083-.728 1.204.085 1.838 1.236 1.838 1.236 1.067 1.826 2.8 1.297 3.48.992.108-.774.418-1.297.76-1.597-2.665-.303-5.467-1.333-5.467-5.933 0-1.313.469-2.386 1.236-3.227-.124-.303-.536-1.53.117-3.187 0 0 1.008-.322 3.303 1.229.957-.266 1.986-.398 3.006-.403 1.02.005 2.049.137 3.006.403 2.295-1.551 3.303-1.229 3.303-1.229.653 1.657.241 2.884.118 3.187.767.841 1.236 1.914 1.236 3.227 0 4.61-2.805 5.63-5.474 5.925.43.37.815 1.096.815 2.209 0 1.594-.014 2.872-.014 3.258 0 .327.19.703.798.585C20.563 21.688 24 17.25 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <a
              href="https://discord.gg/4x58yGcD9w"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary"
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0 8 8 0 0 0-.412-.833.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a9 9 0 0 1-1.248-.595.05.05 0 0 1-.02-.066l.015-.019q.127-.095.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007q.121.1.248.195a.05.05 0 0 1-.004.085 8 8 0 0 1-1.249.594.05.05 0 0 0-.03.03.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.2 13.2 0 0 0 4.001-2.02.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
    </div>
  )
}