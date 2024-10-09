'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle } from "lucide-react"

export function LoginComponent() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Email and password are required')
      return
    }

    // Here you would typically send the login request to your backend
    console.log('Login attempt:', { email, password })
    // Reset form after submission
    setEmail('')
    setPassword('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white flex flex-col">
      <nav className="bg-gray-900 p-4">
        <div className="container mx-auto">
          <Link href="/" className="text-2xl font-bold">
            Leetbuds
          </Link>
        </div>
      </nav>

      <div className="flex-grow container mx-auto px-4 py-16 flex items-center justify-center">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold mb-6 text-center">Welcome Back to Leetbuds</h1>
          <form onSubmit={handleSubmit} className="space-y-6 bg-gray-800 p-8 rounded-lg shadow-xl">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
            </div>
            {error && (
              <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-2 rounded flex items-center">
                <AlertCircle className="w-5 h-5 mr-2" />
                {error}
              </div>
            )}
            <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white">
              Log In
            </Button>
          </form>
          <div className="mt-4 text-center space-y-2">
            <p className="text-gray-400">
              Don't have an account?{' '}
              <Link href="/sign-up" className="text-blue-400 hover:underline">
                Sign up
              </Link>
            </p>
            <Link href="/forgot-password" className="text-blue-400 hover:underline block">
              Forgot your password?
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}