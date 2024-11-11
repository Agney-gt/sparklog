'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import Image from 'next/image'

export default function LoginPage() {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [isLoading, setIsLoading] = useState(false)

  // Check if user is already logged in
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
      
      // If we have a URL to redirect to, use it
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
    <div className="min-h-screen flex items-center justify-center bg-[url('/bg.jpg')] bg-cover bg-center">
      <div className="flex items-center justify-center">
        <Card className="h-[700px] w-[700px] bg-[#E3CC6F] shadow-lg rounded-lg">
          <CardHeader className="text-center p-6">
            <CardTitle className="text-3xl font-serif text-brown-800">Sparklog</CardTitle>
            <CardDescription className="text-lg font-light text-brown-600">
             Where yesterday’s inspiration shapes tomorrow’s innovation.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <Button 
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-2 bg-brown-800 text-white hover:bg-brown-700"
              variant="outline"
              disabled={isLoading}
            >
              {!isLoading && (
                <Image 
                  src="/google-logo.png" 
                  alt="Google" 
                  width={20} 
                  height={20}
                />
              )}
              {isLoading ? 'Redirecting...' : 'Continue with Google'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}