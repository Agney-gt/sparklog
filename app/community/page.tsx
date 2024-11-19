'use client'

import React from 'react';
import Footer from '@/components/Footer'; // Adjust the import path as necessary
import HeaderHome from '@/components/HeaderHome'; // Adjust the import path as necessary
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Trophy } from "lucide-react"

export default function LeaderboardPage() {
    const [leaderboardData, setLeaderboardData] = React.useState<any[]>([])
    const [isLoading, setIsLoading] = React.useState(true)
    const supabase = createClientComponentClient()
  
    React.useEffect(() => {
      async function fetchLeaderboard() {
        try {
          const { data, error } = await supabase
            .from('user_progress')
            .select('*')
            .order('level', { ascending: false })
            .limit(100)
            
  
          if (error) throw error
          console.log("logging data",data)
          console.log("Query error:", error);
          setLeaderboardData(data || [])
        } catch (error) {
          console.error('Error fetching leaderboard:', error)
        } finally {
          setIsLoading(false)
        }
      }
  
      fetchLeaderboard()
    }, [supabase])
    return (
        <div>
            <HeaderHome />
            <div className="container mx-auto p-4">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-6 w-6 text-yellow-500" />
            Leaderboards
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px] w-full">
            {isLoading ? (
              <div className="flex items-center justify-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              </div>
            ) : (
              <div className="space-y-2">
                {leaderboardData.map((user, index) => (
                  <div
                    key={user.user_id}
                    className="flex items-center justify-between p-4 rounded-lg bg-muted/50"
                  >
                    <div className="flex items-center gap-4">
                      <span className={`text-lg font-semibold ${
                        index === 0 ? 'text-yellow-500' :
                        index === 1 ? 'text-gray-400' :
                        index === 2 ? 'text-amber-600' :
                        'text-gray-600'
                      }`}>
                        #{index + 1}
                      </span>
                      <div>
                        <p className="font-medium">{user.user_name}</p>
                        
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold">Level {user.level}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
            <Footer /> {/* Include the Footer component here */}
        </div>
    );
};

