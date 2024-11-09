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

      // Log the response body if available
      if ((err as any).response) {
        console.error('Response:', await (err as any).response.text())
      }

      alert('Error logging in with Google')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      
      <Card className="w-[700px]">
        <CardHeader className="text-center">
          <CardTitle>Past meets future with every journal entry</CardTitle>
          <CardDescription>
          Find your self through journaling and reflection
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2"
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
  )
}