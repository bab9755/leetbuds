'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Users, Code, TrendingUp } from "lucide-react"
import Link from "next/link"

export function LeetbudsLanding() {
  const [code, setCode] = useState(`function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Navbar */}
      <nav className="bg-gray-900 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            Leetbuds
          </Link>
          <div className="space-x-4">
            <Link href="#features" className="hover:text-blue-400 transition-colors">
              Features
            </Link>
            <Link href="#" className="hover:text-blue-400 transition-colors">
              About
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Code Together, Grow Together
            </h1>
            <p className="text-xl lg:text-2xl mb-8">
              Leetbuds: Where friends solve LeetCode problems, track progress, and elevate coding skills as a team.
            </p>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-300">
              Join Leetbuds
            </Button>
          </div>
          <div className="lg:w-1/2">
            <div className="bg-gray-800 rounded-lg shadow-xl p-4">
              <div className="flex justify-between items-center mb-4">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-sm text-gray-400">Two Sum Problem</div>
              </div>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-64 bg-gray-900 text-green-400 font-mono text-sm p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                spellCheck="false"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="bg-gray-800 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-center">Why Choose Leetbuds?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
              <Users className="w-12 h-12 mb-4 text-blue-400" />
              <h3 className="text-xl font-semibold mb-2">Accountability</h3>
              <p className="text-gray-300">
                Get automated scheduled mock interviews with your friends and make progress together
              </p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
              <Code className="w-12 h-12 mb-4 text-blue-400" />
              <h3 className="text-xl font-semibold mb-2">Diverse Problem Set</h3>
              <p className="text-gray-300">
                Access a wide range of LeetCode problems, from easy to hard, covering various topics and algorithms.
              </p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
              <TrendingUp className="w-12 h-12 mb-4 text-blue-400" />
              <h3 className="text-xl font-semibold mb-2">Progress Tracking</h3>
              <p className="text-gray-300">
                Monitor your improvement over time with detailed statistics and performance insights.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}