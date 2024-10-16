'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { LayoutDashboard, Code, Settings, LogOut, Users, UserPlus, Calendar } from "lucide-react"
import { LoadingSpinnerComponent } from './loading-spinner'
import { fetchUsersButSelf } from '@/lib/db/db'
import { User } from '@/lib/db/db'
export function DashboardComponent() {
  const [activeSection, setActiveSection] = useState('dashboard')
  const [searchQuery, setSearchQuery] = useState('')
  const [userId, setUserID] = useState('')
  const [name, setName] = useState('')
  const [progress, setProgress] = useState(null)
  const [nextInterview, setNextInterview] = useState(null)
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // Effect code here
    const getSession = async () => {

      try{
        const response = await fetch('api/get-session', {
          method: 'GET',
        })
        if(!response.ok){
          console.log(`An error occured.`)
        } else {
          const data = await response.json()
          setUserID(data.userId);
          setName(data.userName.split(" ")[0]) //get the first name
          setProgress(data.progress)
          setNextInterview(data.nextInterview)
          setLoading(false)
          const res = await fetch('api/users', {method: 'POST', body: JSON.stringify({id: data.userId})})
          const usersData = await res.json()
          const users = usersData.users
          setUsers(users)
        }
      } catch (error){
        console.log(`An error occured getting the session: ${error}.`)
      }
      
    }
    getSession();
    

    
    
    
  }, [name, progress, nextInterview]);
  
  const getFilteredUsers = (items: User[], query: string) => {
    if (!query){
      return items
    }
    return items.filter(user => user.name.includes(query))
  }

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="grid gap-4 md:grid-cols-2">
            <Card className=''>
              <CardHeader>
                <CardTitle>Daily LeetCode Challenge</CardTitle>
              </CardHeader>
              <CardContent>
                <h3 className="text-lg font-semibold mb-2">Two Sum</h3>
                <p className="text-gray-400 mb-4">Difficulty: Easy</p>
                <Button>Solve Challenge</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Your Next Interview</CardTitle>
              </CardHeader>
              <CardContent>
                {nextInterview == 0 ? 
                (<div>
                <p className="text-lg mb-2">No interviews on sight</p> 
                <Button variant="outline">Schedule</Button>
                </div>
                ) 
                : (<>
                <p className="text-lg mb-2">Mock Interview with <span className="font-semibold">Sarah Lee</span></p>
                  <p className="text-gray-400">Date: May 15, 2024</p>
                  <p className="text-gray-400 mb-4">Time: 2:00 PM EST</p>
                  <Button variant="outline">Prepare</Button></>)}
                
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Your Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold mb-2">{progress} / 100</p>
                <p className="text-gray-400">Problems solved this week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Leaderboard</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="list-decimal list-inside">
                  <li className="mb-2">John Doe - 120 points</li>
                  <li className="mb-2">Jane Smith - 115 points</li>
                  <li className="mb-2">You - 100 points</li>
                </ol>
              </CardContent>
            </Card>
          </div>
        )
      case 'problems':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Problem Set</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Here you can browse and solve LeetCode problems.</p>
              {/* Add problem list or categories here */}
            </CardContent>
          </Card>
        )
      case 'findFriends':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Find Friends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Input
                  type="text"
                  placeholder="Search for friends..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>
              <div className="space-y-4">
                {users?.map((friend) => (
                  <div key={friend?._id} className="flex items-center justify-between bg-gray-700 p-3 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mr-3">
                        {friend.name[0]}
                      </div>
                      <span>{friend?.name}</span>
                    </div>
                    <div className="space-x-2">
                      <Button size="sm" variant="outline">
                        <UserPlus className="w-4 h-4 mr-1" />
                        Add Friend
                      </Button>
                      <Button size="sm" variant="outline">
                        <Calendar className="w-4 h-4 mr-1" />
                        Schedule Interview
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )
      case 'settings':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Manage your account settings and preferences here.</p>
              {/* Add settings options here */}
            </CardContent>
          </Card>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 p-4">
        <div className="mb-8">
          <Link href="/" className="text-2xl font-bold">
            Leetbuds
          </Link>
        </div>
        <nav className="space-y-2">
          <Button
            variant={activeSection === 'dashboard' ? 'secondary' : 'ghost'}
            className="w-full justify-start"
            onClick={() => setActiveSection('dashboard')}
          >
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
          <Button
            variant={activeSection === 'problems' ? 'secondary' : 'ghost'}
            className="w-full justify-start"
            onClick={() => setActiveSection('problems')}
          >
            <Code className="mr-2 h-4 w-4" />
            Problems
          </Button>
          <Button
            variant={activeSection === 'findFriends' ? 'secondary' : 'ghost'}
            className="w-full justify-start"
            onClick={() => setActiveSection('findFriends')}
          >
            <Users className="mr-2 h-4 w-4" />
            Find Friends
          </Button>
          <Button
            variant={activeSection === 'settings' ? 'secondary' : 'ghost'}
            className="w-full justify-start"
            onClick={() => setActiveSection('settings')}
          >
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </nav>
        <div className="absolute bottom-4">
          <Button variant="ghost" className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-400/10">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
  {loading ? (
    <div className="flex flex-col items-center justify-center h-full">
      <LoadingSpinnerComponent height={60} width={60} color="light" />
      <p className="mt-4 text-white text-lg">Loading Leetbuds...</p>
    </div>
  ) : (
    <>
      <h1 className="text-3xl font-bold mb-6">Welcome back, {name}!</h1>
      {renderContent()}
    </>
  )}
</main>
    </div>
  )
}